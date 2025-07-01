import {Router} from 'express';
import asyncHander from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
import auth from '../middleware/auth.mid';
import asyncHandler from 'express-async-handler';
import {UserModel} from '../models/user.model';

const router = Router();
router.use(auth);

router.post('/create', asyncHandler(async (req: any, res: any) => {
  try {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
      return;
    }

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    console.log('Request Order:', JSON.stringify(requestOrder, null, 2));

    await newOrder.save();

    res.send(newOrder);
  } catch (error) {
    console.error('Error while creating the order:', error);
    res.status(500).send('Server Error: Unable to create order');
  }
}));

router.post('/pay', asyncHander( async (req:any, res) => {
  const {paymentId} = req.body;
  const order= await getNewOrderForCurrentUser(req);
  if(!order){
    res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
}))

router.get('/newOrderForCurrentUser', asyncHander( async (req:any,res ) => {
  const order= await OrderModel.findOne({user: req.user.id, status: OrderStatus.NEW});
  if(order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
}))

router.get('/track/:id', asyncHander( async (req,res ) => {
  const order = await OrderModel.findById(req.params.id);
  res.send(order);
}))


router.post('/:id/complete', asyncHandler(async (req: any, res) => {
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId).populate('items.gep');

  if (!order) {
    res.status(404).send('Order not found');
    return;
  }

  if (order.status === OrderStatus.COMPLETE) {
    res.status(400).send('Order already completed');
    return;
  }

  if (order.user.toString() !== req.user.id) {
    res.status(403).send('Not authorized');
    return;
  }

  if (order.status !== OrderStatus.PAYED) {
    res.status(400).send('Only payed orders can be completed');
    return;
  }

  const uniqueDeposits = new Set<number>();
  for (const item of order.items) {
    uniqueDeposits.add(item.gep.letet);
  }

  const totalRefund = Array.from(uniqueDeposits).reduce((sum, val) => sum + val, 0);

  const user = await UserModel.findById(order.user);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  user.balance += totalRefund;
  await user.save();

  order.status = OrderStatus.COMPLETE;
  await order.save();

  res.send({
    message: 'Order completed and deposit refunded',
    refunded: totalRefund,
    newBalance: user.balance,
  });
}));




export default router;


async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
