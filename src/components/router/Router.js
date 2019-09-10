import PropTypes from "prop-types";

import React, { Component } from "react";
import enroute from "enroute";
import invariant from "invariant";

export default class Router extends Component {
    static propTypes = {
        children: PropTypes.object,
        location: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.routes = {};

        // TODO
    }

    addRoute(element, parent) {
        // TODO
    }

    addRoutes(routes, parent) {
        React.children.forEach(routes);
    }

    cleanPath(path) {
        return path.replace(/\/\//g, "/");
    }

    normalizeRoute(path, parent) {
        if (path[0] === "/") {
            return path;
        }
        if (!parent) {
            return path;
        }
        return `${parent.route}/${path}`;
    }

    render() {
        // TODO
    }
}
