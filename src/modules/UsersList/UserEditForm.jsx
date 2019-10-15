import React from 'react';
import { Button, Row, Col, Drawer, Form, Icon, Input, Select, DatePicker, message, Steps } from 'antd';
import { observer, inject } from 'mobx-react';
import OrganizationServices from '../../services/OrganizationServices';
import moment from 'moment';
const { Option } = Select;
const { Step } = Steps;

const stepFields = {
	1: [ 'firstName', 'lastName', 'gender', 'birthDate', 'address', 'joiningDate' ],
	2: [ 'email', 'phone' ],
	3: [ 'role', 'department', 'designation', 'branch' ]
};

@inject('organization')
@observer
class UserForm extends React.Component {
	state = { saving: false, current: 0 };

	componentDidMount() {
		let data = {};
		let parsed = JSON.parse(JSON.stringify(this.props.userInfo));

		data = {
			firstName: parsed.firstName,
			lastName: parsed.lastName,
			birthDate: moment(parsed.birthDate, 'DD-MM-YYYY'),
			joiningDate: moment(parsed.joiningDate, 'DD-MM-YYYY'),
			email: parsed.email,
			userName: parsed.userName,
			gender: parsed.gender,
			address: parsed.address,
			phone: parsed.phone,
			role: parsed.role.id,
			department: parsed.department.id,
			designation: parsed.designation.id,
			branch: parsed.branch.id,
			isActive: parsed.isActive ? 'true' : 'false',
			[parsed.manager.id ? 'manager' : undefined]: parsed.manager.id
		};

		this.props.form.setFieldsValue(data);
	}

	next() {
		this.props.form.validateFields(stepFields[this.state.current + 1], (err, values) => {
			if (!err) {
				const current = this.state.current + 1;
				this.setState({ current });
			}
		});
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
				if (!err) {
					let data = Object.assign({}, values, {
						createdBy: { id: 1 },
						id: this.props.userInfo.id,
						designation: values.designation ? { id: values.designation } : undefined,
						role: { id: 874641470499567 },
						branch: values.branch ? { id: values.branch } : undefined,
						department: values.department ? { id: values.department } : undefined,
						manager: values.manager ? { id: values.manager } : undefined,
						birthDate: moment(values.birthDate).format("DD-MM-YYYY"),
						joiningDate: moment(values.joiningDate).format("DD-MM-YYYY"),
						password: this.props.userInfo.password,
						employeeId: this.props.userInfo.employeeId,
						isActive: values.isActive == 'true' ? true : false,
					});

					var formData = new FormData();
					formData.append('user', JSON.stringify(data));

					OrganizationServices.updateUser(formData)
						.then((r) => {
							if (r.type == 'error') {
								message.warning(r.message);
							} else {
								this.props.form.resetFields(); // reset fields
								this.props.closeDrawer('visibleUserEditForm'); // close user form drawer on success
								message.success(r.message);
							}
						})
						.catch((e) => {
							message.warning(e.message);
						});
				} else {
					console.log(err, "+++")
				}

				this.setState({ saving: false });
			});
		}, 500);
	};

	onChange = (current) => {
		if (current < this.state.current) {
			// they can go back steps
			this.setState({ current });
		} else {
			this.props.form.validateFields(stepFields[this.state.current + 1], (err, values) => {
				if (!err) {
					this.setState({ current });
				}
			});
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		let { organization: { users, roles, departments, branches, designations } } = this.props;
		const { current } = this.state;

		const steps = [
			{
				title: 'Basic Info',
				content: (
					<div>
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
								<Form.Item label="Gender">
									{getFieldDecorator('gender', {
										preserve: true,
										rules: [ { required: true, message: 'Please select the gender' } ]
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
									{getFieldDecorator('birthDate', {
										preserve: true,
										rules: [ { required: true, message: 'Please select Date of Birth' } ]
									})(
										<DatePicker
											format="DD-MM-YYYY"
											style={{ width: '100%' }}
											getPopupContainer={(trigger) => trigger.parentNode}
										/>
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Joining Date">
									{getFieldDecorator('joiningDate', {
										preserve: true,
										rules: [ { required: true, message: 'Please select the Joining Date' } ]
									})(
										<DatePicker
											format="DD-MM-YYYY"
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
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item label="Status">
									{getFieldDecorator('isActive', {
										preserve: true
									})(
										<Select placeholder="Status">
											<Option value="true">Enabled</Option>
											<Option value="false">Disabled</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
					</div>
				)
			},
			{
				title: 'Account Info',
				content: (
					<div>
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
									{getFieldDecorator('userName', {
										preserve: true,
										rules: [ { message: 'Please enter the username' } ]
									})(
										<Input
											disabled
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="Please enter the username"
										/>
									)}
								</Form.Item>
							</Col>
						</Row>
					</div>
				)
			},
			{
				title: 'Organization',
				content: (
					<div>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item label="Role">
									{getFieldDecorator('role', {
										preserve: true,
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
									{getFieldDecorator('department', {
										preserve: true,
										rules: [ { required: true, message: 'Please select the department' } ]
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
										rules: [ { required: true, message: 'Please select the branch' } ]
									})(
										<Select placeholder="Please select the branch">
											{branches &&
												branches.map((branch) => (
													<Option value={branch.id}>{branch.name}</Option>
												))}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Designation">
									{getFieldDecorator('designation', {
										preserve: true,
										rules: [ { required: true, message: 'Please select designation' } ]
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
					</div>
				)
			}
		];

		return (
			<Drawer
				title="Create a new Employee"
				placement="left"
				width={720}
				onClose={(e) => {
					this.props.form.resetFields();
					this.props.closeDrawer('visibleUserEditForm');
				}}
				visible={this.props.visible}
			>
				<Form layout="vertical" hideRequiredMark>
					<Steps progressDot onChange={this.onChange} current={current}>
						{steps.map((item) => <Step key={item.title} title={item.title} />)}
					</Steps>
					<div className="steps-content">{steps[current].content}</div>
					<div className="steps-action" />
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
					<Button onClick={(e) => this.props.closeDrawer('visibleUserEditForm')}>Cancel</Button>
					{current > 0 && (
						<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
							Previous
						</Button>
					)}
					{current < steps.length - 1 && (
						<Button type="primary" style={{ marginLeft: 8 }} onClick={() => this.next()}>
							Next
						</Button>
					)}
					<Button
						loading={this.state.saving}
						htmlType="submit"
						onClick={(e) => {
							this.handleSubmit(e);
						}}
						style={{ marginLeft: 8 }}
						className="login-form-button"
						type="primary"
					>
						Update
					</Button>
				</div>
			</Drawer>
		);
	}
}

export default Form.create()(UserForm);
