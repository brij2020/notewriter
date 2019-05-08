import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
class EditNote extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        },
        noteInfo:{
            title:'',
            content:'',
            author:''
        },
    

      }
    }

    componentWillReceiveProps  (newPorps) {
        console.log("new p$rops ",newPorps.props.props)
        this.setState({noteInfo:{...newPorps.noteInfo}})
    }

    updateNote = async (e)=> {

        let json = this.state.noteInfo
        await axios.post('/updatenote',json)
        .then(data=>{
            if(data.data.update)
                this.props.closemodel()
                window.location.href = "/note"
        })      
        .catch(err=>{}) 
    }
 
    setValue = (e) =>{
        let value = e.target.value
        if(e.target.name ==='title') {
            this.setState({noteInfo:{...this.state.noteInfo,title:value}})
        }
        if(e.target.name === "content") {
            this.setState({noteInfo:{...this.state.noteInfo,content:value}})

        }
        if(e.target.name === "author") {
            this.setState({noteInfo:{...this.state.noteInfo,author:value}})

        }
        
    }


    render () {
        let noteinfo = this.state.noteInfo;
        return (
            
           <Modal 
                isOpen ={this.props.ismodalopen}
                style = {this.state.content}
            >
                 <form >
                    <div class="form-row align-items-center">
                        <div class="col-auto">
                       
                        <input 
                            type="text" 
                            class="form-control mb-2 col-6" 
                            id="inlineFormInput" 
                            value={noteinfo.title} 
                            name ="title"
                            onChange={(e)=>{this.setValue(e)}}
                        />
                        <label class="sr-only" for="inlineFormInput">title</label>
                        </div>
                        <div class="col-auto">
                        
                        <div class="input-group mb-2">
                            <input 
                                type="text" 
                                class="form-control " 
                                id="inlineFormInputGroup" 
                                value={noteinfo.content} 
                                name="content"
                                onChange={(e)=>{this.setValue(e)}}
                            />
                            <label class="sr-only" for="inlineFormInputGroup">content</label>
                        </div>
                        </div>
                        <div class="col-auto">
                        <div class="form-check mb-2">
                            <input 
                                class="form-control " 
                                type="text" 
                                id="autoSizingCheck" 
                                value={noteinfo.author} 
                                name="author"
                                onChange={(e)=>{this.setValue(e)}}
                            />  <label class="sr-only" for="inlineFormInputGroup">Author</label>      
                        </div>
                        </div>
                       
                    </div>
                </form>
                <div class="col-auto">
                            <button  class="btn btn-primary mb-2" onClick  = {(e)=>{this.updateNote(e)}}>Update Note </button>
                        </div>
           </Modal>
         
        )
    }
}

export default EditNote