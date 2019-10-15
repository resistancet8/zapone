import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoutes from "../globals/hoc/AuthRoutes";
import { Spin, Icon } from 'antd';

const Dashboard = lazy(() => import("./dashboard"));
const LeaveRequest = lazy(() => import("./leaveRequest"));
const UsersList = lazy(() => import("./UsersList/index"));
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Moduleroutes = props => {
  return (
    <Suspense fallback={<Spin indicator={antIcon} />}>
      <Switch>
        <Route path="/" exact render={() => <Dashboard {...props} />} />
        <Route path="/dashboard" render={() => <Dashboard {...props} />} />
        <Route path="/leave-request" render={() => <LeaveRequest {...props} />} />
        <Route path="/users" render={() => <UsersList {...props} />} />
      </Switch> 
    </Suspense>
  );
};

export default AuthRoutes(Moduleroutes);
