import Grid from '@material-ui/core/Grid';
import Axios from "axios";
import React, { Component } from "react";
import PropTypes from 'prop-types';

import Post from "../components/Post";
import Profile from "../components/Profile";

import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

class home extends Component {

  componentDidMount() {
this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    let recentPostsMarkup = !loading ? (
      posts.map((posts) => <Post key={posts.postId} post={posts} />)
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
            <Profile/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, {getPosts})(home);
