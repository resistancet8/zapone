import { observable } from "mobx"

class GlobalStore {
    @observable isLoggedIn = true
    @observable loading = false
    @observable collapsed = false
    @observable user = { name: "prashant" }

    constructor() {
        this.user = JSON.parse(localStorage.getItem('user'))
        if (this.user) {
            this.isLoggedIn = true
        }
    }
    setLogin = (status) => {
        this.isLoggedIn = status
        localStorage.removeItem('user')
    }

    setUserInfo = (user) => {
        console.log(user);
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
    }

    toggle = () => {
        this.collapsed = !this.collapsed
    }
}

export default GlobalStore