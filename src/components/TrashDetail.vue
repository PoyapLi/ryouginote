<template>
  <div id="trash-detail">
    <h1>noteId : {{ $route.query.noteId }}</h1>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>

import Auth from '@/apis/auth';

export default {
  data () {
    return {
      msg: '回收站笔记详情页'
    }
  },
  created(){
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin){
          this.$router.push({ path: '/login'})
        }
      })
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
