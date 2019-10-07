import React from 'react';
import { Button, Row, Col, Drawer, Form, Icon, Input, Select, DatePicker, message } from 'antd';
import { observer, inject } from 'mobx-react';
import OrganizationServices from '../../services/OrganizationServices';
const { Option } = Select;

@inject('organization')
@observer
class ProfileForm extends React.Component {
	state = { saving: false };

	componentDidMount() {}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ saving: true });
		setTimeout(() => {
			this.props.form.validateFields((err, values) => {
				if (!err) {
				} else {
				}
				this.setState({ saving: false });
				let data = Object.assign({}, values, {
					createdBy: { id: 1 },
					designation: values.designation ? { id: values.designation }: undefined,
					role: values.role ? { id: values.role }: undefined,
					branch: values.branch ? { id: values.branch }: undefined,
					department: values.department ? { id: values.department }: undefined,
					manager: values.manager ? { id: values.manager }: undefined
				});

				var formData = new FormData();
				formData.append('user', JSON.stringify(data));

				OrganizationServices.registerUser(formData).then((r) => {
          if(r.type == 'error') {
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

	render() {
		const { getFieldDecorator } = this.props.form;
		let { organization: { users, roles, departments, branches, designations } } = this.props;

		return (
			<Drawer title="Create a new Employee" width={720} onClose={this.props.onClose} visible={this.props.visible}>
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="First Name">
								{getFieldDecorator('firstName', {
									rules: [ { required: true, message: 'Please enter first name' } ]
								})(<Input placeholder="Please enter first name" />)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Last Name">
								{getFieldDecorator('lastName', {
									rules: [ { required: true, message: 'Please enter last name' } ]
								})(<Input placeholder="Please enter last name" />)}
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Username">
								{getFieldDecorator('username', {
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
							<Form.Item label="Email">
								{getFieldDecorator('email', {
									rules: [ { required: true, message: 'Please enter Email ID' } ]
								})(<Input type="email" placeholder="Please enter Email ID" />)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Phone">
								{getFieldDecorator('phone', {
									rules: [ { required: true, message: 'Please enter the phone number' } ]
								})(<Input placeholder="Please enter the phone number" />)}
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Gender">
								{getFieldDecorator('gender')(
									<Select placeholder="Please choose the gender">
										<Option value="male">Male</Option>
										<Option value="female">Female</Option>
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Date of Birth">
								{getFieldDecorator('dob')(
									<DatePicker
										style={{ width: '100%' }}
										getPopupContainer={(trigger) => trigger.parentNode}
									/>
								)}
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Role">
								{getFieldDecorator('role', {
									rules: [ { required: true, message: 'Please select the role' } ]
								})(
									<Select placeholder="Please select the role">
										{roles && roles.map((role) => <Option value={role.id}>{role.name}</Option>)}
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Department">
								{getFieldDecorator('department')(
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
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="Designation">
								{getFieldDecorator('designation')(
									<Select placeholder="Please select the designation">
										{designations &&
											designations.map((designation) => (
												<Option value={designation.id}>{designation.name}</Option>
											))}
									</Select>
								)}
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Manager">
								{getFieldDecorator('manager')(
									<Select placeholder="Please select the manager">
										{users &&
											users.map((user) => <Option value={user.id}>{user.firstName}</Option>)}
									</Select>
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
											message: 'Enter the address'
										}
									]
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
						textAlign: 'right'
					}}
				>
					<Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
						Cancel
					</Button>
					<Button
						style={{ background: '#003366' }}
						loading={this.state.saving}
						htmlType="submit"
						onClick={this.handleSubmit}
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

export default Form.create()(ProfileForm);
