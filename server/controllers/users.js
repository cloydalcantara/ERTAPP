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
    
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    const foundAgency = await User.findOne({ name: agencyName });
    if (foundUser || foundAgency) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    if(agencyName){
      const newAgency = new Agency({
        name: agencyName
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
            agencyId:saveNewAgency._id,
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
            agencyId:agencyId ? agencyId : '',
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
  }
}