<template>
  <div>
    <!--<el-row>
      <el-button type="success" @click="showImg" round>查看流程详情</el-button>
    </el-row>-->
    <el-row>
      <el-form label-width="130px" size="large">
        <template v-for="(item) in 6">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="'业务数据'+(item*2-1)">
                <el-input placeholder="请输入内容" width="100px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="'业务数据'+(item*2)">
                <el-input placeholder="请输入内容" width="100px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-row>
          <el-col>
            <el-form-item :label="'下一节点'">
              <el-select v-model="form.nodeid" placeholder="请选择下一节点">
                <el-option label="CPC受理" value="0" key="0"></el-option>
                <el-option label="客户确认" value="1" key="1"></el-option>
                <el-option label="制作文件" value="2" key="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="to-center">
      <el-button type="primary"@click="saveData">保存</el-button>
      <el-button type="primary" @click="completeTask">提交</el-button>
    </el-row>
    <imgDialog :imgDialogVisible.sync="imgDialogVisible"
               :processInstanceId="processInstanceId"></imgDialog>
  </div>
</template>

<script>
  import imgDialog from '@/views/publicComponents/imgShowCom/imgDialog';
  export default {
    name: "task2",
    components: {
      imgDialog
    },
    data(){
      return {
        imgDialogVisible:false,
        taskId:null,
        orderCode:null,
        processInstanceId:null,
        form:{
          nodeid:"请选择"
        }
      }
    },
    methods:{
      showImg(){
        this.imgDialogVisible = true;
      },
      completeTask(){
        const _this = this;
        this.$axios.post(this.$api.flowableapi+"form/form-data",{
          taskId:_this.taskId,
          properties: [
            {
              "id":"nodeid",
              "name":"nodeid",
              "type":"integer",
              "value":_this.form.nodeid
            }
          ]
        },{})
          .then(function (response) {
            if (response.status != 204) {
              _this.$message.error(response.statusText)
            }
            _this.$message.success(response.statusText)
          })
          .catch(function (error) {
            _this.$message.error(error.toString())
          });
      },
      saveData(){
        this.$message.success("Saved data successfully!")
      }
    },
    created(){
      this.orderCode = this.$route.params.ordercode;
      this.taskId = this.$route.params.taskid;
      this.processInstanceId = this.$route.params.processInstanceId;
    }
  }
</script>

<style scoped>
  .el-row {
    margin: 20px auto;
  }
  .to-center {
    text-align: center;
  }
</style>
