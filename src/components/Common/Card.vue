<template>
  <div class="card-wrapper">
    <header>
      <h2>{{ title }}</h2>
      <slot name="widget"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="sass">
  .card-wrapper
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
    border: 1px solid rgb(209, 219, 229)
    header
      display: flex
      padding: 0 30px
      align-items: center
      justify-content: space-between
      border-bottom: 1px solid rgb(209, 219, 229)
    h2
      line-height: 50px
    main
      padding: 15px 30px
</style>
