<template>
  <div class="bg">
    <h2><label><input type="radio" name="sea_type" value="1" v-model="checked">用户编号</label> <label><input type="radio" name="sea_type" value="2" v-model="checked" >用户名</label> <input type="text"  placeholder="不填获取用户列表" v-model="val" @keyup.enter="searchUser"/><button class="search" @click="searchUser">搜索</button></h2>
    <div class="main">
    <table class="tab">
      <tr>
        <th>用户编号</th>
        <th>用户名</th>
        <th>手机号</th>
        <th>qq</th>
        <th>微信号</th>
        <th>邮箱</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in userList" :key="item.index">
        <td>{{item.uid}}</td>
        <td>{{item.uname}}</td>
        <td>{{item.tel}}</td>
        <td>{{item.qq}}</td>
        <td>{{item.weixin}}</td>
        <td>{{item.email}}</td>
        <td>
          <!-- <span class="ope" >修改</span> /  -->
          <span v-show="!isdel" class="ope" @click="isDel(item.uid)">删除</span>
          <span v-show="isdel && uid==item.uid"><span @click="delUser(item.uid)" class="ope">确定</span> / <span @click="cancel" class="ope">取消</span></span>
        </td>
      </tr>
    </table>
    </div>
    <footer>
        <span v-if="userList.length>0">
            <button class="lastP" @click="lastP" v-if="pageCount>1">上一页</button>
            <span class="noact" v-if="pageCount!=1">{{pageCount-1}}</span> &nbsp;&nbsp;
            <span class="active">{{pageCount}}</span>&nbsp;&nbsp;
            <span class="noact" v-if="pageCount!=allPage">{{pageCount+1}}</span>
            <button class="nextP" @click="nextP" v-if="pageCount<allPage">下一页</button>
        </span>
        <i></i>
        <span v-if="userList.length>0">跳转到</span>第<input type="text" v-model="pageCount">页 
         <span v-if="userList.length>0"><button @click="searchUser">确定</button></span>
        <span class="end">共{{allPage}}页 / 总计{{allCount}}条数据</span>
    </footer>
    <div class="msg">
        <h3></h3>
    </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      islogin:sessionStorage.getItem('root'),
      checked:"",
      val:"",
      userList:[],
      pageCount:1,
      allCount:"",
      allPage:"",
      isdel:false,
      uid:""
    }
  },
  created() {
    if(!this.islogin){
      this.$router.push({path: '/loginpro'})
    }
  },
  methods: {
    isDel(uid){
      this.uid=uid
      this.isdel=true
    },
    cancel(){
      this.isdel=false
    },
    lastP(){
      this.pageCount = this.pageCount-1
      console.log(this.pageCount);
      this.searchUser()
    },
    nextP(){
      console.log(this.pageCount);
      this.pageCount = this.pageCount+1
      console.log(this.pageCount);
      this.searchUser()
    },
    searchUser(){
      if(isNaN(this.pageCount)){
        this.pageCount=1
      }
      this.axios.post("http://127.0.0.1:3000/admin/user",Qs.stringify({
        seaTtpe:this.checked,
        val:this.val,
        pageCount:this.pageCount
      })
      ).then(res=>{
          this.userList=res.data.data;
          this.allCount=res.data.count;
          this.allPage=Math.ceil(this.allCount/25)
          console.log(this.userList);
      })
    },
    delUser(uid){
      this.axios.post("http://127.0.0.1:3000/admin/deleteUser",Qs.stringify({uid})).then(res=>{
        if(res.data.code==200){
          console.log("删除成功!");
          this.searchUser();
        }

      })
    } 

  }
} 
</script>
<style scoped>
.bg{
  color: black;
  position: relative;
}
h2{
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 30px;
}
h2 label{
  font-size: 14px;
  margin-left: 10px;
}
h2 input[type=text]{
  margin-left: 70px;
  height: 22px;
  border: 1px solide #a9a9a9;
}
h2 .search{
  display: inline-block;
  width: 70px;
  height: 26px;
  line-height: 24px;
  background: #014F73;
  border: 1px solid #014F73;
  color: white;
  border-radius:0 3px 3px 0;
  margin-top: 1px;
}
h2 .search:hover{
  background: #014F50;
  border: 1px solid #014F50;
}
div.main{
  width: 900px;
  height: 600px;
  margin: 0 auto;
}
.tab{
  margin-top: 30px;
  border: 1px solid #aaa;
  width: 900px;
  border: 1px solid red;
  margin: 0 auto;
  border-collapse:collapse;  
  border-spacing:0; 
}
.tab th{
  width: 150px;
  font-size: 18px;
  border: 1px solid #aaa;
  height: 25px;
}
.tab td{
  font-size: 16px;
  border: 1px solid #aaa;
  height: 22px;
  color: #555;
}
.ope{
  color: blue;
  cursor: pointer;
}
.ope:hover{
  text-decoration: underline;
}
footer{
  width: 600px;
  height: 50px;
  margin: 30px auto;
}
footer .lastP{
  margin-right: 10px
}
footer .nextP{
  margin-left: 10px
}
footer input[type=text]{
  width: 23px;
  text-align: center;
}
footer .end{
  margin-left: 30px;
}
footer i{
  margin-left: 30px;
}
.active{
  color: blue;
  text-decoration: underline;
}
.noact{
  color: #aaa;
}
</style>