<template>
  <div class="product-list">
    <!-- 标题与保存按钮 -->
    <el-row>
      <el-col :span="12"><Title title="用户列表"></Title></el-col>
      <el-col :span="12">
        <div style="width:100%;height:60px;padding-right:15px;box-sizing:border-box" class="flex_rec">
          <el-button type="primary" @click="addProduct">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 产品列表 -->
    <el-card class="box-card">
      <el-row :gutter="20" type="flex" align="middle" justify="start">
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="search_op.search_name" @change="getList" clearable>
            <template slot="prepend">用户名</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="search_op.email" @change="getList" clearable>
            <template slot="prepend">邮箱</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="search_op.taobao_account" @change="getList" clearable>
            <template slot="prepend">淘宝昵称</template>
          </el-input>
        </el-col>
        <el-col :span="1.5">
          近期登录
        </el-col>
        <el-col :span="3">
          <el-date-picker
            @change="getList"
            v-model="search_op.recent_login_range"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>

      </el-row>

      <el-row :gutter="20" type="flex" align="middle" justify="start" class="mt15">
        <el-col :span="1.5">
         近期注册
        </el-col>
        <el-col :span="6.5">
          <el-date-picker
            @change="getList"
            v-model="search_op.recent_register_range"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search_op.activation_status" placeholder="请选择激活状态" @change="getList">
            <el-option
              v-for="item in status_arr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search_op.status" placeholder="请选择账号状态" @change="getList">
            <el-option
              v-for="item in status_arr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search_op.platform" placeholder="请选择注册平台" @change="getList">
            <el-option
              v-for="item in platform_arr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

              <!-- @expand-change="tableExpandChange" -->
      <el-table
        :data="list"

        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.skus"
              size="mini"
              :show-header="false"
              style="width: 100%">
              <el-table-column
                prop="sku_name"
                >
                <!-- 表格扩展表格 -->
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="24">
                      <template v-if="scope.row.sku_name">
                        {{scope.row.sku_name}}
                      </template>
                      <template v-else>
                        {{props.row.name}}
                      </template>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">{{scope.row.sku_code}}</el-col>
                  </el-row>
                </template>
              </el-table-column>
              </el-table>

          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="缩略图"
          >
          <template slot-scope="scope">
            <fileThum></fileThum>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="username"
          width="100"
          label="用户名">
        </el-table-column>

        <el-table-column
          prop="email"
          width="200"
          label="邮箱">
          <template slot-scope="scope">
            {{scope.row.email}}
            <template v-if="scope.row.email_activation_status==1">
              认证
            </template>
            <template v-if="scope.row.email_activation_status==0">
              未认证
            </template>
          </template>
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          width="80"
          >
          <template slot-scope="scope">
            <template v-if="scope.row.status==1">
              <el-tag type="info" style="margin-right:5px">启用</el-tag>
            </template>
            <template v-if="scope.row.status==0">
              <el-tag type="danger" style="margin-right:5px">关闭</el-tag>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          prop="activation_status"
          label="激活"
          width="80"
          >
          <template slot-scope="scope">
            <template v-if="scope.row.activation_status==1">
              <el-tag type="info" style="margin-right:5px">激活</el-tag>
            </template>
            <template v-if="scope.row.activation_status==0">
              <el-tag type="warning" style="margin-right:5px">未激活</el-tag>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          prop="taobao_account"
          width="80"
          label="淘宝账号">
        </el-table-column>

        <el-table-column
          prop="registered_time"
          width="100"
          label="注册时间">
        </el-table-column>

        <el-table-column
          prop="recent_login_time"
          width="100"
          label="最近登录">
        </el-table-column>

        <el-table-column
          prop="register_platform"
          width="65"
          label="注册平台">
        </el-table-column>

        <el-table-column
          prop="allow_device_num"
          width="120"
          label="设备">
          <template slot-scope="scope">
            允许 {{scope.row.allow_device_num}} 使用 {{scope.row.user_dev_num}}
          </template>
        </el-table-column>

        <el-table-column
          prop="platform_num"
          width="80"
          label="允许平台数">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page_num"
      :page-sizes="[5,10,15,20]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Title from "./components/Title"
import apis from "@/api/index"
// import csv from "@/lib/arrObjToCsv.js"
// import util from "@/lib/util.js"
// import fileThum from "@/components/FileThum.vue"
export default {
    components:{
      Title,
      // fileThum
    },
    name:'User',
    data(){
      return {
        status_arr:[
          {name:'启用/激活',value:1},
          {name:'禁用/未激活',value:0},
          {name:'所有',value:null},
        ],
        platform_arr:[
          {name:'win32',value:'win32'},
          {name:'darwin',value:'darwin'},
          {name:'所有',value:''},
        ],
        list:[],
        page_num:1,
        page_size:5,
        total:0,
        search_op:{},
      }
    },
    methods:{
      getList(toS=true){
        if(toS){
          this.page_num = 1;
        }
        let op = {
          page_num:this.page_num,
          page_size:this.page_size
        }
        Object.assign(op,this.search_op)
        apis.user.read(op).then(res=>{
          console.log('res',res)
          this.list = (res.data.data.list || []).map((v)=>{
            v.skus = [];
            return v;
          })
          this.total = res.data.data.count
          // let csvO = new csv([
          //   "name","tags","stock_sum"
          // ],this.list)
          // console.log('parse',csvO.parse())
          // console.log('parse',csvO.exportCsv())
        }).catch(err=>{
          console.log('err',err)
        })
      },
      handleEdit(index, row) {
        this.$router.push({name:'updateUser',params:{obj:row}})
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.page_size = val
        this.getList(false)
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page_num = val
        this.getList(false)
        console.log(`当前页: ${val}`);
      },

      // tableExpandChange(row,expand){

      // },
      addProduct(){
        this.$router.push({name:'addProduct'})
      }
    },
    mounted(){
      this.getList()

    }
}
</script>

<style lang="scss" scoped>
.product-list{
  padding:15px;
}

</style>