import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import {Link} from 'react-router-dom';
import LikeButton from "./LikeButton";
import Comments from "./Comments"
import CommentForm from "./CommentForm";

//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import CloseIcon from "@mui/icons-material/Close"
import {UnfoldMore} from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";

//Redux
import {connect} from 'react-redux';
import {getPost, clearErrors} from "../../redux/actions/dataActions";

const styles = theme => ({
    ...theme,
    profileImage: {
        maxWidth: 200, height: 200, borderRadius: '50%', objectFit: 'cover'
    }, dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '4%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class PostDialog extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({open: true});
        this.props.getPost(this.props.postId);
    }
    handleClose = () => {
        this.setState({open: false});
        this.props.clearErrors();
    }

    render() {
        const {
            classes,
            post: {postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments},
            UI: {loading}
        } = this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton postId={postId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.visibleSparator}/>
                <CommentForm postId={postId}/>
                <Comments comments={comments}/>
            </Grid>)
        return (<Fragment>
            <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>)
    }

}

PostDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.data.post, UI: state.UI
});

const mapActionsToProps = {
    getPost,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))