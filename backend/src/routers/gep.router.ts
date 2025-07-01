import {sample_gep} from '../data';
import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {GepModel} from '../models/gep.model';

const router =  Router();

router.get("/seed",asyncHandler(async (req, res) => {
  const gepsCount = await GepModel.countDocuments();
  if(gepsCount > 0){
    res.send("Seed is already done");
    return;
  }

  await GepModel.create(sample_gep);
}
))
router.get("/",asyncHandler(async (req, res) => {
  const geps= await GepModel.find();
  res.send(geps);
}))

router.get("/:gepId",asyncHandler(async (req, res) => {
  const geps = await GepModel.findById(req.params.gepId);
  res.send(geps);
}))

router.post("/gepregister", asyncHandler(async (req, res) => {
  const { name, marka, tipus, teljesitmeny, suly, berletidij, letet } = req.body;

  const newGep = new GepModel({
    name,
    marka,
    tipus,
    teljesitmeny,
    suly,
    berletidij,
    letet
  });

  const createdGep = await newGep.save();
  res.status(201).send(createdGep);
}));

export default router;
