import React, {Component} from 'react';
import {Layout, Row, Col, Button} from 'antd';
import {browserHistory} from 'instances/History';
import {storageAgent} from 'agents/LocalStorage';

class AppHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClickLogout = () => {
    storageAgent.clear();

    browserHistory.push('/customer');
  };

  handleClickLogin = () => {
    browserHistory.push('/customer');
  };

  render() {
    const activeUser = storageAgent.getActiveUser();
    const isLogin = storageAgent.getAuthToken();

    return (
      <Layout.Header>
        <Row type='flex' justify='end' gutter={15}>
          <Col>Hello {activeUser && activeUser.name}</Col>
          <Col>
            {isLogin ? (
              <Button onClick={this.handleClickLogout}>Logout</Button>
            ) : (
              <Button onClick={this.handleClickLogin}>Login</Button>
            )}
          </Col>
        </Row>
      </Layout.Header>
    );
  }
}

export default AppHeader;
