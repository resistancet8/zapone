import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ModuleRoutes from "./modules";
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const Login = lazy(() => import("./modules/login"));
const ForgotPassword = lazy(() => import("./modules/forgotPassword"));

const Routes = props => (
    <main>
        <Router>
            <Suspense fallback={<Spin indicator={antIcon} />}>
                <Switch>
                    <Route
                        path="/login"
                        exact
                        render={() => (
                            <Login {...props} />
                        )}
                    />
                    <Route
                        path="/forgot-password"
                        exact
                        render={() => (
                            <ForgotPassword {...props} />
                        )}
                    />
                    <Route path="/" component={ModuleRoutes} />
                </Switch>
            </Suspense>
        </Router>
    </main>
);

export default Routes;