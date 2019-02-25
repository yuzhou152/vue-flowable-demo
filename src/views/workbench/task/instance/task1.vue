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
      name: "task1",
      components: {
        imgDialog
      },
      data(){
        return {
          imgDialogVisible:false,
          taskId:null,
          orderCode:null,
          processInstanceId:null
        }
      },
      methods:{
        showImg(){
          this.imgDialogVisible = true;
        },
        completeTask(){
          const _this = this;
          this.$axios.post(this.$api.flowableapi+"runtime/tasks/"+this.taskId,{
            action : "complete",
            assignee : this.$store.state.app.user.passport
          },{})
            .then(function (response) {
              if (response.status != 200) {
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
