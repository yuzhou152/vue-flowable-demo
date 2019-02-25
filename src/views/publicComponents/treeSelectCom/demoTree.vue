<template>
  <div>
    <el-dialog
      width="30%"
      top=150px
      :showClose="false"
      :visible.sync="templateDialog"
      center
      @close="closeDia">
      <el-row>
        <el-col>
          <el-tree
            :data="data2"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @check-change="checkChange"
            @node-click="nodeClick">
          </el-tree>
        </el-col>
        <el-col style="text-align: center">
          <el-button type="primary" size="medium" @click="saveData">确定</el-button>
          <el-button size="medium" @click="templateDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "demoTree",
      data(){
        return {
          templateDialog: this.demoTreeDialogVisible,
          data2: [{
            id: 1,
            label: 'group1',
            children: [{
              id: 4,
              label: 'group2',
              children: [{
                id: 9,
                label: 'user2-1'
              }, {
                id: 10,
                label: 'user2-2'
              }]
            },{
              id: 11,
              label: 'group5',
              children: [{
                id: 12,
                label: 'user5-1'
              }, {
                id: 13,
                label: 'user5-2'
              }]
            }]
          }, {
            id: 2,
            label: 'group3',
            children: [{
              id: 5,
              label: 'user3-1'
            }, {
              id: 6,
              label: 'user3-2'
            }]
          }, {
            id: 3,
            label: 'group4',
            children: [{
              id: 7,
              label: 'user4-1'
            }, {
              id: 8,
              label: 'user4-2'
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        }
      },
      props: {
        demoTreeDialogVisible: {
          type: Boolean,
          default: false
        },
        taskId: {
          type: String,
          default: false
        }
      },
      watch: {
        demoTreeDialogVisible: function(){
          this.templateDialog = this.demoTreeDialogVisible
        }
      },
      methods: {
        saveData() {
          const _this = this;
          if (this.$refs.tree.getCheckedNodes().length = 0) {
            this.$message.warning("Please choose the user you want to delegate to.");
          }

          var bodyData = {
            action : "delegate",
            assignee : _this.$refs.tree.getCheckedNodes()[0].label
          };
          this.$axios.post(this.$api.flowableapi+"runtime/tasks/"+_this.taskId,
            bodyData
            ,{})
            .then(function (response) {
              if (response.status != 200) {
                _this.$message.error(response.statusText)
              }
            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
          this.templateDialog = false;
        },
        closeDia() {
          this.$emit('update:demoTreeDialogVisible', false);
        },
        /**
         * zb-单选控制配合nodeclick使用
         * @param item  当前点击Object
         * @param node  未选中复选框
         * @param self
         */
        checkChange (item, node, self) {
          if (this.multiple) return false
          if (node === true) {
            // 点击未选中复选框
            this.editCheckId = item.id
            if (item.disabled) return false
            this.$refs.tree.setCheckedKeys([item.id])
          } else {
            if (this.editCheckId === item.id) {
              // 点击已选中复选框，保证至少一个选中
              if (item.disabled) return false
              this.$refs.tree.setCheckedKeys([item.id])
            }
          }
        },
        /**
         * zb-单选控制配合checkChange使用
         * @param item  当前点击Object
         * @param node  未选中复选框
         * @param self
         */
        nodeClick (item, node, self) {
          if (this.multiple) return false
          this.editCheckId = item.id
          if (item.disabled) return false
          this.$refs.tree.setCheckedKeys([item.id])
        }
      }
    }
</script>

<style scoped>
</style>
