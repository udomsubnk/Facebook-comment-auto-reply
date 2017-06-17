import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'Chuck Norris',
            session : {}
        }
        this.getUserDetailFromSession()
    }
    updateText(event) {
        this.setState({
            text: event.target.value
        });
    }
    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
                <input type="text" onChange={this.updateText.bind(this)} />
            </div>
        )
    }
    getUserDetailFromSession() {
        return axios.post('/getUserDetailFromSession')
        .then(function (response) {
            this.setState({session : response.data})
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

ReactDOM.render(<Main />, document.getElementById('main'));
