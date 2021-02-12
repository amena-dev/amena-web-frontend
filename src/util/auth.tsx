import axios, { AxiosError, AxiosResponse } from "axios"
import config from "../config/config"

interface get3dpInputResponseElement {
    id: string
    url: string
    requested_at: number
}

interface get3dpInputResponse {
    results: Array<get3dpInputResponseElement>
}

export default (token: string): Promise<AxiosResponse<get3dpInputResponse>> => {
    const req_config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    return axios.get<get3dpInputResponse>(
        config.api.path.get_3dp_input,
        req_config
    )
}