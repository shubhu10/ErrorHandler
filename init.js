const mongoose =require("mongoose");
const chat = require("./models/chat.js");

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allchats=[
    {
        from:"tony",
        to:"peter",
        msg:"get this suit",
        created_at:new Date(),
    },
    {
        from:"tony",
        to:"quin",
        msg:"go out of here",
        created_at:new Date(),
    },
    {
        from:"bruice",
        to:"hulk",
        msg:"come come come",
        created_at:new Date(),
    },
    {
        from:"captain",
        to:"tchala",
        msg:"i need sheild",
        created_at:new Date(),
    },
    {
        from:"tchala",
        to:"bucky",
        msg:"your new arm",
        created_at:new Date(),
    },
    {
        from:"tony",
        to:"vision",
        msg:"hack the system",
        created_at:new Date(),
    },
];

chat.insertMany(allchats).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

