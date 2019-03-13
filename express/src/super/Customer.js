import React, {Component, Fragment} from 'react';
import {Mutation} from 'react-apollo';
import {Row, Col, Form, Input, Button} from 'antd';
import {browserHistory} from 'instances/History';
import {creator} from 'instances/ApolloClient';
import {alertAgent} from 'instances/Alert';
import {storageAgent} from 'agents/LocalStorage';

const LOGIN = creator.make`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;

const REGISTER = creator.make`
  mutation Register($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

class Router extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClickLogin = (sendRequest) => {
    const {form} = this.props;
    form.validateFields(['email', 'password'], (error, values) => {
      if (!error) {
        sendRequest({
          variables: {
            ...values,
          },
        })
          .then((response) => {
            alertAgent.success({
              message: 'Login',
              description: 'Successfully',
            });
            form.resetFields();

            const {login} = response.data;
            storageAgent.setAuthToken(login.token);
            storageAgent.setActiveUser(login.user);

            browserHistory.push('/');
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

  handleClickRegister = (sendRequest) => {
    const {form} = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        sendRequest({
          variables: {
            ...values,
          },
        })
          .then((response) => {
            alertAgent.success({
              message: 'Register',
              description: 'Successfully',
            });
            form.resetFields();
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

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;

    return (
      <Fragment>
        <Form className='wird-form'>
          <Row>
            <Col span={8} offset={8}>
              <Form.Item label='Email'>
                {getFieldDecorator('email', {
                  rules: [{required: true, message: 'Required field: Email'}],
                })(<Input />)}
              </Form.Item>
              <Form.Item label='Password'>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: 'Required field: Password'}],
                })(<Input type='password' />)}
              </Form.Item>
              <Form.Item label='Name'>
                {getFieldDecorator('name', {
                  rules: [{required: true, message: 'Required field: Name'}],
                })(<Input />)}
              </Form.Item>

              <Row type='flex' justify='space-between'>
                <Mutation mutation={LOGIN}>
                  {(sendRequest, {loading}) => (
                    <Button loading={loading} onClick={() => this.handleClickLogin(sendRequest)}>
                      Login
                    </Button>
                  )}
                </Mutation>
                <Mutation mutation={REGISTER}>
                  {(sendRequest, {loading}) => (
                    <Button loading={loading} onClick={() => this.handleClickRegister(sendRequest)}>
                      Register
                    </Button>
                  )}
                </Mutation>
              </Row>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

export default Form.create()(Router);
