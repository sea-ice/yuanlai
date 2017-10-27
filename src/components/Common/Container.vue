<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <main class="container-main">
      <slot></slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="sass">
  .container
    position: relative
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    background-color: #fff
    padding-bottom: 15px
    h2
      line-height: 50px
      text-indent: 30px
    main
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
      padding: 0 30px
</style>
