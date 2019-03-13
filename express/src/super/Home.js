import React, {Component, Fragment} from 'react';
import {Query, Mutation} from 'react-apollo';
import {Row, Col, Form, Input, Button, Icon, Popover} from 'antd';
import {creator} from 'instances/ApolloClient';
import {alertAgent} from 'instances/Alert';
import {storageAgent} from 'agents/LocalStorage';
import {timeAgent} from 'agents/Time';

const FEED_LINKS = creator.make`
  query FeedLinks {
    feed (skip: 50) {
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
      id link {
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
    const data = store.readQuery({query: FEED_LINKS});

    const votedLink = data.feed.links.find((link) => link.id === linkId);
    votedLink.votes = createdVote.link.votes;

    store.writeQuery({query: FEED_LINKS, data});
  };

  handleClickPost = (sendRequest) => {
    const {form} = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        sendRequest({
          variables: {
            ...values,
          },
        }).then((response) => {
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
          form.resetFields();
        });
      }
    });
  };

  updateStoreAfterPost = (store, createdPost) => {
    const data = store.readQuery({query: FEED_LINKS});

    data.feed.links.unshift(createdPost);

    store.writeQuery({query: FEED_LINKS, data});
  };

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;

    const isLogin = storageAgent.getAuthToken();

    return (
      <Fragment>
        <Row>
          <Col span={12}>
            <Query query={FEED_LINKS}>
              {({loading, error, data}) => {
                if (loading) return <div>Fetching</div>;
                if (error) return <div>Error</div>;
                return (
                  <div>
                    {data.feed.links.map((link) => (
                      <div key={link.id} className='mb-4'>
                        {isLogin && (
                          <Mutation
                            mutation={VOTE_LINK}
                            update={(store, {data: {vote}}) => this.updateStoreAfterVote(store, vote, link.id)}>
                            {(sendRequest, {loading}) => (
                              <Button
                                size='small'
                                icon='up'
                                className='mr-4'
                                loading={loading}
                                onClick={() => this.handleClickVote(link.id, sendRequest)}
                              />
                            )}
                          </Mutation>
                        )}
                        <span className='text-link'>{link.url}</span>
                        <Popover
                          trigger='click'
                          content={link.votes.map((vote) => (
                            <div key={vote.id}>{vote.user.name}</div>
                          ))}>
                          <Icon type='like' className='mx-4' />
                        </Popover>
                        {link.votes.length}
                        <span> - created {timeAgent.timeDifferenceForDate(link.createdAt)}</span>
                        {link.postedBy && <span> - by {link.postedBy.name}</span>}
                      </div>
                    ))}
                  </div>
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
