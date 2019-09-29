import { observable } from "mobx";

class DashboardStore {
  @observable inputValue = "";

  onChange = e => {
    this.inputValue = e.target.value;
  };
}

export default DashboardStore;
