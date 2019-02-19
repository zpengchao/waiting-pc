<template>
    <div class="bg">
        <div class="main">
            <table>
              <tr>
                <th>序号</th>
                <th>宠物编号</th>
                <th>宠物种类</th>
                <th>城市</th>
                <th>宠物名</th>
                <th style="width:500px;">简介</th> 
                <th>详情</th>
                <th>发布人</th>
                <th style="width:50px;">图1</th>
                <th style="width:50px;">图2</th>
                <th style="width:50px;">图3</th>
                <th style="width:50px;">图4</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) in check" :key="item.index">
                <td>{{item.cid}}</td>
                <td>{{item.ser_id}}</td>
                <td>{{item.kind=="其他小动物" ? "其他" : item.kind}}</td>
                <td>{{item.city}}</td>
                <td>{{item.pname.length>5 ? item.pname.slice(0,5)+"..." : item.pname}}</td>
                <td>{{item.intro.length>15 ? item.intro.slice(0,15)+"..." : item.intro}}</td>
                <td @click="getdetails(item.details)"><span class="see">查看详情</span></td>
                <td>{{item.uname}}</td>
                <td @click="getimg(item.img1)"><span class="see">{{item.img1 ? "查看" : " "}}</span></td>
                <td @click="getimg(item.img2)"><span class="see">{{item.img2 ? "查看" : " "}}</span></td>
                <td @click="getimg(item.img3)"><span class="see">{{item.img3 ? "查看" : " "}}</span></td>
                <td @click="getimg(item.img4)"><span class="see">{{item.img4 ? "查看" : " "}}</span></td> 
                <td><span class="see" @click="pass(item)">通过</span> / <span class="see">拒绝</span></td>
              </tr>
            </table>
        </div>
        <div class="detail" v-show="seedetail" @click="exit">
            <p @click.stop class="seedet"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{detail}}</p>
        </div>
        <div class="detail" v-show="seeimg" @click="exit">
            <p><img :src="img_src" alt=""></p>
        </div>
  </div>
</template>
<script>
  export default{
      data() {
        return {
          seedetail:"",
          seeimg:"",
          detail:"",
          img_src:""
        }
      },
      props:["check"],
      created() {
      },
      methods: {
        pass(item){
         this.axios.post('http://127.0.0.1:3000/pet/addpet',Qs.stringify({
            pet_class:item.kind,
            city:item.city,
            pname:item.pname,
            intro:item.intro,
            details:item.details,
            master:item.uname,
            img1:item.img1,
            img2:item.img2,
            img3:item.img3,
            img4:item.img4,
            ser_id:item.ser_id,
            })).then(res=>{
              if(res.data.success==200){
                this.delCheck(item.cid)
                confirm("操作成功!");
                location.reload();
              }else{
                alert("Sorry!连接超时,请重试!")
              }
            })
        },
        delCheck(cid){
          this.axios.post('http://127.0.0.1:3000/admin/delCheck',"cid="+cid).then(res=>{
            console.log(res.data.code);
          })
        },
        exit(){
          this.seedetail=false;
          this.seeimg=false;
          this.detail="";
          this.img="";
        },
        getimg(img){
          if(img){
          this.img_src=img
          this.seeimg=true;
          }
        },
        getdetails(detail){
          this.detail=detail;
          this.seedetail=true;
        }
      },  
  }
</script>
<style scoped>
    .bg{
      color: black;
    }
    div.main{
    width: 1000px;
    height: 600px;
    margin: 0 auto;
    margin-top: 30px;
  }
  table{
    border: 1px solid #aaa;
    width: 100%;
    border: 1px solid red;
    border-collapse:collapse;  
    border-spacing:0; 
  }
  table th{
    width: 150px;
    font-size: 18px;
    border: 1px solid #aaa;
    height: 25px;
  }
  table td{
    font-size: 10px;
    border: 1px solid #aaa;
    height: 22px;
    color: #555;
  }
  .detail{
    width: 100%;
    height: 100%;
    position:fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0,0,0.5)
  }
  .detail p{
    width: 500px;
    height: 500px;
    margin: 0 auto;
    margin-top:150px; 
    background: #fff;
  }
  .see{
    color: blue;
    cursor: pointer;
  }
  .seedet{
    width: 90%;
    height: auto;
    padding: 20px;
    text-align: left;
  }
  </style>