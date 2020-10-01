const getters = {
  getActiveOrders: (state) => {
    return state.orders;
  },

  getActiveOrdersByIndex: (state) => (index) => {
    return state.orders[index];
  },

  getClientsList: (state) => state.clients,

  getSellersList: (state) => state.sellers,

  getProductsList: (state) => state.products,

  getDeliveryTypesList: (state) => state.deliveryTypes
};

export { getters };
