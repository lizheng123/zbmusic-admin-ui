<template>
  <div>
	<input type='file' value="" id="read" >
  </div>
</template>

<script>
export default {
    methods:{
        read(e){
            console.log(e)
            let f = e.target.files[0]
            console.log('file name',f.name)
            var reader = new FileReader();
            reader.onload =(e) => {
                let data = 0;
                console.log('e',e)
                console.log('e.target.result',e.target.result)
                if ( typeof e.target.result === 'object' ) {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                }
                // else {
                //   //如果转化为base64会进行到这里
                //   data = e.target.result
                // }
                console.log('data',data)
            }
            reader.readAsArrayBuffer(f);
        }
    },
    mounted(){
        var file=document.getElementById("read");
        file.addEventListener("change",this.read,false);
    }
}
</script>

<style>

</style>