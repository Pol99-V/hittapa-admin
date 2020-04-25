<template>
  <div class="app flex-row align-items-start animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col class="mt-5">
          <div class="d-flex justify-content-center">
            <img class="login-logo" src="img/brand/login_logo.svg">
          </div>
          <b-card class="login-mt-50 p-4 border-0 rounded-0 login-card login-text-color mx-auto" no-body
                  style="max-width: 500px">
            <b-card-body>
              <b-form>
                <p class="text-center mt-4">Already member?&nbsp;<b-link class="login-text-green" to="login">Sign in
                </b-link>
                </p>
                <b-form-group class="mb-3" label="Email">
                  <b-form-input autocomplete="off" class="form-control login-input" type="text"/>
                </b-form-group>
                <b-form-group class="mb-3" label="Username">
                  <b-form-input autocomplete="off" class="form-control login-input" type="text"/>
                </b-form-group>
                <b-form-group class="mb-4" label="Password">
                  <b-form-input autocomplete="off" class="form-control login-input" type="password"/>
                </b-form-group>
                <h5 class="mb-4">Payment details</h5>
                <b-form-group class="mb-3" label="Credit Card Number">
                  <b-form-input autocomplete="off" class="form-control login-input" type="text"/>
                </b-form-group>
                <b-row class="mb-4">
                  <b-col sm="4">
                    <b-form-group label="Exp Month">
                      <b-form-input autocomplete="off" class="form-control login-input" type="text"/>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group label="Exp Year">
                      <b-form-input autocomplete="off" class="form-control login-input" type="text"/>
                    </b-form-group>
                  </b-col>
                  <b-col sm="4">
                    <b-form-group label="CSV">
                      <b-form-input autocomplete="off" class="form-control login-input" type="text"/>
                    </b-form-group>
                  </b-col>
                </b-row>
                <h5 class="mb-2">Choose your plan</h5>
                <div class="mb-3 d-flex">
                  <div>
                    <p-check class="p-fill p-curve custom-o" color="success"></p-check>
                  </div>
                  <div class="px-2">
                    <div class="font-weight-bold">
                      Annual Membership
                    </div>
                    <div>
                      Save 40% on monthly rates with annual subscription.
                    </div>
                  </div>
                  <div class="ml-auto text-right">
                    <div class="font-weight-bold">
                      $19.95
                    </div>
                    <div>
                      Per month
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex">
                  <div>
                    <p-check class="p-fill p-curve custom-o" color="success"></p-check>
                  </div>
                  <div class="px-2">
                    <div class="font-weight-bold">
                      Monthly
                    </div>
                    <div>
                      Billed every month.
                    </div>
                  </div>
                  <div class="ml-auto text-right">
                    <div class="font-weight-bold">
                      $29.95
                    </div>
                    <div>
                      Per month
                    </div>
                  </div>
                </div>
                <div class="mb-3 d-flex border rounded p-3" style="border-color: #00f6d1; !important;">
                  <div class="mr-auto">
                    TOTAL (Annually)
                  </div>
                  <div class="login-text-red mr-3">
                    <del>$359.40</del>
                  </div>
                  <div class="login-text-green">$239.40</div>
                </div>
                <div class="mb-3 d-flex">
                  <div>
                    <p-check class="p-fill p-curve custom-o" color="success"></p-check>
                  </div>
                  <div class="px-2">
                    Yes, I have read and agree to the
                    <b-link class="login-text-green" href="#">terms of service</b-link>
                    and
                    <b-link class="login-text-green" href="#">privacy policy.</b-link>
                    I understand sales are final - no refunds.
                  </div>
                </div>

                <b-button block class="btn login-button font-weight-bold mb-3">Create Account</b-button>

              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateAccount'
  }
</script>
<style scoped>
  .ml-auto.text-right {
    min-width: 80px;
  }

  input {
    height: 45px;
  }

  .btn {
    height: 45px;
    font-size: 18px;
  }

</style>
