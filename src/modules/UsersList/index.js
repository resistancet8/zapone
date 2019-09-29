import React from 'react'
import { observer, inject } from "mobx-react";
import { List, Button, Skeleton, Row, Col, Typography, Drawer, Form, Icon, Input, Select, DatePicker } from 'antd';
import UsersServices from '../../services/UsersServices';
import ProfileForm from './ProfileForm';
import './UsersList.scss'

const { Title } = Typography;


@inject("users")
@observer
class Profile extends React.Component {
  state = { visible: false, saving: false };

  componentDidMount() {
    UsersServices.getUsers().then(response => {
      this.props.users.addUsersList(response.data)
    })
      .catch(error => {
      })
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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

    let tempUsers = [{ firstName: "Naveen", lastName: "Kumar", profile: "https://blog.usertesting.com/wp-content/uploads/2016/06/aiden-01.png", phone: "9945126164", desc: "Vestibulum otie varius sit amet quis tellus. Quisque fermentum sapien at massa porta eleifend. Mauris tincidunt pretium eros vitae elementum. Sed commodo ullamcorper luctus." }, { firstName: "Mala", profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQzBWuwU_2y5_RBDl4eSOFjTC-Okc092O-fg1IDF1PhpU9vPN9', lastName: "Naidu", phone: "8877665544", desc: "Lorem ipsum dolor sit amet, consectetur adaugue. Fusce augue dolor, posuere convallis pellentesque vitae, tristique sed odio. In feugiat mauris vel ex efficitur" }, { firstName: "Avinash", profile: "https://s3.amazonaws.com/37assets/svn/1024-original.1e9af38097008ef9573f03b03ef6f363219532f9.jpg", lastName: "CZ", phone: "8877665544", desc: "Lorem ipsum dolor sit amet, consectetur adaugue. Fusce augue dolor, posuere convallis pellentesque vitae, tristique sed odio. In feugiat mauris vel ex efficitur" }];

    let { users: { usersList } } = this.props;

    return (<div className="users-list">
      <ProfileForm onClose={this.onClose} visible={this.state.visible} />
      <Row type="flex" align="middle" style={{ flexFlow: 'nowrap' }}>
        <Col span={4}><Title level={3}>List of Users</Title></Col>
        <Col offset={16} span={4} >
          <Button className="inner-header-anchors" onClick={this.showDrawer} type="default" shape="circle" icon="plus-circle">
          </Button>
        </Col>
      </Row>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        dataSource={tempUsers}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <Row>
                <Col span={2}>
                  <img className="list-user-image" src={item.profile} />
                </Col>
                <Col>
                  <div className="desc">
                    <h3>{item.firstName}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Col>
              </Row>
            </Skeleton>
          </List.Item>
        )}
      />

    </div>)
  }
}

export default Form.create()(Profile);