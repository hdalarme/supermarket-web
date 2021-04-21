import Api from "./http-common";

const UserService = {
    login: (email, password) => Api.post('/sign_in', {email, password})
    .then((response) => {
        console.log(response)
        if(response.data.data.uid) {
            sessionStorage.setItem("userData", JSON.stringify(response.data));
            sessionStorage.setItem("userHeader", JSON.stringify(response.headers['access-token']));
        }
    }) ,

    register: (email, password, password_confirmation) => Api.post('/sign_up', {email, password, password_confirmation}),

    logout: () => {
        //sessionStorage.removeItem("userData");
        //sessionStorage.removeItem("userHeader");
    }

}

export default UserService;