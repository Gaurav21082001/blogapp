const express=require("express")
const cors=require("cors")
const morgan=require("morgan")
const config=require("./config")
const jwt=require("jsonwebtoken")

const app=express();
app.use(cors("*"));
app.use(express.static('images'));
app.use(express.json());
app.use(morgan("combined"));

//authorize user
app.use((req,res,next)=>{
    if(req.url=='/user/signup' || req.url=='/user/signin' || req.url=='/user/userDetails'){
        next()
    }else{
        const token=req.headers['x-token'];
        if(!token){
            res.send("token missing")
        }else{
            try{
                const user=jwt.verify(token,config.key)
                req.user=user;
                next();
            }catch(ex){
                res.send(ex)
            }
        }
        
    }
})

const userRouter=require("./routes/user");
const blogRouter=require("./routes/blogs")

app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(4000,"0.0.0.0",()=>{
    console.log("Server started");
})