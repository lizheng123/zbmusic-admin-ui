<template>
  <div class="add-pro-wrapper">
    <!-- 标题与保存按钮 -->
    <el-row>
      <el-col :span="12"><Title title="修改产品"></Title></el-col>
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
                  <div class="info">产品信息</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="17">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.name">
                        <template slot="prepend">名称</template>
                      </el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.alias_name">
                        <template slot="prepend">别名</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-input
                  type="textarea"
                  style="margin-top:10px"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入内容"
                  v-model="form.description">
                </el-input>
              </el-col>
            </el-row>
          </el-card>
          <!-- 价格库存 -->
          <el-card class="box-card" v-show="form.has_more_sku==0">
            <el-row :gutter="20">
              <!-- 左边 -->
              <el-col :span="7">
                <div class="part-info">
                  <div class="title">价格库存</div>
                  <div class="info">管理库存</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="17">
                <el-row :gutter="20">
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.sku_code">
                        <template slot="prepend">SKU</template>
                      </el-input>
                  </el-col>
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.barcode">
                        <template slot="prepend">条码</template>
                      </el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top:10px">
                  <el-col :span="24">
                    <el-checkbox v-model="form.is_tail_after_stock" true-label="1" false-label="0">是否跟踪库存</el-checkbox>
                    <el-checkbox v-model="form.is_out_of_stock_sales" true-label="1" false-label="0">是否缺货销售</el-checkbox>
                  </el-col>
                </el-row>
                <el-table
                  :data="form.store_info"
                  style="width: 100%">
                  <el-table-column
                    prop="store_name"
                    label="商店"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="stock"
                    label="库存"
                    width="180">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.stock" placeholder="请输入库存"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="retail_price"
                    label="零售价">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.retail_price" placeholder="请输入零售价"></el-input>
                    </template>
                  </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
          </el-card>

          <!-- 变体 -->
          <el-card class="box-card" v-show="form.has_more_sku==1">
            <el-row :gutter="20">
              <!-- 左边 -->
              <el-col :span="2">
                <div class="part-info">
                  <div class="title">多属性</div>
                  <div class="info">管理多属性</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="22">

                <!-- 修改时不可以使用动态生成功能 -->
                <!-- 动态生成产品规格操作控件 -->
                <!-- <template v-for="(item,index) in currAttrChildAttrs">
                  <el-row :key="index"  :gutter="20" style="margin-bottom:10px">
                    <el-col :span="2">
                      <span>
                        {{item.name}}
                      </span>
                    </el-col>
                    <el-col :span="17">
                      <el-select style="width:100%" v-model="randomSelected[item.name]" :allow-create="item.is_allow_add==1" filterable :multiple="item.select_type==1" placeholder="请选择" @change="randomSelectChange">
                        <el-option
                          v-for="item in item.value_list"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="5">
                    </el-col>
                  </el-row>
                </template> -->

                <el-table
                  :data="form.tableData"
                  :border="false"
                  :show-header="true"
                  @row-dblclick="attrsTableRowClick"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="sku_name"
                    width="300">
                      <template slot="header">
                        <el-row>
                          <el-col :span="12">

                            <template v-if="selectionArr.length>0">
                              <span>已经选择{{selectionArr.length}}个属性</span>
                            </template>
                            <template v-else-if="form.tableData">
                              <span>有{{form.tableData.length || 0}}个属性</span>
                            </template>

                          </el-col>
                          <el-col :span="12">
                            <el-dropdown size="mini" split-button type="plain" @command="handleBatchEditAttr" v-if="selectionArr.length>0">
                              批量编辑
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="sku">SKU</el-dropdown-item>
                                <el-dropdown-item command="barcode">条码</el-dropdown-item>
                                <el-dropdown-item command="price">价格</el-dropdown-item>
                                <el-dropdown-item command="stock">库存</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>

                          </el-col>
                        </el-row>
                      </template>
                  </el-table-column>
                  
                  <el-table-column
                    prop="info"
                    width="">
                      <template slot-scope="scope">
                        <el-row>
                          <el-col :span="24"><span>{{scope.row.store_info.length}} 个地点有 {{ stockTotal(scope.row.store_info) }} 存货</span></el-col>
                        </el-row>
                      </template>
                  </el-table-column>
                  <el-table-column width="50">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-delete" size="mini" circle @click="deleteSku(scope)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 自定义添加属性 -->
                <el-row>
                  <el-col :span="24">
                    <el-button type="text" icon="el-icon-plus" @click="addAttr">新增属性</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>

          <!-- 属性 -->
          <!-- <el-card class="box-card">
            <el-row :gutter="20">
              <el-col :span="7">
                <div class="part-info">
                  <div class="title">属性</div>
                  <div class="info">产品自定义属性。比如过期时间，产品LOTE</div>
                </div>
              </el-col>
              <el-col :span="17">
              </el-col>
            </el-row>
          </el-card> -->
          <!-- 购买 -->
          <el-card class="box-card">
            <el-row :gutter="20">
              <!-- 左边 -->
              <el-col :span="7">
                <div class="part-info">
                  <div class="title">购买</div>
                  <div class="info">选择供应商和产品成本价</div>
                </div>
              </el-col>
              <!-- 右边 -->
              <el-col :span="17">
                <el-row :gutter="20">
                  <el-col :span="6">
                      <el-select v-model="form.supplier_id" placeholder="请选择供应商">
                        <el-option
                          v-for="item in suppliers"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="6">
                      <el-select v-model="form.supplier_rate" placeholder="请选择税率">
                        <el-option
                          v-for="item in rate"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-col>
                  <el-col :span="12">
                      <el-input placeholder="请输入内容" v-model="form.purchasing_price">
                        <template slot="prepend">供应价</template>
                      </el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <!-- 右模块 -->
        <el-col :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>信息</span>
            </div>
            <el-select v-model="form.product_category_id" placeholder="请选择分类" style="width:100%">
              <el-option
                v-for="item in category_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="form.tags" multiple placeholder="请选择标签" style="width:100%;margin-top:10px">
              <el-option
                v-for="item in tags"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <!-- 不能修改产品是简单产品还是复合产品 -->
            <!-- <div style="margin-top:10px">
              <el-switch
                v-model="form.has_more_sku"
                :active-value="1"
                :inactive-value="0"
                active-text="复合产品"
                inactive-text="简单产品">
              </el-switch>
            </div> -->
            <!-- 不能修改产品规格 -->
            <!-- 选择规格 -->
            <!-- <div style="margin-top:10px" v-show="form.has_more_sku==1">
              <el-select v-model="form.product_attribute_category_id" placeholder="请选择规格" style="width:100%" @change="attrsTreeChange">
                <el-option
                  v-for="item in attrsTree"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div> -->

            <el-select v-model="form.unit" placeholder="请选择单位" style="width:100%;margin-top:10px">
              <el-option
                v-for="item in units"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="form.package_num" style="width:100%;margin-top:10px">
              <template slot="prepend">包数量</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="form.box_num" style="width:100%;margin-top:10px">
              <template slot="prepend">箱数量</template>
            </el-input>
          </el-card>

          <!-- 图片 -->
          <el-card class="box-card">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 添加商品表单结束 -->

    <!-- 编辑单个属性弹窗 -->
    <el-dialog :title="'编辑 '+oneAttr.sku_name" :visible.sync="editAttrDialogVisible" width="50%" :append-to-body="true" :close-on-click-modal="false">
      <el-form label-position="left" label-width="80px" :model="oneAttr">
        <el-form-item label="SKU">
          <el-input v-model="oneAttr.sku_code"></el-input>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="oneAttr.barcode"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="oneAttr.store_info"
        style="width: 100%">
        <el-table-column
          prop="store_name"
          label="商店"
          width="180">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock" placeholder="请输入库存"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="retail_price"
          label="零售价">
          <template slot-scope="scope">
            <el-input v-model="scope.row.retail_price" placeholder="请输入零售价"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAttrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAttrDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建属性弹窗 -->
    <el-dialog title="新建属性" :visible.sync="addAttrDialogVisible" width="50%" :append-to-body="true" :close-on-click-modal="false">
      <template v-for="(item,index) in currAttrChildAttrs">
        <el-row :key="index"  :gutter="20" style="margin-bottom:10px">
          <el-col :span="4">
            <span>
              {{item.name}}
            </span>
          </el-col>
          <el-col :span="20">
            <el-select style="width:100%" v-model="randomSelected[item.name]" :allow-create="true" filterable :multiple="false" placeholder="请选择" @change="randomSelectChange">
              <el-option
                v-for="item in item.value_list"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>
      <el-form label-position="left" label-width="80px" :model="addNewAttr">
        <el-form-item label="属性名">
          <el-input v-model="addNewAttr.sku_name"></el-input>
        </el-form-item>
        <el-form-item label="SKU">
          <el-input v-model="addNewAttr.sku_code"></el-input>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="addNewAttr.barcode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAttrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddNewAttr()">确 定</el-button>
      </div>
    </el-dialog>


    <!-- 编辑多个属性弹窗 -->
    <el-dialog :title="'批量编辑 '+ currSelectionArrEditType" :visible.sync="editAttrsDialogVisible" width="50%" :append-to-body="true" :close-on-click-modal="false" @close="handleBatDialogClose">
      <!-- 批量编辑sku -->
      <template v-if="currSelectionArrEditType=='sku'">
        <el-form label-position="left" label-width="150px">
          <template v-for="(item,index) in selectionArr">
            <el-form-item :key="index" :label="item.sku_name+' SKU'">
              <el-input v-model="item.sku_code"></el-input>
            </el-form-item>
          </template>
        </el-form>
      </template>
      <!-- 批量编辑条码 -->
      <template v-if="currSelectionArrEditType=='barcode'">
        <el-form label-position="left" label-width="150px">
          <template v-for="(item,index) in selectionArr">
            <el-form-item :key="index" :label="item.sku_name+' 条码'">
              <el-input v-model="item.barcode"></el-input>
            </el-form-item>
          </template>
        </el-form>
      </template>
      <!-- 批量编辑库存或价格 -->
      <template v-if="currSelectionArrEditType=='stock' || currSelectionArrEditType=='price'">
          <div v-if="!currEditStore">
            <div style="margin-bottom:10px">请选择要编辑的商店</div>
            <el-select v-model="currEditStore" placeholder="请选择商店">
              <el-option
                v-for="item in stores_arr"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div v-else>
            <div style="margin-bottom:10px">编辑{{currEditStore.name}}库存</div>
            <el-form label-position="left" label-width="150px">
              <template v-for="(item_f,i) in selectionArr">
                  <template v-for="(item_c,j) in item_f.store_info.filter((v)=>{return v.store_id==currEditStore.id})">
                    <template v-if="currSelectionArrEditType=='stock'">
                      <el-form-item :key="i+j" :label="item_f.sku_name+' 库存'">
                          <el-input v-model="item_c.stock"></el-input>
                      </el-form-item>
                    </template>
                    <template v-if="currSelectionArrEditType=='price'">
                      <el-form-item :key="i+j" :label="item_f.sku_name+' 价格'">
                          <el-input v-model="item_c.retail_price"></el-input>
                      </el-form-item>
                    </template>
                  </template>
              </template>
            </el-form>
          </div>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAttrsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAttrsDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import Title from "./components/Title"
import apis from "@/api/index"
import util from "@/lib/util.js"
export default {
  name:'addProducts',
    components:{
      Title
    },
    data(){
      return{
        form:{},
        addAttrDialogVisible:false,
        editAttrDialogVisible:false,
        editAttrsDialogVisible:false,
        oneAttr:{},//编辑单个属性
        addNewAttr:{},//新建单个属性
        rate: [{
          value: 7,
          label: 'I.G.I.C 7%'
        }, {
          value: 21,
          label: 'I.G.I.C 21%'
        }, {
          value: 3,
          label: 'I.G.I.C 3%'
        }],

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

        units:[{
          value: 1,
          label: '包'
        }, {
          value: 2,
          label: '个'
        }, {
          value: 3,
          label: '只'
        }],
        stores_arr:[
          {name:'商店1',id:1},
          {name:'商店2',id:2},
          {name:'商店3',id:3},
        ],
        //分类数据
        category_list:[],
        //产品规格数据结构
        randomCol:[
          {
            name:'颜色',
            is_allow_add:1,
            select_type:1,
            items:[
              '金色',
              '黄色',
              '银色',
            ]
          },
          {
            name:'ROM',
            is_allow_add:1,
            select_type:1,
            items:[
              '16G',
              '32G',
              '64G',
              '128G',
            ]
          },
          {
            name:'RAM',
            is_allow_add:1,
            select_type:1,
            items:[
              '1G',
              '2G',
              '4G',
            ]
          },
        ],
        // 规格树
        attrsTree:[],
        randomSelected:{},
        tableData:[],
        tableDataCatch:[],
        selectionArr:[],
        currSelectionArrEditType:null,
        currEditStore:null,
      }
    },
    methods:{
      addAttr(){
        this.randomSelected = {}
        this.addNewAttr = {};
        this.addAttrDialogVisible = true;
      },
      confirmAddNewAttr(){
        const f = this.form.tableData.find((any)=>{
          return this.addNewAttr.sku_name == any.sku_name
        })
        if(f){
          this.$message.error(f.sku_name+'已经存在');
          return;
        }
        this.form.tableData.push(util.copyObjectByJson( this.addNewAttr ))
        this.addNewAttr = {};
        this.addAttrDialogVisible = false
      },
      randomSelectChange(){
        console.log('randomSelected',this.randomSelected)
        console.log('randomSelected keys',Object.keys(this.randomSelected))
        let cols = []
        Object.keys(this.randomSelected).forEach((index)=>{
           let a =this.randomSelected[index];
          //  console.log('a的类型',typeof a)
          if(typeof a == 'string') a = [a];
           if(a.length>0) cols.push(a)
        })
        console.log(cols)

        let r = cols.reduce((last,current)=>{
          let arr = []
          last.forEach(part1=>{
            current.forEach(part2=>{
              arr.push(part1+'/'+part2)
            })
          })
          return arr;
        })
        console.log('合并结果',r);
        // 备份一下缓存
        // this.tableDataCatch = JSON.parse( JSON.stringify(this.form.tableData) );
        // this.form.tableData=[] //清空

        r.forEach((v,index)=>{

          //一个sku的数据模板
          let tem = {
            sku_name:v,
            sku:'',
            barcode:0,
            in_price:0,
            retail_price:0,
            store_info:[]
          }
          console.log('sku code',)
          //添加店铺价格与库存
          this.stores_arr.forEach((s)=>{
            tem.store_info.push({
              store_id:s.id,
              store_name:s.name,
              retail_price:0,
              stock:0,
            })
          })

          Object.assign(tem,{
            sku_code:util.formatTime(0,'YMDhms')+'-'+index,
          })
          this.addNewAttr=tem
        })
      },
      getSKUTime(index){
        return new Promise((re)=>{
          setTimeout(() => {
            re(util.formatTime(0,'YMDhms')+'-'+index)
          }, 1000);
        })
      },
      //多属性表格某一行被点击
      attrsTableRowClick(row){
        console.log(row)
        this.editAttrDialogVisible = true;
        this.oneAttr = row

      },
      getStoreList(){
        apis.store.read().then(res=>{
          console.log('res',res)
          this.stores_arr = res.data.data
        }).catch(err=>{
          console.log('err',err)
        })
      },
      handleSelectionChange(val){
        console.log(val)
        this.selectionArr = val;
      },
      //批量编辑属性
      handleBatchEditAttr(cmd){
        this.currSelectionArrEditType = cmd
        this.editAttrsDialogVisible = true;
        switch(cmd){
          case 'sku':
          break;
          case 'barcode':
          break;
          case 'stock':
          break;
          case 'price':
          break;
        }
      },
      //批量设置窗口关闭要处理的
      handleBatDialogClose(){
        this.currEditStore=null
      },
      //统计库存
      stockTotal(arr){
        let tt = 0;
        arr.forEach(v=>{
          tt+= parseInt( v.stock )
        })
        return tt;
      },
      save(){
        console.log(this.form)
        apis.product.update(this.form).then(res=>{
          console.log('res',res)
          this.$router.push({name:'product'})
        }).catch(err=>{
          console.log('err',err)
        })
      },
      getCategoryList(){
        apis.category.read(0).then(res=>{
          console.log('res',res)
          this.category_list = res.data.data
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        }).catch(err=>{
          console.log('err内容',err)
          this.$message({
            message: err,
            type: 'error'
          });
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
      ReadAttrsTree(){
        apis.attr.ReadAttrsTree().then(res=>{
          console.log('res',res)
          // this.form_loading = false;
          this.attrsTree = res.data.data
        }).catch(err=>{
          this.form_loading = false;
          console.log('err',err)
        })
      },
      readOneProduct(){
        let p = this.$route.params.obj;
        if(!p) return;
        console.log(p)
        apis.product.readOneProduct({id:p.id}).then(res=>{
          console.log('res',res)
          // this.form_loading = false;
          this.form = res.data.data
        }).catch(err=>{
          this.form_loading = false;
          console.log('err',err)
        })
      },
      attrsTreeChange(c){
        this.randomSelected={}
        this.form.tableData=[]
        this.tableDataCatch=[]
        this.selectionArr=[]
        this.currSelectionArrEditType=null
        this.currEditStore=null
        console.log('规格选中值的变化',c)
      },
      //删除一个sku信息
      deleteSku(scope){
        this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            if(!scope.row.id){
              this.form.tableData.splice(scope.$index,1)
              return;
            }
            let opt = {
                id:scope.row.id
            }
            apis.sku.delete(opt).then(()=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.readOneProduct()
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
    mounted(){
        const default_form_tem = {
          has_more_sku:0,
        }
        Object.assign(this.form,default_form_tem)

        //获取商店信息
        // this.form.store_info = JSON.parse(JSON.stringify(this.stores_arr))

        //获取分类信息
        this.getCategoryList();
        //获取标签信息
        this.getTagList();
        //获取规格
        this.ReadAttrsTree()
        //获取供应商
        this.getSupplierList();
        //获取商店
        this.getStoreList()
        
        this.readOneProduct()


    },
    computed:{
      randomColArr(){ 
        let arr = []
        Object.keys(this.randomSelected).forEach((k)=>{
            arr.push({colname:k})
        })
        return arr;
      },
      currAttrChildAttrs(){
        let f = this.attrsTree.find(v=>{
          return this.form.product_attribute_category_id ==v.id
        })
        if(f){
          return f.items.map(v=>{
            console.log('待json.parse',v)
            if(typeof v.value_list == 'string') v.value_list = JSON.parse(v.value_list)
            Object.assign(v,{
              is_allow_add:1,
              select_type:1,
            })
            return  v
          })
        }
        return []
      }
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