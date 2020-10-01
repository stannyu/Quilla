import {
  ADD_ORDER,
  ADD_CLIENTS_LIST,
  ADD_SELLERS_LIST,
  ADD_PRODUCTS_LIST,
  ADD_DELIVERY_TYPES_LIST
} from '../mutations/mutation-types';

const actions = {
  addNewOrder({ commit }, order) {
    commit(ADD_ORDER, order);
  },

  addClientsList({ commit }, clients) {
    commit(ADD_CLIENTS_LIST, clients);
  },

  addSellersList({ commit }, sellers) {
    commit(ADD_SELLERS_LIST, sellers);
  },

  addProductsList({ commit }, products) {
    commit(ADD_PRODUCTS_LIST, products);
  },

  addDeliveryTypesList({ commit }, deliveryTypes) {
    commit(ADD_DELIVERY_TYPES_LIST, deliveryTypes);
  }
};

export { actions };
