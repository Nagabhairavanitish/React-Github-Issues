import React, { Component } from 'react';
import './App.css';
import { gql, graphql } from 'react-apollo';

class App extends Component {

  renderEl(nodes) {
    if (nodes.title) {
      const bodyText = nodes.bodyText.substring(0,250);
      return (
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">{nodes.title}</h4>
            <p className="card-text">
            <div className="row">
              <div className="col-3">
                <img className="avatar" alt="avatar" src={nodes.author.avatarUrl}/>
              </div>
              <div className="col-9 bodyText">
                {bodyText} - <a href={nodes.url}>Read More</a>
              </div>
            </div>
            </p>
            <p><b>Created at: </b>{nodes.createdAt}</p>
          </div>
        </div>
      );
    }
  }
  render() {
    const { loading, error, search } = this.props;
    if (loading) return <div>Loading</div>;
    if (error) return <h1>Error</h1>;
    return (
      <div>
      <h2>Javascript Issues</h2>
      {search.nodes.map(nodes => (
        this.renderEl(nodes)
    ))}
    </div>

    );
  }
}

const FeedQuery = gql`
{
  search(query: "language:JavaScript", type: ISSUE, first: 20) {
    nodes {
      ... on Issue {
        createdAt
        title
        url
        bodyText
        repository {
          url
        }
        author {
          avatarUrl
          url
        }
      }
    }
  }
}
`

const FeedWithData = graphql(FeedQuery,
  {props: ({ data }) => ({ ...data })
  , options: { pollInterval: 25000 }
})(App);


export default FeedWithData;
