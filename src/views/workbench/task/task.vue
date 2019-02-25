<template>
  <div>
    <el-row>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="订单号" prop="orderCode">
          <el-input v-model="form.orderCode"></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName"></el-input>
        </el-form-item>
        <el-form-item label="流程名称" prop="processName">
          <el-input v-model="form.processName"></el-input>
        </el-form-item>
        <el-form-item prop="finished">
          <el-switch
            v-model="form.processFinished"
            v-if="form.taskType == 'historyTask'"
            active-text="已结束流程"
            inactive-text="进行中流程"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTimeRange">
          <div class="block">
            <el-date-picker
              v-model="form.createTimeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="过期时间" prop="dueTimeRange">
          <div class="block">
            <el-date-picker
              v-model="form.dueTimeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="结束时间" prop="finishedTimeRange">
          <div class="block">
            <el-date-picker
              v-model="form.finishedTimeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findData">查询</el-button>
          <el-button @click="$refs['form'].resetFields();">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-tabs v-model="form.taskType" @tab-click="taskTypeChanged">
        <el-tab-pane label="我的任务" name="myTask">
          <el-button type="primary" icon="el-icon-zoom-in" @click="getDiagramWithoutParamByInstanceId()">查看流程详情</el-button>
          <el-button type="primary" icon="el-icon-loading" @click="dealServiceDataWithoutParam">进入办理</el-button>
          <el-button type="danger" icon="el-icon-service" @click="delegateTask">委托</el-button>
          <!-- 释放功能只允许认领后的任务中使用，数据规则为owner为null -->
          <el-button icon="el-icon-star-off" @click="dealTask('resolve')">释放</el-button>
          <el-button type="success" icon="el-icon-check" @click="dealTask('complete')">完成</el-button>
        </el-tab-pane>
        <el-tab-pane label="可认领任务" name="claimingTask">
          <el-button type="primary" icon="el-icon-zoom-in" @click="getDiagramWithoutParamByInstanceId()">查看流程详情</el-button>
          <el-button type="warning" icon="el-icon-star-on" @click="dealTask('claim')">认领</el-button>
        </el-tab-pane>
        <el-tab-pane label="历史任务" name="historyTask">
          <el-button type="primary" icon="el-icon-zoom-in" @click="getDiagramWithoutParamByDefinitionId()">查看流程详情</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <el-table :data="tableData.list"
                highlight-current-row
                @current-change="handleCurrentRowChange"
                border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="orderCode" label="订单号"></el-table-column>
        <el-table-column prop="name" label="任务名称"></el-table-column>
        <el-table-column prop="processName" label="流程名称"></el-table-column>
        <el-table-column prop="productName" label="关联商品"></el-table-column>
        <el-table-column prop="assignee" label="执行人"></el-table-column>
        <template v-if="form.taskType != 'historyTask'">
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="dueDate" label="过期时间"></el-table-column>
        </template>
        <template v-if="form.taskType == 'historyTask'">
          <el-table-column prop="startTime" label="创建时间"></el-table-column>
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </template>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getDiagramByInstanceId(scope.row.processInstanceId)" v-if="form.taskType != 'historyTask'">查看流程详情</el-button>
            <el-button type="text" size="small" @click="getDiagramByDefinitionId(scope.row.processDefinitionId)" v-if="form.taskType == 'historyTask'">查看流程详情</el-button>
            <el-button type="text" size="small" @click="dealServiceData(scope.row.category, scope.row.orderCode, scope.row.id, scope.row.processInstanceId)"
            v-if="form.taskType == 'myTask'">进入办理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevChange"
          @next-click="handleNextChange"
          :current-page="tableData.pageNo"
          :page-size="tableData.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.totalCount">
        </el-pagination>
      </div>
    </el-row>
    <imgDialog :imgDialogVisible.sync="imgDialogVisible"
               :processInstanceId="processInstanceId"
               :processDefinitionId="processDefinitionId"
               :decidedType="decidedType"></imgDialog>
    <demoTree :demoTreeDialogVisible.sync="demoTreeDialogVisible"
              :taskId="dealingTaskId"></demoTree>
  </div>
</template>

<script>
  import imgDialog from '@/views/publicComponents/imgShowCom/imgDialog';
  import demoTree from '@/views/publicComponents/treeSelectCom/demoTree';
    export default {
      name: "task",
      components: {
        imgDialog,
        demoTree
      },
      data(){
        return {
          imgDialogVisible: false,
          demoTreeDialogVisible: false,
          processDefinitionId: null,
          processInstanceId: null,
          decidedType:null,
          dealingTaskId:null,
          form:{
            orderCode: null,
            processName: null,
            taskName:null,
            processFinished:false,
            createTimeRange:[],
            dueTimeRange:[],
            finishedTimeRange:[],
            taskType:"myTask"
          },
          tableData:{
            pageNo:1,
            pageSize:10,
            totalCount:0,
            list:[]
          },
          dealingData:null,
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          }
        }
      },
      methods: {
        handleSizeChange:function(val){
          this.tableData.pageSize = val;
          this.findData();
        },
        handlePrevChange:function(val){
          this.tableData.pageNo = val;
        },
        handleNextChange:function(val){
          this.tableData.pageNo = val;
        },
        handleCurrentChange:function(val){
          this.tableData.pageNo = val;
          this.findData();
        },
        findData() {
          switch(this.form.taskType)
          {
            case "myTask":
              this.findDealingTask();
              break;
            case "claimingTask":
              this.findDealingTask();
              break;
            case "historyTask":
              this.findHistoryTask();
              break;
          }
        },
        findDealingTask() {
          const _this = this;
          var bodyData = {
            processInstanceBusinessKeyLike: this.form.orderCode,
            nameLike: this.form.taskName,
            processDefinitionNameLike: this.form.processName,
            createdAfter: this.form.createTimeRange[0],
            createdBefore: this.form.createTimeRange[1],
            dateAfter: this.form.dueTimeRange[0],
            dueBefore: this.form.dueTimeRange[1]
          }
          switch(this.form.taskType)
          {
            case "myTask":
              bodyData.assigneeLike = this.$store.state.app.user.passport;
              break;
            case "claimingTask":
              bodyData.unassigned = true;
              bodyData.candidateUser = this.$store.state.app.user.passport;
              break;
          }
          this.$axios.post(this.$api.flowableapi+"query/tasks",
            bodyData
            ,{
              params:{
                sort: "createTime",
                order: "desc",
                start: this.start,
                size: this.tableData.pageSize
              }
            })
            .then(function (response) {
              if (response.status != 200) {
                _this.$message.error(response.statusText)
              }
              var result = response.data.data;
              for (let i = 0; i < result.length; i++){
                _this.$axios.get(result[i].processDefinitionUrl,{})
                  .then(function (response2) {
                    _this.$set(result[i],"processName",response2.data.name)
                    _this.$set(result[i],"productName",response2.data.category)
                  })
                _this.$axios.get(result[i].processInstanceUrl,{})
                  .then(function (response2) {
                    _this.$set(result[i],"orderCode",response2.data.businessKey)
                  })
              }
              _this.tableData.list = result;
              _this.tableData.totalCount = response.data.total;

            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
        },
        findHistoryTask() {
          const _this = this;
          var bodyData = {
            processBusinessKeyLike: this.form.orderCode,
            taskNameLike: this.form.taskName,
            processDefinitionNameLike: this.form.processName,
            taskCreatedAfter: this.form.createTimeRange[0],
            taskCreatedBefore: this.form.createTimeRange[1],
            dueDateAfter: this.form.dueTimeRange[0],
            dueDateBefore: this.form.dueTimeRange[1],
            taskCompletedAfter: this.form.finishedTimeRange[0],
            taskCompletedBefore: this.form.finishedTimeRange[1],
            finished : true,
            processFinished : this.form.processFinished,
            taskAssignee : this.$store.state.app.user.passport
          }
          this.$axios.post(this.$api.flowableapi+"query/historic-task-instances",
            bodyData
            ,{
              params:{
                sort: "startTime",
                order: "desc",
                start: this.start,
                size: this.tableData.pageSize
              }
            })
            .then(function (response) {
              if (response.status != 200) {
                _this.$message.error(response.statusText)
              }
              var result = response.data.data;
              for (let i = 0; i < result.length; i++){
                _this.$axios.get(result[i].processDefinitionUrl,{})
                  .then(function (response2) {
                    _this.$set(result[i],"processName",response2.data.name)
                    _this.$set(result[i],"productName",response2.data.category)
                  })
                _this.$axios.get(result[i].processInstanceUrl,{})
                  .then(function (response2) {
                    _this.$set(result[i],"orderCode",response2.data.businessKey)
                  })
              }
              _this.tableData.list = result;
              _this.tableData.totalCount = response.data.total;

            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
        },
        dealTask(actionType) {
          const _this = this;
          this.$axios.post(this.$api.flowableapi+"runtime/tasks/"+_this.dealingData.id,{
            action : actionType,
            assignee : _this.$store.state.app.user.passport
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
        delegateTask() {
          if (!!!this.dealingData) {
            this.$message.warning("Please choose the data you want to deal.")
            return;
          }
          this.dealingTaskId = this.dealingData.id;
          this.demoTreeDialogVisible=true;
        },
        taskTypeChanged() {
          this.tableData.pageNo = 0;
          this.tableData.pageSize = 10;
          this.findData();
        },
        handleCurrentRowChange(val) {
          this.dealingData = val;
        },
        dealServiceDataWithoutParam() {
          if (!!!this.dealingData) {
            this.$message.warning("Please choose the data you want to deal.")
            return;
          }
          console.log(`${this.dealingData.category}${this.dealingData.orderCode}/${this.dealingData.id}/${this.dealingData.processInstanceId}`)
          this.$router.push(`${this.dealingData.category}${this.dealingData.orderCode}/${this.dealingData.id}/${this.dealingData.processInstanceId}`);
        },
        dealServiceData(taskCategory, ordercode, taskId, processInstanceId) {
          console.log(`${taskCategory}${ordercode}/${taskId}/${processInstanceId}`)
          this.$router.push(`${taskCategory}${ordercode}/${taskId}/${processInstanceId}`);
        },
        getDiagramWithoutParamByInstanceId() {
          if (!!!this.dealingData) {
            this.$message.warning("Please choose the data you want to deal.")
            return;
          }
          this.decidedType = "instance";
          this.processDefinitionId = null;
          this.processInstanceId = this.dealingData.processInstanceId;
          this.imgDialogVisible = true;
        },
        getDiagramWithoutParamByDefinitionId() {
          if (!!!this.dealingData) {
            this.$message.warning("Please choose the data you want to deal.")
            return;
          }
          this.decidedType = "definition";
          this.processInstanceId = null;
          this.processDefinitionId = this.dealingData.processDefinitionId;
          this.imgDialogVisible = true;
        },
        getDiagramByInstanceId(processInstanceId) {
          this.decidedType = "instance";
          this.processDefinitionId = null;
          this.processInstanceId = processInstanceId;
          this.imgDialogVisible = true;
        },
        getDiagramByDefinitionId(processDefinitionId) {
          console.log(processDefinitionId)
          this.decidedType = "definition";
          this.processInstanceId = null;
          this.processDefinitionId = processDefinitionId;
          this.imgDialogVisible = true;
        }
      },
      computed:{
        start:function(){
          return (this.tableData.pageNo - 1) * this.tableData.pageSize;
        }
      },
      created(){
        if (this.$route.params.ordercode != "" && this.$route.params.ordercode != "null" && this.$route.params.ordercode != null) {
          this.form.orderCode = this.$route.params.ordercode;
        }
        this.findData();
      }
    }
</script>

<style scoped>
  .el-row {
    margin: 20px auto;
  }
  .el-table {
    border-radius: 5px;
    box-shadow: 2px 3px 10px 0px grey;
  }
  .pagination {
    padding: 10px 30% 10px 30%;
  }
</style>
