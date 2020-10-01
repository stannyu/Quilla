import { getters } from './getters/getters';
import { mutations } from './mutations/mutations';
import { actions } from './actions/actions';

const storage = {
  state: {
    orders: ['a', 'b', 'c'],
    clients: [],
    sellers: [],
    products: [],
    deliveryTypes: []
  },
  mutations: mutations,
  getters: getters,
  actions: actions
};

export { storage };
