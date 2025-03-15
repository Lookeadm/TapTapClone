import { appInfo } from "../constants/appInfos";
import axiosClient from "./clientAxios";

class AuthAPI {
    HandleAuthentication = async (
      url: string,
      data?: any, 
      method?: 'get'|'post'|'put'|'delete'
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/users${url}`,{
            method: method ?? 'get',
            data, 
        })
    }
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;