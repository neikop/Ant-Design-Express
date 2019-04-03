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
        Campaign Create
        <div>
          <Link to='/campaign/update/1'>Update</Link>
        </div>
      </Fragment>
    );
  }
}

export default Router;
