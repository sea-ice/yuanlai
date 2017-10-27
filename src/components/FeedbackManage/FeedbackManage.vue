<template>
  <container title="反馈管理" style="height: 100%;" ref="feedbackContainer">

  </container>
</template>

<script>
  import Container from '@/components/Common/Container'
  export default {
    name: 'FeedbackManage',
    components: {
      Container
    },
    mounted () {
      this.$refs.feedbackContainer.parentNode.style.height = '100%'
    }
  }
</script>

<style scoped lang="sass">

</style>
