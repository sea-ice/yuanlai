<template>
  <div ref="messageContainer">
    <container class="right-container" title="历史消息">
      <p class="search-input" v-if="messageList.length">
        <el-input size="small" placeholder="请输入内容" suffix-icon="el-icon-search">
        </el-input>
      </p>
      <ul class="message-list" v-if="messageList.length">
        <li>
          <h3>To 所有用户</h3>
          <p>这里是因为你的/etc/hosts没有写上映射,在文件中添加上你的IP加上localhost 看这个图</p>
          <time>2017-10-15 12:23:34</time>
        </li>
      </ul>
      <p class="no-message" v-else>
        <i>暂无历史记录</i>
      </p>
    </container>
    <main>
      <container title="发送消息">
        <section class="choose-receiver">
          <h3>选择发送对象</h3>
          <div>
            <div>
              <label class="field-label" for="all-user">
                <input type="radio" id="all-user" value="allUser" v-model="userMode">
                <span>所有用户</span>
              </label>
            </div>
            <div class="add-specific-user">
              <label class="field-label" for="specify-user">
                <input type="radio" id="specify-user" value="specificUser" v-model="userMode">
                <span>指定ID</span>
              </label>
              <transition name="slide">
                <p v-if="userMode === 'specificUser'">
                  <input type="text" v-model="search">
                  <span class="search-tip">点击搜索结果进行添加</span>
                </p>
              </transition>
            </div>
            <section style="padding-left: 10px;" v-if="loading">
              <loading></loading>
            </section>
            <section class="search-user has-user" v-else-if="receiver.id">
              <a href="javascript:void(0);" class="user-item" @click="selectUser(receiver)">
                <i :style="{backgroundImage: `url(${receiver.avator || receiver.gender === '男' ? Images.MaleNull : Images.FemaleNull})`}"
                   class="user-avator"
                ></i>
                <p class="user-info">
                  <span>{{ receiver.nickName }}</span>
                  <i v-if="receiver.gender"
                     :style="{backgroundImage: `url(${receiver.gender === '男' ? Images.Male : Images.Female})`}"
                  ></i>
                </p>
              </a>
            </section>
            <section class="search-user no-user" v-if="noUser">
              <p>该用户不存在</p>
            </section>
            <section class="selected-user" v-if="userMode === 'specificUser'">
              <h4>已选择的用户ID：<span style="color: red;" v-if="receivers.length">（点击下面的用户项可移除）</span></h4>
              <ul class="selected-user-list" v-if="receivers.length">
                <li v-for="r in receivers" class="user-item selected-user-item" @click="deleteUser(r)">
                  <i :style="{backgroundImage: `url(${r.avator || r.gender === '男' ? Images.MaleNull : Images.FemaleNull})`}"
                     class="user-avator"
                  ></i>
                  <p class="user-info">
                    <span>{{ r.nickName }}</span>
                    <i v-if="r.gender"
                       :style="{backgroundImage: `url(${r.gender === '男' ? Images.Male : Images.Female})`}"
                    ></i>
                  </p>
                </li>
              </ul>
              <p class="no-user" style="text-align: center;" v-else><i>暂未选择任何用户</i></p>
            </section>
          </div>
        </section>
        <section class="editor-wrapper">
          <h3>编辑内容</h3>
          <div id="message-editor"></div>
          <div class="btn-wrapper">
            <el-button type="primary" round>发 布</el-button>
          </div>
        </section>
      </container>
    </main>
  </div>
</template>

<script>
  import Container from '@/components/Common/Container'
  import Loading from '@/components/Common/Loading'
  import Editor from 'wangeditor'
  import {getMessageList, getUserInfo} from '@/api/systemMessage'
  import Images from '@/assets/js/images'
  import {debounce} from '@/assets/js/utils'
  export default {
    name: 'SystemMessage',
    components: {
      Container,
      Loading
    },
    mounted () {
      this.$refs.messageContainer.parentNode.style.height = 'auto'
      this.editor = new Editor('#message-editor')
      this.editor.create()
      this._getMessageList()
      this._bounceUserSearch = debounce((v) => {
        this._getUserInfo(v)
      }, 500)
    },
    watch: {
      userMode (newVal) {
        this.target = newVal === 'allUser' ? [0] : this.receivers
        this.receiver = {}
        this.search = ''
        this.noUser = false
      },
      search (newVal, oldVal) {
        if (newVal !== oldVal) {
          this._bounceUserSearch(newVal)
        }
      }
    },
    data () {
      return {
        Images,
        messageList: [],
        userMode: 'allUser',
        loading: false,
        noUser: false,
        search: '',
        receiver: {},
        receivers: [],
        target: []
      }
    },
    methods: {
      _getMessageList () {
        getMessageList().then(data => {
          console.log(data)
          if (data.code === 0) {
            this.messageList = data.data.messageList
          }
        }).catch(error => {
          console.log(error)
        })
      },
      _getUserInfo (id) {
        id = id.trim()
        if (!id) {
          this.receiver = {}
          this.noUser = false
          return
        }
        this.loading = true
        getUserInfo(id).then(data => {
          if (data.code === 0) {
            this.receiver = data.data.userInfo
            this.noUser = false
          } else {
            if (this.receiver.id) this.receiver = {}
            this.noUser = true
          }
          this.loading = false
        }).catch(error => {
          console.log(error)
          if (this.receiver.id) this.receiver = {}
          this.loading = false
          this.noUser = true
        })
      },
      selectUser (item) {
        if (~this.receivers.findIndex(v => v.id === item.id)) return
        this.receivers.push(item)
      },
      deleteUser (item) {
        var i = this.receivers.findIndex(v => v.id === item.id)
        if (~i) this.receivers.splice(i, 1)
      }
    }
  }
</script>

<style scoped lang="sass">
  .right-container
    float: right
    width: 360px
  main
    padding-right: 375px
    & > div
      height: 100%
  .choose-receiver
    display: flex
    h3
      width: 120px
      line-height: 40px
    & > div
      margin-left: 40px
      margin-top: 5px
      flex-grow: 1
  .add-specific-user
    display: flex
    input[type=text]
      outline: none
      padding: 3px 5px
      margin-right: 10px
    .search-tip
      color: green
      font-size: 14px
  .field-label
    display: inline-block
    line-height: 30px
    margin-right: 20px
    span
      display: inline-block
      font-size: 14px
  .search-user
    height: 50px
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    &.no-user
      padding: 10px
      color: red
  .has-user
    padding: 5px 0px
  .user-item
    display: inline-flex
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    height: 40px
    padding: 5px
    line-height: 28px
    -webkit-border-radius: 3px
    -moz-border-radius: 3px
    border-radius: 3px
    border: 1px solid rgb(209, 219, 229)
    &:hover
      background-color: rgb(209, 219, 229)
    .user-avator
      display: block
      width: 28px
      -webkit-background-size: contain
      background-size: contain
      background-repeat: no-repeat
      -webkit-border-radius: 50%
      -moz-border-radius: 50%
      border-radius: 50%
      margin-right: 10px
    .user-info
      display: flex
      justify-content: space-between
      width: 80px
      span
        display: block
        max-width: 50px
        overflow: hidden
        -ms-text-overflow: ellipsis
        text-overflow: ellipsis
        white-space: nowrap
        font-size: 14px
        line-height: 28px
      i
        display: block
        width: 20px
        height: 20px
        -webkit-background-size: contain
        background-size: contain
        background-repeat: no-repeat
        margin-top: 4px
  .selected-user-list > li
    cursor: pointer
    margin-top: 10px
    &:not(:nth-of-type(4n))
      margin-right: 10px

  .no-user
    font-size: 14px
    color: #999
    line-height: 30px
  .selected-user
    -webkit-border-radius: 3px
    -moz-border-radius: 3px
    border-radius: 3px
    border: 1px dashed rgb(209, 219, 229)
    padding: 10px
    h4
      font-size: 14px

  .editor-wrapper
    margin-top: 10px
    h3
      line-height: 40px
    .btn-wrapper
      margin-top: 10px
      text-align: center

  .search-input
    position: absolute
    width: 200px
    top: 10px
    right: 30px
  .message-list
    li
      padding: 8px 10px 10px
      border: 1px solid rgb(209, 219, 229)
      -webkit-border-radius: 5px
      -moz-border-radius: 5px
      border-radius: 5px
      &:after
        content: ''
        display: block
        width: 0px
        height: 0px
        clear: right
      h3
        line-height: 30px
        font-weight: bold
      p
        line-height: 20px
        max-height: 80px
        overflow: hidden
        -ms-text-overflow: ellipsis
        text-overflow: ellipsis
        font-size: 14px
        margin-bottom: 8px
      time
        float: right
        font-size: 14px
    &>li + li
      margin-top: 10px
  .no-message
    text-align: center
    margin: 20px 0
    color: #999

  .slide-enter-active, .slide-leave-active
    transition: all .5s ease-in-out
  .slide-enter, .slide-leave-to
    opacity: 0
    margin-left: -50px
</style>
