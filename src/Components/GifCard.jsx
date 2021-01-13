import React, { Component } from "react";

class Gif extends Component {

    render() {
        return (
            <img className="info" src={this.props.info.images.original.url} alt="gif"/>
        );
    }
}
export default Gif;