import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./Dashboard.scss";

class Dashboard extends Component {
  render() {
    const {
      globals: { userInfo }
    } = this.props; 
    return (
      <div className="dashboard">
        <div className="welcome-text">Welcome, {userInfo && userInfo.firstName}!</div>
      </div>
    );
  }
}

export default inject('globals')(observer(Dashboard));