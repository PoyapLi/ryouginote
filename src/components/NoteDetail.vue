<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">当前笔记本为空</div>
      <div class="note-empty" v-show="!curNote.id">请先创建笔记本或笔记</div>
      <div class="note-empty" v-show="!curNote.id">为保证使用体验请在 PC 端全屏打开</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }} | </span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }} | </span>
          <span> 保存进度：{{ statusText }}</span>
          <span class="iconfont icon-trash" @click="onDeleteNote "></span>
          <span  title="点击切换预览/编辑" class="iconfont" :class="isShowPreview ? 'icon-edit':'icon-eye'"
                @click="isShowPreview = !isShowPreview"></span>
          <span id="curStatus">{{isShowPreview ? '切换编辑' : '切换预览'}}</span>
        </div>
        <div class="note-title">
          <input type="text" maxlength="11" v-model:value="curNote.title" @input="onUpdateNote"
                 @keydown="statusText='正在输入...'" placeholder="在此处输入标题，不能超过11个字符">
        </div>
        <div class="editor">
          <codemirror id="codemirror" placeholder="请在此输入内容..."
                      v-model="curNote.content" :options="cmOptions"
                      v-show="!isShowPreview" @input="onUpdateNote"
                      @inputRead="statusText='正在输入...'"></codemirror>
          <markdown-it-vue-light class="preview markdown-body "
                                 v-show="isShowPreview"
                                 :content="previewContent"></markdown-it-vue-light>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NoteSidebar from "@/components/NoteSidebar";
import _ from 'lodash';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/base16-light.css'
import placeholder from '../../node_modules/codemirror/addon/display/placeholder.js'

export default {
  data () {
    return {
      content:'',
      statusText:'笔记未改动',
      isShowPreview: false,
      cmOptions: {
        smartIndent: false,
        electricChars: false,
        mode: 'text/x-markdown',
        theme: 'base16-light',
        lineNumbers: false,
        line: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {
          "Tab": function(cm){
            cm.replaceSelection("  " , "end");
          }
        }
      }
    }
  },
  components:{
    NoteSidebar,
    MarkdownItVueLight,
    codemirror,
    placeholder
  },
  created(){
    this.checkLogin({path: '/login'})
  },

  computed:{
    ...mapGetters([
      'notes',
      'curNote',
      'curBook'
    ]),
    previewContent(){
      return this.content = this.curNote.content || ''
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
    },1000),
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
#codemirror {
  height: 100%;
  font-size: 18px;
  pre.CodeMirror-placeholder {
    color: #ccc;
    font-size: 18px;
  }
}
</style>
