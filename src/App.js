import React, { Suspense, lazy, Component } from "react";
import { Spin, Icon } from 'antd';
import "./App.scss";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const Routes = lazy(() => import("./Routes"));

class App extends Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback={<div className="center-screen"><Spin indicator={antIcon} /></div>}>
          <Routes />
        </Suspense>
      </div>
    );
  }
}

export default App;