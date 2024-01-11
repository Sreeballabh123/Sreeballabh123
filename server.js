import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';


const app=express();
 //middlewares
 app.use(morgan('dev'));
 app.use(express.json());

 //routes
 app.use('/api/v1/auth',authRoutes);
 app.use('/api/v1/category',categoryRoutes);
 app.use('/api/v1/product',productRoutes);


 //configure env
dotenv.config();

//connect db
connectDB();



app.get('/',(req,res)=>{
   res.send(`<h1>welcome home</h1>`);
});
const PORT=process.env.PORT;
app.listen(PORT,()=>{

   console.log(`server is running on ${process.env.DEV_MODE} mode and in port ${process.env.PORT}`);
})

