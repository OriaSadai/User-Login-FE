import {axiosInstance as axios} from './axiosInstance'

const CREATE_NEW_USER = () => 'api/user/public/create';
const AUTHENTICATE = () => 'api/public/authenticate';
const GET_ALL_ITEMS = () => 'api/item/public/get/all';
const GET_ALL_ITEMS_BY_NAME = () => 'api/item/public/get/name';
const ADD_TO_FAVORITE = () => 'api/item/private/favorite/add';
const REMOVE_FROM_FAVORITE = () => 'api/item/private/favorite/remove';
const GET_ITEM = (id) => `api/item/public/get/${id}`;
const GET_FAVORITE_ITEM_LIST = () => 'api/item/private/favorite/get';
const CREATE_ORDER = () => 'api/order/private/create';

const TEST_API = () => `api/private/test2`;

export const createNewUser = (userBody) => {
    return axios.post(CREATE_NEW_USER(), userBody);
}

export const authenticate = (userBody) => {
    return axios.post(AUTHENTICATE(), userBody);
}

export const getAllItems = () => {
    return axios.get(GET_ALL_ITEMS());
}

export const getAllItemsByName = (params) => {
    return axios.get(GET_ALL_ITEMS_BY_NAME(), { params: params });
}

export const addToFavorite = (params) => {
    return axios.post(ADD_TO_FAVORITE(), { params: params });
}

export const removeFromFavorite = (params) => {
    return axios.delete(REMOVE_FROM_FAVORITE(), { params: params });
}

export const testAuthenticatedApi = (params) => {
    return axios.get(TEST_API(), { params: params });
}

export const getItem = (id) => {
    return axios.get(GET_ITEM(id));
}

export const getFavoriteItems = (params) => {
    return axios.get(GET_FAVORITE_ITEM_LIST(), { params: params } );
}

export const createOrder = (params, body) => {
    return axios.post(CREATE_ORDER(), { params: params, body: body })
}