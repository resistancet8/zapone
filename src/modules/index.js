import React, { lazy, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import AuthRoutes from "../globals/hoc/AuthRoutes";
import { Spin, Icon, Result, Button } from 'antd';

const Dashboard = lazy(() => import("./dashboard"));
const LeaveRequest = lazy(() => import("./leaveRequest"));
const UsersList = lazy(() => import("./UsersList/index"));
const UsersProfile = lazy(() => import("./UsersProfile/UsersProfile"));
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const NoMatchPage = (props) => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button onClick={e => props.history.push('/dashboard')} type="primary">Dashboard</Button>}
  />
  );
};

const Moduleroutes = props => {
  return (
    <Suspense fallback={<Spin indicator={antIcon} />}>
      <Switch>
        <Route path="/" exact render={() => <Dashboard {...props} />} />
        <Route path="/dashboard" render={() => <Dashboard {...props} />} />
        <Route path="/leave-request" render={() => <LeaveRequest {...props} />} />
        <Route exact path="/users/:id/show" render={() => <UsersProfile {...props} />} />
        <Route path="/users" render={() => <UsersList {...props} />} />
        <Route component={NoMatchPage} />
      </Switch> 
    </Suspense>
  );
};

export default AuthRoutes(withRouter(Moduleroutes));
