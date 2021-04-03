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
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="search_op.search_name" @change="getList">
            <template slot="prepend">名称</template>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search_op.supplier_id" placeholder="请选择供应商" @change="getList" style="width:100%">
            <el-option
              v-for="item in suppliers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="search_op.tags" multiple placeholder="请选择标签" @change="getList" style="width:100%">
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-table
        :data="list"
        @expand-change="tableExpandChange"
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
          label="用户名">
        </el-table-column>

        <el-table-column
          prop="email"
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
          label="淘宝账号">
        </el-table-column>

        <el-table-column
          prop="registered_time"
          label="注册时间">
        </el-table-column>

        <el-table-column
          prop="recent_login_time"
          label="最近登录">
        </el-table-column>

        <el-table-column
          prop="register_platform"
          label="注册平台">
        </el-table-column>

        <el-table-column
          prop="allow_device_num"
          label="设备">
          <template slot-scope="scope">
            允许 {{scope.row.allow_device_num}} 使用 {{scope.row.user_dev_num}}
          </template>
        </el-table-column>

        <el-table-column
          prop="platform_num"
          label="允许平台数">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    name:'Products',
    data(){
      return {
        list:[],
        page_num:1,
        page_size:5,
        total:0,
        search_op:{},
        suppliers: [{
          id: 1,
          name: '供应商1'
        }, {
          id: 2,
          name: '供应商2'
        }, {
          id: 3,
          name: '供应商3'
        }],
        tags: [{
          id: 1,
          name: '标签1'
        }, {
          id: 2,
          name: '标签2'
        }, {
          value: 3,
          name: '标签3'
        }],
      }
    },
    methods:{
      getList(){
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
      getTagList(){
        apis.tag.read().then(res=>{
          console.log('res',res)
          this.tags = res.data.data
        }).catch(err=>{
          console.log('err',err)
        })
      },
      getSupplierList(){
        apis.supplier.read().then(res=>{
          console.log('res',res)
          this.suppliers = res.data.data
        }).catch(err=>{
          console.log('err',err)
        })
      },
      handleEdit(index, row) {
        this.$router.push({name:'updateProduct',params:{obj:row}})
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.page_size = val
        this.getList()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page_num = val
        this.getList()
        console.log(`当前页: ${val}`);
      },
      readOneProductSkuInfo(){

      },
      tableExpandChange(row,expand){
        apis.sku.readOneProductSkuInfo({'id':row.id}).then(res=>{
          console.log('res',res)
          // this.$set(row,'skus',res.data.data)
          row.skus = res.data.data
        }).catch(err=>{
          console.log('err',err)
        })
        console.log(row,expand)
      },
      addProduct(){
        this.$router.push({name:'addProduct'})
      }
    },
    mounted(){
      this.getList()
      this.getTagList()
      this.getSupplierList()

    }
}
</script>

<style lang="scss" scoped>
.product-list{
  padding:15px;
}

</style>