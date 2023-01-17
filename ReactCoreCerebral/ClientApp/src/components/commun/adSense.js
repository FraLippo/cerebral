import React, { Component } from 'react';
export default class Ad extends Component {

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    render() {
        return <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-0014588513895125"
            data-ad-slot="6880354109"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    }

}