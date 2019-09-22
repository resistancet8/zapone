import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./Dashboard.scss";

@inject("dashboard")
@observer
class Dashboard extends Component {
  render() {
    const {
      globals: { user }
    } = this.props;
    return (
      <div className="dashboard">
        <div className="welcome-text">Welcome, {user && user.firstName}!</div>
      </div>
    );
  }
}

export default Dashboard;
