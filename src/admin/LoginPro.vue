<template>
  <div id = "bg">
    <nav>
      <h1>Waiting公益领养平台后台管理系统</h1>
    </nav>
    <section>
      <h2>管理员</h2>
      <p>
        账号 : <input type="text" v-focus v-model="userPro" placeholder="admin">
      </p>
      <p>
        密码 : <input type="password" v-model='pwdPro' @keyup.enter="login">
      </p>
      <p>
          <button @click="login">{{islogin}} {{time}}</button>
      </p>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userPro:"admin",
        pwdPro:"",
        islogin:"登录",
        time:""
      }
    },
    directives: {
            focus: {
                inserted: function (e) {
                e.focus()
                }
            }
            },
    methods: {
      login(){
        this.axios.post('http://127.0.0.1:3000/admin/login',Qs.stringify({root:this.userPro,pwd:this.pwdPro})).then(res=>{
            if(res.data.code==200){
              this.islogin="登录成功,正在跳转!"
              //设置session
              this.time="(2s)"
              setInterval(() => {
                this.time="("+(this.time.slice(1,2)-1)+"s)"
              }, 1000);
              sessionStorage.setItem("root",this.userPro)
              sessionStorage.setItem("rpwd",this.pwdPro)
              setTimeout(() => {
                this.$router.push({path: '/admin/user'})
            }, 2000);
              
            }else{
              this.islogin="登录失败!"
              setTimeout(() => {
                this.islogin="登 录"
            }, 1500);
              
              console.log("登录失败");
            }
        })
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
    min-width: 300px;
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
  margin-top: 20px;
}
nav h1 span{
  font-size:16px;
}

section{
  width:400px;
  min-width: 200px;
  height: 300px;
  border-radius: 5px;
  background: #fff;
  margin: 0 auto;
  margin-top: 150px;
  color: black
}
section h2{
  padding-top: 10px;
}
section p input{
  width: 220px;
  height: 30px;
  margin-top: 30px;
}
section p button{
  margin-top: 50px;
  width: 200px;
  height: 40px;
  font-size: 1rem;
}
</style>