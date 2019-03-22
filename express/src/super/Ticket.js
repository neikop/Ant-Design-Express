import React, {Component, Fragment} from 'react';
import SortableTree from 'react-sortable-tree';
import {Select, Button, Icon} from 'antd';

class Router extends Component {
  constructor() {
    super();
    this.state = {
      treeData: [
        {
          title: 'Question 1',
          isQuestion: true,
          children: [
            {
              title: 'Answer A',
              isAnswer: true,
            },
            {
              title: 'Answer B',
              isAnswer: true,
            },
          ],
        },
        {
          title: 'Question 2',
          isQuestion: true,
          children: [
            {
              title: 'Answer C',
              isAnswer: true,
            },
            {
              title: 'Answer D',
              isAnswer: true,
            },
          ],
        },
        {
          title: 'Question 3',
          isQuestion: true,
          children: [
            {
              title: 'Answer E',
              isAnswer: true,
            },
            {
              title: 'Answer F',
              isAnswer: true,
            },
          ],
        },
        {
          title: 'Question 4',
          isQuestion: true,
          children: [
            {
              title: 'Answer G',
              isAnswer: true,
            },
            {
              title: 'Answer H',
              isAnswer: true,
            },
          ],
        },
      ],
    };
  }

  render() {
    console.log(this.state.import);
    return (
      <Fragment>
        <div>
          <Button onClick={() => this.setState((state) => ({import: !state.import}))}>
            {this.state.import ? 'Hủy' : 'Thêm'}
          </Button>
        </div>
        {this.state.import && (
          <div>
            <div style={{marginLeft: 44, height: 64}}>
              <div className='rst__rowWrapper'>
                <div className='rst__row'>
                  <div className='rst__moveHandle' />
                  <div className='rst__rowContents'>
                    <div className='rst__rowLabel'>
                      <span className='rst__rowTitle'>...</span>
                    </div>
                    <Select style={{width: 240}} className='text-right' />
                  </div>
                </div>
              </div>
            </div>
            <div style={{marginLeft: 88, height: 56}}>
              <div className='rst__rowWrapper'>
                <div className='rst__row'>
                  <div className='rst__rowContents rst__rowContentsDragDisabled'>
                    <div className='rst__rowLabel'>
                      <span className='rst__rowTitle'>Answer A</span>
                    </div>
                    <div className='rst__rowToolbar' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <SortableTree
          treeData={this.state.treeData}
          onChange={(treeData) => this.setState({treeData})}
          canDrag={({node}) => node.isQuestion}
          canDrop={({nextParent}) => !nextParent || nextParent.isAnswer}
          rowHeight={({node}) => (node.isAnswer ? 56 : 64)}
        />
      </Fragment>
    );
  }
}

export default Router;
