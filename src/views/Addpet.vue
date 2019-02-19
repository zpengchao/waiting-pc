<template>
    <div id="main">
        <nav><a>Waiting首页</a><span>&nbsp;>&nbsp;</span><a>发布宠物信息</a></nav>
        <div class="input">
            <p class="pet_class"><span>宠物种类:</span><select v-model="pet_class"><option>小狗</option><option>小猫</option><option>其他小动物</option></select><i>⁎</i>
            <span>城市:</span><select v-model="pet_city"><option>郑州</option><option>北京</option><option>上海</option></select><i>⁎</i>
            </p>
            <p class="pet_name"><span>宠物名:</span><input type="text" maxlength="10" v-model="pet_name" ><i>⁎</i></p>
            <p class="pet_title"><span>标题:</span><input type="text" maxlength="30" v-model="pet_title" ><i>⁎</i></p>
            <p class="pet_detail"><span>请填写宠物详情 ( 选填 ) : </span></p>
            <p class="pet_text"><textarea v-model="pet_text"></textarea><!-- 800*250 --></p>
            <div class="file">
              <h4>上传图片 ( 至少上传一张 ) :</h4>
              <input type="file"  id="file" @change="file()"/><i>⁎</i>
              <input type="file"  id="file2" @change="file2()"/>
              <input type="file"  id="file3" @change="file3()"/>
              <input type="file"  id="file4" @change="file4()"/>
            </div>
            <p >提示 : 带 <i> ⁎ </i> 号的为必填项</p>
        </div>
        <button class="SubPet" @click="subPet">{{submit}}</button>
        <div class="msg" v-show="showmsg">
            <p><span>{{msg0}} {{time}}</span>
              </p>
        </div>
    </div>
</template>
<script>
export default{
        data() {
          return {
            pet_class:"小狗",
            pet_city:"郑州",
            pet_name:"",
            pet_title:"",
            pet_text:"",
            pet_file:"",
            pet_file2:"",
            pet_file3:"",
            pet_file4:"",
            uid:"",
            img1:"",
            img2:"",
            img3:"",
            img4:"",
            ser_id:"",
            uname:"",
            imgList:[],
            submit:"提交信息",
            showmsg:"",
            time:"",
            msg0:"正在上传信息!"
          }
        },
        created() {
          this.uname=sessionStorage.getItem("uname")
          //加载页面时验证登录状态
          if(!this.$store.state.islogin){
            alert("请先登录!");
            this.$router.push({path: '/login'})
          }
        },
        watch: {
          pet_class(){
            console.log(this.pet_class);
          }
        },
   methods: {
          toindex(){
            this.$router.push({path: '/adoption'})
          },
          file(){
            this.pet_file=1;
          },
          file2(){
            this.pet_file2=1;
          },
          file3(){
            this.pet_file3=1;
          },
          file4(){
            this.pet_file4=1;
          },
           subPet(){
            var uname = this.$store.state.uname;
            var ser_id="";
            //判断必填项目是否填写
            if(this.pet_file>0 && this.pet_name.length>0 && this.pet_title.length>0){
              var pet_class=this.pet_class
              var formData = new FormData() // 声明一个FormData对象
              var formData = new window.FormData()
              formData.append('file', document.querySelector('#file').files[0])
              formData.append('pet_class',pet_class)
              var options = {  // 设置axios的参数
                    url: 'http://127.0.0.1:3000/pet/upload',
                    data: formData,
                    method: 'post',
                    headers: {'Content-Type': 'multipart/form-data'}
                  }
              //发送上传图片请求    
              this.axios(options).then((res) =>{
                console.log(res.data.img1);
                  this.img1 = res.data.img1;
                  this.ser_id = res.data.ser_id;
              }).then(()=>{//第二次------------------------第二次----------------------
              var pet_class=this.pet_class
              var formData = new FormData() // 声明一个FormData对象
              var formData = new window.FormData()
              formData.append('file', document.querySelector('#file2').files[0])
              formData.append('pet_class',pet_class)
              var options = {  // 设置axios的参数
                    url: 'http://127.0.0.1:3000/pet/upload',
                    data: formData,
                    method: 'post',
                    headers: {'Content-Type': 'multipart/form-data'}
                  }
              //发送上传图片请求    
              this.axios(options).then((res) =>{
                console.log(2,res.data.img1);
                  this.img2 = res.data.img1;
              })
              }).then(()=>{//第三次----------------------------第三次-----------------
              var pet_class=this.pet_class
              var formData = new FormData() // 声明一个FormData对象
              var formData = new window.FormData()
              formData.append('file', document.querySelector('#file3').files[0])
              formData.append('pet_class',pet_class)
              var options = {  // 设置axios的参数
                    url: 'http://127.0.0.1:3000/pet/upload',
                    data: formData,
                    method: 'post',
                    headers: {'Content-Type': 'multipart/form-data'}
                  }
              //发送上传图片请求    
              this.axios(options).then((res) =>{
                console.log(3,res.data.img1);
                  this.img3 = res.data.img1;
              })
              }).then(()=>{//第四次----------------------------第四次-----------------
              var pet_class=this.pet_class
              var formData = new FormData() // 声明一个FormData对象
              var formData = new window.FormData()
              formData.append('file', document.querySelector('#file4').files[0])
              formData.append('pet_class',pet_class)
              var options = {  // 设置axios的参数
                    url: 'http://127.0.0.1:3000/pet/upload',
                    data: formData,
                    method: 'post',
                    headers: {'Content-Type': 'multipart/form-data'}
                  }
              //发送上传图片请求    
              this.axios(options).then((res) =>{
                console.log(4,res.data.img1);
                 this.img4 = res.data.img1;
              })
              }).then(()=>{//           最后一步上传信息到审查表
                this.showmsg=true;
                this.time="(3s)"
             var st = setInterval(() => {
                this.time="("+(this.time.slice(1,2)-1)+"s)"
              }, 1000);
              setTimeout(() => {
                window.clearInterval(st)
                this.time=""
              }, 3000);
              
                setTimeout(() => {
                  this.axios.post('http://127.0.0.1:3000/pet/check',Qs.stringify({
                        kind:this.pet_class,//种类
                        ser_id:this.ser_id,
                        city:this.pet_city,
                        pname:this.pet_name,
                        intro:this.pet_title,
                        details:this.pet_text,
                        uname:this.uname,
                        img1:this.img1,
                        img2:this.img2,
                        img3:this.img3,
                        img4:this.img4
                    })).then((res)=>{
                      if(res.data.code==200){
                        this.msg0="恭喜发布成功!"
                        alert(res.data.msg);
                        this.$router.push({path: '/adoption'})
                      }else{
                             alert("Sorry!连接超时,请重试!")
                            }
                    })
                }, 3000);
                  
              })
              // .then(()=>{         //第二次请求循环上传图片到imgList
              //   var j="";
              //   if(this.pet_file4>0){
              //     j=3
              //     }
              //   else if(this.pet_file3>0){
              //     j=2
              //   }
              //   else{
              //     j=1;
              //   }
                  
              //         for(var i=2;i<=j+1;i++){ 
              //           console.log(i);
              //         var formData = new FormData() // 声明一个FormData对象
              //         var formData = new window.FormData()
              //         var Select = '#file'+i
              //         formData.append('file', document.querySelector(Select).files[0])
              //         formData.append('pet_class',pet_class)
              //         var options = {  // 设置axios的参数
              //         url: 'http://127.0.0.1:3000/pet/upload',
              //         data: formData,
              //         method: 'post',
              //         headers: {'Content-Type': 'multipart/form-data'}
              //         }
              //         if(i==2){
              //             this.axios(options).then((res) =>{
              //               console.log(i);
              //               this.imgList.push(res.data);
              //             })
              //         }
              //         if(i==3){
              //             this.axios(options).then((res) =>{
              //               console.log(i);
              //               this.imgList.push(res.data);
              //             })
              //         }
              //         if(i==4){
              //             this.axios(options).then((res) =>{
              //               console.log(i);
              //               this.imgList.push(res.data);
              //             })
              //         }            
              //         }
              //       // var imgList=this.imgList
              //       // this.img1 = imgList[0].img1
              //       // this.img2 = imgList[1].img1
              //       // this.img3 = imgList[2].img1
              //       // this.img4 = imgList[3].img1
              //   }).then(()=>{//第三次请求上传信息到审查信息check表
              //       setTimeout(() => {
              //         var img1 = this.imgList[0].img1;
              //         var img2 = this.imgList[1].img1;
              //         var img3 = this.imgList[2].img1;
              //         var img4 = this.imgList[3].img1;
                   
              //       }, 3000);
                 
                 //imgList存入imgList列表
       
        //     var uname = this.$store.state.uname;
        //     console.log(uname);
        //     var ser_id="";
        //     if(this.pet_file>0 && this.pet_name.length>0 && this.pet_title.length>0){
        //     //promise  ---------------嵌套第一次请求-------------------
        //       this.axios.post('http://127.0.0.1:3000/user/reg/sea_uname',Qs.stringify({uname})).then(res=>{
        //         this.uid = res.data[0].uid;
        //             //promise  ---------------嵌套第二次请求-------------------
        //             var pet_class=this.pet_class
        //             var formData = new FormData() // 声明一个FormData对象
        //             var formData = new window.FormData()
        //             formData.append('file', document.querySelector('#file').files[0])
        //             formData.append('pet_class',pet_class)
        //             var options = {  // 设置axios的参数
        //             url: 'http://127.0.0.1:3000/pet/upload',
        //             data: formData,
        //             method: 'post',
        //             headers: { 
        //               'Content-Type': 'multipart/form-data'
        //             }
        //             }
        //             this.axios(options).then((res) => {
        //               this.img1 = res.data.img1;
        //               this.ser_id = res.data.ser_id;
                      
        //                   //发送提交请求!promise  ---------------嵌套第三次请求-------------------
        //                   this.axios.post('http://127.0.0.1:3000/pet/addpet',Qs.stringify({pet_class:this.pet_class,pet_city:this.pet_city,pet_name:this.pet_name,pet_title:this.pet_title,pet_text:this.pet_text,uid:this.uid,img1:this.img1,ser_id:this.ser_id,pet_class:this.pet_class,
        //                   master:this.uid})).then(res=>{
        //                     if(res.data.success==200){
        //                       alert("恭喜您,信息发布成功!点击回到首页查看!")
        //                       this.$router.push({path: '/'})
        //                       location.reload();
        //                     }else{
        //                       alert("Sorry!连接超时,请重试!")
        //                     }
        //                   })
        //              }) 
        //     })
        //     }else{
        //       alert('请检查必选项是否填写完整!');
        //     }

              }//if的括号
           }       
   },
}
</script>
<style scoped>
    #main{
    margin: 0 auto;
    margin-top:70px; 
    margin-bottom:10px; 
    width: 1200px;
    height: 850px;
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
  /* input样式 */
  div.input{
    width: 90%;
    height: 650px;
    margin: 0 auto;
    margin-top:20px; 
  }
  div.input i{
    color: red;
  }
  div.input p{
    margin-left: 100px;
    text-align: left;
  }
  div.input p span{
      display: inline-block;
      height: 30px;
      width: 100px;
      font-size: 18px;
      color:#666 ;
      text-align: right;
      padding-right: 20px;
  }
  .pet_class select{
    width: 80px;
    height: 25px;
    border-radius: 4px;
  }
  .pet_name input,.pet_title input{
    width: 160px;
    height: 25px;
    border-radius: 4px;
    border: 1px solid #aaa;
  }
  .pet_title input{
    width:400px;
  }
  div.input p{
    margin-top: 20px;
  }
  .pet_detail span{
    width: 200px !important;
  }
  .pet_text{
    margin-top: 0 !important;
  }
  .pet_text textarea{
    margin-left: 50px;
    width: 776px;
    height: 280px;
    font-size: 22px;
    resize:none;
    border-radius:5px; 
  }
  div.file h4{
    text-align: left;
    padding-left: 110px;
  }
  div.file input{
    width: 170px;
    margin: 10px 0 0 20px;
  }
  .SubPet{
    width: 200px;
    height: 40px;
  }
  .msg{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
  }
  .msg p{
    width: 300px;
    height: 150px;
    margin: 0 auto;
    margin-top: 350px;
    background: #fff;
    font-size: 22px;
    text-align: center;
    padding-top: 0px;
    border-radius: 5px;
  }
  .msg p span{
    display: inline-block;
    margin-top:60px; 
  }
</style>