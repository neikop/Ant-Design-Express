import React, {Component, Fragment} from 'react';
import SortableTree, {changeNodeAtPath, removeNodeAtPath, getFlatDataFromTree} from 'react-sortable-tree';
import {Select, Button, Input, Form, Icon, Checkbox} from 'antd';

const responseMap = {
  1: [{answer: '1-6'}, {answer: '7-8'}, {answer: '9-10'}],
  2: [{answer: 'Mọi thứ rất tốt'}, {answer: 'Bình thường'}, {answer: 'Tư vấn chưa nhiệt tình'}],
  3: [{answer: 'Hài lòng'}, {answer: 'Không hài lòng'}],
  4: [{answer: 'Hài lòng'}, {answer: 'Không hài lòng'}],
};

class Router extends Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      treeData: [
        {
          id: 'q1',
          title: 'Cho em hỏi anh/chị có hài lòng sau khi mua hàng của Phong Vũ không ạ?',
          isQuestion: true,
          expanded: true,
          children: [
            {
              id: 'answer1',
              title: 'Hài lòng',
              isAnswer: true,
              children: [
                {
                  id: 2,
                  title: 'Anh/chị có sẵn lòng giới thiệu bạn bè và người thân đến mua hàng Phong Vũ không ạ?',
                  isQuestion: true,
                  expanded: true,
                  children: [
                    {
                      id: 'answer2',
                      title: 'Sẽ giới thiệu, không có ý kiến',
                      isAnswer: true,
                      children: [
                        {
                          id: 3,
                          title:
                            'Nếu chấm theo thang điểm từ 1 -> 10 thì mức độ sẵn sàng giới thiệu Phong Vũ của anh/chị là bao nhiêu điểm ạ?',
                          isQuestion: true,
                          expanded: true,
                          children: [
                            {
                              id: 'answer3',
                              title: '9 - 10 điểm',
                              isAnswer: true,
                              children: [
                                {
                                  id: 4,
                                  title: 'Điều gì ở Phong Vũ khiến anh chị tin tưởng như vậy?',
                                  isQuestion: true,
                                  expanded: true,
                                  children: [
                                    {
                                      id: 'answer4',
                                      title: 'Chất lượng phụng vụ tốt',
                                      isAnswer: true,
                                      children: [
                                        {
                                          id: 5,
                                          title: 'Anh chị có ấn tượng nhất bạn nhân viên nào không ạ?',
                                          isQuestion: true,
                                          expanded: true,
                                          children: [
                                            {
                                              id: 'answer5',
                                              isAnswer: true,
                                              isTextField: true,
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      id: 'answer6',
                                      title: 'Không có ý kiến',
                                      isAnswer: true,
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: 'answer7',
                              title: '1 - 8 điểm',
                              isAnswer: true,
                              children: [
                                {
                                  id: 6,
                                  title:
                                    'Anh/chị có góp ý gì để Phong Vũ cải thiện chất lượng phục vụ tốt hơn không ạ?',
                                  isQuestion: true,
                                  expanded: true,
                                  children: [
                                    {
                                      id: 'answer8',
                                      isAnswer: true,
                                      isTextField: true,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'answer9',
                      title: 'Không giới thiệu đâu',
                      isAnswer: true,
                      children: [
                        {
                          id: 7,
                          title: 'Anh/chị có góp ý gì để Phong Vũ cải thiện chất lượng phục vụ tốt hơn không ạ?',
                          isQuestion: true,
                          expanded: true,
                          children: [
                            {
                              id: 'answer10',
                              isAnswer: true,
                              isTextField: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'answer11',
              title: 'Không hài lòng',
              isAnswer: true,
              children: [
                {
                  id: 8,
                  title: 'Vậy có điều gì làm anh/chị chưa hài lòng khi mua hàng ở Phong Vũ ạ?',
                  isQuestion: true,
                  expanded: true,
                  children: [
                    {
                      id: 'answer12',
                      isAnswer: true,
                      isTextField: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }

  handleImportQuestion = () => {
    const {form} = this.props;
    form.validateFields(['question', 'response'], (error, values) => {
      if (!error) {
        const responseGroup = responseMap[values.response] || [];
        const question = {
          title: values.question,
          isQuestion: true,
          expanded: true,
          children: responseGroup.map((item) => ({
            title: item.answer,
            isAnswer: true,
          })),
        };

        this.setState((state) => ({
          import: false,
          treeData: [...state.treeData, question],
        }));
      }
    });
  };

  render() {
    const {form} = this.props;
    const values = form.getFieldsValue();
    const responseGroup = responseMap[values.response] || [];
    return (
      <Fragment>
        <div>
          {this.state.import && (
            <Button className='mr-4' onClick={this.handleImportQuestion}>
              Thêm
            </Button>
          )}
          <Button
            onClick={() => {
              console.log(
                getFlatDataFromTree({
                  treeData: this.state.treeData,
                  getNodeKey: ({node}) => node.id,
                  ignoreCollapsed: false,
                }),
              );
              this.setState((state) => ({import: !state.import}));
            }}>
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
                    <div className='rst__rowLabel' style={{width: '100%'}}>
                      <span className='rst__rowTitle'>
                        <Form.Item className='mb-0 ant-form-item-no-explain'>
                          {form.getFieldDecorator('question', {
                            rules: [{required: true, message: ' '}],
                          })(<Input />)}
                        </Form.Item>
                      </span>
                    </div>
                    <Form.Item className='mb-0 ant-form-item-no-explain'>
                      {form.getFieldDecorator('response', {
                        rules: [{required: true, message: ' '}],
                      })(
                        <Select style={{width: 360}} className='text-right' allowClear>
                          <Select.Option value={1}>Điểm đánh giá</Select.Option>
                          <Select.Option value={2}>Kết quả đánh giá tư vấn hỗ trợ</Select.Option>
                          <Select.Option value={3}>Mức độ hài lòng khi mua hàng/sử dụng dịch vụ</Select.Option>
                          <Select.Option value={4}>Mức độ hài lòng</Select.Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            {responseGroup.map((response, index) => (
              <div key={index} style={{marginLeft: 88, height: 56, width: 360}}>
                <div className='rst__rowWrapper'>
                  <div className='rst__row'>
                    <div className='rst__rowContents rst__rowContentsDragDisabled'>
                      <div className='rst__rowLabel'>
                        <span className='rst__rowTitle'>{response.answer}</span>
                      </div>
                      <div className='rst__rowToolbar' />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <SortableTree
          treeData={this.state.treeData}
          onChange={(treeData) => this.setState({treeData})}
          canDrag={({node}) => node.isQuestion}
          canDrop={({nextParent}) => !nextParent || nextParent.isAnswer}
          getNodeKey={({node}) => node.id}
          generateNodeProps={({node, path, treeIndex}) => {
            let Control = null;
            if (node.isQuestion) {
              Control = () => {
                const {questions} = this.state;
                const isPlus = questions[node.id];
                return (
                  <div>
                    <Icon
                      type={isPlus ? 'minus-circle' : 'plus-circle'}
                      className='text-link'
                      onClick={() => {
                        if (isPlus) {
                          questions[node.id] = 0;
                          node.children.splice(-1, 1);
                        } else {
                          questions[node.id] = 1;
                          node.children.push({
                            id: 'x',
                            isAnswer: true,
                            isTextField: true,
                            isChecked: true,
                          });
                        }
                        this.setState((state) => ({
                          questions,
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path,
                            newNode: node,
                            getNodeKey: ({node}) => node.id,
                            ignoreCollapsed: false,
                          }),
                        }));
                      }}
                    />
                    <Icon
                      type='close-circle'
                      className='text-link-orange ml-4'
                      onClick={() => {
                        this.setState((state) => ({
                          questions,
                          treeData: removeNodeAtPath({
                            treeData: state.treeData,
                            path,
                            getNodeKey: ({node}) => node.id,
                            ignoreCollapsed: false,
                          }),
                        }));
                      }}
                    />
                  </div>
                );
              };
            } else if (node.isAnswer) {
              Control = () => {
                return (
                  <div>
                    <Form.Item className='mb-0'>
                      <Input />
                    </Form.Item>
                    <Checkbox
                      checked={node.isChecked}
                      onChange={(event) => {
                        node.isChecked = event.target.checked;

                        this.setState((state) => ({
                          treeData: changeNodeAtPath({
                            treeData: state.treeData,
                            path,
                            newNode: node,
                            getNodeKey: ({node}) => node.id,
                            ignoreCollapsed: false,
                          }),
                        }));
                      }}
                    />
                  </div>
                );
              };
            }
            return {
              buttons: [<Control />],
              className: node.isTextField ? 'rst__answer-text-field' : 'rst__answer-text-label',
            };
          }}
        />
      </Fragment>
    );
  }
}

export default Form.create()(Router);
