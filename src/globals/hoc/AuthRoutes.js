import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Redirect } from "react-router-dom";
import Layout from "../layout";
import { Spin } from "antd";

export default function Protected(Children) {
    @inject("globals")
    @observer
    class AuthenticatedComponent extends Component {
        render() {
            const { isLoggedIn, loading } = this.props.globals
            return (
                <div className="authComponent">
                    {isLoggedIn ? (
                        <Spin spinning={loading}>
                            <Layout>
                                <Children {...this.props} />
                            </Layout>
                        </Spin>
                    )
                        : (
                            <Redirect
                                to="/login"
                            />
                        )}
                </div>
            );
        }
    }
    return AuthenticatedComponent;
}