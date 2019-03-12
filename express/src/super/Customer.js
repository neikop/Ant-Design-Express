import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class Router extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        Customer
        <div>
          <Link to='/customer/create'>Create</Link>
        </div>
        <div>
          <Link to='/customer/100/update'>Update</Link>
        </div>
      </Fragment>
    );
  }
}

export default Router;
