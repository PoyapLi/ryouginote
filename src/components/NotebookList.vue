<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本 </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表（{{notebooks.length}}）</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks"
                       :to="`/note?notebookId=${notebook.id}`" :key="notebook.id" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="actionE" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="actionD" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import Auth from '@/apis/auth';
import {mapState, mapActions, mapGetters} from 'vuex';

export default {
  data () {
    return {}
  },

  created(){
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin){
          this.$router.push({ path: '/login'})
        }
    })
    // dispatch 触发 actions 里的 getNotebooks
    this.$store.dispatch('getNotebooks')
  },

  computed:{
    ...mapGetters(['notebooks'])
  },

  methods:{
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook'
    ]),

    onCreate(){
      this.$prompt('请输入新标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不能超过30个字符'
      }).then(({ value }) => {
        this.addNotebook({title: value})
      })
    },

    onEdit(notebook){
      let title = ''
      this.$prompt('请输入新标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不能超过30个字符'
      }).then(({ value }) => {
        title = value
        this.updateNotebook({notebookId: notebook.id, title:value})
      })
    },

    onDelete(notebook){
      this.$confirm('确认要删除当前笔记吗？', '删除笔记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.deleteNotebook({notebookId: notebook.id})
      })
    }
  }

}
</script>

<style lang="less" scoped>

  @import url(../assets/css/notebook-list.less);

</style>
