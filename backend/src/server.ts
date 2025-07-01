import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import {sample_gep, sample_users} from './data';
import jwt from "jsonwebtoken";
import gepRouter from './routers/gep.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import {dbConnect} from './configs/database.config';
dbConnect();


const app = express();

app.use(express.json());


app.use(cors({
  credentials: true,
  origin: "http://localhost:4200"
}));


app.use(express.json());


app.use("/api/geps",gepRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);



const port = 5000;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
