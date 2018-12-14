const JWT = require('jsonwebtoken');
const Model = require('../models/incident');
const { JWT_SECRET } = require('../configuration');

module.exports = {
  add: async (req, res, next) => {
    console.log(req.body)
    const data = new Model(req.body)
    const save = await data.save() 
    
    res.json({ data: save });
  },
  fetchAll: async (req, res, next) => {
    const find = await Model.find({}).populate({path:'name'}).exec()
    res.json({data: find})
  },
  fetchSingle: async (req, res, next) => {
    const find = await Model.findOne({_id:req.params.id}).exec()
    res.json({data: find})
  },
  delete: async (req, res, next) => {
    const remove = await Model.remove({_id:req.params.id}).exec()
    res.json({message: "Deleted!"})
  },
  update: async (req, res, next) => {
    const data = req.body
    console.log(data)
    const update = await Model.findOneAndUpdate({_id:req.params.id},{$set:data}).exec()
    console.log(update)
    res.json({data: update})
  },
  delete: async (req, res, next) => {
    const remove = await Model.findByIdAndRemove({_id:req.params.id}).exec()
    console.log(remove)
    res.json({data: remove})
  }
}