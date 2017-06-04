import React from 'react';
import ReactDOM from 'react-dom';

// class Main extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             text: 'Chuck Norris'
//         }
//     }

//     updateText(event) {
//         this.setState({
//             text: event.target.value
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.state.text}</h1>
//                 <input type="text" onChange={this.updateText.bind(this)} />
//             </div>
//         )
//     }
// }

// ReactDOM.render(<Main />, document.getElementById('main'));

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample
ReactDOM.render(<BasicExample />, document.getElementById('main'));
