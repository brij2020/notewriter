function createJson(data){
    // console.log("data in node js ",data)
return({   
    "title"       : `${data.title}`,
    "content"      : `${data.content}`,
    "author"      : `${data.author}`,
    "modifiedDate" : `${Date()}`,
    "__v" : 0
    })
}

module.exports = createJson