import { axiosWithAuth } from '../utils/axiosWithAuth';

export const getAllColors = async () => {
    try {
        return await axiosWithAuth().get('/api/colors');
    } catch(err) {
        console.log(err);
    }
}

export const addColor = async color => {
    try {
        return await axiosWithAuth().post('/api/colors', color); // check this parameter
    } catch(err) {
        console.log(err);
    }
}

export const deleteColor = async colorId => {
    try {
        return await axiosWithAuth().delete(`/api/colors/${colorId}`);
    } catch(err) {
        console.log(err);
    }
}

export const updateColor = async color => {
    try {
        return await axiosWithAuth().put(`/api/colors/${color.id}`, color);
    } catch(err) {
        console.log(err);
    }
}

export default {
    getAllColors,
    addColor,
    deleteColor,
    updateColor
}