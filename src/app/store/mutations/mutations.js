import {
  ADD_ORDER,
  ADD_CLIENTS_LIST,
  ADD_SELLERS_LIST,
  ADD_PRODUCTS_LIST,
  ADD_DELIVERY_TYPES_LIST
} from './mutation-types';

const mutations = {
  [ADD_ORDER](state, payload) {
    state.orders = [...state.orders, payload];
  },
  [ADD_CLIENTS_LIST](state, payload) {
    state.clients = payload;
  },
  [ADD_SELLERS_LIST](state, payload) {
    state.sellers = payload;
  },
  [ADD_PRODUCTS_LIST](state, payload) {
    state.products = payload;
  },
  [ADD_DELIVERY_TYPES_LIST](state, payload) {
    state.deliveryTypes = payload;
  }
};

export { mutations };
