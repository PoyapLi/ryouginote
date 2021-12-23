<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记以显示</div>
      <div v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }} </span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }} </span>
          <span> {{ statusText }} </span>
          <span class="iconfont icon-delete" ></span>
          <span class="iconfont icon-fullscreen" ></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="updateNote" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="true" v-model:value="curNote.content" @input="updateNote" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Auth from '@/apis/auth';
import NoteSidebar from "@/components/NoteSidebar";
import Bus from '../helpers/bus';
import _ from 'lodash';
import Notes from '@/apis/notes'

window.Notes = Notes

export default {
  data () {
    return {
      curNote:{},
      notes:[],
      statusText:'笔记未改动'
    }
  },
  components:{
    NoteSidebar
  },
  created(){
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin){
          this.$router.push({ path: '/login'})
        }
      })

    Bus.$once('update:notes', val =>{
      this.curNote = val.find(note => note.id == this.$route.query.noteId) || {}
      console.log('这是 sidebar 传过来的 ',this.curNote)
    })
  },
  beforeRouteUpdate(to,from,next){
    this.curNote = this.notes.find(note => note.id == to.query.noteId) || {}
    //放行的意思，没有 next() 代码不会继续下面的流程
    next()
  },
  methods: {
    // 防抖
    updateNote: _.debounce(function (){
      Notes.updateNote({noteId: this.curNote.id}, {title: this.curNote.title, content:this.curNote.content})
        .then(data =>{
          this.statusText = '已保存'
        }).catch(data=>{
          this.statusText = '保存出错'
        })
    },300)
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
