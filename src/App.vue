<template>
  <div id="app">
    <custom-header></custom-header>
    <main>
      <side-bar @toggle-page="togglePage"></side-bar>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import CustomHeader from '@/components/Common/CustomHeader'
import SideBar from '@/components/Common/SideBar'
export default {
  name: 'app',
  components: {
    CustomHeader,
    SideBar
  },
  methods: {
    togglePage (e) {
      let url = e.target.getAttribute('data-url')
      this.$router.push({
        path: `${url || e.target.parentElement.getAttribute('data-url')}`
      })
    }
  }
}
</script>

<style scoped lang="sass">
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  main
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    padding: 75px 15px 15px 75px
    overflow: auto
</style>
