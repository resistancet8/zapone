import RestfulProvider from "../globals/restfulProvider/RestfulProvider";

class RequestServices {
  login = data => {
    return RestfulProvider.post('user/authenticate', data)
  }
}


export default new RequestServices();
