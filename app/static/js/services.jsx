import axios from "axios"


const backendAxios = axios.create({
    baseURL: "/",
})

export const StatsApi = {
    getStats: (params) => backendAxios.get("/api/stats", params),
}

export const ExportApi = {
    exportPDF: (params) => backendAxios.post("/api/export", params),
}
