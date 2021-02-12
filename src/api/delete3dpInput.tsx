import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"

export default (id: string, token: string): Promise<AxiosResponse> =>  {
    const req_config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return axios.delete(
         `${config.api.base}${config.api.path.delete_3dp_input}/id=${id}`,
        req_config
    )
}