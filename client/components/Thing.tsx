import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export default class Thing extends Component<any, any> {

    get query(): DocumentNode {
        return gql`{
            thing(id: ${this.props.match.params.id}) {
                id,
                name,
                thumbnail
                is_private,
                is_published,
                is_purchased,
                public_url,
                url,
            }
        }`
    }

    render() {
        const id = this.props.match.params.id;
        return (
            <div>
                <h2>Thing Detail {id}</h2>
                <Query query={this.query}>
                    {({ loading, error, data }: any) => {
                        if (error) return <h1> ERROR!</h1>
                        if (loading || !data) return <h1>LOADING ⌛</h1>;

                        return (
                            <h2>{data.thing.name}</h2>
                        )
                    }}
                </Query>

            </div>
        )
    }
}