<template>
  <div class="form_wrapper">
    <h2>Items Form</h2>
    <el-form
      :model="dynamicProductsForm"
      ref="dynamicProductsForm"
      label-width="120px"
      class="demo-dynamic"
    >
      <div v-for="(item, index) in dynamicProductsForm.items" :key="index">
        <div class="form_wrapper_row">
          <div v-if="item.type === 'generic'">
            <el-form-item
              class="name_container"
              :label="'Item' + index"
              :key="index"
              :prop="'items.' + index + '.name'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input v-model="item.name" :prop="item.name"></el-input>
            </el-form-item>
            <el-form-item
              class="form_item_container"
              size="mini"
              label="Price"
              :prop="'items.' + index + '.price'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input-number
                v-model="item.price"
                :precision="2"
                :step="0.5"
                :max="100"
                :min="0.01"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              class="form_item_container"
              size="mini"
              label="Ammount"
              :prop="'items.' + index + '.ammount'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input-number
                v-model="item.ammount"
                :step="1"
                :max="100"
                :min="1"
              ></el-input-number>
            </el-form-item>
            <el-button
              @click.prevent="removeDomain(item)"
              class="delete_button"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
          <div v-if="item.type === 'special'">
            <el-form-item
              class="name_container"
              :label="'Item' + index"
              :key="index"
              :prop="'items.' + index + '.name'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input v-model="item.name" :prop="item.name"></el-input>
            </el-form-item>
            <el-form-item
              label="Price"
              class="form_item_container"
              :prop="'items.' + index + '.price'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input-number
                size="mini"
                v-model="item.price"
                :precision="2"
                :step="0.5"
                :max="100"
                :min="0.01"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              class="form_item_container"
              size="mini"
              label="Ammount"
              :prop="'items.' + index + '.ammount'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input-number
                v-model="item.ammount"
                :step="1"
                :max="100"
                :min="1"
              ></el-input-number>
            </el-form-item>

            <el-form-item
              class="form_item_container"
              label="delivery type"
              :prop="'items.' + index + '.deliveryType'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-select
                class="form_wrapper_select"
                v-model="item.deliveryType"
                value-key="name"
                placeholder="delivery type"
                @change="(event) => handleDeliveryTypesChange(item, event)"
              >
                <el-option
                  v-for="type in deliveryTypes"
                  :label="type.name"
                  :value="type"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              class="comments_section"
              label="Comment"
              :prop="'items.' + index + '.comment'"
              :rules="{
                required: true,
                message: 'domain can not be null',
                trigger: 'blur'
              }"
            >
              <el-input type="textarea" v-model="item.comment"></el-input>
            </el-form-item>

            <el-button
              @click.prevent="removeDomain(item)"
              class="delete_button"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </div>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicProductsForm')"
          >Submit</el-button
        >
        <el-button @click="addItem('generic')">+ Generic</el-button>
        <el-button @click="addItem('special')">+ Special</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const GENERIC_TYPE_DEFAULT = {
  type: 'generic',
  name: 'Seller 1',
  price: 0.01,
  ammount: 2
};

const SPECIAL_TYPE_DEFAULT = {
  type: 'special',
  name: 'Seller 1',
  price: 0.01,
  ammount: 2,
  deliveryType: '',
  comment: ''
};

export default {
  data() {
    return {
      dynamicProductsForm: {
        items: []
      },
      rules: {
        date: [
          {
            type: 'date',
            required: false,
            message: 'Please pick a date',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: 'Please select Client',
            trigger: 'change'
          }
        ],
        contact: [
          {
            required: true,
            message: 'Please select Contact',
            trigger: 'change'
          }
        ]
      }
    };
  },
  props: ['finalizeFlag'],
  computed: {
    ...mapGetters({
      productsList: 'getProductsList',
      deliveryTypes: 'getDeliveryTypesList'
    })
  },
  watch: {
    productsList: function () {
      let typedProductList = [];
      this.productsList.map((product) => {
        product.type = 'generic';
        typedProductList.push({ ...product, type: 'generic' });
      });
      this.dynamicProductsForm.items = typedProductList;
    },
    finalizeFlag: function () {
      this.submitForm('dynamicProductsForm');
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$alert(this.dynamicProductsForm, 'Form saved', {
            confirmButtonText: 'OK'
          });
        } else {
          this.$confirm('Could not submit Items Form', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicProductsForm.items.indexOf(item);
      if (index !== -1) {
        this.dynamicProductsForm.items.splice(index, 1);
      }
    },
    addItem(type) {
      let itemToAdd;
      if (type === 'generic') {
        itemToAdd = GENERIC_TYPE_DEFAULT;
      } else if (type === 'special') {
        itemToAdd = SPECIAL_TYPE_DEFAULT;
      }
      this.dynamicProductsForm.items.push(itemToAdd);
    },
    handleDeliveryTypesChange(item, type) {
      item.deliveryTypes = type;
    }
  }
};
</script>

<style scoped lang="scss">
.form_wrapper {
  margin-top: 40px;
  display: inline-block;
  border: 3px solid lightblue;
  border-radius: 5px;
  padding: 30px;
  width: 100%;
  .form_wrapper_row {
    width: 100%;
    display: inline-block;
    .name_container {
      width: 300px;
      float: left;
      margin-right: 20px;
    }
    .form_item_container {
      float: left;
    }
    .delete_button {
      margin-left: 20px;
    }
    .form_wrapper_select {
      float: left;
      width: 200px;
    }
    .comments_section {
      float: left;
      width: 300px;
    }
  }
}
</style>
