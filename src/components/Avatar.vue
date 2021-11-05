<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '@/apis/auth';
import Bus from '@/helpers/bus';

export default {
  data() {
    return {
        username: '未登录',
    }
  },
  created() {
    Bus.$on('userInfo', value => {
      this.username = value.username
    })
    Auth.getInfo().then(res => {
      console.log(res)
      if(res.isLogin){
        this.username = res.data.username
      }
    })
  },
  computed:{
    slug(){
      return this.username.charAt(0)
    }
  }
}
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: rgb(106,172,193);
  color: #fff;
  text-shadow: 1px 0 1px rgb(60,126,162);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
