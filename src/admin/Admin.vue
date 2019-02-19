<template>
  <div id = "bg">
    <nav>
      <h1><span>Waiting公益领养平台</span>后台管理系统 <span title="点击退出登录" @click="out">管理员:{{admin}}</span><span class="out" @click="out">退出</span></h1>
    </nav>
    <aside>
      <ul>
        <h3>用户管理</h3>
        <li @click="toUser">用户列表</li>
        <li>admin</li>
      </ul>
      <ul>
        <h3>宠物管理</h3>
        <li>小猫</li>
        <li>小狗</li>
        <li>其他</li>
      </ul>
      <ul>
        <h3>发布信息审核</h3>
        <li @click="toCheckList">待审核<span>({{checklength}})</span></li>
        <li>已审核<span>(101)</span></li>
      </ul>
    </aside>
    <section class="section">
      <router-view :check="check"></router-view>
    </section>
  </div>
</template>
<script>
import User from '@/admin/User.vue'
import CheckList from '@/admin/CheckList.vue'
  export default {
    data() {
      return {
        islogin : sessionStorage.getItem('root'),
        admin : sessionStorage.getItem("root"),
        check : [],
        checklength:0
      }
    },
    components: {
      User,
      CheckList
    },
    created() {
     
    if(!this.islogin){
      this.$router.push({path: '/loginpro'})
    }
    this.axios.post('http://127.0.0.1:3000/admin/getcheck').then(res=>{
          console.log(res.data);
          this.check=res.data
          this.checklength=res.data.length
        })
    },
    methods: {
      toCheckList(){
        this.$router.push({path: '/admin/checklist'})
      },
      toUser(){
        this.$router.push({path: '/admin/user'})
      },
      out(){
        sessionStorage.clear();
        this.$router.push({path: '/loginpro'})
      }
    },
  }
</script>
<style scoped>
#bg{
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-width: 1100px;
    background-color: #106f8e;
    background-image: url(/img/pro/main_bg.png);
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    color: #fff;
}
nav{
  height: 60px;
  line-height:60px;;
  background: none;
}
nav h1{
  font-size: 30px;
}
nav h1 span{
  font-size:16px;
}
aside{
width: 200px;
height:800px;
float: left;
}
aside ul{
  margin-top: 30px;
}
aside li{
height: 45px;
line-height: 45px;
}
aside li:hover{
  background: #287D9B;
  cursor: pointer;
}
.section{
  float: left;
  width: 80%;
  min-width: 900px;
  height: 800px;
  border-radius: 5px;
  background: #fff;
}
.out{
  cursor: pointer;
  color: #eee;
}
.out:hover{
  text-decoration: underline;
}

</style>