import {sample_users} from '../data';
import jwt, {verify} from 'jsonwebtoken';
import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {User, UserModel} from '../models/user.model';
import {HTTP_BAD_REQUEST} from '../constants/http_status';
import bcrypt from 'bcryptjs';



const router = Router();

router.get("/seed",asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if(usersCount > 0){
      res.send("Seed is already done");
      return;
    }

    await UserModel.create(sample_users);
    res.send("Seed is  done");
  }
))

router.post('/register',asyncHandler(async (req, res) => {
  const {name,ambassador,email,password,taxnum,address} = req.body;
  const user = await UserModel.findOne({email});
  if(user){
    res.status(HTTP_BAD_REQUEST).send('User already exists');
    return;
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUser:User={
    id:'',
    name,
    ambassador,
    email:email.toLowerCase(),
    password: encryptedPassword,
    taxnum,
    address,
    isAdmin: false,
    balance: 15

  }
  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));

}))

router.get("/",asyncHandler(async (req, res) => {
  const users= await UserModel.find();
  res.send(users);
}))

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send("Username or password is incorrect");
  }
}));

router.put("/:id", asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, ambassador, email, taxnum, address, password } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  user.name = name;
  user.ambassador = ambassador;
  user.email = email;
  user.taxnum = taxnum;
  user.address = address;

  if (password && password.length >= 6) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  res.send(generateTokenResponse(user));
}));

router.put("/:id/balance", asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { balance } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  user.balance = balance;
  await user.save();

  res.send({ message: "Balance updated", balance: user.balance });
}));


router.put('/updateBalance/:id', async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;


  if (typeof balance !== 'number' || isNaN(balance)) {
    return res.status(400).send('Hibás egyenleg adat');
  }

  try {

    const user = await UserModel.findByIdAndUpdate(id, { balance }, { new: true });

    if (!user) {
      return res.status(HTTP_BAD_REQUEST).send('Felhasználó nem található!');
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(HTTP_BAD_REQUEST).send('Hiba történt az egyenleg frissítésekor');
  }

});

router.put('/balanceonpay/:id', (async (req, res) => {
  const userId = req.params.id;
  const { balance } = req.body;


  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).send('User not found');
  }

  user.balance = balance;
  await user.save();

  res.send(user);
}));



const generateTokenResponse = (user: User) => {
  const token = jwt.sign({
      id: user.id, email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,

    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    name: user.name,
    ambassador: user.ambassador,
    email: user.email,
    taxnum: user.taxnum,
    address: user.address,
    balance: user.balance,
    isAdmin: user.isAdmin,
    token: token,
  };
};


export default router;
