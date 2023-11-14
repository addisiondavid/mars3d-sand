<template>
  <div class="header-nav-contaienr">

    <!-- <div class="foot">
      国家气象中心 版权所有
    </div> -->

  </div>



</template>
<script>
  export default {
    name: "footerC",
    data() {
      return {
      }
    },
    props: {
    },
    watch: {
    },
    methods: {
    }
  }
</script>

<style>
  .foot {
    padding-left: 1em;
    height: 34px;
    background-color: lightgray;
    position: absolute;
    z-index: 99999999999;
    bottom: 0;
    color: black;
    width: 100%;
    padding: 1px auto;
    font-size: 16px;
    text-align: center;
  }
</style>
