import {
    ExportApi
} from "../../services"

import {
    showSpinner,
    hideSpinner,
} from "./spinner"

export const EXPORT_PDF_EXPORT = "EXPORT_PDF_EXPORT"


export const exportPDF = (svgIds, data) => {
    return async (dispatch) => {
        try {
            dispatch(showSpinner())

            const svgData = {}
            svgIds.map(svgId => {
                svgData[svgId] = d3.select(`#${svgId}`).select('svg').node().parentNode.innerHTML
            })

            let response = await ExportApi.exportPDF({
                data: data,
                svgs: svgData
            })

            dispatch(hideSpinner())
        } catch (e) {
            dispatch(hideSpinner())
        }
    }
}


export default {
    EXPORT_PDF_EXPORT,

    exportPDF
}
