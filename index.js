import express from 'express'
import 'dotenv/config'
import userrouter from './src/Router/userrouter.js';

const app = express();
app.use(express.json())


app.use(userrouter)


const port = process.env.PORT || 2345
app.listen(port,()=>{
    console.log(`server is runnign on port ${port}`);
})