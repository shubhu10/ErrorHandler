const express = require("express");
const app=express();
const path = require("path");
const mongoose =require("mongoose");
const chat = require("./models/chat.js");
const methodOvverride=require("method-override");
const ExpressError=require("./ExpressError.js");

let  port=2125;



app.set("views",path.join(__dirname,"Views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOvverride("_method"));

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}


app.get("/",(req,res)=>{
    res.send("app is working");
});

app.get("/chat",async(req,res)=>{
    let chats=await chat.find();
    res.render("index.ejs",{chats});
   

});

// New route 


app.get("/chat/new",(req,res)=>{
    // throw new ExpressError(401,"page not found");
    // res.send("work well");
    res.render("newchat.ejs")
});

// create route 

app.post("/chat",async(req,res,next)=>{

    try {
        let {from , to ,msg}=req.body;
    console.log(from,to,msg);
    let newChat= new chat({
        
            from:from,
            to:to,
            msg:msg,
            created_at:new Date(),
    });

 await newChat.save();
 res.redirect("/chat"); 
    } catch (er) {
        next(er);
        
    }
});


function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>
            next(err)
        );
    }
}

// New - Show Route 
app.get("/chat/:id",asyncWrap( async(req,res,next)=>{
        let {id}=req.params;
    let data=await chat.findById(id);
    if(!data)
        {
            next(new ExpressError(402,"chat not found"));
        }
    res.render("edit.ejs",{data});
    console.log("show route");
 
    
}));


// Edit Route 
app.get("/chat/:id/edit",asyncWrap(async(req,res,next)=>{
   
        let {id} = req.params;
    // console.log(id)
    let data = await chat.findById(id);
    // console.log(data);
    res.render("edit.ejs",{data});
   
    
}));

// update route 

app.put("/chat/:id",asyncWrap(async(req,res,next)=>{
    let {id}=req.params;
    let {newMsg}=req.body;
    console.log(newMsg);
    let updateChat=await chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new: true});
    console.log(updateChat);
    res.redirect("/chat"); 
}));

app.delete("/chat/:id", async(req,res)=>{
    console.log("work");
    let {id}=req.params;
    console.log(id);
    let deletedChat=await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chat");
})

app.get("/chat/:id/delete",async(req,res)=>{
   
    let {id}=req.params;
    console.log(id);
    let chats=await chat.findById(id);
    res.render("delete.ejs",{chats});
    console.log(chats);
    
});

// error handling middleware 
app.use((er,req,res,next)=>{
    let {status=500,message="some error occured"}=er;
    res.status(status).send(message);

})

app.listen(port,()=>{
    console.log("app is litening on port: ",port);
})
