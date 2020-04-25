<template>
  <div></div>
</template>

<script>
  export default {
    name: "LogoutTable",
    created() {
      this.$store.dispatch('logout');
      this.$router.push({name: "Login"});
    }
  }
</script>

<style scoped>

</style>
