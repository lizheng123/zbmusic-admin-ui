/**
  * api接口的统一出口
*/
// pms模块接口
import category from '@/api/category.js';
import tag from '@/api/tag.js';
import supplier from '@/api/supplier.js';
import store from '@/api/store.js';
import attr from '@/api/attr.js';
import user from '@/api/user.js';
import sku from '@/api/sku.js';
import upload from '@/api/upload.js';

//wms模块接口

// 其他模块的接口……

// 导出接口
export default {
  category,
  tag,
  supplier,
  store,
  attr,
  user,
  sku,
  upload

}
