import RestfulProvider from "../globals/restfulProvider/RestfulProvider";

class UsersServices {
  getUsers = () => {
    return RestfulProvider.get('organization/designation/designations/pagination/1')
  }

}
export default new UsersServices();
