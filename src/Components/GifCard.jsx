import React, { Component } from "react";

class Gif extends Component {

    render() {
        return (
            <div className="pic">
                <p>{this.props.title}</p>
                <div class="pic" >
                <img
                class="info"
                src={this.props.source}
                alt="gif"
                />
                </div>
            </div>
        );
    }
}
export default Gif;