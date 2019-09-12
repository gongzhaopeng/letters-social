import PropTypes from "prop-types";

import React, { Component } from "react";
import enroute from "enroute";
import invariant from "invariant";

export default class Router extends Component {
    static propTypes = {
        children: PropTypes.array,
        location: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.routes = {};

        this.addRoutes(props.children);

        this.router = enroute(this.routes);
    }

    addRoute(element, parent) {
        const { component, path, children } = element.props;

        invariant(component, `Route ${path} is missing the "component" property`);
        invariant(typeof path === "string", `Route ${path} is not a string`);

        const render = (params, renderProps) => {
            const finalProps = Object.assign(
                { params },
                this.props,
                renderProps);

            const children = React.createElement(component, finalProps);

            return parent ? parent.render(params, { children }) : children;
        };

        const route = Router.normalizeRoute(path, parent);

        if (children) {
            this.addRoutes(children, { route, render });
        }

        this.routes[Router.cleanPath(route)] = render;
    }

    addRoutes(routes, parent) {
        React.children.forEach(
            routes,
            route => this.addRoute(route, parent)
        );
    }

    static cleanPath(path) {
        return path.replace(/\/\//g, "/");
    }

    static normalizeRoute(path, parent) {
        if (path[0] === "/") {
            return path;
        }
        if (!parent) {
            return path;
        }
        return `${parent.route}/${path}`;
    }

    render() {
        const { location } = this.props;
        invariant(location, "<Router/> needs a location to work");
        return this.router(location);
    }
}
