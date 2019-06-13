import React, {Component} from "react";
import PropTypes from "prop-types";

import * as API from '../../shared/http';
import UserHeader from './UserHeader'
import Content from './Content';
import Image from './Image';
import Link from './Link';
import PostActionSection from './PostActionSection';
import Comments from '../comment/Comments';
import Loader from '../Loader';

export class Post extends Component {
    static propTypes = {
        post: PropTypes.shape({
            comments: PropTypes.array,
            content: PropTypes.string,
            date: PropTypes.number,
            id: PropTypes.string.isRequired,
            image: PropTypes.string,
            likes: PropTypes.array,
            location: PropTypes.object,
            user: PropTypes.object,
            userId: PropTypes.string
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            post: null,
            comments: [],
            showComments: false,
            user: this.props.user
        };
        this.loadPost = this.loadPost.bind(this);
    }

    componentDidMount() {
        this.loadPost(this.props.id);
    }

    loadPost(id) {
        API.fetchPost(id)
            .then(res => res.json())
            .then(post => {
                this.setState(() => ({post}));
            });
    }

    render() {
        if (!this.state.post) {
            return <Loader/>;
        }
        return (
            <div className="post">
                <UserHeader date={this.state.post.date}
                            user={this.state.post.user}/>
            </div>
        );
    }
}

export default Post;
