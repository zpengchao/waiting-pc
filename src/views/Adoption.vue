<template>
  <div id="main">
    <nav><a>Waiting首页</a><span>&nbsp;>&nbsp;</span><a>宠物领养</a><span>&nbsp;>&nbsp;</span><a>{{pet}}</a></nav>
    <ul>
      <li @click="dog_list" :class="activeDog">汪星人</li>
      <li @click="cat_list" :class="activeCat">喵星人</li>
      <li @click="other_list" :class="activeOther">花鸟鱼虫</li>
    </ul>
    <div class="list">
      <!-- 狗 -->
      <div class="listP" v-if="activeDog=='active'" v-for="item in dogList" :key="item.index" @click="look(item)">
        <div class="p_img" @click="look(item)">
          <img :src="item.img1" alt="">
        </div>
        <div class="P_details">
          <h1 @click="look(item)">{{item.intro}}</h1><h4>宠物状态: <span>求领养</span></h4>
          <h3>宠物名 : <span>{{item.pname}}</span><span>编号:{{item.ser_id}}</span></h3>
          <p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {{item.details}}
          </p>
          <a href="javascript:;" @click="look(item)">查看详情</a>
          <h5>发布人: <span>{{item.master}}</span><span>发布日期: {{item.create_time.slice(0,10)}}</span></h5>
        </div>
      </div>
      <!-- 猫 -->
      <div class="listP" v-if="activeCat=='active'" v-for="item in catList" :key="item.index" >
          <div class="p_img" @click="look(item)">
              <img :src="item.img1" alt="">
            </div>
          <div class="P_details">
            <h1 @click="look(item)">{{item.intro}}</h1><h4>宠物状态: <span>求领养</span></h4>
            <h3>宠物名 : <span>{{item.pname}}</span><span>编号:{{item.ser_id}}</span></h3>
            <p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {{item.details}}
            </p>
            <a href="javascript:;" @click="look(item)">查看详情</a>
            <h5>发布人: <span>{{item.master}}</span><span>发布日期: {{item.create_time.slice(0,10)}}</span></h5>
          </div>
        </div>
      <!-- 花鸟鱼虫 -->
      <div class="listP" v-if="activeOther=='active'" v-for="item in otherList" :key="item.index" >
          <div class="p_img" @click="look(item)">
              <img :src="item.img1" alt="">
            </div>
          <div class="P_details">
            <h1 @click="look(item)">{{item.intro}}</h1><h4>宠物状态: <span>求领养</span></h4>
            <h3>宠物名 : <span>{{item.pname}}</span><span>编号:{{item.ser_id}}</span></h3>
            <p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {{item.details}}
            </p>
            <a href="javascript:;" @click="look(item)">查看详情</a>
            <h5>发布人: <span>{{item.master}}</span><span>发布日期: {{item.create_time.slice(0,10)}}</span></h5>
          </div>
        </div>
    </div>
    <div class="loadMore"><button @click="getMore">{{getM}}</button></div>
  </div>
</template>
<script>
export default {
        data(){
          return{
            pet:"狗狗",
            dogpno:1,
            catpno:1,
            otherpno:1,
            psize:5,
            hasMore:0,
            petClass:"",
            dogList:[],
            catList:[],
            otherList:[],
            activeDog:'active',
            activeCat:"",
            activeOther:"",
            getM:"加载更多..."
            }
        },
        watch: {
          hasMore(){
            this.getM="没有更多信息了"
            setTimeout(() => {
              this.getM="加载更多..."
            }, 1000);
          }
        },
        created() {
          this.dog_list()
        },
        methods: {
          look(item){
            sessionStorage.setItem("ser_id", item.ser_id)
            this.$router.push({path: '/details'})
                       // location.reload();
          },
          getMore(){
            if(this.activeDog=="active"){
            this.dogpno++;
            this.dog_list();
            }else if(this.activeCat=="active"){
            this.catpno++;
            this.cat_list();
            }else{
            this.otherpno++
            this.other_list();
            }
          },
          dog_list(){
            this.pet="狗狗";
            var before= this.dogList.length;
            var pno=this.dogpno
            this.activeCat="";
            this.activeOther="";
            this.activeDog="active";
            this.axios.get('http://127.0.0.1:3000/pet/dogList',{params:{pno:pno,psize:this.psize}}).then(res=>{
            var rows = this.dogList.concat(res.data.data);
            this.dogList = rows;
            var after = this.dogList.length;
            if (after-before<1){
                this.hasMore++;
            }
            })
          },
          cat_list(){
            this.pet="小猫";
            var before= this.catList.length;
            var pno=this.catpno;
            this.activeCat="active";
            this.activeOther="";
            this.activeDog="";
            this.axios.get('http://127.0.0.1:3000/pet/catList',{params:{pno:pno,psize:this.psize}}).then(res=>{
            var rows = this.catList.concat(res.data.data);
            this.catList=rows;
            var after = this.catList.length;
            if (after-before<1){
                this.hasMore++;
            }
            })
          },
          other_list(){
            this.pet="其他宠物";
            var before= this.otherList.length;
            var pno=this.otherpno;
            this.activeCat="";
            this.activeOther="active";
            this.activeDog="";
            this.axios.get('http://127.0.0.1:3000/pet/otherList',{params:{pno:pno,psize:this.psize}}).then(res=>{
            var rows = this.otherList.concat(res.data.data);
            this.otherList=rows;
            var after = this.otherList.length;
            if (after-before<1){
                this.hasMore++;
            }
            })
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
    box-shadow: 0 0 4px rgba(250,136,83,0.8)
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
  #main>ul{
    width: 90%;
    height: 40px;
    text-align: center;
    margin-left:60px;
  }
  #main>ul li{
    float: left;
    width: 10%;
    height: 40px;
    line-height: 40px;
    margin: 20px 40px;
    font-size: 1.3rem;
    color: #666;
    font-family: "华文琥珀";
    transition: .1s;
    border-bottom:2px solid transparent; 
    transition: .3s
  }
  #main>ul li:hover{
    border-bottom:2px solid #aaa; 
    cursor: pointer;
  }
  .active{
    border-bottom:2px solid #aaa !important; 
  }
  /* 宠物列表 */
  .list{
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
  }
  .list>div.listP{
    width: 100%;
    height: 200px;
    border-bottom:1px solid #c6c6c6;
    position: relative;
    margin: 20px 0;
  }
  .p_img{
    width: 245px;
    height: 195px;
    overflow: hidden;
	  border-radius: 10px;
	  border: 1px solid transparent;
  }
  .p_img img{
    width: 245px;
    height: 195px;
    background-repeat:no-repeat;
	  background-position:center center;
	  transition: all ease 0.7s;
	  background-size:cover;
  }
  .P_details{
    width: 760px;
    height: 200px;
    position: absolute;
    top: 0;
    right: 20px;
    text-align: left;
  }
  .P_details h1{
    cursor: pointer;
  }
  .P_details h1:hover,.P_details p:hover,.P_details h5 span:nth-child(1):hover{
    text-decoration: underline;
  }
  .P_details h1,.P_details h4{
    display: inline-block;
  }
  .P_details h4{
    position: absolute;
    top: 10px;
    right: 0;
  }
  .P_details h4 span{
    display: inline-block;
    width: 50px;
    height: 22px;
    text-align: center;
    line-height: 25px;
    background: #00BC00;
    color: white;
  }
  .P_details h3{
    margin: 15px 0;
    color: #aaa;
  }
  .P_details h3 span:nth-child(2){
    margin-left: 100px;
  }
  .P_details p{
    width: 100%;
    height: 30px;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis; 
  }
  .P_details a{
    display: inline-block;
    width: 150px;
    height: 40px;
    line-height: 45px;
    text-align: center;
    border:1px solid #684029;
    border-radius: 3px;
    color: #684029;
    margin: 5px 0px;
    transition: .2s;
  }
  .P_details a:hover{
    color: #000;
    background: rgba(250,136,83,0.9);
  }
  .state0{
    display: inline-block;
    margin-left: 500px;
    color: green;
  }
  .P_details h5{
    margin: 3px;
    color: #aaa;
  }
  .P_details h5 span,.P_details h3 span{
    display: inline-block;
    width: 150px;
    height: 10px;
  }
  .P_details h5 span:nth-child(2){
    position: absolute;
    top: 175px;
    right: 0px;
    margin-right: -30px;
  }
  .loadMore button{
    width: 150px;
    height: 40px;
    margin-bottom: 10px;
  }
</style>