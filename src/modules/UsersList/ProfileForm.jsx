import React from 'react'
import { List, Button, Skeleton, Row, Col, Typography, Drawer, Form, Icon, Input, Select, DatePicker } from 'antd';
import UsersServices from '../../services/UsersServices';
const { Option } = Select;

class ProfileForm extends React.Component {
  state = { saving: false };

  componentDidMount() {
    UsersServices.getUsers().then(response => {
      this.props.users.addUsersList(response.data)
    })
      .catch(error => {
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ saving: true });
    setTimeout(() => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({ saving: false });
        } else {
          this.setState({ saving: false });
        }
      });
    }, 500);
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Drawer
        title="Create a new Employee"
        width={720}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name">
                {getFieldDecorator('fname', {
                  rules: [{ required: true, message: 'Please enter first name' }],
                })(<Input placeholder="Please enter first name" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name">
                {getFieldDecorator('lname', {
                  rules: [{ required: true, message: 'Please enter last name' }],
                })(<Input placeholder="Please enter last name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Username">
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please enter the username' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Please enter the username" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please enter the password' }],
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Please enter the password" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please enter Email ID' }],
                })(<Input type="email" placeholder="Please enter Email ID" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Please enter the phone number' }],
                })(<Input placeholder="Please enter the phone number" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Gender">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please choose the gender' }],
                })(
                  <Select placeholder="Please choose the gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date of Birth">
                {getFieldDecorator('dob', {
                  rules: [{ required: true, message: 'Date of Birth' }],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Role">
                {getFieldDecorator('role', {
                  rules: [{ required: true, message: 'Please select the role' }],
                })(
                  <Select placeholder="Please select the role">
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Department">
                {getFieldDecorator('department', {
                  rules: [{ required: true, message: 'Please select the department' }],
                })(
                  <Select placeholder="Please select the department">
                    <Option value="accounts">Accounts</Option>
                    <Option value="management">Management</Option>
                    <Option value="technical">Technical</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Designation">
                {getFieldDecorator('designation', {
                  rules: [{ required: true, message: 'Please select the designation' }],
                })(
                  <Select placeholder="Please select the designation">
                    <Option value="developer">Developer</Option>
                    <Option value="hr">HR</Option>
                    <Option value="lead-tester">Lead Tester</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Manager">
                {getFieldDecorator('manager', {
                  rules: [{ required: true, message: 'Please select the manager' }],
                })(
                  <Select placeholder="Please select the manager">
                    <Option value="naveen">Naveen</Option>
                    <Option value="avinash">Avinash</Option>
                    <Option value="dipak">Dipak</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Address">
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: 'Enter the address',
                    },
                  ],
                })(<Input.TextArea rows={4} placeholder="Please enter the address" />)}
              </Form.Item>
            </Col>
          </Row>
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
            textAlign: 'right',
          }}
        >
          <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
            Cancel
            </Button>
          <Button style={{background: '#003366'}} loading={this.state.saving} htmlType="submit" onClick={this.handleSubmit} className="login-form-button" type="primary">
            Submit
            </Button>
        </div>
      </Drawer>)
  }
}

export default Form.create()(ProfileForm);