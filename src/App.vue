<template>
  <div id="app">
    <custom-header></custom-header>
    <main>
      <side-bar @toggle-page="togglePage" :activeUrl="activeUrl"></side-bar>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import CustomHeader from '@/components/Common/CustomHeader'
import SideBar from '@/components/Common/CircleSideBar'
export default {
  name: 'app',
  components: {
    CustomHeader,
    SideBar
  },
  computed: {
    activeUrl () {
      const urls = ['/post', '/system', '/user', '/feedback', '/report']
      var currentPath = this.$route.path
      var filter = urls.filter(url => currentPath.match(new RegExp(url)))
      return filter.length ? filter[0] : '/'
    }
  },
  methods: {
    togglePage (e) {
      let url = e.target.getAttribute('data-url') || e.target.parentElement.getAttribute('data-url')
      this.$router.push({
        path: `${url}`
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
    padding: 125px 0px 25px 125px
    overflow: auto
</style>
