import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import styled from 'styled-components';
import ListThing from './ListThing';
import BigMessage from './BigMessage';

const StyledGrid = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-end;
`;

export default class Things extends Component<any, any> {

    getGQL(query: string): DocumentNode {
        return gql`{
            ${query} {
                id,
                name,
                thumbnail,
                creator {
                    name,
                    thumbnail
                }
            }
        }`
    }

    render() {
        const query = this.props.type;
        return (
            <div>
                <Query query={this.getGQL(query)}>
                    {({ loading, error, data }: any) => {
                        if (error) return <BigMessage text="Error! 🚨" />;
                        if (loading || !data) return <BigMessage text="Loading... ⌛️" />;

                        return (
                            <StyledGrid>
                                {data[query].map(({ name, id, thumbnail, creator }: any) =>
                                    <ListThing
                                        key={id}
                                        id={id}
                                        name={name}
                                        creator={creator}
                                        thumbnail={thumbnail} />)}
                            </StyledGrid>
                        )
                    }}
                </Query>

            </div>
        )
    }
}