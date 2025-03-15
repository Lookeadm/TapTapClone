import axios from "axios";
import { appInfo } from "../constants/appInfos";

const AxiosInstance = (token = '', contentType = 'application/json')=>{
    const axiosInstance = axios.create({
        baseURL: appInfo.BASE_URL
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            // const token = '';
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => {
            if (err) {
                console.error('Error occurred:', err);
            }
            return Promise.reject(err);
        }
    );
    return axiosInstance;
};
export default AxiosInstance;