import GlobalStore from "./stores/GlobalStore";
import DashboardStore from "./stores/DashboardStore";
import UsersStore from "./stores/UsersStore";
const globals = new GlobalStore();

export default {
  globals,
  dashboard: new DashboardStore(globals),
  users: new UsersStore(globals)
};
