import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import styled from 'styled-components';
import ListThing from './ListThing';

const StyledGrid = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-end;

`

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
        const query = this.props.type;
        return (
            <div>
                <Query query={this.getGQL(query)}>
                    {({ loading, error, data }: any) => {
                        if (error) return <h1> ERROR!</h1>
                        if (loading || !data) return <h1>LOADING</h1>;

                        return (
                            <StyledGrid>
                                {data[query].map(({ name, id, thumbnail }: any) =>
                                    <ListThing
                                        key={id}
                                        name={name}
                                        id={id}
                                        thumbnail={thumbnail} />)}
                            </StyledGrid>
                        )
                    }}
                </Query>

            </div>
        )
    }
}