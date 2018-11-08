export const setMenu = (id) => {
    return{
        type: 'SET_MENU',
        id: id,
    }
}
export const editSettings = (setting, value) => {
    return{
        type: 'EDIT_SETTING',
        setting: setting,
        value: value,
    }
}
