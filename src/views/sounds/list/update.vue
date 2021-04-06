<template>
  <div class="add-pro-wrapper">
    <!-- 标题与保存按钮 -->
    <el-row>
      <el-col :span="12"><Title title="修改用户"></Title></el-col>
      <el-col :span="12">
        <div style="width:100%;height:60px;padding-right:15px;box-sizing:border-box" class="flex_rec">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </el-col>
    </el-row>

    <div class="add-pro-content">
      <el-row :gutter="15">
      <!-- 左模块 -->
        <el-col :span="18">
          <!-- 基本信息 -->
          <el-card class="box-card">
            <el-row :gutter="20">
              <!-- 左边 -->
              <el-col :span="4">
                <div class="part-info">
                  <div class="title">基本</div>
                  <div class="info">用户信息</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="20">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.id" :disabled="true">
                        <template slot="prepend">ID</template>
                      </el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.download_times" :disabled="true">
                        <template slot="prepend">下载次数</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="mt10">
                  <el-col :span="24">
                      <el-input placeholder="请输入内容" v-model="form.name">
                        <template slot="prepend">名称</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="mt10">
                  <el-col :span="24">
                      <el-input placeholder="请输入内容" v-model="form.path" :disabled="false">
                        <template slot="prepend">地址</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-input
                  type="textarea"
                  style="margin-top:10px"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入内容"
                  v-model="form.discription">
                </el-input>
              </el-col>
            </el-row>
          </el-card>
          <!-- 价格库存 -->
          <el-card class="box-card">
            <el-row :gutter="20">
              <!-- 左边 -->
              <el-col :span="3">
                <div class="part-info">
                  <div class="title">设备列表</div>
                  <div class="info">管理设备</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="21">
                <el-upload
                  class="upload-demo"
                  drag
                  action=""
                  ref="upload"
                  :http-request="uploadFile"
                  :auto-upload="true"
                  name="imgfile"
                  @on-change="imgUploadChange"
                  :data="{a:1,b:2}"
                  >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <!-- 右模块 -->
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>状态</span>
            </div>
            <p class="p-extra mb5">启用状态</p>
            <el-select v-model="form.status" placeholder="请选择账号状态" style="width:100%" class="mb10">
              <el-option
                v-for="item in status_arr"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <p class="p-extra mb5">分类</p>
            <el-select v-model="form.classify" placeholder="请选择分类" style="width:100%">
              <el-option
                v-for="item in category_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>

            <el-input placeholder="请输入内容" v-model="form.platform_num" style="width:100%;margin-top:10px">
              <template slot="prepend">允许平台数</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="form.allow_device_num" style="width:100%;margin-top:10px">
              <template slot="prepend">允许单平台最大设备数</template>
            </el-input>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 添加商品表单结束 -->




  </div>
</template>

<script>
import Title from "./components/Title"
import apis from "@/api/index"
export default {
  name:'addProducts',
    components:{
      Title
    },
    data(){
      return{
        form:{},
        status_arr:[
          {name:'启用/激活',value:1},
          {name:'禁用/未激活',value:0},
          {name:'所有',value:null},
        ],
        devices_list:[],
        category_list:[]
      }
    },
    methods:{
      save(){
        console.log(this.form)
        apis.user.update(this.form).then(res=>{
          console.log('res',res)
          this.$router.push({name:'user'})
        }).catch(err=>{
          this.$message({msg:err,type:'error'})
          console.log('err',err)
        })
      },
      readOneSound(){
        let p = this.$route.params.obj;
        if(!p) return;
        console.log(p)
        apis.sounds.readOneSound({id:p.id}).then(res=>{
          console.log('res',res)
          // this.form_loading = false;
          this.form = res.data.data
        }).catch(err=>{
          this.form_loading = false;
          console.log('err',err)
        })
      },
      getCategoryList(){
        apis.category.read(0).then(res=>{
          console.log('res',res)
          this.category_list = res.data.data
        }).catch(err=>{
          console.log('err',err)
        })
      },
      uploadFile(params) {
        console.log("uploadFile", params);
        // return;
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // 通过 FormData 对象上传文件
        var formData = new FormData();
        formData.append("sound", params.file);
        formData.append("a", 1);
        formData.append("b", 2);

        // if (!isLt2M) {
        //   this.$message.error("请上传2M以下的.xlsx文件");
        //   return false;
        // }

        apis.upload.up(formData).then((res)=>{
          console.log('res',res)
        }).catch(err=>{
          console.log('err',err)
        })
      },
      imgUploadChange(){

      }
    },
    mounted(){
        this.getCategoryList()
        this.readOneSound();
    },
    computed:{

    },
    watch:{
    }
}
</script>

<style lang="scss">
.add-pro-wrapper{
  .add-pro-content{
    box-sizing: border-box;
    width: 100%;
    padding:15px;
  }
  .box-card{
    margin-bottom:5px;
  }
  .part-info{
    // @include flex_ccc();
    // background: brown;
    .title{
      font-size: 18px;
      color:#333;
    }
    .info{
      font-size: 12px;
      color:#999;
    }
  }
}
</style>