import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"

interface post3dpInputRequest {
    base64: string
}

export default (request: post3dpInputRequest, token: string): Promise<AxiosResponse>  => {
    const req_config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return axios.post(
        config.api.path.post_3dp_input,
        request,
        req_config
    )
}