<template>
  <el-dialog title="启动流程"
             width="30%"
             top=150px
             :close-on-click-modal="false"
             :visible="templateDialog"
             :center="true"
             @close="closeDia"
             @open="openDia">
    <el-form :model="formData" ref="formData" label-width="130px" size="large">
      <el-form-item label="订单号：">
        <el-input v-model="formData.orderCode"></el-input>
      </el-form-item>
      <el-form-item label="业务分类：">
        <el-select v-model="formData.processDefinitionId" placeholder="请选择流程">
            <el-option
              v-for="item in processDefinitionList"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.version }}</span>
            </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="templateDialog = false">取 消</el-button>
      <el-button type="primary" @click="startProcess()">启 动</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
      name: "startProcess",
      data:function(){
        return {
          templateDialog: this.templateVisible,
          formData:{
            orderCode:null,
            processDefinitionId:null
          },
          processDefinitionList:[
            {
              name:"专利-发明专用流程",
              id:"1",
              version:21
            }
          ]
        }
      },
      props: {
        templateVisible: {
          type: Boolean,
          default: false
        }
      },
      watch: {
        templateVisible: function(){
          this.templateDialog = this.templateVisible
        }
      },
      methods: {
        closeDia() {
          this.$emit('update:templateVisible', false);
        },
        openDia() {
          const _this = this;
          this.$axios.get(this.$api.flowableapi+"repository/process-definitions",{
            params: {
              size: 500
            }
          })
            .then(function (response) {
              _this.processDefinitionList = response.data.data;
            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
        },
        startProcess() {
          const _this = this;
          this.$axios.post(this.$api.flowableapi+"runtime/process-instances",{
            processDefinitionId: this.formData.processDefinitionId,
            businessKey: this.formData.orderCode
          },{})
            .then(function (response) {
              if (response.status != 201) {
                _this.$message.error(response.statusText)
              } else {
                _this.$message.success(response.statusText)
                _this.formData.orderCode = null;
                _this.formData.processDefinitionId = null;
                _this.templateDialog = false;
              }
            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
        }
      }
    }
</script>

<style scoped>
  .el-form {
    margin-right:30%
  }
</style>
