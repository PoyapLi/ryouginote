<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
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
  cursor: default;
  display: inline-block;
  width: 38px;
  height: 38px;
  text-align: center;
  line-height: 38px;
  border-radius: 30%;
  background: rgb(106,172,193);
  color: #fff;
  text-shadow: 1px 0 1px rgb(60,126,162);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
