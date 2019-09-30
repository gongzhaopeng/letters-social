import parseLinkHeader from "parse-link-header";

import * as types from "../contstants/types";
import * as API from "../shared/http";
import { createError } from "./error";
import { getCommentsForPost } from "./comments";

export function updateAvailablePosts(posts) {
    return {
        type: types.posts.GET,
        posts
    };
}

export function updatePaginationLinks(links) {
    return {
        type: types.posts.UPDATE_LINKS,
        links
    };
}

export function like(postId) {
    return (dispatch, getState) => {
        const { user } = getState();
        return API.likePost(postId, user.id)
            .then(res => res.json())
            .then(post => {
                dispatch({
                    type: types.posts.LIKE,
                    post
                });
            })
            .catch(err => dispatch(createError(err)));
    };
}

export function unlike(postId) {
    return (dispatch, getState) => {
        const { user } = getState();
        return API.unlikePost(postId, user.id)
            .then(res => res.json())
            .then(post => {
                dispatch({
                    type: types.posts.UNLIKE,
                    post
                });
            })
            .catch(err => dispatch(createError(err)));
    };
}

