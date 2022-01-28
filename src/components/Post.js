import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  Typography as Typo,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core/";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userhandle,
        postId,
        likeCount,
        commentCount,
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typo
            variant="h5"
            component={Link}
            to={`/users/${userhandle}`}
            color="primary"
          >
            {userhandle}
          </Typo>
          <Typo variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typo>
          <Typo variant="body1">{body}</Typo>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
