<template>
  <div class="page-loading">
       <Spin fix>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
    .page-loading {
        width: 100%;
        position: absolute;
        z-index: 1000;
        top: 0%;
        bottom: 0%;        
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
