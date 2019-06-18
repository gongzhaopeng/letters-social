import React, { Component } from "react";
import PropTypes from "prop-types";

import Filter from "bad-words";

const filter = new Filter();

class CreatePost extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            valid: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    handlePostChange(event) {
        const content = filter.clean(event.target.value);
        this.setState(() => ({
            content,
            valid: content.length <= 280
        }));
    }

    handleSubmit() {
        if (!this.state.valid) {
            return;
        }
        const newPost = {
            content: this.state.content
        };
        this.props.onSubmit(newPost);
        console.log(this.state);
    }

    render() {
        return (
            <div className="create­post">
                <button onClick={this.handleSubmit}>Post</button>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
            </div>
        );
    }
}

export default CreatePost;