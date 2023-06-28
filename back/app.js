const express=require('express')
const postRouter=require('./routes/post')
const userRouter=require('./routes/user')
const db=require('./models')
const cors=require('cors')
const passportConfig=require('./passport')
const passport = require('passport')
const session = require("express-session");
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')


dotenv.config()

const app=express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(express.json());//axios로 데이터보냃때
app.use(express.urlencoded({ extended: true }));//일반폼을보낼때

db.sequelize.sync()
.then(()=>{
    console.log('db연결성공')
})

passportConfig();


  app.use(cookieParser(process.env.COOKIE_SECRET));



app.use(session({
    saveUninitialized: false,
    resave: false,
    secret:process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/post',postRouter)
app.use('/user',userRouter)



app.listen(3065,()=>{
    console.log('서버실행중')
})