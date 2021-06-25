//引入actionTypes
import { CHANGE_INPUT_VALUE, CHANGE_LIST_DATA, DELETE_LIST_ITEM } from './actionTypes';

//修改input值改变
export const getInputChangeAction = (inputValue) => {
    return {
        type: CHANGE_INPUT_VALUE,
        inputValue
    }
}

//修改list数据
export const getListChangeAction = () => {
    return {
        type: CHANGE_LIST_DATA
    }
}

//删除list中 一项
export const getDeleteItemAction = (index) => {
    return {
        type: DELETE_LIST_ITEM,
        index
    }
}