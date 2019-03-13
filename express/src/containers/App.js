import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Layout} from 'antd';
import AppRouter from 'components/AppRouter';
import AppHeader from 'components/AppHeader';
import MenuSidebar from 'components/MenuSidebar';
import Breadcrumb from 'components/Breadcrumb';
import './App.css';

const {Footer, Sider, Content} = Layout;

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChangeCallapse = (collapsed) => {
    this.setState({collapsed});
  };

  render() {
    const {collapsed} = this.state;
    return (
      <Layout>
        <Sider width={240} collapsible collapsed={collapsed} onCollapse={this.handleChangeCallapse}>
          <div className='logo' />
          <MenuSidebar />
        </Sider>
        <Layout>
          <AppHeader />
          <Content>
            <Breadcrumb />
            <AppRouter />
          </Content>
          <Footer>Ant Design Basic ©2019 Created by Neikop</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
