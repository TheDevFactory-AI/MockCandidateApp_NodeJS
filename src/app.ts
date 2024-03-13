import express, { Express, Response, Request, NextFunction, ErrorRequestHandler  } from 'express';
import { connectDB } from './db/db.js';
import UserRouter from './Routes/UserRouter.js';
import DishesRouter from './Routes/DishesRouter.js';

await connectDB();

const port = 80;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get('/health',(req:Request,res:Response)=>{
   res.status(200).send("OK!")
})

//users and dishes endpoints with the correct CRUD

app.use('/users', UserRouter);
app.use('/dishes', DishesRouter);

app.use((err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction):any => {
   res.status(401).json({ error: 'Unauthorized' });
})

app.listen(port, ()=>console.log(`server started on port ${80}`))