<template>
    <input v-if="buttonOptions" type="button" name="button" @click="buttonAction" :style="{background:buttonOptions.bgcolor, color: buttonOptions.color}" class="button" :value="buttonOptions.value">
    <input v-else type="button" name="button" class="button" @click="buttonAction" value="完成">
</template>

<script>
export default {
    data () {
        return {
           
        }
    },
    props: ['buttonOptions'],
    methods: {
        buttonAction () {
            this.$emit("buttonAction")
        }
    }
}
</script>

<style scoped>

</style>

