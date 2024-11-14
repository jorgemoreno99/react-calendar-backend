const jwt = require("jsonwebtoken");


const generateJWT = (id, name)=>{
    return new Promise ((resolve, reject) =>{
        const payload = {id: id, name};
        jwt.sign(payload, process.env.SECRET_JWT_TOKEN_SEED, {
            expiresIn: "2h",
        },(err,token)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token)
            }

        })
    })
}

module.exports = {
    generateJWT
}