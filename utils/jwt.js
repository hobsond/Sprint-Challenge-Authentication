const jwt = require('jsonwebtoken')



const tokenConfig = {
    expiresIn:'1h',
    subject:'user'
}

const secret = process.env.SECRET || 'loveLivie'
function generateToken(data){
    return new Promise((res,rej)=>{
  return jwt.sign(data,secret,tokenConfig,(err,token)=>{
      if(token){
          return res(token)
      }
      else{
         return rej({message:'could not generate a token'})
      }
  })


    })
        

}

function verifyToken(data,res){
    return new Promise((res,rej)=>{
        return jwt.verify(data,secret,(err,token)=>{
            if(token){
                return res(token)
            }
            else{
                return rej({message:'cannot verify token'})
            }
        })
    })
    
}

module.exports = {generateToken,verifyToken,secret}