import React, {Component, Fragment} from 'react';
import {Query, Mutation} from 'react-apollo';
import {Row, Col, Form, Input, Button, Icon, Popover} from 'antd';
import {creator} from 'instances/ApolloClient';
import {alertAgent} from 'instances/Alert';
import {storageAgent} from 'agents/LocalStorage';

const FEED_LINKS = creator.make`
  query FeedLinks($filter: String) {
    feed (skip: 0, filter: $filter) {
      links {
        id createdAt url description
        postedBy { id name }
        votes { id user { id name } }
      }
    }
  }
`;

const POST_LINK = creator.make`
  mutation CreateLink($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id createdAt url description
      postedBy { id name }
      votes { id user { id name } }
    }
  }
`;

const VOTE_LINK = creator.make`
  mutation VoteLink($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes { id user { id name } }
      }
    }
  }
`;

class Router extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {};

  handleClickVote = (linkId, sendRequest) => {
    sendRequest({
      variables: {linkId},
    });
  };

  updateStoreAfterVote = (store, createdVote, linkId) => {
    const query = {
      query: FEED_LINKS,
      variables: {...this.variables},
    };
    const data = store.readQuery(query);

    const votedLink = data.feed.links.find((link) => link.id === linkId);
    votedLink.votes = createdVote.link.votes;

    store.writeQuery({...query, data});
  };

  handleClickPost = (sendRequest) => {
    const {form} = this.props;
    form.validateFields(['url', 'description'], (error, values) => {
      if (!error) {
        sendRequest({
          variables: {
            ...values,
          },
        })
          .then((response) => {
            const {post: link} = response.data;
            alertAgent.success({
              message: 'Create Link',
              description: (
                <div>
                  <div>Successfully: {link.createdAt}</div>
                  <div>URL: {link.url}</div>
                  <div>Description: {link.description}</div>
                </div>
              ),
            });
            form.resetFields(['url', 'description']);
          })
          .catch((error) => {
            alertAgent.error({
              message: 'Login',
              description: error.message,
            });
          });
      }
    });
  };

  handleClickSearch = (refetch) => {
    const {form} = this.props;
    form.validateFields(['filter'], (error, values) => {
      this.variables = {...values};
      refetch({
        ...this.variables,
      });
    });
  };

  updateStoreAfterPost = (store, createdPost) => {
    const query = {
      query: FEED_LINKS,
      variables: {...this.variables},
    };
    const data = store.readQuery(query);

    data.feed.links.unshift(createdPost);

    store.writeQuery({...query, data});
  };

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;

    const isLogin = storageAgent.getAuthToken();

    return (
      <Fragment>
        <Row gutter={30}>
          <Col span={12}>
            <Query query={FEED_LINKS}>
              {({loading, error, data, refetch}) => {
                return (
                  <Form className='wird-form'>
                    <Form.Item label='URL'>{getFieldDecorator('filter')(<Input />)}</Form.Item>
                    <Form.Item>
                      <Button loading={loading} icon='search' onClick={() => this.handleClickSearch(refetch)}>
                        Search
                      </Button>
                    </Form.Item>
                    {loading ? (
                      <div>Fetching</div>
                    ) : error ? (
                      <div>Error</div>
                    ) : (
                      <div>
                        {data.feed.links.map((link) => (
                          <div key={link.id} className='mb-4'>
                            <Mutation
                              mutation={VOTE_LINK}
                              update={(store, {data: {vote}}) => this.updateStoreAfterVote(store, vote, link.id)}>
                              {(sendRequest, {loading}) => (
                                <Button
                                  size='small'
                                  icon='up'
                                  className='mr-4'
                                  disabled={!isLogin}
                                  loading={loading}
                                  onClick={() => this.handleClickVote(link.id, sendRequest)}
                                />
                              )}
                            </Mutation>
                            <span className='text-link'>{link.url}</span>
                            <Popover
                              trigger='click'
                              content={link.votes.map((vote) => (
                                <div key={vote.id}>{vote.user.name}</div>
                              ))}>
                              <Icon type='like' className='mx-4' />
                            </Popover>
                            {link.votes.length}
                            {link.postedBy && <span> - by {link.postedBy.name}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form>
                );
              }}
            </Query>
          </Col>
          <Col span={12}>
            <Form className='wird-form'>
              <Row gutter={15}>
                <Col>
                  <Form.Item label='URL'>
                    {getFieldDecorator('url', {
                      rules: [{required: true, message: 'Required field: URL'}],
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label='Description'>
                    {getFieldDecorator('description', {
                      rules: [{required: true, message: 'Required field: Description'}],
                    })(<Input />)}
                  </Form.Item>

                  <Mutation
                    mutation={POST_LINK}
                    update={(store, {data: {post}}) => this.updateStoreAfterPost(store, post)}>
                    {(sendRequest, {loading}) => (
                      <Button
                        icon='fire'
                        type='primary'
                        loading={loading}
                        onClick={() => this.handleClickPost(sendRequest)}>
                        Post
                      </Button>
                    )}
                  </Mutation>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Form.create()(Router);
