<template>
<div class="box-list-wrapper">
    <div class="center" ref="center">
        <div class="tables" v-if="tables.length>0">
            <template v-for="(t,index) in tables">
                <div class="table" :style="tableStyle" :key="index">
                    <div class="table-left-content">
                        <div class="name">
                            {{t.name.toUpperCase()}}
                        </div>
                        <div class="info">
                            <span>{{t.sounds_num}}个音效</span>
                        </div>
                    </div>
                    <!-- 编辑按钮 -->
                    <div class="table-right-content">
                        <el-dropdown @command="handleCommand">
                            <i class="el-icon-more" style="font-size:24px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-more-outline" :command="{cmd:'nextLevel',item:t}">下级分类</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-edit-outline" :command="{cmd:'edit',item:t}">编辑</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-delete" :command="{cmd:'delete',item:t}">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </template>
            <template v-for="(t,index) in table_col_num_arr">
                <div class="table dis" :key="'dis'+index" :style="tableStyle"></div>
            </template>
        </div>
        <div v-else>
            暂无内容
        </div>
    </div>
</div>
</template>

<script>
const BOXW = 260; //box宽度
const BOXMAR = 5;
const CPAD = 0;
import apis from "@/api/index"
export default {
    name:'BoxList',
    props:{
        // list:{
        //     type:Array,
        //     default:()=>{
        //         return []
        //     },
        // }
    },
    data() {
        return {
            ch:'',
            cw:'',
            list:[],
        }
    },
    computed:{
        table_col_num_arr(){
            let w = BOXW; 
            let cw = this.cw; //空间宽度
            let mar = BOXMAR*2 //box总margin
            let pad = CPAD*2 //空间内padding
            let uw = cw - pad //可用空间
            let col = parseInt(uw/(w+mar)) //计算一行可 放置的个数
            let arr = []
            for(let i =0;i<col-1;i++){
                arr.push(i)
            }
            return arr
        },
        tableStyle(){
            return {
                width:BOXW+'px',
                marginLeft:BOXMAR+'px',
                marginRight:BOXMAR+'px',
            }
        },
        tables(){
            return this.list || []
        },
    },
    methods:{
        getCenterOffset(){
            this.$nextTick(()=>{
                let c = this.$refs.center
                if(c){
                    this.ch = c.offsetHeight
                    this.cw = c.offsetWidth
                }
            })
        },
        handleCommand(cmd) {
            if(cmd.cmd=="nextLevel"){
                this.$router.push({name:'category',query:{pid:cmd.item.id} })
            }
            if(cmd.cmd=="edit"){
                this.$router.push({name:'updateCategory',params:{obj:cmd.item}})
            }
            if(cmd.cmd=="delete"){
                this.$confirm('确认删除吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let opt = {
                        id:cmd.item.id
                    }
                    apis.category.delete(opt).then(()=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList()
                        // this.$emit('refresh')
                    }).catch(()=>{
                        this.$message.error('删除失败');
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        getList(){
            this.pid =this.$route.query.pid || 0;
            apis.category.read(this.pid).then(res=>{
              console.log('res',res)
              this.list = res.data.data
            }).catch(err=>{
              console.log('err',err)
            })
        },

    },
    watch:{
        $route(){
            this.getList()
        }
    },
    mounted(){
        console.log('mounted')
        this.getCenterOffset()
        window.addEventListener('resize',()=>{
            this.getCenterOffset()
        })

        this.getList()
    }
}
</script>

<style lang="scss">
.box-list-wrapper{
    .center{
        // @include dw($p:2,$top:60px,$left:0,$right:0px,$bottom:60px);
        // background-color: yellow;
        padding: 15px 0px;
        .tables{
            @include flex($fd:row,$jc:space-between,$ai:flex-start,$fw:wrap,$ac:flex-start);
            width: 100%;
            height: 100%;
            min-width: 110px;
            // background-color: green;
            overflow-y: auto;
            .table{
                box-sizing: border-box;
                @include flex_rsc();
                padding: 10px 20px;
                font-size: 18px;
                color:#333;
                height: 80px;
                border-radius: 8px;
                background-color: #fff;
                margin-bottom:30px;
                border:1px solid #eaeaea;
                .table-left-content{
                    @include flex_cfc();
                    flex:1;
                    text-align: left;
                    max-width: 120px;
                    overflow: hidden;
                    // background: brown;
                    .name,.info{
                        width: 100%;
                    }
                    .name{
                        font-weight: 600;
                        font-size: 16px;
                        color: #000;
                    }
                    .info{
                        box-sizing: border-box;
                        padding: 5px 0;
                        font-size: 12px;
                        color: #999;
                    }

                }
                .table-right-content{
                    font-size: 24px;
                }
            }
            .table:hover{
                opacity: 0.85;
            }
            .table:active{
                opacity: .5;
            }
            .dis{
                // opacity: 0;
                // display: none;
                height: 0px;
                margin-bottom:0;
                border:none;
            }
            .bg0{
                background-color: $c_green;
            }
            .bg1{
                background-color: $c_yellow;
            }
            .bg2{
                background-color: $c_red;
            }
        }
    }
}
</style>