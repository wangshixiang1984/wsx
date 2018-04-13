
<template>
    <ul class="list-line">
        <li v-for="(item, index) in listLayoutLine" :key="index">
            <imgtext-itema :imgtextItema="item" :imgtextOptions="imgtextItemOptions"></imgtext-itema>
        </li>
    </ul>
</template>

<script>
import imgtextItema from './imgtext_itema'
export default {
    data () {
        return {

        }
    },
    props: ["listLayoutLine", "imgtextItemOptions"],
    components: {
        imgtextItema
    }
}
</script>
 <style scoped>
    .list-line {
        width: 100%;        
        padding: 1rem;
        background: #ffffff;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }
    .list-line > li {
        width: 36%;
        display: inline-block;
        margin-right: 1rem;
        overflow: hidden;
    }
    .list-line > li:last-child {
        margin-right: 0;
    }
 </style>
 