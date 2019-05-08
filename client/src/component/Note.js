import React, { Component } from 'react'
import axios from 'axios'
import NoteListTable from './noteListTable'
class Note extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        notelist:[],

      }
    }
    
    async getNoteList() {
        let self = this
        await axios.get('/getList')
        .then(data=>{
            console.log("datat",data)
            self.setState({notelist:data.data})
        })
        .catch(err=>{console.log("errro is occured",err)})
    
    }
    componentWillMount(){
            console.log("will mount ")
    }
    componentWillReceiveProps() {
        console.log("hi recieve")
        this.getNoteList();
    }
    componentDidMount() {
        this.getNoteList();
    }

    render () {
        console.log("props==",this.props)
        return (
            <div>
                <NoteListTable notelist={this.state.notelist} props={this.props}/>
                
                <form action="/addnote" method="POST">
                    <div class="form-row align-items-center">
                        <div class="col-auto">
                        <label class="sr-only" for="inlineFormInput">title</label>
                        <input type="text" class="form-control mb-2 col-6" id="inlineFormInput" placeholder="note title" name ="title" />
                        </div>
                        <div class="col-auto">
                        <label class="sr-only" for="inlineFormInputGroup">content</label>
                        <div class="input-group mb-2">
                            <input type="text" class="form-control " id="inlineFormInputGroup" placeholder="example story...." name="content"/>
                        </div>
                        </div>
                        <div class="col-auto">
                        <div class="form-check mb-2">
                            <input class="form-control " type="text" id="autoSizingCheck" placeholder="johan deo" name="author"/>     
                        </div>
                        </div>
                        <div class="col-auto">
                        <button type="submit" class="btn btn-primary mb-2">Add Note</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Note