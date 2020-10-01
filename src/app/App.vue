<template>
  <div>
    <OrderForm :finalizeFlag="finalizeFlag"></OrderForm>
    <SellersForm :finalizeFlag="finalizeFlag"></SellersForm>
    <ItemsForm :finalizeFlag="finalizeFlag"></ItemsForm>

    <el-button type="primary" @click="toggleFinalizeFlag">Finalize</el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { httpWrapper } from './http/http-service';

import OrderForm from './components/OrderForm';
import SellersForm from './components/SellersForm';
import ItemsForm from './components/ItemsForm';

export default {
  data() {
    return {
      finalizeFlag: false
    };
  },
  components: {
    OrderForm,
    SellersForm,
    ItemsForm
  },
  created() {
    //initial call for resources
    httpWrapper.getClientsList(this.addClientsList, this.errorsHandler);
    httpWrapper.getSellersList(this.addSellersList, this.errorsHandler);
    httpWrapper.getProductsList(this.addProductsList, this.errorsHandler);
    httpWrapper.getDeliveryTypesList(
      this.addDeliveryTypesList,
      this.errorsHandler
    );
  },
  computed: {
    ...mapGetters({
      storedOrders: 'getActiveOrders',
      getActiveOrdersByIndex: 'getActiveOrdersByIndex'
    })
  },
  methods: {
    ...mapActions({
      addClientsList: 'addClientsList',
      addSellersList: 'addSellersList',
      addProductsList: 'addProductsList',
      addDeliveryTypesList: 'addDeliveryTypesList'
    }),
    toggleFinalizeFlag() {
      this.finalizeFlag = !this.finalizeFlag;
    },
    errorsHandler(error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
</style>
