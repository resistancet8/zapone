import React from 'react';
import { Button, Row, Col, Drawer, Form, Icon, Input, Select, message } from 'antd';
import { observer, inject } from 'mobx-react';
import OrganizationServices from '../../services/OrganizationServices';
const { Option } = Select;

@inject('organization')
@observer
class AdminForm extends React.Component {
	state = { saving: false, current: 0 };

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ saving: true });
		setTimeout(() => {
			this.props.form.validateFields((err, values) => {
				if (!err) {
					this.setState({ saving: false });
					let data = Object.assign({}, values, {
						createdBy: { id: 1 },
						branch: values.branch ? { id: values.branch } : undefined,
						role: { id: 874629872424346 }
					});

					var formData = new FormData();
					formData.append('user', JSON.stringify(data));

					OrganizationServices.registerUser(formData)
						.then((r) => {
							if (r.type == 'error') {
								message.warning(r.message);
							} else {
                this.props.form.resetFields();
                this.props.closeDrawer('visibleAdminForm')
								message.success(r.message);
							}
						})
						.catch((e) => {
							message.warning(e.message);
						});
        }
        
        this.setState({ saving: false });
			});
		}, 500);
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		let { organization: { branches } } = this.props;

		return (
			<Drawer
				title="Create a new Admin"
				width={720}
				placement="left"
				onClose={(e) => this.props.closeDrawer('visibleAdminForm')}
				visible={this.props.visible}
			>
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="First Name">
								{getFieldDecorator('firstName', {
									preserve: true,
									rules: [ { required: true, message: 'Please enter first name' } ]
								})(<Input placeholder="Please enter first name" />)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Last Name">
								{getFieldDecorator('lastName', {
									preserve: true,
									rules: [ { required: true, message: 'Please enter last name' } ]
								})(<Input placeholder="Please enter last name" />)}
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Email">
								{getFieldDecorator('email', {
									preserve: true,
									rules: [ { required: true, message: 'Please enter Email ID' } ]
								})(<Input type="email" placeholder="Please enter Email ID" />)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Phone">
								{getFieldDecorator('phone', {
									preserve: true,
									rules: [ { required: true, message: 'Please enter the phone number' } ]
								})(<Input placeholder="Please enter the phone number" />)}
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Username">
								{getFieldDecorator('username', {
									preserve: true,
									rules: [ { required: true, message: 'Please enter the username' } ]
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
									rules: [ { required: true, message: 'Please enter the password' } ]
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
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Branch">
								{getFieldDecorator('branch', {
									preserve: true,
									rules: [ { required: true, message: 'Please select the branch' } ]
								})(
									<Select placeholder="Please select the branch">
										{branches &&
											branches.map((branch) => <Option value={branch.id}>{branch.name}</Option>)}
									</Select>
								)}
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
						textAlign: 'right'
					}}
				>
					<Button onClick={(e) => this.props.closeDrawer('visibleAdminForm')} style={{ marginRight: 8 }}>
						Cancel
					</Button>
					<Button
						loading={this.state.saving}
						htmlType="submit"
						onClick={(e) => {
							this.handleSubmit(e);
						}}
						className="login-form-button"
						type="primary"
					>
						Submit
					</Button>
				</div>
			</Drawer>
		);
	}
}

export default Form.create()(AdminForm);
