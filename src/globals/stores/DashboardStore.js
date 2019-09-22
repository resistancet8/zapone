import { observable } from "mobx";

class GlobalStore {
  @observable inputValue = "";

  onChange = e => {
    this.inputValue = e.target.value;
  };
}

export default GlobalStore;
