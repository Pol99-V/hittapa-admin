<template>
  <div class="app flex-row align-items-start animated fadeIn">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6 login-logo-mt">
          <div class="d-flex justify-content-center">
            <img class="logo-style" src="img/logo_white_letters.png"/>
          </div>
          <p class="login-text-color mt-5 text-center">
            You will be redirected to the app in 5 seconds.
            <br>
            If you are not automatically redirected, please
            <b-link to="/">click here.</b-link>
          </p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Success',
    mounted() {
      setTimeout(() => {
        this.$router.push("/")
      }, 3000)
    }
  }
</script>
<style scoped>
  .login-logo-mt {
    margin-top: 20%;
  }

  .logo-style {
    height: 60px;
    width: auto;
    z-index: 99;
  }
</style>
