import React, {Component} from 'react';
import MyButton from "../../util/MyButton";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {likePost, unlikePost} from '../../redux/actions/dataActions';

//Icons
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

//Redux
import {connect} from "react-redux";

class LikeButton extends Component {
    likedPost = () => {
        return !!(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId));
    }
    likePost = () => {
        this.props.likePost(this.props.postId);
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    }

    render() {
        const {authenticated} = this.props.user;
        return !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary"/>
                </MyButton>
            </Link>
        ) : (
            this.likedPost() ? (
                <MyButton tip="Unlike post" onClick={this.unlikePost}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like post" onClick={this.likePost}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        );
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likePost,
    unlikePost
}


export default connect(mapStateToProps, mapActionsToProps)(LikeButton);