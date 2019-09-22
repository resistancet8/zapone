import React, { Component } from "react"
import { Form, Icon, Input, Button, Checkbox, Avatar, message } from 'antd';
import LoginHeader from '../../globals/components/loginHeader/LoginHeader'
import './Login.scss';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import RequestService from '../../services/RequestServices';

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.globals.setLogin(true)
                RequestService.login({ username: values.username, password: values.password }).then(resp => {
                    this.props.globals.setUserInfo(resp.result)
                    this.props.history.push('/dashboard')
                }).catch(err =>
                    message.error('User Not Found')
                )
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <LoginHeader />
                <div className="login">
                    <div className="login-card">
                        <Avatar size={64} icon="user" />
                        <div className="login-title">
                            Sign in
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <div className="forgot-rem">
                                        <Checkbox>Remember me</Checkbox>
                                        {/* <a className="login-form-forgot" href="">
                                            Forgot password ?
                                    </a> */}
                                    </div>
                                )}
                                <div className="reg-submit">
                                    <a href="/">Register now!</a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Sign in
                                </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Form.create()(inject('globals')(withRouter(observer(Login))));