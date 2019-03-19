import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const postUrl = 'http://localhost:5000/api/posts';

class App extends Component {
  state = {
    posts: [],
    error: '',
  };

  componentDidMount() {
    axios
      .get(postUrl)
      .then(posts => {
        this.setPosts(posts.data);
      })
      .catch(error => {
        this.setError(error.message);
      });
  }

  setPosts = posts => {
    this.setState({
      posts,
    })
  }

  setError = error => {
    this.setState({
      error,
    })
  }

  render() {
    if (this.state.error) {
      return <div>We got an error over here: {this.state.error};</div>;
    } else {
      return (
        <div>
          Hello World
          <ul>
            {this.state.posts.map(post => (
              <li key={post.id}>
                <h5>Title: {post.title}</h5>
                <p>Concents: {post.contents}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
