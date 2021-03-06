<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{note.updatedAtFriendly}}</span>
            <span class="title">{{note.title ? note.title : '（空）'}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="curTrashNote">
        <span>创建日期：{{curTrashNote.createdAtFriendly}}</span>
        <span> | </span>
        <span>更新日期：{{curTrashNote.updatedAtFriendly}}</span>
        <span> | </span>
        <span>所属笔记本：{{belongTo}}</span>
        <a class="btn action atRevert" @click="onRevert">恢复</a>
        <a class="btn action atDelete" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{curTrashNote.title}}</span>
      </div>
      <div class="editor">
        <markdown-it-vue-light class="preview markdown-body" :content="compiledMarkdown"></markdown-it-vue-light>
      </div>
    </div>
  </div>
</template>

<script>

import MarkdownIt from 'markdown-it';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'

let md = new MarkdownIt()

export default {
  data () {
    return {
      curTrashNoteContent:''
    }
  },
  components:{
    MarkdownItVueLight
  },
  created(){
    this.checkLogin({path:'/login'})
    this.getNotebooks()
    this.getTrashNotes()
      .then(()=>{
        this.setCurTrashNote({curTrashNotedId: this.$route.query.noteId})
        this.$router.replace({
          path:'/trash',
          query:{noteId: this.curTrashNote.id}
        })
      })
  },

  computed:{
  ...mapGetters([
    'trashNotes',
    'curTrashNote',
    'belongTo'
  ]),

    compiledMarkdown(){
      return this.curTrashNoteContent = this.curTrashNote.content || ''
    }
  },
  methods:{
    ...mapMutations([
      'setCurTrashNote'
    ]),

    ...mapActions([
      'checkLogin',
      'deleteTrashNote',
      'getTrashNotes',
      'revertTrashNote',
      'getNotebooks'
    ]),

    onDelete(){
      this.$confirm('彻底删除后无法恢复', '确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        return this.deleteTrashNote({noteId: this.curTrashNote.id})
      }).then(()=>{
        this.setCurTrashNote()
        this.$router.replace({
          path:'/trash',
          query:{noteId: this.curTrashNote.id}
        })
      })
    },
    onRevert(){
      this.revertTrashNote({noteId: this.curTrashNote.id})
        .then(()=>{
          this.setCurTrashNote()
          this.$router.replace({
            path:'/trash',
            query:{noteId: this.curTrashNote.id}
          })
        })
    },
  },
  beforeRouteUpdate(to, from, next){
    this.setCurTrashNote({curTrashNoteId: to.query.noteId})
    next()
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-detail.less);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
    }
    .atRevert{
      background-color: #50a14f;
      color:white;
    }
    .atDelete{
      background-color: #de2020;
      color:white;
    }
  }
}

</style>
