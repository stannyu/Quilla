<template>
  <div class="form_wrapper">
    <h2>Sellers Form</h2>
    <el-form
      :model="dynamicSellersForm"
      ref="dynamicSellersForm"
      label-width="120px"
      class="demo-dynamic"
    >
      <div v-for="(seller, index) in dynamicSellersForm.sellers" :key="index">
        <div class="el-form-item-row">
          <el-form-item
            class="form_item_container"
            :label="'Seller' + (index + 1)"
            :key="index"
            :prop="'sellers.' + index + '.name'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur'
            }"
          >
            <el-input
              v-model="seller.name"
              :prop="seller.name"
              class="seller_name_input"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="form_item_container"
            label="Percentage"
            :prop="'sellers.' + index + '.percentage'"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur'
            }"
          >
            <el-input-number
              v-model="seller.percentage"
              size="mini"
              :precision="2"
              :step="0.5"
              :max="100"
              :min="0.01"
            ></el-input-number>
          </el-form-item>
          <el-button
            class="delete_button"
            type="danger"
            icon="el-icon-delete"
            @click.prevent="removeDomain(seller)"
            circle
          ></el-button>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicSellersForm')"
          >Submit</el-button
        >
        <el-button @click="addDomain">+ Seller</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dynamicSellersForm: {
        sellers: []
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
  computed: {
    ...mapGetters({
      sellersList: 'getSellersList'
    })
  },
  props: ['finalizeFlag'],

  watch: {
    sellersList: function () {
      this.dynamicSellersForm.sellers = this.sellersList;
    },
    finalizeFlag: function () {
      this.finalizeCall();
    }
  },
  methods: {
    finalizeCall() {
      this.submitForm('dynamicSellersForm', true);
    },
    submitForm(formName, finalizeFlag = false) {
      this.$refs[formName].validate((valid) => {
        let resultPercentage = 0;
        this.dynamicSellersForm.sellers.map((seller) => {
          const { percentage } = seller;
          if (percentage) {
            resultPercentage += percentage;
          }
        });

        if (valid && finalizeFlag && resultPercentage === 100) {
          this.$alert(this.dynamicSellersForm, 'Form saved', {
            confirmButtonText: 'OK'
          });
          return;
        }
        if (valid && !finalizeFlag) {
          this.$alert(this.dynamicSellersForm, 'Form saved', {
            confirmButtonText: 'OK'
          });
        } else {
          this.$confirm('Could not submit Sellers Form', 'Warning', {
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
      let index = this.dynamicSellersForm.sellers.indexOf(item);
      if (index !== -1) {
        this.dynamicSellersForm.sellers.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicSellersForm.sellers.push({
        name: '',
        percentage: ''
      });
    }
  }
};
</script>

<style scoped lang="scss">
.form_wrapper {
  float: right;
  width: 45%;
  box-sizing: border-box;
  border: 3px solid lightblue;
  border-radius: 5px;
  padding: 30px;
}
.el-form-item-row {
  width: 100%;
  display: inline-block;
  .delete_button {
    margin-left: 20px;
  }
}
.form_item_container {
  float: left;
}
.seller_name_input {
  width: 200px;
}
</style>
