const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Agency = require('../models/agency-registration')
const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'BalikAral',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, firstName, lastName, middleName, suffix, userType, agencyId, agencyName } = req.body;
    console.log(req.body)
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    const foundAgency = await Agency.findOne({ name: agencyName });
    if (foundUser || foundAgency) { 
      return res.status(403).json({ error: 'Email/Agency is already exists!'});
    }

    if(agencyName){
      const newAgency = new Agency({
        name: agencyName,
        status: false
      })
      
      const saveNewAgency = await newAgency.save();
  
      if(saveNewAgency){
        const newUser = new User({ 
          method: 'local',
          local: {
            email: email, 
            password: password,
            userType: userType
          },
          personalInformation: {
            firstName:firstName,
            lastName:lastName,
            middleName:middleName,
            suffix: suffix
          }
        });
        if(agencyId){
          newUser.personalInformation.agencyId = agencyId
        }
    
        await newUser.save();
    
        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ token });
      }
    }else{
      if(agencyId != ""){
        const newUser = new User({ 
          method: 'local',
          local: {
            email: email, 
            password: password,
            userType: userType
          },
          personalInformation: {
            firstName:firstName,
            lastName:lastName,
            middleName:middleName,
            suffix: suffix
          }
        }); 
        if(agencyId){
          newUser.personalInformation.agencyId = agencyId
        }
        await newUser.save();
  
        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ token });
      }else{
        const newUser = new User({ 
          method: 'local',
          local: {
            email: email, 
            password: password,
            userType: userType
          },
          personalInformation: {
            firstName:firstName,
            lastName:lastName,
            middleName:middleName,
            suffix: suffix
          }
        });
        await newUser.save();
  
        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ token });
      }
  
      
    }
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token,user: req.user });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  },
  fetchAll: async( req, res, next ) => {
    const user = await User.find({"local.userType":{$ne: "Admin"}}).exec()
    res.json({data: user})
  },
  update: async (req, res, next) => {
    const data = req.body
    console.log(req.params.id)
    const update = await User.findOneAndUpdate({_id:req.params.id},{$set:data}).exec()
    console.log(update)
    res.json({data: update})
  }
}