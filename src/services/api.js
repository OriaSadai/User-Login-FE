import {axiosInstance as axios} from './axiosInstance'

const CREATE_NEW_USER = () => 'api/user/public/create';
const AUTHENTICATE = () => 'api/public/authenticate';
const GET_USER_ADDRESS = () => 'api/user/private/get/address';

const GET_ITEM = (id) => `api/item/public/get/${id}`;
const GET_ITEM_AUTHENTICATE = (id) => `api/item/private/get/${id}`;
const GET_ALL_ITEMS = () => 'api/item/public/get/all';
const GET_ALL_ITEMS_AUTHENTICATE = () => 'api/item/private/get/all';
const GET_ALL_ITEMS_BY_NAME = (name) => `api/item/public/get/name/${name}`;
const GET_ALL_ITEMS_BY_NAME_AUTHENTICATE = (name) => `api/item/private/get/name/${name}`;
const GET_FAVORITE_ITEM_LIST = () => 'api/item/private/favorite/get';

const ADD_TO_FAVORITE = () => 'api/favorite/private/add';
const REMOVE_FROM_FAVORITE = () => 'api/favorite/private/remove';

const CREATE_ORDER = () => 'api/order/private/create';

const TEST_API = () => `api/private/test2`;

export const createNewUser = (userBody) => {
    return axios.post(CREATE_NEW_USER(), userBody);
}

export const authenticate = (userBody) => {
    return axios.post(AUTHENTICATE(), userBody);
}

export const getUserAddress = (params) => {
    return axios.get(GET_USER_ADDRESS(), { params: params });
}

export const getItem = (id) => {
    return axios.get(GET_ITEM(id));
}

export const getItemAuthenticate = (id, params) => {
    return axios.get(GET_ITEM_AUTHENTICATE(id), { params: params });
}

export const getAllItems = () => {
    return axios.get(GET_ALL_ITEMS());
}

export const getAllItemsAuthenticate = (params) => {
    return axios.get(GET_ALL_ITEMS_AUTHENTICATE(), { params: params });
}

export const getAllItemsByName = (name) => {
    return axios.get(GET_ALL_ITEMS_BY_NAME(name));
}

export const getAllItemsByNameAuthenticate = (name,params) => {
    return axios.get(GET_ALL_ITEMS_BY_NAME_AUTHENTICATE(name), { params: params });
}

export const getFavoriteItems = (params) => {
    return axios.get(GET_FAVORITE_ITEM_LIST(), { params: params } );
}

export const addToFavorite = (params) => {
    return axios.post(ADD_TO_FAVORITE(), null, { params: params });
}

export const removeFromFavorite = (params) => {
    return axios.delete(REMOVE_FROM_FAVORITE(),{ params: params });
}

export const createOrder = (body, params) => {
    return axios.post(CREATE_ORDER(),body, { params: params })
}

export const testAuthenticatedApi = (params) => {
    return axios.get(TEST_API(), { params: params });
}