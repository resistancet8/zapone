import GlobalStore from "./stores/GlobalStore";
import DashboardStore from "./stores/DashboardStore";
const globals = new GlobalStore();

export default {
  globals,
  dashboard: new DashboardStore(globals)
};
