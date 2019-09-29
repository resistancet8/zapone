import { observable } from "mobx";

class UsersStore {
  @observable usersList;

  addUsersList = list => {
    this.usersList = list;
  };
}

export default UsersStore;
