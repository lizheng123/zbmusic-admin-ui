<template>
  <div class="detail-wrapper">
    <el-card class="title" shadow="never">
        <span>{{isEdit?'编辑':'添加'}}属性</span>
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

          <el-table
            :data="form.child_attrs"
            style="width: 100%">
            <el-table-column

              prop="name"
              label="属性名"
              width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="value_list"
              label="可选值">
              <template slot-scope="scope">
                  <el-select style="width:100%" v-model="scope.row.value_list" allow-create filterable multiple placeholder="请选择">
                  <el-option
                    v-for="item in []"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column width="50">
              <template slot-scope="scope">
                <el-button icon="el-icon-delete" size="mini" circle @click="deleteChildAttr(scope)"></el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="24">
              <el-button type="text" icon="el-icon-plus" @click="addChildAttr">新增属性</el-button>
            </el-col>
          </el-row>
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
        form:{
          child_attrs:[]
        },
      }
    },
    methods:{
      onSubmit(){
        this.form_loading = true;
        if(this.isEdit){ //修改
          apis.attr.update(this.form).then(res=>{
            console.log('res',res)
            this.form_loading = false;
            this.$router.push({name:'tag'})
          }).catch(err=>{
            this.form_loading = false;
            console.log('err',err)
          })
        }else{ //创建
          apis.attr.create(this.form).then(res=>{
            console.log('res',res)
            this.form_loading = false;
            this.$router.push({name:'tag'})
          }).catch(err=>{
            this.form_loading = false;
            console.log('err',err)
          })
        }
      },
      addChildAttr(){
        this.form.child_attrs.push({
          name:'',
          value_list:""
        })
      },
      getAttrChildAttrs(){
        apis.attr.readChildAttrs(this.form).then(res=>{
          console.log('res',res)
          this.form_loading = false;
          let r = []
          if(res.data.data && res.data.data.length>0){
            res.data.data.forEach((v)=>{
              r.push(Object.assign(v,{'value_list':JSON.parse( v.value_list )}))
            })
          }
          this.form.child_attrs = r
        }).catch(err=>{
          this.form_loading = false;
          console.log('err',err)
        })
      },
      deleteChildAttr(scope){
        console.log(scope)
        if(scope.row.id){
          this.$confirm('确认删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
              let opt = {
                id:scope.row.id
              }
              apis.attr.deleteChildAttr(opt).then(()=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.form.child_attrs.splice(scope.$index,1)
              }).catch(()=>{
                  this.$message.error('删除失败');
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });          
          });
        }else{
          this.form.child_attrs.splice(scope.$index,1)
        }
      }
    },
    created(){
      if(this.isEdit){
        //编辑
        let content = this.$route.params.obj
        Object.assign(this.form, content);
        this.getAttrChildAttrs()
      }
    }
}
</script>

<style lang="scss">
.detail-wrapper{
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