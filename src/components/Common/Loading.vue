<template>
  <p class="loading-wrapper">
    <i></i>
    <i></i>
    <i></i>
  </p>
</template>

<script>
  export default {
    name: 'Loading'
  }
</script>

<style scoped lang="sass">
  .loading-wrapper
    font-size: 0px
    line-height: 50px
    i
      display: inline-block
      background-color: #DCC7C7
      width: 10px
      height: 10px
      vertical-align: top
      margin-top: 20px
      -webkit-border-radius: 50%
      -moz-border-radius: 50%
      border-radius: 50%
    i + i
      margin-left: 10px
    i:first-of-type
      -webkit-animation: first-dot-animate 2.4s infinite
      -o-animation: first-dot-animate 2.4s infinite
      animation: first-dot-animate 2.4s infinite
    i:nth-of-type(2)
      -webkit-animation: second-dot-animate 2.4s infinite
      -o-animation: second-dot-animate 2.4s infinite
      animation: second-dot-animate 2.4s infinite
    i:nth-of-type(3)
      -webkit-animation: third-dot-animate 2.4s infinite
      -o-animation: third-dot-animate 2.4s infinite
      animation: third-dot-animate 2.4s infinite
  @keyframes first-dot-animate
    0%, 25%
      opacity: 0
    25.00000001%, 100%
      opacity: 1
  @keyframes second-dot-animate
    0%, 50%
      opacity: 0
    50.00000001%, 100%
      opacity: 1
  @keyframes third-dot-animate
    0%, 75%
      opacity: 0
    75.00000001%, 100%
      opacity: 1
</style>
