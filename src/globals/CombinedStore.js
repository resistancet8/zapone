import GlobalStore from "./stores/GlobalStore";
import DashboardStore from "./stores/DashboardStore";
import OrganizationStore from "./stores/OrganizationStore";
const globals = new GlobalStore();

export default {
  globals,
  dashboard: new DashboardStore(globals),
  organization: new OrganizationStore(globals)
};
