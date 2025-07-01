// shared/constants/urls.ts
export const BASE_URL = 'http://localhost:5000';

export const GEPS_URL = `${BASE_URL}/api/geps`;
export const GEPS_REGISTER_URL = `${BASE_URL}/api/geps/gepregister`;
export const GEPS_BY_ID_URL = `${GEPS_URL}/`;


export const USER_LOGIN_URL =`${BASE_URL}/api/users/login`;
export const USER_REGISTER_URL = `${BASE_URL}/api/users/register`;
export const USER_ADJUST_URL = `${BASE_URL}/api/users/`;
export const USER_UPDATE_BALANCE_URL = BASE_URL + '/api/users/:id/balance';
export const USER_UPDATE_BALANCE_ON_PAY_URL = `${BASE_URL}/api/users/balanceonpay/:id`;



export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const ORDERS_CREATE_URL = `${ORDERS_URL}/create`;
export const ORDER_NEW_FOR_CURRENT_USER_URL = `${ORDERS_URL}/newOrderForCurrentUser`;
export const ORDER_PAY_URL = `${ORDERS_URL}/pay`;
export const ORDER_TRACK_URL = `${ORDERS_URL}/track/`;
export const ORDER_COMPLETE_URL = `${ORDERS_URL}/`;
