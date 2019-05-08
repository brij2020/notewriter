
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import history from './history';

import React, { Component } from 'react'
import App from './App'
import Note from './component/Note'


class Routes extends Component {

    render () {
        return (
            <div>
                <Router history={history}>
                <Route exact path="/" component={App} history={history} />
                <Route path="/note" component={Note}  history={history}/>
                </Router>
            </div>  
        )
    }
}

export default Routes