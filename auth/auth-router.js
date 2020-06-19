const router = require('express').Router();
const crypt = require('bcrypt')
const db = require('../database/dbConfig')
const generateToken = require('../utils/jwt').generateToken


router.get('/',(req,res)=>{
  res.status(200).json('hello')
  
})

router.post('/register', (req, res) => {
  const data = req.body
  const{username,password} = data
  if(username && password){
    data.password = crypt.hashSync(password,12)
    
    generateToken(data)
    .then(token=>{
      db('users')
      .insert(data)
      .then((item)=>res.status(200).json({token:token}))
      .catch(err=>res.status(500).json({message:'could not add you to database'}))
    })
    .catch(err=>res.status(400).json(err))


  }
  else{

    return res.status(400).json({message:'please enter a username and password '})
  }
});

router.post('/login', (req, res) => {
  // implement login
  const data  = req.body
  const {username,password} = data

  if(username && password){
    db('users')
    .where({username})
    .then(item=>{
      crypt.compare(password,item[0].password,(err,result)=>{
        if(result){
        return  generateToken(item[0])
      .then(token=>res.status(200).json({token}))
      .catch(err=>res.status(500).json(err))

        }
        else{
          return res.status(500).json(err)

        }
      })
      
    })
  .catch(error =>res.status(400).json({message:'user does not exist'}))

  }
  else{
    res.status(400).json({message:'please enter a username and password'})
  }


});

module.exports = router;
