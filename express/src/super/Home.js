import React, {Component, Fragment} from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import LinkService from 'services/LinkService';
import {Query, } from 'react-apollo';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class Router extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    LinkService.feed().then((response) => {
      console.log(response);
    });
  };

  render() {
    // const {getFieldDecorator} = this.props.form;

    return (
      <Fragment>
        Home
        <Query query={FEED_QUERY}>
          {({loading, error, data}) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;
            return (
              <div>
                {data.feed.links.map((link) => (
                  <div key={link.id}>{link.url}</div>
                ))}
              </div>
            );
          }}
        </Query>
        {/* <Form>
          <Row>
            <Col>
              <Form.Item label='URL'>{getFieldDecorator('url')(<Input />)}</Form.Item>
              <Form.Item label='Description'>{getFieldDecorator('description')(<Input />)}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button>Post</Button>
            </Col>
          </Row>
        </Form> */}
      </Fragment>
    );
  }
}

export default Form.create(Router);
