import bcrypt from "bcrypt"

const users = [
    {
        name : "Admin User" ,
        email : "admin@email.com",
        password : bcrypt.hashSync("123456" , 10),
        isAdmin : true
    },
    {
        name : "Laith abu fadda" ,
        email : "laith@email.com",
        password : bcrypt.hashSync("123456" , 10),
        isAdmin : false
    },
    {
        name : "moe" ,
        email : "moe@email.com",
        password : bcrypt.hashSync("123456" , 10),
        isAdmin : false
    },
]

export default users