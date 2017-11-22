<template>
  <div class="user-info">
    <p>用户ID：{{ user.id }}</p>
    <p>
      <span>用户名：{{ user.nickName }}</span>
      <i v-if="user.gender"
         class="user-gender"
         :style="{backgroundImage: `url(${ user.gender === '男' ? Images.Male : Images.Female })`}"
      ></i>
    </p>
    <p v-if="user.location">
      <i class="location-icon"></i>&nbsp;
      <span>{{ user.location }}</span>
    </p>
    <p v-if="user.school">
      <i class="education-icon"></i>&nbsp;
      <span>{{ user.school + ' ' + user.education }}</span>
    </p>
  </div>
</template>

<script>
  import Images from '@/assets/js/images'
  export default {
    name: 'UserInfoTooltip',
    props: {
      user: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        Images
      }
    }
  }
</script>

<style scoped lang="sass">
  .user-info
    p
      display: flex
      line-height: 20px
      align-items: center
    i
      display: block
      width: 18px
      height: 18px
      -webkit-background-size: contain
      background-size: contain
      background-repeat: no-repeat
    .location-icon
      background-image: url(../../assets/images/position.svg)
    .education-icon
      background-image: url(../../assets/images/education.svg)
    .user-gender
      margin-left: 10px
      width: 12px
      height: 12px
</style>
