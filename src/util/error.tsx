import { AxiosAdapter, AxiosError } from "axios"
import config from "../config/config"

export default {
    axiosHandle: (error: AxiosError) => {
        const unknown_error_message = "Unknown error."

        if(error.response) {
            alert(error.response.data["message"] || error.message || unknown_error_message)
        }else{
            alert(error.message || unknown_error_message)
        }
    }
}