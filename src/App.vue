<template>
  <router-view>
  </router-view>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  // components: {

  // },
  mounted() {
    // this.$store.state.test = '11'
    // debugger

  },
  methods: {
    exit() {
      this.$router.push({ path: '/hello' })
    }
  }
}
</script>