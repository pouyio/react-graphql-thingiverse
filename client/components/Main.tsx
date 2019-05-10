import React, { Component } from 'react';
import axios from 'axios';

export default class Main extends Component<any, any> {

    state = {
        things: []
    }

    componentDidMount() {
        axios.get('https://api.thingiverse.com/popular/', {
            headers: { 'Authorization': this.props.bearer }
        }).then((things: any) => {
            return things.data;
        }).then((things: any) => {
            this.setState({ things });
        });
    }

    render() {
        return (
            <div>
                <h1>Popular List</h1>
                <ul>
                    {
                        this.state.things.map(({id, name}: any) => <li key={id}>{name}</li>)
                    }
                </ul>
            </div>
        )
    }
}