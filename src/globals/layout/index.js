import React from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import Header from "./header";
import Sider from "./sider";
import "./MainLayout.scss";

const { Content } = Layout;

const MainLayout = ({ children }) => {
    return (
        <Layout>
            <Sider />
            <Layout
                style={{
                    minHeight: "100vh"
                }}
            >
                <Header />
                <Content style={{
                    marginTop: '20px', padding: 24, background: 'fbfbfb', minHeight: '100vh',
                }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default observer(MainLayout);