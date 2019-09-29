import { observable } from "mobx"

class GlobalStore {
    @observable isLoggedIn = true
    @observable loading = false
    @observable collapsed = false
    @observable userInfo = { fullName: "Naveen N", firstName: "Naveen", lastName: "N" };

    constructor() {
        // this.userInfo = JSON.parse(localStorage.getItem('user'))
        if (this.userInfo) {
            this.isLoggedIn = true
        }
    }

    setLogin = (status) => {
        this.isLoggedIn = status
        localStorage.removeItem('user')
    }

    setUserInfo = (userInfo) => {
        this.userInfo = userInfo
        localStorage.setItem('user', JSON.stringify(userInfo))
    }

    toggle = () => {
        this.collapsed = !this.collapsed
    }
}

export default GlobalStore