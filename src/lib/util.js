import store from "@/store/index";

const util = {
  /*
   *一维数组元素查找
   *@param String search
   *@param Array array
   *return Boolen
   */
  in_array: function(search, array) {
    for (var i in array) {
      if (array[i] == search) {
        return true;
      }
    }
    return false;
  },
  /*
   *遍历对象查找
   *@param String search
   *@param Array array
   *return Boolen
   */
  findObjInArray: function(
    compare_attr,
    compare_value,
    array,
    return_attr = "",
    return_data = true
  ) {
    if (!array || !this.isArray(array) || array.length == 0) {
      return false;
    }
    for (var i in array) {
      if (
        "" + array[i][compare_attr].toLowerCase() ==
        "" + compare_value.toLowerCase()
      ) {
        if (return_attr) {
          return array[i][return_attr];
        } else {
          if (return_data) {
            return array[i];
          } else {
            return true;
          }
        }
      }
    }
    return false;
  },
  /*
   *格式化日期，如月、日、时、分、秒保证为2位数
   *@param Number n
   *return String
   */
  formatNumber: function(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  },
  /*
   *将时间戳转化为固定格式时间字符串
   *@param Number number 为毫秒时间戳
   *return String format为需要转换成的日期格式
   */
  formatTime: function(number, format, is12=false, isUtc = false) {
    let time = new Date();
    let newArr = [];
    let formatArr = ["Y", "M", "D", "h", "m", "s"];
    newArr.push(time.getFullYear());
    newArr.push(
      this.formatNumber(!isUtc ? time.getMonth() + 1 : time.getUTCMonth() + 1)
    );
    newArr.push(this.formatNumber(!isUtc ? time.getDate() : time.getUTCDate()));

    newArr.push(
      this.formatNumber(!isUtc ? time.getHours() : time.getUTCHours())
    );
    newArr.push(
      this.formatNumber(!isUtc ? time.getMinutes() : time.getUTCMinutes())
    );
    newArr.push(
      this.formatNumber(!isUtc ? time.getSeconds() : time.getUTCSeconds())
    );

    if (is12) {
      if (newArr[3] > 12) {
        newArr[3] -= 12;
        newArr[3] = "PM " + newArr[3];
      } else {
        newArr[3] = "AM " + newArr[3];
      }
    }

    for (let i in newArr) {
      format = format.replace(formatArr[i], newArr[i]);
    }
    return format;
  },
  /*
   *时间基础固定格式转化为其他格式
   *@param String timestr y-m-d h:m:s
   *return String format为需要转换成的日期格式
   */
  baseFormatTimeToOther: function(timestr, format, is12) {
    if (!timestr) {
      return;
    }
    if (!format) {
      format = store.state.system.time_format;
    }
    if (!format) {
      format = "Y-M-D h:m:s";
    }

    let timeArr_ymd = timestr.split(" ")[0].split("-");
    let timeArr_hms = timestr.split(" ")[1].split(":");

    let newArr = [];
    let formatArr = ["Y", "M", "D", "h", "m", "s"];
    newArr.push(timeArr_ymd[0]);
    newArr.push(timeArr_ymd[1]);
    newArr.push(timeArr_ymd[2]);

    newArr.push(timeArr_hms[0]);
    newArr.push(timeArr_hms[1]);
    newArr.push(timeArr_hms[2]);
    if (is12) {
      if (newArr[3] > 12) {
        newArr[3] -= 12;
        newArr[3] = "PM " + newArr[3];
      } else {
        newArr[3] = "AM " + newArr[3];
      }
    }

    for (let i in newArr) {
      format = format.replace(formatArr[i], newArr[i]);
    }
    return format;
  },
  /*
   *获取指定时区时间
   *@param Number targetTimezone gmt时差
   *return String format为需要转换成的日期格式
   */
  timeZoneTime: function(targetTimezone, format) {
    // 目标时区，东9区
    // let targetTimezone = -9
    // 当前时区与中时区时差，以min为维度
    let _dif = new Date().getTimezoneOffset();
    // 本地时区时间 + 时差  = 中时区时间
    // 目标时区时间 + 时差 = 中时区时间
    // 目标时区时间 = 本地时区时间 + 本地时区时差 - 目标时区时差
    // 东9区时间
    // https://www.cnblogs.com/goloving/p/10514914.html  获取的东时区为 负数，西时区为正数。我们也保持一致
    let time =
      new Date().getTime() +
      _dif * 60 * 1000 -
      -targetTimezone * 60 * 60 * 1000;
    return this.formatTime(new Date(time).getTime(), format, false);
  },

  /**
   * unix 时间戳转换为不同时区的时间
   * @timeStamp unix时间戳 秒 为格林威治时间
   * gmt 时差
   *
   * */
  timestampToGmtTime: function(
    timeStamp,
    gmt,
    is12 = false,
    format = "Y-M-D h:m:s"
  ) {
    if (!this.isNumber(timeStamp) || !gmt) {
      return;
    }
    gmt = parseInt(this.getGmtNum(gmt));

    let time = timeStamp * 1000 + gmt * 60 * 60 * 1000; //格林威治标准时间 秒  +/- 时差
    return this.formatTime(time, format, is12, true);
  },
  /**
   * 获取格林威治时间戳
   * http://www.imooc.com/wenda/detail/579506
   */
  getGMTTimestamp: function() {
    // let dt = new Date;
    // dt.setMinutes( dt.getMinutes() + dt.getTimezoneOffset() ); // 当前时间(分钟) + 时区偏移(分钟)
    // return dt.getTime()
    var d1 = new Date();
    d1.toUTCString();
    return Math.floor(d1.getTime() / 1000);
  },

  /**
   * 将字符串中的单词首字母大写
   * @param String str 待转换字符串
   *return String 转换后的字符串
   */
  strWordToUpperCase: function(str) {
    let strArr = str.split(" ");
    for (let i = 0; i < strArr.length; i++) {
      strArr[i] =
        strArr[i].substring(0, 1).toUpperCase() +
        strArr[i].toLowerCase().substring(1);
    }
    return strArr.join(" ");
  },
  /**
   * 获取gmt （如：GMT+01:30） 字符串中的数字和符号
   * @param String str 待转换字符串
   *return String 转换后的字符串
   */
  getGmtNum: function(str) {
    if (!str) {
      return;
    }
    let gmtarr = str.split("");
    // gmt + 11:30
    let gmtInt_h = parseInt(gmtarr[4] + gmtarr[5]); //小时

    let gmtInt_m2h = parseFloat((gmtarr[7] + gmtarr[8]) / 60); //分转小时
    let gmtNum = parseFloat(gmtInt_h + gmtInt_m2h); //合计小时

    let gmtr = gmtarr[3] + gmtNum; //符号加时间
    return gmtr;
  },
  /**
   * 获取地址栏参数值
   * @param String name 参数
   *return String 值
   */
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (!r) {
      r = window.location.hash.substr(1).match(reg);
    }
    if (r != null) return unescape(r[2]);
    return null;
  },
  /**
   * 将地址栏反斜杠转换为斜杠
   * */
  turnBackSlashToSlash(s) {
    if (!s) {
      return false;
    }
    return s.replace(/[\\]/g, "/");
  },
  /**
   * 兼容性比较好的 转base64
   * @param String str 参数
   *return base64 String 值
   */
  base64_encode: function(str) {
    if (!str) {
      return false;
    }
    var b = new Buffer(str);
    return b.toString("base64");
  },
  /**
   * 兼容性比较好的 base64转字符串
   * @param String str 参数
   *return base64 String 值
   */
  base64_decode: function(str) {
    if (!str) {
      return false;
    }
    var b = new Buffer(str, "base64");
    return b.toString("utf8"); // hex => 转成十六进制
  },
  /**
    * copy a new obj
    * 注意：会忽略掉对象中的方法，所以此方法只适合拷贝不带方法的对象
    * a. 如果你的对象里有函数, 函数无法被拷贝下来
    b. 无法拷贝copyObj对象原型链上的属性和方法
    **/
  copyObjectByJson: function(obj) {
    return JSON.parse(JSON.stringify(obj));},
    //使用正则验证
  /*
   *验证商品价格的格式
   *@param Number price 商品价格
   *return Boolen
   */
  checkPrice: function(price) {
    let patt1 = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^0$)|(^[0-9](\.[0-9]{1,2})?$)/;
    if (patt1.test(price)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证手机号码的格式
   *@param Number phone 电话号码
   *return Boolen
   */
  checkPhone: function(phone) {
    let patt1 = /^1[34578]\d{9}$/;
    if (patt1.test(phone)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证电话号码的格式
   *@param Number tel 电话号码
   *return Boolen
   */
  checkTel: function(tel) {
    let patt1 = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
    if (patt1.test(tel)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证邮箱的格式
   *@param Number phone 邮箱地址
   *return Boolen
   */
  checkEmail: function(email) {
    let patt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (patt.test(email)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 验证普通字符串账号是否合格（ 以字母开头，长度在5~16之间，只能包含字母、数字和下划线）
   * @param string account
   * @return true or false
   *  */
  checkAccount(account) {
    let patt = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (patt.test(account)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证普通密码 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
   *@param String password 密码
   *return Boolen
   */
  checkPassword: function(password) {
    let patt = /^[a-zA-Z]\w{5,17}$/;
    if (patt.test(password)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证强密码 必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间
   *@param String password 密码
   *return Boolen
   */
  checkPassword_strong: function(password) {
    let patt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
    if (patt.test(password)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证IP地址
   *@param String password ip
   *return Boolen
   */
  checkIp: function(ip) {
    let patt = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/;
    if (patt.test(ip)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证IP端口
   *@param String port 端口
   *return Boolen
   */
  checkIpPort: function(port) {
    let patt = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    if (patt.test(port)) {
      return true;
    } else {
      return false;
    }
  },

  /*
   *验证是否是一个json数组字符串
   *@param String jsonStr json字符串
   *return Boolen
   */
  checkJsonArrStr: function(jsonStr) {
    let patt = /^"?\[(".+",?)?|(.+,?)?\]"?/;
    if (patt.test(jsonStr)) {
      return true;
    } else {
      return false;
    }
  },
  //常用数据类型判断--------------------------start
  /**
       *验证是否为数组 
       @params Object 一个待验证对象
       return Boolen
      */

  isArray: function(obj) {
    if (!obj) {
      return false;
    }
    return toString.call(obj) == "[object Arrary]";
  },
  /**
       *验证是否为字符串
       @params Object 一个待验证对象
       return Boolen
      */
  isString: function(obj) {
    if (!obj) {
      return false;
    }
    return toString.call(obj) == "[object String]";
  },
  /**
       *验证是否为数字
       @params Object 一个待验证对象
       return Boolen
      */
  isNumber: function(obj) {
    if (!obj) {
      return false;
    }
    return toString.call(obj) == "[object Number]";
  },
  /**
       *验证是否为日期类型
       @params Object 一个待验证对象
       return Boolen
      */
  isDate: function(obj) {
    if (!obj) {
      return false;
    }
    return toString.call(obj) == "[object Date]";
  },
  /**
       *验证是否为函数
       @params Object 一个待验证对象
       return Boolen
      */
  isFunction: function(obj) {
    if (!obj) {
      return false;
    }
    return toString.call(obj) == "[object Function]";
  },
  /**
       *验证是否为对象
       @params Object 一个待验证对象
       return Boolen
      */
  isObject: function(obj) {
    if (!obj) {
      return false;
    }
    return toString.call(obj) == "[object Object]";
  },
  //常用数据类型判断--------------------------end

  setLocalStorage: function(key, value) {
    if (!value || !key) {
      return false;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage: function(key) {
    if (!key) {
      return false;
    }
    return JSON.parse(window.localStorage.getItem(key));
  },
  setSessionStorage: function(key, value) {
    if (!value || !key) {
      return false;
    }
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  getSessionStorage: function(key) {
    if (!key) {
      return false;
    }
    return JSON.parse(window.sessionStorage.getItem(key));
  },
  //Vue项目用
  quickSetObject: function(from, to, VueObj) {
    if (!this.isObject(from) || !this.isObject(to)) {
      console.log("quickSetObject err");
      console.log("quickSetObject from", toString.call(from));
      console.log("quickSetObject to", toString.call(to));
      return false;
    }
    Object.keys(from).forEach((el) => {
      VueObj.$set(to, el, from[el]);
    });
  },

  /**
   * 产生随机整数，包含下限值，但不包括上限值
   * @param {Number} min 下限
   * @param {Number} max 上限
   * @return {Number} 返回在下限到上限之间的一个随机整数
   */
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  uuid: function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },

  randomString: function(e) {
    e = e || 32;
    let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
      a = t.length,
      n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
  },
  //去左空格;
  ltrim: function(s) {
    return s.replace(/(^\s*)/g, "");
  },
  //去右空格;
  rtrim: function(s) {
    return s.replace(/(\s*$)/g, "");
  },
  //去左右空格;
  trim: function(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
};

export default util;