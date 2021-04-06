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
    <aplayer :audio="audio" ref="aplayer"/>
    <!-- 产品列表 -->
    <el-card class="box-card">
      <el-row :gutter="20" type="flex" align="middle" justify="start">
        <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="search_op.search_name" @change="getList" clearable>
            <template slot="prepend">音效名</template>
          </el-input>
        </el-col>
        <el-col :span="1.5">
          创建时间
        </el-col>
        <el-col :span="3">
          <el-date-picker
            @change="getList"
            v-model="search_op.create_time_range"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" align="middle" justify="start" class="mt15">
        <el-col :span="4">
          <el-select v-model="search_op.status" placeholder="请选择音效状态" @change="getList">
            <el-option
              v-for="item in status_arr"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="search_op.category_id" placeholder="请选择音效状态" @change="getList">
            <el-option
              v-for="item in category_list"
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

        <el-table-column
          prop="name"
          width="200"
          label="音效名">
        </el-table-column>

        <el-table-column
          prop="classify_name"
          width="200"
          label="分类">
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
          prop="create_time_str"
          width="80"
          label="创建时间">
        </el-table-column>

        <el-table-column
          prop="path"
          width="200"
          label="路径">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-video-play"
              @click="play(scope.$index, scope.row)">播放</el-button>
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
// const audio = new Audio();
export default {
    components:{
      Title,
      // fileThum
    },
    name:'User',
    data(){
      return {
        audio: {
            name: '',
            artist: '蜗牛音效',
            url: '',
            cover: '', // prettier-ignore
            // lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
        },
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
        category_list:[],
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
        apis.sounds.read(op).then(res=>{
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
      getCategoryList(){
        apis.category.read(0).then(res=>{
          console.log('res',res)
          this.category_list = res.data.data
        }).catch(err=>{
          console.log('err',err)
        })
      },
      handleEdit(index, row) {
        this.$router.push({name:'updateSound',params:{obj:row}})
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
      play(i,r){
        
        this.audio.url = `http://zbmusic.com/sounds/2020/${r.path}`;
        this.audio.name = `${r.name}`;
        this.$refs.aplayer.play();
        // audio.play();
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
      this.getCategoryList()
      // this.getSupplierList()

    }
}
</script>

<style lang="scss" scoped>
.product-list{
  padding:15px;
}

</style>