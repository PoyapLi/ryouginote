<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '@/apis/auth';
import {mapGetters, mapActions} from 'vuex';

export default {
  data() {
    return {}
  },
  created() {
    this.setUser()
  },

  methods:{
    ...mapActions({
      'setUser':'checkLogin'
    })
  },

  computed:{
    ...mapGetters([
      'username',
      'slug'
    ]),
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
