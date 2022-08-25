const user = require('../models/schemas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.getSignUpPage = (req,res) =>{
    res.render('signup');
    };
    module.exports.getSignInPage = (req,res) =>{
        res.render('signin');
        };

        module.exports.postSignUpPage = async (req,res) =>{
           const email  = req.body.email;
          const password = req.body.password;
          //console.log('email + pass',email,password);

        try
        { 
             const new_user = await user.create({
            email,password
          }); 

          res.status(201).json({new_user});

        }
        catch(err){
            var error="" ;
            if(err.code === 11000){
                error = 'this email is registered try anotheror sign in';
             
               res.status(401).json({error});
            }
           // res.json(err.message);
           // res.render('signup' , {email : error});
           // return error;
        }

            };
            module.exports.postSignInPage = async (req,res) =>{
            console.log(req.body);
               await user.findOne({email : req.body.email}).then(async (result) => {
                const equal = await bcrypt.compare(req.body.password ,result.password);
                console.log(equal);
                if(equal) {
                    console.log('they are equals and id = ' ,result._id);
            const token =jwt.sign({id :"result._id"}, 'nodejsjwt' ,{
                expiresIn :'24h'
            } );
            res.cookie('jwt' , token , {httpOnly : true , maxAge:24*60*60*1000} );

                    res.status(201).json({user :'successfully'});

                
                }
                else{
                    res.json({error : 'Email or password is wrong'});
                }
               })
                .catch((err) =>console.log(err))
    
    
                };
              