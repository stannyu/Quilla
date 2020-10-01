<template>
  <div class="form_wrapper">
    <h2>Orders Form</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Order Date" required>
        <el-col>
          <el-form-item prop="date">
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="ruleForm.date"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="Client" prop="client" required>
        <el-select
          v-model="ruleForm.client"
          value-key="id"
          placeholder="Client"
          @change="clientChangeHandler"
        >
          <el-option
            v-for="client in clientsList"
            :label="client.name"
            :value="client"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Contact" prop="contact" required>
        <el-select
          v-model="ruleForm.contact"
          placeholder="Contact"
          :disabled="selectedClientContacts.length === 0"
        >
          <el-option
            v-for="contact in selectedClientContacts"
            :label="contact.name"
            :value="contact"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          Save
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { httpWrapper } from '../http/http-service';

export default {
  data() {
    return {
      selectedClientContacts: [],
      ruleForm: {
        date: '',
        client: '',
        contact: ''
      },
      rules: {
        date: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change'
          }
        ],
        client: [
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
  watch: {
    finalizeFlag: function () {
      this.finalizeCall();
    }
  },
  computed: {
    ...mapGetters({
      clientsList: 'getClientsList'
    })
  },
  methods: {
    finalizeCall() {
      this.submitForm('ruleForm');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$alert(this.ruleForm, 'Form saved', {
            confirmButtonText: 'OK'
          });
        } else {
          this.$confirm('Could not submit Order Form', 'Warning', {
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
    clientChangeHandler(client) {
      httpWrapper.getClientContacts(
        client.id,
        this.handleClientContacts,
        this.errorsHandler
      );
    },
    handleClientContacts(data) {
      this.selectedClientContacts = data[0].contacts;
    },
    errorsHandler(error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss" scoped>
.form_wrapper {
  box-sizing: border-box;
  float: left;
  width: 50%;
  border: 3px solid lightblue;
  border-radius: 5px;
  padding: 30px;
}
.dat_picker_wrapper {
  width: 100px;
}
</style>
