const mongoos = require('mongoose') // require mongoos
const schema  = mongoos.Schema;

const noteSchema = new schema(
    {
        title        : String,
        content      : String,
        author       : String,
        modifiedDate : Date
    }
)

const Note = mongoos.model('Note',noteSchema);
module.exports = Note                                  