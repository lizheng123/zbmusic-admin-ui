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
              <el-col :span="7">
                <div class="part-info">
                  <div class="title">基本</div>
                  <div class="info">用户信息</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="17">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.username" :disabled="true">
                        <template slot="prepend">用户名</template>
                      </el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.email" :disabled="true">
                        <template slot="prepend">邮箱</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="mt10">
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.password">
                        <template slot="prepend">密码</template>
                      </el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.taobao_account">
                        <template slot="prepend">淘宝用户名</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="mt10">
                  <el-col :span="24">
                      <el-input placeholder="请输入内容" v-model="form.activation_code" :disabled="true">
                        <template slot="prepend">激活码</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-input
                  type="textarea"
                  style="margin-top:10px"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入内容"
                  v-model="form.tips">
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
                <el-table
                  :data="devices_list"
                  style="width: 100%">
                  <el-table-column
                    prop="platform"
                    label="平台"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="w_cpu_processorid"
                    label="cupID"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="w_os_name"
                    label="系统名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="w_computer_name"
                    label="电脑名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="w_baseboard_sn"
                    label="主板序列号">
                  </el-table-column>
                  <el-table-column
                    prop="m_system_sn"
                    label="系统序列号">
                  </el-table-column>
                  <el-table-column
                    prop="m_hardware_uuid"
                    label="主板uuid">
                  </el-table-column>
                  <el-table-column
                    prop="m_model_identifier"
                    label="设备型号">
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <!-- 右模块 -->
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>账号状态</span>
            </div>
            <p class="p-extra mb5">账号启用状态</p>
            <el-select v-model="form.status" placeholder="请选择账号状态" style="width:100%" class="mb10">
              <el-option
                v-for="item in status_arr"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <p class="p-extra mb5">账号激活状态</p>
            <el-select v-model="form.activation_status" placeholder="请选择激活状态" style="width:100%">
              <el-option
                v-for="item in status_arr"
                :key="item.value"
                :label="item.name"
                :value="item.value">
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
        devices_list:[]
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
      readOneUser(){
        let p = this.$route.params.obj;
        if(!p) return;
        console.log(p)
        apis.user.readOneUser({id:p.id}).then(res=>{
          console.log('res',res)
          // this.form_loading = false;
          this.form = res.data.data.base_data
          this.devices_list = res.data.data.devices
        }).catch(err=>{
          this.form_loading = false;
          console.log('err',err)
        })
      },
    },
    mounted(){
        this.readOneUser()
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