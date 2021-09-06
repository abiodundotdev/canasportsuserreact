import Api from './api';

export default {
   async register(form){
       await this.getCookie();
       return Api.post("/registeraccount",form);
    },
    getCookie(){
        return Api.get("/csrf-cookie")
    },
    async login(form){
        await this.getCookie();
        return Api.post("/userlogin",form);
    },
    async saveDataToServer(formData,url){
        await this.getCookie();
        const userTokenJs = localStorage.getItem("userAuth");
        const UserToken = JSON.parse(userTokenJs)?.token;
        Api.defaults.headers.common = {'Authorization': `Bearer ${UserToken}`}
        return Api.post(url,formData);
    },
    async logout(){
        await this.getCookie();
        return Api.post("/logout");
    },
    getUser(){
        return Api.get("/user");
    },
    getUserData(url){
        return Api.get(url);
    },
    getServerData(url){
        const userTokenJs = localStorage.getItem("userAuth");
        const UserToken = JSON.parse(userTokenJs)?.token;
        Api.defaults.headers.common = {'Authorization': `Bearer ${UserToken}`}
        return Api.get(url);
    },
    deleteDatafromServerUsingId(url){
        return Api.get(url);
    }
};