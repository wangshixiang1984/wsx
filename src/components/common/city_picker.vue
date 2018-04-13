<template>
    <smooth-picker ref="smoothPicker" :data="cityList" :change="changes" />
</template>

<script>
export default {
    data () {
        return {
          
        }
    },
    props: ['cityList'],
    methods: {
      changes (gIndex, iIndex) {
        //   console.log(gIndex)
        this.$emit("changeCityPicker", {gIndex: gIndex, iIndex:iIndex})
      }
    }
}
</script>

