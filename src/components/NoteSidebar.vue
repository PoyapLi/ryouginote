<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown class="notebook-title"  @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        我的笔记本1 <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item  command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import Notebooks from '@/apis/notebooks';
import Notes from '@/apis/notes';

export default {
  created(){
    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },
  data() {
    return {
      notebooks: [],
      notes:[
        {
          id:11,
          tittle:'假笔记1',
          updatedAtFriendly:'刚刚'
        },
        {
          id:12,
          tittle:'假笔记2',
          updatedAtFriendly:'三分钟前'
        }
      ],
      curBook: {}
    }
  },

  methods: {
    handleCommand(e) {
      console.log(e)
    },

    addNote() {

    }

  }
}

</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);

</style>


