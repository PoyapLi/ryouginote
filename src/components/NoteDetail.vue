<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记以显示</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }} </span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }} </span>
          <span> 状态：{{ statusText }} </span>
          <span class="iconfont icon-trash" @click="onDeleteNote "></span>
          <span class="iconfont" :class="isShowPreview?'icon-edit':'icon-eye'" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote"
                 @keydown="statusText='正在输入...'" placeholder="在此处输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowPreview" v-model="curNote.content" @input="onUpdateNote"
                    @keydown="statusText='正在输入...'" placeholder="在此处输入内容，支持 markdown 语法，点击右上角眼睛即可预览"
                    ></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NoteSidebar from "@/components/NoteSidebar";
import _ from 'lodash';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
  data () {
    return {
      statusText:'笔记未改动',
      isShowPreview: false,
    }
  },
  components:{
    NoteSidebar,
  },
  created(){
    this.checkLogin({path: '/login'})
  },

  computed:{
    ...mapGetters([
      'notes',
      'curNote'
    ]),

    previewContent(){
      return md.render(this.curNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    // 防抖
    onUpdateNote: _.debounce(function (){
      if(!this.curNote.id) return
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content:this.curNote.content})
        .then(data =>{
          this.statusText = '已保存'
        }).catch(data=>{
          this.statusText = '保存出错'
        })
    },300),

    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(data=>{
          this.$router.replace({path:'/note'})
        })
    }
  },
  beforeRouteUpdate(to,from,next){
    this.setCurNote({curNoteId: to.query.noteId})
    //放行的意思，没有 next() 代码不会继续下面的流程
    next()
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
