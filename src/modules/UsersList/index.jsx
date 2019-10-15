import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { List, Skeleton, Row, Col, Typography, Icon, Avatar, Popover, Button, Tag, Badge, Card, Spin, Alert } from 'antd';
import OrganizationServices from '../../services/OrganizationServices';
import UserForm from './UserForm';
import moment from 'moment';
import './UsersList.scss';
import AdminForm from './AdminForm';
import UserEditForm from './UserEditForm';
const { Title } = Typography;

@inject('organization')
@observer
class Profile extends React.Component {
	state = {
		editMode: false,
		userInfo: {},
		userEditIndex: -1,
		visibleUserForm: false,
		visibleUserEditForm: false,
		visibleAdminForm: false,
		saving: false,
		popoverVisible: false
	};

	componentDidMount() {
		OrganizationServices.getRoles()
			.then((response) => {
				this.props.organization.addRoles(response.data);
			})
			.catch((error) => {});

		OrganizationServices.getDepartments()
			.then((response) => {
				this.props.organization.addDepartments(response.data);
			})
			.catch((error) => {});

		OrganizationServices.getBranches()
			.then((response) => {
				this.props.organization.addBranches(response.data);
			})
			.catch((error) => {});

		OrganizationServices.getDesignations()
			.then((response) => {
				this.props.organization.addDesignations(response.data);
			})
			.catch((error) => {});

		OrganizationServices.getUsers()
			.then((response) => {
				this.props.organization.addUsers(response.data);
			})
			.catch((error) => {});
	}

	showDrawer = (key) => {
		this.setState({
			[key]: true
		});
	};

	closeDrawer = (key) => {
		this.setState({
			[key]: false,
			userInfo: {},
			editMode: false,
			userEditIndex: -1
		});
	};

	handlePopoverVisible = () => {
		this.setState({
			popoverVisible: !this.state.popoverVisible
		});
	};

	handleUpdate(index) {
		let { organization: { users } } = this.props;
		this.setState({
			editMode: true,
			visibleUserEditForm: true,
			userInfo: users[index],
			userEditIndex: index
		});
	}

	render() {
		let { organization: { users } } = this.props;

		users = JSON.parse(JSON.stringify(users));
		const content = (
			<List className="add-buttons no-borders">
				<List.Item className="no-borders">
					<Button
						style={{ width: '100%' }}
						onClick={(e) => {
							this.handlePopoverVisible();
							this.showDrawer('visibleAdminForm');
						}}
					>
						<Icon type="user-add" /> Add Admin
					</Button>
				</List.Item>
				<List.Item>
					<Button
						style={{ width: '100%' }}
						onClick={(e) => {
							this.handlePopoverVisible();
							this.showDrawer('visibleUserForm');
						}}
					>
						<Icon type="user-add" /> Add Employee
					</Button>
				</List.Item>
			</List>
		);

		return (
			<div className="users-list">
				<UserForm
					handlePopoverVisible={this.handlePopoverVisible}
					closeDrawer={this.closeDrawer}
					visible={this.state.visibleUserForm}
				/>
				{this.state.editMode && (
					<UserEditForm
						handlePopoverVisible={this.handlePopoverVisible}
						closeDrawer={this.closeDrawer}
						visible={this.state.visibleUserEditForm}
						userInfo={this.state.userInfo}
					/>
				)}
				<AdminForm
					handlePopoverVisible={this.handlePopoverVisible}
					closeDrawer={this.closeDrawer}
					visible={this.state.visibleAdminForm}
				/>
				<Row type="flex" align="middle" style={{ flexFlow: 'nowrap' }}>
					<Col span={4}>
						<Title level={3}>All Employees List</Title>
					</Col>
					<Col offset={16} span={4}>
						<Popover placement="left" content={content}>
							<Icon
								title="Add new designation"
								type="plus-circle"
								theme="twoTone"
								twoToneColor="#52c41a"
								className="inner-header-anchors"
								style={{ fontSize: '22px' }}
							/>
						</Popover>
					</Col>
				</Row>
				<Card bordered={false} className="mb no-bg text-muted font-bold half-opacity">
					<Row>
						<Col span={3}>Name</Col>
						<Col span={3}>Email</Col>
						<Col span={3}>Department</Col>
						<Col span={3}>Designation</Col>
						<Col span={3}>Manager</Col>
						<Col span={3}>Date of Birth</Col>
						<Col span={3}>Status</Col>
						<Col span={3}>Action</Col>
					</Row>
				</Card>
				{users && users.length ? (
					users.map((user, index) => {
						return (
							<Card bordered={false} className="mb text-dark font-bold elevated-shadow rounded-border">
								<Row type="flex">
									<Col span={3}>
										{user.profile ? (
											<img className="list-user-image" src={user.profile} />
										) : (
											<Avatar size={32} icon="user" />
										)}{' '}
										<span className="ml">
											{user.firstName} {user.lastName}
										</span>
									</Col>
									<Col span={3}>{user.email}</Col>
									<Col span={3}>{user.department.name}</Col>
									<Col span={3}>{user.designation.name}</Col>
									<Col span={3}>{user.manager.name ? user.manager.name: 'Not Assigned'}</Col>
									<Col span={3}>{moment(user.birthDate, 'DD-MM-YYYY').format("Do MMM YY")}</Col>
									<Col span={3}><Alert className={`custom-alert ${user.isActive ? 'green': 'red'} no-border width-50 text-center`} message={user.isActive ? 'Active': 'Inactive'} type={user.isActive ? 'success': 'error'} /></Col>
									<Col span={3}><Button onClick={e => this.handleUpdate(index)} shape="circle" className="no-border" icon="edit" size={"large"}/><Button onClick={e => this.props.history.push(`/users/${user.id}/show`)} shape="circle" className="no-border" icon="eye" size={"large"}/></Col>
								</Row>
							</Card>
						);
					})
				) : (
					<div className="display-flex justify-center">
						<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />{' '}
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(Profile);
