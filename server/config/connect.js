const mongoos = require('mongoose') 
const conn  = mongoos.connect('mongodb://localhost:27017/notejs', {useNewUrlParser:true})
.then(res => console.log("connection done happy coding .... !",))
.catch(err => console.log("error while connecting !!"))
module.exports = conn