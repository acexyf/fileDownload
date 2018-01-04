<template>
  <div class="home-wrap">
    <template v-for="(fileItem, fileIndex) in fileList">
      <div 
      :class="['file-line','file-icon-'+fileItem.type]"
      @click="fileItemClick(fileIndex)"
      >
          {{fileItem.fileName}}
        </div>
    </template>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Home',
    data() {
      return {
        fileList: [],
        currentPath: '/'
      }
    },
    mounted() {
      this.getFileList(this.currentPath)

    },
    methods: {
      getFileList(path) {
        axios.get('/api/getFileList', {
            params: {
              path
            }
          })
          .then((resp) => {
            return resp.data;
          })
          .then((res) => {
            console.log(res)
            this.fileList = res.data;
          })
      },
      fileItemClick(fileIndex){

        console.log(fileIndex)
        let fileItem = this.fileList[fileIndex];

        if(fileItem.isDir){
            //是目录
        } else {
            //是文件
            this.downloadFile(`${this.currentPath}${fileItem.fileName}`)
        }

      },
      downloadFile(filePath){
        axios.get('/api/download')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import './Home.less';

</style>
