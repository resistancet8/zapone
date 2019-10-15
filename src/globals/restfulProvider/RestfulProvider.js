import axios from "axios";

const appServiceName = "//13.233.122.231:8080/rest/api/v1";

class RestfulProvider {

  constructor() {
    if (localStorage.getItem('user')) {
      this.setCommonHeaders()
    }
  }

  setCommonHeaders = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    // axios.defaults.headers.common['Authorization'] = `Bearer 1234567890puiitury`;
  };

  get = (url, headers) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${appServiceName}/${url}`, headers)
        .then(res => resolve(res.data.result))
        .catch(error => {
          reject(error);
        });
    });
  };

  post = (url, data) => {
    if (localStorage.getItem('user')) {
      this.setCommonHeaders()
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`${appServiceName}/${url}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  put = (url, data) => {
    if (localStorage.getItem('user')) {
      this.setCommonHeaders()
    }
    return new Promise((resolve, reject) => {
      axios
        .put(`${appServiceName}/${url}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  delete = url => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${appServiceName}/${url}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export default new RestfulProvider();
