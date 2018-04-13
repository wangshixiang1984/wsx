<template>
    <ul class="list-column">
        <li v-for="(item, index) in listLayoutColumn" :key="index">
            <!-- <Row :gutter="8">
                <Col span="12"><imgtext-itema :imgtextItema="item" :imgtextOptions="imgtextItemOptions"></imgtext-itema></Col>
                <Col span="12"><imgtext-itema :imgtextItema="item" :imgtextOptions="imgtextItemOptions"></imgtext-itema></Col>
            </Row> -->
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
    props: ["listLayoutColumn", "imgtextItemOptions"],
    components: {
        imgtextItema
    }
}
</script>
 <style scoped>
    .list-column {
        width: 100%;        
        padding: 1rem;
        background: #ffffff;
        overflow-x: hidden;
        overflow-y: auto;
        white-space: normal;
    }
    .list-column > li {
        width: 50%;
        overflow: hidden;
        padding: 1rem 0.5rem;
        display: inline-block;
        /* margin-bottom: 1rem; */
    }
    .list-column > li:last-child{
        margin-bottom: 0;
    }

 </style>
 