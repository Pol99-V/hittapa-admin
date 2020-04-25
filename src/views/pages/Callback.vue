<template>
  <div class="animated fadeIn">
<!--    <widget-loader></widget-loader>-->
  </div>
</template>

<script>

  export default {
    name: "Callback",
    components: {},
    data() {
      return {
        token: '',
      }
    },
    mounted() {
      this.token = this.$route.params.token;
      this.$store.dispatch('autoLogin', this.token).then(_ => this.$router.push('/')).catch(_ => this.$router.push('/'));
    },
    methods: {
      handleLoginEvent(data) {
        console.log(data)
      }
    },
    created() {
      // this.$auth.getIdTokenClaims().then(e => console.log(e))
    }
  }
</script>

<style scoped>

</style>
