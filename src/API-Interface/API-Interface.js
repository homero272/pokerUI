import axios from 'axios';


const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    //axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    //https://pokerapi-hzd-50ef.onrender.com/api/v1
    axios.defaults.baseURL = `https://pokerapi-hzd-50ef.onrender.com/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface{


    //LOGIN CALLS AND SOME TEST CALLS (AKA COLOR)
    async verifyUser(userName) {
        return axiosAgent.get(`login/${userName}`)
        .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async createUser(userName, userPassword, avatar) {
        try {
            // Append user data to the URL
            await axiosAgent.get(`login/create/${userName}/${userPassword}/${avatar}`);
            console.log('User created successfully');
            // Optionally, you may return some success indicator here
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    
    async changeColor(userName) {
        try {
            // Append user data to the URL
            await axiosAgent.get(`login/get/${userName}`);
            console.log('UPDATED successfully');
            // Optionally, you may return some success indicator here
        } catch (error) {
            console.error('Error UPDATING user:', error);
            throw error;
        }
    }

    async updateMoney(money, userName, avatar) {
        try{
            await axiosAgent.get(`/money/update/${money}/${userName}/${avatar}`);
            console.log("money updated successfully");
        }
        catch (error){
            console.error('Error UPDATING money:', error);
            throw error;            
        }
    }
    async updateGameMoney(money, userName) {
        try{
            await axiosAgent.get(`/money/update/game/money/${money}/${userName}`);
            console.log("money game updated successfully");
        }
        catch (error){
            console.error('Error UPDATING Gamemoney:', error);
            throw error;            
        }
    }

    async getAllUsers() {
        try {
            const response = await axiosAgent.get('/login/check/all');
            console.log("success in getting all users");
            return response.data; 
        } catch (error) {
            console.log("error in getAllUsers:", error);
            throw error;
        }
    }
    


    // FRIENDS CALLS 
    async showFriends(userName1, userName2, rStatus){
        try{
            const response = await axiosAgent.get(`/friend/show/${userName1}/${userName2}/${rStatus}`)
            return response.data; 
        }
        catch(error){
            console.log("error in showFriends");
            throw error;
        }
    }
    async searchFriends(userName){
        try{
            const response = await axiosAgent.get(`/friend/search/${userName}`);
            return response.data; 

        }
        catch(error){
            console.log("error in search friends");
            throw error;
        }
    }
    async addFriend(userID1, userName1,userID2, userName2, rStatus){
        try{
            const response = await axiosAgent.get(`/friend/add/${userID1}/${userName1}/${userID2}/${userName2}/${rStatus}`);
            return response.data;
        }
        catch(error){
            console.log("error in add friend");
            throw error;
        }
    }
    async acceptFriend(userID1, userID2){
        try{
            const response = await axiosAgent.get(`/friend/accept/${userID1}/${userID2}`);
            return response.data;
        }
        catch(error){
            console.log("error in accept friend");
            throw error;
        }
    }
    async rejectFriend(userID1, userID2){
        try{
            const response = await axiosAgent.get(`/friend/reject/${userID1}/${userID2}`);
            return response.data;
        }
        catch(error){
            console.log("error in reject friend");
            throw error;
        }
    }



    //AVATAR CALLS 
    async searchAvatars(userName){
        try{
            const response = await axiosAgent.get(`/avatar/search/${userName}`);
            return response.data;
        }
        catch(error){
            console.log("error in search AVATARS!!");
            throw error;
        }
    }
    async insertAvatar(userID,userName,avatar){
        try{
            const response = await axiosAgent.get(`/avatar/insert/${userID}/${userName}/${avatar}`);
            return response.data;
        }
        catch(error){
            console.log("error in insert AVATARS!!");
            throw error;
        }
    }

}