const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require("../utils");
const crypto = require('crypto-js');
const config = require('../config');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const upload = multer({ dest: "images",filename:(req,file,cb)=>{
    cb(null,`${Date.now()}--${file.originalname}`);
} });

router.post('/signup', (req, res) => {
    const { fname, lname, email, password, phone } = req.body;
    const encryptPass = String(crypto.SHA1(password));

    const query = `insert into user(fname,lname,email,password,phone) values(?,?,?,?,?)`;
    db.query(query, [fname, lname, email, encryptPass, phone], (error, result) => {
        res.send(utils.createResult(error, result))
    })
});


router.post('/userDetails', (req, res) => {
    const { fname, lname, email, password, phone } = req.body;
    const encryptPass = String(crypto.SHA1(password));

    const query = `insert into userDetails(fname,lname,email,password,phone) values(?,?,?,?,?)`;
    db.query(query, [fname, lname, email, encryptPass, phone], (error, result) => {
        res.send(utils.createResult(error, result))
    })
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const encryptPass = String(crypto.SHA1(password));
    const query = `select id,fname,lname from user where email=? and password=?`;
    db.query(query, [email, encryptPass], (error, users) => {
        if (error) {
            res.send(utils.createResult(error))
        }
        else if (users.length == 0) {
            res.send(utils.createErrorResult("user does not exist"))
        }
        else {
            const { fname, lname, id } = users[0];
            const token = jwt.sign({ id, fname, lname }, config.key);
            res.send(utils.createSuccessResult({
                fname,
                lname,
                token,
            }));

        }
    })
})

// router.get('/profile',(req,res)=>{
//     const token=req.headers['x-token'];
//     try{
//         const data=jwt.verify(token,config.key)
//         const query=`select fname,lname,email,phone from user where id= ? `;
//         db.query(query,[data['id']],(error,users)=>{
//             if(error){
//                 res.send(error)
//             }else if(users.length==0){
//                 res.send("user does not exist")
//             }else{
//                 res.send(users[0]);
//             }
//         })
//     }catch(ex){
//         res.send(ex)
//     }
// })

router.get('/profile', (req, res) => {
    const id = req.user.id;
    const query = `select id,fname,lname,email,phone,profile_image from user where id= ? `;
    db.query(query, [id], (error, users) => {
        if (error) {
            res.send(utils.createErrorResult(error))
        } else if (users.length == 0) {
            res.send(utils.createErrorResult("user does not exist"))
        } else {
            res.send(utils.createSuccessResult(users[0]));
        }
    });
});

router.get('/userDetails', (req, res) => {
    
    const query = `select * from userDetails`;
    db.query(query, [], (error, result) => {
        if (error) {
            res.send(utils.createErrorResult(error))
        } else if (result.length == 0) {
            res.send(utils.createErrorResult("user does not exist"))
        } else {
            res.send(utils.createSuccessResult(result));
        }
    });
});

router.post("/upload-image", upload.single("image"), (request, response) => {
    const filename = request.file.filename;

    if (!filename || filename.length == 0) {
        response.send("your image uploading did not work, please try again");

    } else {
        const query = `update user set profile_image = ? where id= ?`;
        db.query(query, [filename, request.user.id], (error, result) => {
            response.send(utils.createResult(error, result));
        })
    }
});

router.get("/profile-image", (request, response) => {
    const id = request.user.id;
    const query = `select fname,profile_image from user where id=?`;
    db.query(query, [id], (error, users) => {
        if (error) {
            response.send(utils.createErrorResult(error))
        } else if (users.length == 0) {
            response.send(utils.createErrorResult("error while sending your profile"))
        } else {
            response.send(utils.createSuccessResult(users[0]));
        }
    })
});

// router.put("/edit-user", upload.single("image"),(request,response)=>{
//     const { fname,lname,email, phone } = request.body;
//     const filename = request.file.originalname;
//     const { id } = request.params;
//     const checkOwnerQuery = `select count (*) as count from todoItems where id = ? and userId = ?`;
//     db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
//       if (error) {
//         response.send(utils.createErrorResult(error));
//       } else if (result.length == 0) {
//         response.send(utils.createErrorResult("invalid result"));
//       } else {
//         const info = result[0];
//         if (info["count"] == 0) {
//           response.send(
//             utils.createErrorResult("this todo item does not belong to you")
//           );
//         } else {
//           const query = `update user set fname = ?, lname = ?,email= ?,phone= ?,profile_image= ?, where id = ?`;
//           db.query(query, [fname,lname,email, phone, filename,id], (error, result) => {
//             response.send(utils.createResult(error, result));
//           });
//         }
//       }
//     });
// });
router.put("/edit-user", upload.single("image"), (request, response) => {
    
    const { fname, lname, email, phone } = request.body;
    const Id=request.user.id;
     const filename = request.file.filename;
    const query = `update user set fname =?, lname =?,email=?,phone=?,profile_image=? where id =?`;
    db.query(query, [fname, lname, email, phone,filename,Id], (error, users) => {
        if(error){
            response.send(utils.createErrorResult(error));
        }else if(users.length==0){
            response.send(utils.createErrorResult("User does not exist"));
        }
        response.send(utils.createSuccessResult(users[0]));
    });
});
module.exports = router;