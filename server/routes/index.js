var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3000');
});
router.get('/sayhello',(req,res)=>{
    console.log("request ",req)
      res.send({
        "hi" :"js ",
        "love" :5
      })
})


module.exports = router;
