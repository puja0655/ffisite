const bodyParser = require('body-parser');
const Contact = require('../models/contactus');
const router = require('express').Router()
router.use(bodyParser.json());
router.route('/')
.get((req,res,next)=>{
    Contact.find({})
    .then((contact)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(contact);
    },(err)=>next(err))
    .catch((err)=>next(err));
})


.post((req,res,next)=>{
    Contact.create(req.body)
    .then((contact)=>{
        console.log('Contact Created',contact);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(contact);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = router;