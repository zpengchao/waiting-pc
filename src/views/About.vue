<template>
    <div>
      <br>
            <button @click="btn()">{{jz}} </button>
    </div>
</template>
<script>
export default {
        data(){
          return{
          jz:'捐赠我们'
        }
        },
        methods: {
          btn(){
            console.log(this.aabb);
          }
        },
      }</script>
<style></style>