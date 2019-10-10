import React from 'react';
import { observer, inject } from 'mobx-react';
import { List, Skeleton, Row, Col, Typography, Icon, Avatar, Popover, Button, Steps } from 'antd';
import OrganizationServices from '../../services/OrganizationServices';
import ProfileForm from './ProfileForm';
import truncate from 'truncate';
import './UsersList.scss';
const { Title } = Typography;

@inject('organization')
@observer
class Profile extends React.Component {
  state = { visible: false, saving: false, popoverVisible: false };

  componentDidMount() {
    OrganizationServices.getRoles()
      .then((response) => {
        this.props.organization.addRoles(response.data);
      })
      .catch((error) => { });

    OrganizationServices.getDepartments()
      .then((response) => {
        this.props.organization.addDepartments(response.data);
      })
      .catch((error) => { });

    OrganizationServices.getBranches()
      .then((response) => {
        this.props.organization.addBranches(response.data);
      })
      .catch((error) => { });

    OrganizationServices.getDesignations()
      .then((response) => {
        this.props.organization.addDesignations(response.data);
      })
      .catch((error) => { });

    OrganizationServices.getUsers()
      .then((response) => {
        this.props.organization.addUsers(response.data);
      })
      .catch((error) => { });
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handlePopoverVisible = () => {
    this.setState({
      popoverVisible: !this.state.popoverVisible
    });
  }

  render() {
    let { organization: { users } } = this.props;
    const content = (
      <List className="add-buttons no-borders"
      >
        <List.Item className="no-borders">
          <Button style={{ width: '100%' }} onClick={e=>this.handlePopoverVisible()}><Icon type="user-add" /> Add Admin</Button>
        </List.Item>
        <List.Item>
          <Button style={{ width: '100%' }} onClick={e=>{this.handlePopoverVisible();this.showDrawer(); }} ><Icon type="user-add" /> Add Employee</Button>
        </List.Item>
      </List>
    )

    return (
      <div className="users-list">
        <ProfileForm handlePopoverVisible={this.handlePopoverVisible} onClose={this.onClose} visible={this.state.visible} />
        <Row type="flex" align="middle" style={{ flexFlow: 'nowrap' }}>
          <Col span={4}>
            <Title level={3}>List of Users</Title>
          </Col>
          <Col offset={16} span={4}>
            <Popover visible={this.state.popoverVisible} placement="left" content={content} onClick={e=>this.handlePopoverVisible()}>
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
          renderItem={(item) => {
            if (!item.isActive)
              return;
            return <List.Item
              actions={[
                <Icon type="edit" theme="twoTone" />,
                <Icon twoToneColor="#eb2f96" type="delete" theme="twoTone" />
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
                    {item.profile ? <img className="list-user-image" src={item.profile} /> : <Avatar size={64} icon="user" />}
                  </Col>
                  <Col span={22}>
                    <div className="desc">
                      <h3>{item.firstName}</h3>
                      <p className="item-designation">
                        <span>{item.designation.name}</span> In <span>{item.department.name}</span>
                      </p>
                      <p className="item-description">{truncate(item.desc, 200)}</p>
                    </div>
                  </Col>
                </Row>
              </Skeleton>
            </List.Item>
          }}
        />
      </div>
    );
  }
}

export default Profile;
