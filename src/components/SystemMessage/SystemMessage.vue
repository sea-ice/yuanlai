<template>
  <div ref="messageContainer">
    <container class="right-container" title="历史消息">
      <p class="search-input">
        <el-input size="small" placeholder="请输入内容" suffix-icon="el-icon-search">
        </el-input>
      </p>
      <ul class="message-list">
        <li>
          <h3>To 所有用户</h3>
          <p>这里是因为你的/etc/hosts没有写上映射,在文件中添加上你的IP加上localhost 看这个图</p>
          <time>2017-10-15 12:23:34</time>
        </li>
      </ul>
    </container>
    <main>
      <container title="发送消息">
        <section class="choose-receiver">
          <h3>选择发送对象</h3>
          <div>
            <p>
              <label class="field-label" for="all-user">
                <input type="radio" name="selectUser" checked id="all-user">
                <span>所有用户</span>
              </label>
            </p>
            <p>
              <label class="field-label" for="specify-user">
                <input type="radio" name="selectUser" id="specify-user">
                <span>指定ID</span>
              </label>
              <input type="text">
              <span class="search-tip">点击搜索结果进行添加</span>
            </p>
            <section class="search-user">
              <p class="no-user">该用户不存在</p>
            </section>
            <section class="selected-user">
              <h4>已选择的用户ID：</h4>
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
  import Editor from 'wangeditor'
  export default {
    name: 'SystemMessage',
    components: {
      Container
    },
    mounted () {
      this.$refs.messageContainer.parentNode.style.height = 'auto'
      this.editor = new Editor('#message-editor')
      this.editor.create()
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
      line-height: 40px
    & > div
      margin-left: 40px
      flex-grow: 1
    .field-label
      display: inline-block
      line-height: 30px
      margin-right: 10px
      span
        display: inline-block
        font-size: 14px
    input
      outline: none
      padding: 3px 5px
      margin-right: 10px
    .search-tip
      color: green
      font-size: 14px
  .search-user
    min-height: 50px
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    padding: 10px
    .no-user
      line-height: 30px
      font-size: 14px
      color: red
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
</style>
