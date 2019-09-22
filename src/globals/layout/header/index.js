import React from "react";
import { Layout, Icon, Avatar, Popover } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import "./Header.scss";

const { Header } = Layout;

const MainHeader = ({ globals, history }) => {
  const logout = () => {
    globals.setLogin(false)
  }
  const onProfile = () => {
    history.push("/profile")
  }
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ cursor: "pointer" }} onClick={logout}>
        Logout
      </span>
      <span style={{ cursor: "pointer", marginTop: '10px' }} onClick={onProfile}>
        Profile
      </span>
    </div>
  );
  return (<Header collapsible collapsed={globals.collapsed} className="header" >
    <Icon
      className="trigger"
      type={globals.collapsed ? "menu-unfold" : "menu-fold"}
      onClick={globals.toggle}
    />
    <div className="user-avt">
      <Popover placement="bottom" content={content} trigger="click">
        <Avatar icon="user" />
      </Popover>
    </div>
    <span className="usersname">{Boolean(globals.user) && globals.user.firstName}</span>

  </Header>);
};

export default inject('globals')(withRouter(observer(MainHeader)));
