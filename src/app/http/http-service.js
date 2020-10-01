import axios from 'axios/index';

const BASE_JSDB_URL = 'http://localhost:3000/';

class HttpWrapperClass {
  getClientsList(callback, errorHandler) {
    axios
      .get(BASE_JSDB_URL + 'clients')
      .then((res) => {
        callback(res.data);
      })
      .catch(errorHandler);
  }

  getClientContacts(clientId, callback, errorHandler) {
    axios
      .get(BASE_JSDB_URL + `client/${clientId}/contact`)
      .then((res) => {
        callback(res.data);
      })
      .catch(errorHandler);
  }

  getSellersList(callback, errorHandler) {
    axios
      .get(BASE_JSDB_URL + `seller`)
      .then((res) => {
        callback(res.data);
      })
      .catch(errorHandler);
  }

  getProductsList(callback, errorHandler) {
    axios
      .get(BASE_JSDB_URL + `product`)
      .then((res) => {
        callback(res.data);
      })
      .catch(errorHandler);
  }

  getDeliveryTypesList(callback, errorHandler) {
    axios
      .get(BASE_JSDB_URL + `delivery-type`)
      .then((res) => {
        callback(res.data);
      })
      .catch(errorHandler);
  }
}

const httpWrapper = new HttpWrapperClass();
export { httpWrapper };
