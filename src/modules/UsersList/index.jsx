import React from 'react';
import { observer, inject } from 'mobx-react';
import { List, Skeleton, Row, Col, Typography, Icon, Avatar, Popover, Button, Steps } from 'antd';
import OrganizationServices from '../../services/OrganizationServices';
import UserForm from './UserForm';
import truncate from 'truncate';
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
			editMode: false
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
			userInfo: users[index]
		});
	}

	render() {
		let { organization: { users } } = this.props;

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
						<Title level={3}>List of Users</Title>
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
				<List
					className="demo-loadmore-list"
					loading={!users}
					itemLayout="horizontal"
					dataSource={users}
					renderItem={(item, index) => {
						if (!item.isActive) return;
						return (
							<List.Item
								actions={[
									<Icon
										type="edit"
										theme="twoTone"
										style={{ marginRight: '10px' }}
										onClick={(e) => {
											this.handleUpdate(index);
										}}
									/>
								]}
							>
								<Skeleton avatar title={false} loading={item.name} active>
									<Row className="users-list-item">
										<Col
											type="flex"
											align="middle"
											style={{ flexFlow: 'nowrap' }}
											span={2}
											className="list-user-image-parent"
										>
											{item.profile ? (
												<img className="list-user-image" src={item.profile} />
											) : (
												<Avatar size={64} icon="user" />
											)}
										</Col>
										<Col span={22}>
											<div className="desc">
												<h3>{item.firstName}</h3>
												<p className="item-designation">
													<span>{item.designation.name}</span> In{' '}
													<span>{item.department.name}</span>
												</p>
												<p className="item-description">{truncate(item.desc, 200)}</p>
											</div>
										</Col>
									</Row>
								</Skeleton>
							</List.Item>
						);
					}}
				/>
			</div>
		);
	}
}

export default Profile;
