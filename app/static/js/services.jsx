import axios from "axios"


const backendAxios = axios.create({
    baseURL: "/",
})

export const StatsApi = {
    getStats: (params) => backendAxios.get("/api/stats", params),
}
