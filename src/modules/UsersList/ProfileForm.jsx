import React from 'react';
import { Button, Row, Col, Drawer, Form, Icon, Input, Select, DatePicker, message, Steps } from 'antd';
import { observer, inject } from 'mobx-react';
import OrganizationServices from '../../services/OrganizationServices';
const { Option } = Select;
const { Step } = Steps;

const stepFields = {
  1: ["firstName", "lastName", "gender", "dob", "address"],
  2: ["email", "phone", "username", "password"],
  3: ["role", "department", "designation", "branch", "manager"]
};

@inject('organization')
@observer
class ProfileForm extends React.Component {
  state = { saving: false, current: 0 };

  componentDidMount() { }

  next() {
    this.props.form.validateFields(stepFields[this.state.current + 1], (err, values) => {
      if (!err) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    })
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ saving: true });
    setTimeout(() => {
      this.props.form.validateFields((err, values) => {
        this.setState({ saving: false });
        let data = Object.assign({}, values, {
          createdBy: { id: 1 },
          designation: values.designation ? { id: values.designation } : undefined,
          role: values.role ? { id: values.role } : undefined,
          branch: values.branch ? { id: values.branch } : undefined,
          department: values.department ? { id: values.department } : undefined,
          manager: values.manager ? { id: values.manager } : undefined
        });

        var formData = new FormData();
        formData.append('user', JSON.stringify(data));

        OrganizationServices.registerUser(formData).then((r) => {
          if (r.type == 'error') {
            message.warning(r.message)
          } else {
            message.success(r.message)
          }
        }).catch((e) => {
          message.warning(e.message)
        });
      });
    }, 500);
  };

  onChange = current => {
    if (current < this.state.current) { // they can go back steps
      this.setState({ current });
    } else {
      this.props.form.validateFields(stepFields[this.state.current + 1], (err, values) => {
        if (!err) {
          this.setState({ current });
        }
      })
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let { organization: { users, roles, departments, branches, designations } } = this.props;
    const { current } = this.state;

    const steps = [
      {
        title: 'Basic Info',
        content: <div><Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name">
              {getFieldDecorator('firstName', {
                preserve: true,
                rules: [{ required: true, message: 'Please enter first name' }]
              })(<Input placeholder="Please enter first name" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name">
              {getFieldDecorator('lastName', {
                preserve: true,
                rules: [{ required: true, message: 'Please enter last name' }]
              })(<Input placeholder="Please enter last name" />)}
            </Form.Item>
          </Col>
        </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Gender">
                {getFieldDecorator('gender', {
                  preserve: true,
                  rules: [{ required: true, message: 'Please select the gender' }]
                })(
                  <Select placeholder="Please choose the gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date of Birth">
                {getFieldDecorator('dob', {
                  preserve: true,
                  rules: [{ required: true, message: 'Please select Date of Birth' }]
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Address">
                {getFieldDecorator('address', {
                  preserve: true,
                  rules: [
                    {
                      required: true,
                      message: 'Enter the address'
                    }
                  ]
                })(<Input.TextArea rows={4} placeholder="Please enter the address" />)}
              </Form.Item>
            </Col>
          </Row>
        </div>,
      },
      {
        title: 'Account Info',
        content: <div><Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                preserve: true,
                rules: [{ required: true, message: 'Please enter Email ID' }]
              })(<Input type="email" placeholder="Please enter Email ID" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone">
              {getFieldDecorator('phone', {
                preserve: true,
                rules: [{ required: true, message: 'Please enter the phone number' }]
              })(<Input placeholder="Please enter the phone number" />)}
            </Form.Item>
          </Col>
        </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  preserve: true,
                  rules: [{ required: true, message: 'Please enter the username' }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Please enter the username"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  preserve: true,
                  rules: [{ required: true, message: 'Please enter the password' }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    autoComplete="no"
                    placeholder="Please enter the password"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>,
      },
      {
        title: 'Organization',
        content: <div><Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Role">
              {getFieldDecorator('role', {
                preserve: true,
                rules: [{ required: true, message: 'Please select the role' }]
              })(
                <Select placeholder="Please select the role">
                  {roles && roles.map((role) => <Option value={role.id}>{role.name}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Department">
              {getFieldDecorator('department', {
                preserve: true,
                rules: [{ required: true, message: 'Please select the department' }]
              })(
                <Select placeholder="Please select the department">
                  {departments &&
                    departments.map((department) => (
                      <Option value={department.id}>{department.name}</Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Branch">
                {getFieldDecorator('branch', {
                  preserve: true,
                  rules: [{ required: true, message: 'Please select the branch' }]
                })(
                  <Select placeholder="Please select the branch">
                    {branches &&
                      branches.map((branch) => <Option value={branch.id}>{branch.name}</Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Designation">
                {getFieldDecorator('designation', {
                  preserve: true,
                  rules: [{ required: true, message: 'Please select designation' }]
                })(
                  <Select placeholder="Please select the designation">
                    {designations &&
                      designations.map((designation) => (
                        <Option value={designation.id}>{designation.name}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>

            <Col span={12}>
              <Form.Item label="Manager">
                {getFieldDecorator('manager', {
                  preserve: true
                })(
                  <Select placeholder="Please select the manager">
                    {users &&
                      users.map((user) => <Option value={user.id}>{user.firstName}</Option>)}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>,
      },
    ];

    return (
      <Drawer title="Create a new Employee" width={720} onClose={this.props.onClose} visible={this.props.visible}>
        <Form layout="vertical" hideRequiredMark>
          <Steps progressDot onChange={this.onChange} current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">

          </div>
        </Form>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right'
          }}
        >
          <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
            Cancel
					</Button>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              loading={this.state.saving}
              htmlType="submit"
              onClick={() => { this.handleSubmit(); message.success('Saving user !') }}
              className="login-form-button"
              type="primary"
            >Submit</Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </Drawer>
    );
  }
}

export default Form.create()(ProfileForm);
