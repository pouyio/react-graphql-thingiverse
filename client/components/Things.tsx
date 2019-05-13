import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { Link } from 'react-router-dom';

export default class Things extends Component<any, any> {

    getGQL(query: string): DocumentNode {
        return gql`{
            ${query} {
                id,
                name,
                thumbnail
            }
        }`
    }

    render() {
        const query = this.props.title.toLowerCase();
        return (
            <div>
                <h1>{this.props.title}</h1>
                <Query query={this.getGQL(query)}>
                    {({ loading, error, data }: any) => {
                        if (error) return <h1> ERROR!</h1>
                        if (loading || !data) return <h1>LOADING</h1>;

                        return (
                            <ul>
                                {data[query].map(({ name, id }: any) => (
                                    <li key={id}>
                                        <Link to={`/thing/${id}`}>{name}</Link>
                                    </li>))}
                            </ul>
                        )
                    }}
                </Query>

            </div>
        )
    }
}