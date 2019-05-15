import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import BigMessage from './BigMessage';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const StyledElement = styled.article`
    overflow: hidden;
    background: #FFF;
    box-sizing: border-box;
    box-shadow: #000000bd 0 0 3px;
    border-radius: .3em;
    margin: 1em;
    display: inherit;
    height: fit-content;
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,  minmax(30em, 1fr));
`;

const StyledCreatorImg = styled.img`
    border-radius: 100%;
    height: 1.5em;
    margin-right: .3em;
`;

export default class Thing extends Component<any, any> {

    get query(): DocumentNode {
        return gql`{
            thing(id: ${this.props.match.params.id}) {
                id,
                name,
                creator {
                    name,
                    thumbnail
                },
                details,
                description_html,
                thumbnail,
                like_count,
                file_count,
                download_count,
                view_count,
                public_url
            }
        }`
    }

    render() {
        return (
            <Query query={this.query}>
                {({ loading, error, data: { thing } }: any) => {
                    if (error) return <BigMessage text="Error! 🚨" />;
                    if (loading || !thing) return <BigMessage text="Loading... ⌛" />;

                    return (
                        <div>
                            <ReactTooltip />
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ marginBottom: 0 }}>{thing.name}</h1>
                                <h2 style={{ maxWidth: '30em', margin: '0 auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <StyledCreatorImg src={thing.creator.thumbnail} />
                                        <p style={{ display: 'inline-block' }}>{thing.creator.name}</p>
                                    </div>
                                </h2>
                            </div>
                            <StyledGrid>
                                <StyledElement>
                                    <img src={thing.thumbnail.replace('thumb_medium', 'display_large')} style={{ maxWidth: '100%' }} />
                                    <p style={{ margin: '1em', display: 'flex', justifyContent: 'space-between' }}>
                                        <span data-tip="Likes">
                                            ❤️ {thing.like_count}
                                        </span>
                                        <span data-tip="Files">
                                            📂 {thing.file_count}
                                        </span>
                                        <span data-tip="Downloads">
                                            📩 {thing.download_count}
                                        </span>
                                        <span data-tip="Views">
                                            👀 {thing.view_count}
                                        </span>
                                    </p>
                                    <p style={{ margin: '0 1em .4em', textAlign: 'right' }}>
                                        <a href={thing.public_url} target="_blank">Watch in Thingiverse</a>
                                    </p>
                                </StyledElement>
                                <StyledElement style={{ padding: '.7em' }} dangerouslySetInnerHTML={{ __html: thing.description_html }} />
                            </StyledGrid>
                            <StyledElement style={{ padding: '.7em' }} dangerouslySetInnerHTML={{ __html: thing.details }} />
                        </div>
                    )
                }
                }
            </Query >
        )
    }
}