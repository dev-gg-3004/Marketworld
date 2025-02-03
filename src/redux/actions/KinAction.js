import * as types from "../../utils/Actions";

export const addKinDetails = (value) => ({ 
    type: types.ADD_KIN_START,
    payload:value
})
export const deleteKinDetail = (value,i) => ({ 
    type: types.DELETE_KIN_START,
    payload:value,
    meta:i
})

export const setLocationTitles = (value) => ({ 
    type: types.ADD_LOCATION_TITLE_START,
    payload:value
})

export const deleteLocationDetail = (value,i) => ({ 
    type: types.DELETE_LOCATION_TITLE_START,
    payload:value,
    meta:i
})
