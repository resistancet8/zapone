import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoutes from "../globals/hoc/AuthRoutes";

const Dashboard = lazy(() => import("./dashboard"));
const LeaveRequest = lazy(() => import("./leaveRequest"));
const UsersList = lazy(() => import("./UsersList"));

const Moduleroutes = props => {
  return (
    <Suspense fallback={<div>loading...</div>}>
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
