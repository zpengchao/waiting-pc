<template>
  <div id="main">
      <nav><a>Waiting首页</a><span>&nbsp;>&nbsp;</span><a>宠物领养</a><span>&nbsp;>&nbsp;</span><a>{{petclass}}</a><span>&nbsp;>&nbsp;</span><a>内容详情</a></nav>
      <div class="detail">
          <h1><img src="img/header/claw.png">{{intro}}</h1>
          <h4>由用户:<span>{{master}}</span>发表于<span>{{create_time.slice(0,10)}}&nbsp;/&nbsp;{{create_time.slice(11,16)}}</span><span class="pname">宠物名:{{pname}}</span>来自:{{city}} </h4>
          <div class="img"></div>
          <div class="imgs">
            <img v-if="img1" :src="img1" alt="" :class="active1" title="点击查看大图" @click="big1">
            <img :class="active2" v-if="img2" :src="img2" alt="" title="点击查看大图" @click="big2">
            <img :class="active3" v-if="img3" :src="img3" alt="" title="点击查看大图" @click="big3">
            <img :class="active4" v-if="img4" :src="img4" alt="" title="点击查看大图" @click="big4">
          </div>
          <div class="bigImg">
              <img :src="bigImg" alt="">
          </div>
          <p class="details"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{details}}</p>
          <hr>
          <div class="details_bottom">
          <button><img src="img/header/claw.png">收藏</button><button><img src="img/header/claw.png">分享</button>
          </div>
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        ser_id:sessionStorage.getItem("ser_id"),
        petclass:"",
        intro:"",
        master:"",
        create_time:"",
        city:"",
        pname:"",
        details:"",
        img1:"",
        img2:"",
        img3:"",
        img4:"",
        active1:"",
        active2:"",
        active3:"",
        active4:"",
        bigImg:"",
        loadover:false
      }
    },
    methods: {
      big1(){
        this.active1="active"
        this.active2=""
        this.active3=""
        this.active4=""
        this.bigImg=this.img1
      },
      big2(){
        this.active1=""
        this.active2="active"
        this.active3=""
        this.active4=""
        this.bigImg=this.img2
      },
      big3(){
        this.active1=""
        this.active2=""
        this.active3="active"
        this.active4=""
        this.bigImg=this.img3
      },
      big4(){
        this.active1=""
        this.active2=""
        this.active3=""
        this.active4="active"
        this.bigImg=this.img4
      }
    },
    created() {
      this.axios.get("http://127.0.0.1:3000/pet/petDetails",{params:{ser_id:this.ser_id}}).then(res=>{
        var data = res.data[0]
        console.log(data);
        this.intro = data.intro;
        var petclass=res.data[0].ser_id.slice(0,1);
          if(petclass=="D")
            this.petclass="狗狗"
          else if(petclass=="C")
            this.petclass="小猫"
          else
            this.petclass="其他宠物"
        this.create_time = data.create_time 
        this.city=data.city  
        this.pname=data.pname
        this.details=data.details
        this.master=data.master
        this.img1 = data.img1
        this.img2 = data.img2
        this.img3 = data.img3
        this.img4 = data.img4
        this.master=data.master
        console.log(data.master);
      })
    },
    watch: {
      loadover(){
        this.big1()
      }
    }
  }
</script>
<style scoped>
 #main{
    margin: 0 auto;
    margin-top:70px; 
    width: 1200px;
    border: 1px solid transparent;
    box-shadow: 0 0 50px 2px #eee;
  }
  #main>nav{
    width: 90%;
    height: 40px;
    text-align: left;
    line-height: 40px;
    margin:10px 60px;
    margin-bottom:0px;  
    border-bottom:1px solid #e6e6e6;
  }
  #main>nav a:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .detail{
    width: 80%;
    margin: 10px auto;
  }
  .detail h1{
    text-align: left;
    margin-top: 15px;
    padding-left: 60px;
    font-size: 24px;
    word-wrap: break-word;
  }
  .detail h1 img{
    margin-right: 10px;
  }
  .detail h4{
    text-align: left;
    padding-left: 60px;
    color: #858585;
    margin-top: 8px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom:1px solid #aaa; 
  }
  .detail h4 span{
    margin:0 5px;
  }
  .detail h4 .pname{
    margin-left: 100px;
  }
  .imgs{
    width: 100%;
    height: auto;
    padding: 5px;
  }
  .imgs img{
    border-radius: 5px;
    width: 22%;
    margin: 0 10px 0 0;
    border: 2px solid transparent;
    background-repeat:no-repeat;
	  background-position:center center;
	  transition: all ease 0.7s;
	  background-size:cover;
    vertical-align: middle;
  }
  div.bigImg{
    width: 90%;
    height: auto;
    margin: 10px auto;
  }
  div.bigImg img{
    width: 100%;
    border-radius: 8px;
  }
  .active{
    border: 2px solid #fd0000 !important;
  }
  .details{
    width: 850px;
    height: auto;
    text-align: left;
    margin: 20px auto !important;
    font-size: 16px;
    color: #4f4f4f;
    font-weight: 400;
    line-height: 26px;
    margin: 0 0 16px;
    overflow-x: auto;
  }
  .details_bottom{
    width: 100%;
    height: auto;
    text-align: center;
  }
  .details_bottom button{
    width: 100px;
    height: 40px;
    color: #ca0c16;
    border: 1px solid #ca0c16;
    font-size: 14px;
    line-height: 30px;
    background: #fff;
    border-radius: 5px;
    margin: 10px 20px;
  }
  .details_bottom button:hover{
    background: #fde3e4;
  }
</style>