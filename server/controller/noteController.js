const Note =  require('./../database/models/Note');
const conn = require('./../config/connect')
const createJson = require('./../../json/editNote')
const mongo = require('mongodb');
class NoteController {
    
   async addNote(req,res){
        let data = req.body
        await Note.create(
            {
                title        : `${data.title}`,
                content      : `${data.content}`,
                author       : `${data.author}`,
                modifiedDate :  new Date(),
            }
        )
        .then(result=>{ 
            res.redirect('/')
            
        })
        .catch(err=>{console.log(err)})
    }

    // get Note List 
    async getNoteList(req,res){
        
        await Note.find({}) 
        .then(data=>{
            res.send(JSON.stringify(data))  
        })
        .catch(err=>{
            console.log("hi this is erorr ",err)
        })
    }
    async editNote(req,res) {
        let  o_id = new mongo.ObjectID(req.body._id)
        let  json=createJson(req.body)
        await Note.updateMany({"_id":o_id},json)
        .then(updated=> {
           res.status(200).send(JSON.stringify({"update":true}))
        })
        .catch(err=>{
            console.log("something is wrong .......",err)
        })

    }

    async removeNote(req,res) {
        let  o_id = new mongo.ObjectID(req.body._id)
       await Note.deleteMany({"_id":o_id},{})
       .then(result=>{
        res.status(200).send(JSON.stringify({"delete":true}))
       
       })
       .catch(err=>{
           console.log("error e",err)
       })

    }

}

const noteController = new NoteController()




module.exports = noteController