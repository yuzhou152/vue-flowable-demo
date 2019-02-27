<template>
  <div>
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
      <el-popover
        placement="right"
        width="200"
        trigger="click">
        <el-row>
          <el-col>
            选择下一节点执行人
          </el-col>
          <el-col>
            <el-tree
              :data="data2"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </el-col>
          <el-col style="text-align: center">
            <el-button type="primary" size="medium" @click="completeTask">确定</el-button>
          </el-col>
        </el-row>
        <el-button slot="reference" type="primary">提交</el-button>
      </el-popover>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "task2",
    components: {
    },
    data(){
      return {
        taskId:null,
        orderCode:null,
        processInstanceId:null,
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
    methods:{
      completeTask(){
        const _this = this;
        var checkedNodes = _this.$refs.tree.getCheckedNodes()
        var length = checkedNodes.length;
        if (length == 0) {
          this.$message.warning("Please choose the user you want to delegate to.");
          return;
        }
        var users = "";
        for (let i = 0; i < length; i++) {
          if (!!checkedNodes[i].children) {
            continue;
          }
          users += checkedNodes[i].label + ","
        }
        users = users.substr(0,users.length-1)
        console.log(users)
        this.$axios.post(this.$api.flowableapi+"form/form-data",{
          taskId:_this.taskId,
          properties: [
            {
              "id":"assigneeList",
              "name":"assigneeList",
              "type":"string",
              "value":users
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
