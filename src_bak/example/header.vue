<template>
  <div class="header-nav-contaienr">


    <div class="headClass" :style="{background:'url('+imgUrl+')'}">

      <h3 class="title" style="">“新能源+”生态治理环境效益示范软件</h3>


      <i class="el-icon-user-solid" style="position:absolute;right:1em;z-index: 999999999;"></i>



    </div>
  </div>



</template>
<script>
  export default {
    name: "headDiv",
    data() {
      return {
        imgUrl: "img/background_img2.png"

      }
    },

    props: {

    },

    watch: {
    },


    methods: {}
  }
</script>
<style>
  .title {
    position: relative;
    color: transparent;
    font-weight: 900;
    letter-spacing: 0.25vw;
    background-clip: text;
    -webkit-background-clip: text;
    position: absolute;
    left: 1em;
    z-index: 999999;
    font-size: 28px;
    font-family: Source Han Sans CN VF;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 0px 2px 10px rgba(0, 20, 50, 0.7);
    background: linear-gradient(0deg, #C0EAFF 0%, #FFFFFF 88.3544921875%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;


  }

  .headClass {
    display: flex;
    justify-content: center;
    background-color: #174666;
    font-size: 18px;
    padding: .7em;
    padding-top: .2em;
    padding-bottom: 0.2em;
    padding-left: 1em;
    color: white;
    align-items: center;
    position: absolute;
    min-width: 4000px;
    z-index: 9999;
    height: 60px
  }
</style>
