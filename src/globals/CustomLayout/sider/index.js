import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import SiderContent from "./SiderContent";
import { withRouter } from "react-router-dom";
import "./Sider.scss";
import { observer, inject } from 'mobx-react';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const getActiveKey = (props, contents) => {
  const currentRoute = props.location.pathname.split("/")[1];
  let currentActiveKey = [];
  const recursiveGetKey = dataSource => {
    dataSource.forEach(data => {
      if (data.route === currentRoute) currentActiveKey = [data.key];
      if (data.children) recursiveGetKey(data.children);
    });
    return currentActiveKey;
  };
  return recursiveGetKey(contents);
};

const MainSider = props => {
  return (
    <Sider trigger={null} collapsible collapsed={props.globals.collapsed}>
      <div className="sidebar-header-logo">
        <span>Zapone</span>
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={getActiveKey(props, SiderContent)}
      >
        {SiderContent.map(content => {
          const toShow = content.role.includes("role");

          return content.children.length && toShow ? (
            <SubMenu
              key={content.key}
              title={
                <span> 
                  <Icon type={content.icon} />
                  <span>{content.name}</span>
                </span>
              }
            >
              {content.children.map(child => {  
                const toShowChild = content.role.includes("role");
                return toShowChild ? (
                  <Menu.Item key={child.key}>
                    <Link to={child.route}>
                      {child.icon && <Icon type={child.icon} />}
                      <span>{child.name}</span>
                    </Link>
                  </Menu.Item>
                ) : null;
              })}
            </SubMenu>
          ) : toShow ? (
            <Menu.Item key={content.key}>
              <Link to={content.route}>
                <Icon type={content.icon} />
                <span>{content.name}</span>
              </Link>
            </Menu.Item>
          ) : null;
        })}
      </Menu>
    </Sider>
  );
};

export default inject('globals')(withRouter(observer(MainSider)));
