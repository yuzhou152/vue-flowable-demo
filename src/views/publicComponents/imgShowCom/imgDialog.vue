<template>
    <div>
      <el-dialog
        :showClose="false"
        :visible.sync="templateDialog"
        center
        @close="closeDia">
          <img :src="processDiagram.srcAttr" :class="processDiagram.classAttr"/>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "imgDialog",
      data(){
          return {
            processDiagram:{
              srcAttr: null,
              classAttr:"processDiagramNormal"
            },
            templateDialog: this.imgDialogVisible
          }
      },
      props: {
        imgDialogVisible: {
          type: Boolean,
          default: false
        },
        processDefinitionId: {
          type: String,
          default: null
        },
        processInstanceId: {
          type: String,
          default: null
        },
        decidedType: {
          type: String,
          default: null
        }
      },
      watch: {
        imgDialogVisible: function(){
          this.templateDialog = this.imgDialogVisible
        },
        processDefinitionId: function() {
          if (this.decidedType != null && this.decidedType != "definition") {
            return;
          }
          this.processDiagram.srcAttr = this.$api.flowableapi + "repository/process-definitions/" + this.processDefinitionId + "/image"
        },
        processInstanceId: function() {
          if (this.decidedType != null && this.decidedType != "instance") {
            return;
          }
          this.processDiagram.srcAttr = this.$api.flowableapi + "runtime/process-instances/" + this.processInstanceId + "/diagram"
        }
      },
      methods: {
        closeDia() {
          this.$emit('update:imgDialogVisible', false);
        }
      }
    }
</script>

<style scoped>
  .el-dialog-body {
    padding: 0;
  }
  .processDiagramNormal{
    background-color: #333333;
    width: 100%;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0  !important;
  }
  .el-dialog__body {
    padding: 0  !important;
  }
</style>
