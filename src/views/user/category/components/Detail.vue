<template>
  <div class="add-category-wrapper">
    <el-card class="title" shadow="never">
        <span>添加分类</span>
    </el-card>

    <el-card class="content" shadow="never">
      <!-- 添加商品表单开始 -->
      <el-form ref="form" :model="form" label-width="100px" v-loading="form_loading">
        <el-form-item label="分类名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
            <el-select v-model="form.parent_id" placeholder="选择上级分类">
                <el-option
                v-for="item in category_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
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
        if(this.isEdit){ //修改分类
          apis.category.update(this.form).then(res=>{
            console.log('res',res)
            this.form_loading = false;
             this.$router.push({name:'category'})
          }).catch(err=>{
            this.form_loading = false;
            console.log('err',err)
          })

        }else{ //创建一个分类
          apis.category.create(this.form).then(res=>{
            console.log('res',res)
            this.form_loading = false;
            this.$router.push({name:'category'})
          }).catch(err=>{
            this.form_loading = false;
            console.log('err',err)
          })

        }
      }
    },
    created(){
      //加载上级分类
        const default_category_list = {
          id: 0,
          name: '无上级分类'
        }
        this.category_list.push(default_category_list)
        this.form_loading = true;
        apis.category.read(0).then(res=>{
          console.log('res',res)
          this.category_list = [...this.this.category_list,...res.data.data]
          this.form_loading = false;
        }).catch(err=>{
          this.form_loading = false;
          console.log('err',err)
        })

        if(this.isEdit){
          //编辑
          let cate = this.$route.params.obj
          this.form = cate;
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