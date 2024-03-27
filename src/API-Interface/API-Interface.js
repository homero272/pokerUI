import axios from 'axios';


const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface{

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
}