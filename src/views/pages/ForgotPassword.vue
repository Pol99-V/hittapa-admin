<template>
  <div class="app flex-row align-items-start animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col class="mt-5">
          <div class="d-flex justify-content-center">
            <img class="login-logo" src="img/brand/login_logo.svg"/>
          </div>
          <b-card
            class="login-mt-50 p-4 border-0 rounded-0 login-card login-text-color mx-auto"
            no-body
            style="max-width: 500px"
          >
            <b-card-body v-if="mainBody">
              <b-form novalidate v-on:submit.prevent="onResetSubmit">
                <p class="text-muted text-center mt-4 login-text-green">Forgot Password</p>
                <b-form-group class="mb-3" label="Email">
                  <b-form-input
                    :state="chkState('email')"
                    aria-describedby="input1LiveFeedback2"
                    autocomplete="off"
                    autofocus
                    class="form-control login-input"
                    id="email"
                    type="email"
                    v-model.trim="$v.form.email.$model"
                  ></b-form-input>
                  <b-form-invalid-feedback
                    id="input1LiveFeedback2"
                  >This is a required field and must be valid e-mail address
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-button
                  :disabled="$v.form.$invalid"
                  @click="onResetSubmit"
                  block
                  class="btn login-button font-weight-bold mb-3"
                >Send
                </b-button>
                <b-link
                  class="cancel-button btn btn-secondary btn-block"
                  tag="button"
                  to="/auth/login"
                >Cancel
                </b-link>
              </b-form>
            </b-card-body>
            <b-card-body v-if="showLayoutWindow">
              <b-form-group
                class="text-center"
                style="margin-top:30px"
              >Check your email to reset your password
              </b-form-group>
            </b-card-body>
            <b-card-body v-if="errorLayout">
              <b-form-group class="text-center" style="margin-top:30px">This email is not registered</b-form-group>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<script>
  import axios from "axios";
  import config from "../../config";
  import {validationMixin} from "vuelidate";
  import {email, required} from "vuelidate/lib/validators";

  const formShape = {
    email: ""
  };

  export default {
    name: "ForgetPassword",

    created() {
    },
    data() {
      return {
        form: Object.assign({}, formShape),
        ResetSubmitted: false,
        showLayoutWindow: false,
        mainBody: true,
        errorLayout: false
      };
    },
    computed: {
      isValid() {
        return !this.$v.form.$anyError;
      }
    },
    mixins: [validationMixin],
    validations: {
      form: {
        email: {
          required,
          email
        }
      }
    },
    methods: {
      ResetValidate() {
        this.$v.form.$touch();
        this.$nextTick(() => this.findFirstError());
        return this.isValid;
      },
      chkState(val) {
        const field = this.$v.form[val];
        return field.$dirty ? !field.$invalid : null;
      },
      onResetSubmit() {
        if (this.ResetValidate()) {
          this.$nextTick(() => {
            axios({
              url: config.domain + "/forgot/password",
              headers: {
                client: "web",
                token: this.$store.state.auth.token
              },
              data: {
                email: this.form.email
              },
              method: "POST"
            })
              .then(resp => {
                this.mainBody = false;
                this.showLayoutWindow = true;
                this.responseTitle = "Change Password";
                this.responseMessage = resp.data.message;
              })
              .catch(err => {
                this.mainBody = false;
                this.errorLayout = true;
                this.responseTitle = "Change Password";
                this.responseMessage = err.response.data.message;
              })
              .finally(() => {
              });
          });
        }
      },
      findFirstError(component = this) {
        if (component.state === false) {
          if (component.$refs.input) {
            component.$refs.input.focus();
            return true;
          }
          if (component.$refs.check) {
            component.$refs.check.focus();
            return true;
          }
        }
        let focused = false;
        component.$children.some(child => {
          focused = this.findFirstError(child);
          return focused;
        });

        return focused;
      }
    }
  };
</script>


<style scoped>
  input {
    height: 45px;
  }

  .btn {
    height: 45px;
    font-size: 18px;
  }
</style>
