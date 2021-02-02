import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"

interface get3dpOutputResponseElement {
    id: string
    url: string
}

interface get3dpOutputResponse {
    results: get3dpOutputResponseElement
}

export default (token: string): Promise<AxiosResponse<get3dpOutputResponse>> => {
    const req_config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return axios.get<get3dpOutputResponse>(
        config.api.path.get_3dp_input,
        req_config
    )
}