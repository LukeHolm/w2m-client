import { Grid } from "@material-ui/core/";
import Axios from "axios";
import React, { Component } from "react";

import Post from "../components/Post";

class home extends Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    Axios.get("/posts")
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map((posts) => <Post key={posts.postId} post={posts} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item sm={8} xs={12}>
            {recentPostsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <p>Profile...</p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default home;
