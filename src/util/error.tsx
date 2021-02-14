import config from "../config/config"

export default {
    handle: (error: Error) => {
        console.log(error)
        alert(error.message || "Unknow error.")
    }
}