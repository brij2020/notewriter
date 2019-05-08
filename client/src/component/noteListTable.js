import React, { Component } from 'react'
import EditNote from './editNote'
import axios from 'axios'
 
class NoteListTable extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        
        list:[],
        isModalOpen:false,
        noteInfo:{},

      }
    }
    
    componentWillReceiveProps(newProps) {
        console.log("new pops",newProps)
        this.setState({list:newProps.notelist})
    }


    editNote = (e,note) =>{  
        this.setState({noteInfo:note})
        this.onOpen();  
    }


    getRefreshList = async ()=> {
        let self = this
        await axios.get('/getList')
        .then(data=>{
           
            self.setState({list:data.data})
        })
        .catch(err=>{console.log("errro is occured",err)})
    
    }

    onCLose = ()=>{
        this.setState({isModalOpen:false})

    }
    
    onOpen = ()=> {
        this.setState({isModalOpen:true})
    }

    removeNote = (e,list) =>{
        let self = this
        let json = {"_id":list._id}
        axios.post('/removenote',json)
        .then(res => {
            console.log("respobnse ",res)   
            if(res.data.delete) {
                self.getRefreshList()
            }
        })
        .catch(err => {
            console.log("ere",err)
        })
    }

    render () {
        let noteListtoRender = this.state.list!==undefined?this.state.list:[]
        return (
            <div>
                <div class="container">
                   
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Note Title</th>
                            <th>Content </th>
                            <th>Author</th>
                            <th>Modify Date </th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        { 
                            noteListtoRender.length>0 ?
                            noteListtoRender.map(list=>(
                                 
                                <tr className="success" >
                                <td>{list.title}</td>
                                <td>{list.content}</td>
                                <td>{list.author}</td>
                                <td>{new Date(list.modifiedDate).toDateString()}</td>
                                <td>
                                   <button 
                                        className="material-icons remove" 
                                        aria-hidden="true" 
                                        onClick={(e)=>{ this.editNote(e,list)}} 
                                    >edit
                                   </button>
                                </td>
                                <td >
                                   <button 
                                        className="edit" 
                                        aria-hidden="true"
                                        onClick={(e)=>{this.removeNote(e,list)}}
                                    >remove</button></td>
                                </tr>

                            ))
                              
                            :<h5 className="center"> No Data Found!</h5>
                        }   
                        </tbody>
                    </table>
                </div>
                <EditNote 
                    ismodalopen = {this.state.isModalOpen}
                    noteInfo={this.state.noteInfo}
                    closemodel = {this.onCLose}
                    props = {this.props}
                />
                <hr />

            </div>
        )
    }
}

export default NoteListTable