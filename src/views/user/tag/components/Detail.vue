<template>
  <div class="add-category-wrapper">
    <el-card class="title" shadow="never">
        <span>添加标签</span>
    </el-card>

    <el-card class="content" shadow="never">
      <!-- 添加商品表单开始 -->
      <el-form ref="form" :model="form" label-width="100px" v-loading="form_loading">
        <el-form-item label="标签名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级分类">
            <el-select v-model="form.parent_id" placeholder="选择上级分类">
                <el-option
                v-for="item in category_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加商品表单结束 -->
  </div>
</template>

<script>
import apis from "@/api/index"
export default {
    name:'addProducts',
    props:{
        isEdit:{
            type:Boolean,
            default:false,
        }
    },
    data(){
      return {
        form_loading:false,
        form:{},
        category_list: [],
      }
    },
    methods:{
      onSubmit(){
        this.form_loading = true;
        if(this.isEdit){ //修改
          apis.tag.update(this.form).then(res=>{
            console.log('res',res)
            this.form_loading = false;
             this.$router.push({name:'tag'})
          }).catch(err=>{
            this.form_loading = false;
            console.log('err',err)
          })

        }else{ //创建
          apis.tag.create(this.form).then(res=>{
            console.log('res',res)
            this.form_loading = false;
            this.$router.push({name:'tag'})
          }).catch(err=>{
            this.form_loading = false;
            console.log('err',err)
          })

        }
      }
    },
    created(){
      if(this.isEdit){
        //编辑
        let content = this.$route.params.obj
        this.form = content;
      }


    }
}
</script>

<style lang="scss">
.add-category-wrapper{
    .title{
        width:50%;
        margin:auto;
    }
    .content{
        width:50%;
        margin:auto;
        margin-top:20px;
    }
}
</style>