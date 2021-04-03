<template>
<div class="attr-wrapper">
    <Title title="多属性列表"></Title>
    <div>
        <el-button plain @click="add" icon="el-icon-plus"></el-button>
    </div>
    <div v-loading="searchLoading" element-loading-background="rgba(255, 255, 255, 0.7)">
        <box-list></box-list>
    </div>
</div>  
</template>

<script>
import BoxList from "./components/BoxList"
import Title from "./components/Title"
export default {
    name:'Attr',
    components:{
        BoxList,
        Title
    },
    data() {
        return {
            pid:0,
            searchLoading:false,
        }
    },
    computed:{},

    methods:{
        add(){
            this.$router.push({name:'addAttr'})
        },
    },
    created(){},
    mounted(){
        console.log('mounted')
    }
}
</script>

<style lang="scss"> 
.attr-wrapper{
    box-sizing: border-box;
    padding: 15px;
    // background: chocolate;

}
</style>