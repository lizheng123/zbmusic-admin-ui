/**
 * 解析的数组格式为
 * [
 *  {k:v},……
 * ]
 * 
*/

class ArrObjToCsv {
    linSpliter = '\r\n';  //行分隔符
    colSpliter = ',';  //列分隔符

    constructor(header,data,filename = "export.csv"){
        this.header = header
        this.data = data;
        this.filename = filename
    }

    //获取所有数据
    getData(){
        let r = []
        this.data.forEach(dv=>{
            let row = []
            this.header.forEach(hv=>{
                let col = dv[hv];
                if(col!=null){
                    //每一行的单列
                    col = col.toString().trim().replace(/[,;\r\n]/g,' ')
                    row.push('"'+col+'"')
                }else{
                    row.push(" ")
                }
            })
            r.push(row);
        })

        //转化为csv所需格式
        let csv = ""
        r.forEach(rv=>{
            csv+=rv.join();
            csv+=this.linSpliter;
        })
        return csv;
    }

    parse(){
        return this.getData();
    }

    exportCsv(){
        let csv = this.parse();
        const BOM = '\uFEFF';

        if (navigator.msSaveOrOpenBlob) { //ie
            let blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
            navigator.msSaveOrOpenBlob(blob, this.filename);
        } else { //other
            let uri = encodeURI(`data:text/csv;charset=utf-8,${BOM}${csv}`);
            let downloadLink = document.createElement('a');
            downloadLink.href = uri;
            downloadLink.download = this.filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
    }

}

export default ArrObjToCsv