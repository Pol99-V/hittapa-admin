<template>
  <div class="app flex-row align-items-start animated fadeIn" v-if="showLoginForm">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col class="mt-5">
          <div class="d-flex justify-content-center">
            <!--            <img src="img/brand/login_logo.svg" class="login-logo" alt="logo">-->
          </div>
          <b-card class="login-mt-50 border-0 rounded-0 login-card login-text-color mx-auto p-0" no-body
                  style="max-width: 499.33px; min-height: 412.02px; box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;">
            <b-card-body class="p-0" style="margin: 83.5px 37px 47.5px 37px;">
              <b-alert :show="!!feedBack" variant="danger">
                {{ feedBack }}
              </b-alert>
              <b-form novalidate v-on:submit.prevent="onSubmit">
                <b-form-group id="emailInputGroup"
                              label="Email"
                              label-class="mb-1"
                              label-for="email"
                              style="margin-bottom: 20.5px;"
                >
                  <b-form-input :state="chkState('email')"
                                aria-describedby="input1LiveFeedback1"
                                autocomplete="off"
                                autofocus
                                class="form-control login-input"
                                id="email"
                                type="email"
                                v-model.trim="$v.form.email.$model">
                  </b-form-input>
                  <b-form-invalid-feedback id="input1LiveFeedback1">
                    This is a required field and must be valid e-mail address
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="passInputGroup"
                              label="Password"
                              label-class="mb-1"
                              label-for="password"
                              style="margin-bottom: 20.5px;">
                  <b-form-input :state="chkState('password')"
                                aria-describedby="input1LiveFeedback2"
                                autocomplete="off"
                                class="form-control login-input"
                                id="password"
                                type="password"
                                v-model.trim="$v.form.password.$model"></b-form-input>
                  <b-form-invalid-feedback id="input1LiveFeedback2">
                    Required password containing at least 8 characters
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-button
                  :disabled="$v.form.$invalid || submitted"
                  block
                  class="btn login-button font-weight-bold"
                  style="margin-bottom: 17.1px;"
                  type="submit">
                  Login
                </b-button>
                <b-form-group class="text-center mb-0">
                  Forgot your password?&nbsp;<b-link class="login-text-green" to="forgot-password">Reset your password
                </b-link>
                </b-form-group>
                <!--<b-form-group class="text-center">
                  Don't have an account?&nbsp;<b-link to="register" class="login-text-green">Sign up</b-link>
                </b-form-group>-->
              </b-form>
            </b-card-body>
          </b-card>
          <!--<div style="max-width: 499.33px;" class="m-auto text-center">
            <div style="margin: 0 37px;">

              <button
                v-on:click="twitter()"
                type="button"
                class="btn login-button font-weight-bold btn-block"
                style="background-color: #00DCFF !important; border-color: #00DCFF !important; border-radius: 3px;">
                Sign In with Twitter
              </button>
            </div>

          </div>-->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import {validationMixin} from "vuelidate"
  import {email, minLength, required} from "vuelidate/lib/validators"

  const formShape = {
    email: "",
    password: "",
  };

  export default {
    name: 'Login',
    data() {
      return {
        form: Object.assign({}, formShape),
        feedBack: null,
        submitted: false
      }
    },
    computed: {
      formStr() {
        return JSON.stringify(this.form, null, 4)
      },
      isValid() {
        return !this.$v.form.$anyError
      },
      isDirty() {
        return this.$v.form.$anyDirty
      },
      authStatus() {
        return this.$store.getters.authStatus
      },
      showLoginForm() {
        return this.authStatus === 'error' || this.authStatus === '' || this.authStatus === undefined
      }
    },
    // mounted() {
    //   /*if (this.$route.query.t) {
    //     this.$store.dispatch('autoLogin',
    //       this.$route.query.t,
    //     )
    //       .then(() => {
    //         this.$router.push({name: "/"})
    //       })
    //       .catch(err => {
    //         this.feedBack = err.response.data.message;
    //         this.submitted = false
    //       })
    //
    //   }*/
    //   this.$store.dispatch('autoLogin') === true? this.$router.push({name: "/"}): this.$router.push({name: "Login"});
    //   this.$store.watch(
    //     (state, getters) => getters.authStatus,
    //     (newVal) => {
    //       if (newVal === 'success') {
    //         this.$router.push({ name: "Login" });
    //       }
    //     }
    //   );
    //   if (this.authStatus === 'success') this.$router.push("/")
    // },
    mixins: [validationMixin],
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6),
        },
      }
    },
    methods: {
      onSubmit() {
        if (this.validate()) {
          this.$nextTick(() => {
            // submit
            // console.log('submit:', this.formStr)
            this.submitted = true;
            this.$store.dispatch('login', {
              email: this.form.email,
              password: this.form.password
            })
              .then(() => {
                this.$router.push('/');
              })
              .catch(err => {
                console.log(err);
                this.feedBack = "Incorrect password or email";
                this.submitted = false
              })
          })
        }
      },
      chkState(val) {
        const field = this.$v.form[val];
        return field.$dirty ? !field.$invalid : null
      },
      findFirstError(component = this) {
        if (component.state === false) {
          if (component.$refs.input) {
            component.$refs.input.focus();
            return true
          }
          if (component.$refs.check) {
            component.$refs.check.focus();
            return true
          }
        }
        let focused = false;
        component.$children.some((child) => {
          focused = this.findFirstError(child);
          return focused
        });
        return focused
      },
      validate() {
        this.$v.$touch();
        this.$nextTick(() => this.findFirstError());
        return this.isValid;
      },
      twitter() {
        this.$router.push({name: 'Twitter'});
      }
    }
  }
</script>

<style scoped>
  .btn.disabled {
    cursor: auto;
  }

  input {
    height: 45px;
  }

  .btn {
    height: 45px;
    font-size: 18px;
  }


</style>
