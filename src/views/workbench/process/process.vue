<template>
  <div>
    <el-row>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="订单号" prop="orderCode">
          <el-input v-model="form.orderCode"></el-input>
        </el-form-item>
        <el-form-item label="流程名称" prop="processName">
          <el-input v-model="form.processName"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item prop="finished">
          <el-switch
            v-model="form.finished"
            active-text="已结束流程"
            inactive-text="进行中流程"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
        </el-form-item>

        <el-form-item label="开启时间" prop="startTimeRange">
          <div class="block">
            <el-date-picker
              v-model="form.startTimeRange"
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
        <el-form-item label="结束时间" prop="endTimeRange">
          <div class="block">
            <el-date-picker
              v-model="form.endTimeRange"
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
      <el-button type="primary" @click="templateVisible=true">启动流程</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData.list" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="businessKey" label="订单号"></el-table-column>
        <el-table-column prop="processDefinitionName" label="流程名称"></el-table-column>
        <el-table-column prop="categoryTe" label="关联商品"></el-table-column>
        <el-table-column prop="startTime" label="启动时间"></el-table-column>
        <template v-if="form.finished">
          <el-table-column prop="endTime" label="结束时间"></el-table-column>
        </template>
        <el-table-column prop="startUserId" label="启动人"></el-table-column>
        <el-table-column label="业务数据">...</el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getDiagramByDefinitionId(scope.row.processDefinitionId)" v-if="form.finished == true">查看流程</el-button>
            <el-button type="text" size="small" @click="getDiagramByInstanceId(scope.row.id)" v-if="form.finished == false">查看流程进度</el-button>
            <el-button type="text" size="small" v-if="!form.finished" @click="turnToTask(scope.row.businessKey)">进入办理</el-button>
            <el-button type="text" size="small" v-if="!form.finished" @click="cancelProcessInstance(scope.row.id)">取消流程</el-button>
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
    <startProcess :templateVisible.sync="templateVisible"></startProcess>
    <imgDialog :imgDialogVisible.sync="imgDialogVisible" :processDefinitionId="processDefinitionId" :processInstanceId="processInstanceId"></imgDialog>
  </div>
</template>

<script>
    import startProcess from './startProcess';
    import imgDialog from '@/views/publicComponents/imgShowCom/imgDialog';
    export default {
      name: "process",
      components: {
        startProcess,
        imgDialog
      },
      data() {
        return {
          templateVisible: false,
          imgDialogVisible: false,
          processDefinitionId: null,
          processInstanceId: null,
          form: {
            orderCode: null,
            processName: null,
            productName: null,
            finished:false,
            startTimeRange:[],
            endTimeRange:[]
          },
          tableData:{
            pageNo:1,
            pageSize:10,
            totalCount:0,
            list:[]
          },
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
      created:function(){
        this.findData();
      },
      computed:{
        start:function(){
          return (this.tableData.pageNo - 1) * this.tableData.pageSize;
        }
      },
      methods: {
        handleSizeChange:function(val){
          this.tableData.pageSize = val;
          this.findData();
        },
        handleCurrentChange:function(val){
          this.tableData.pageNo = val;
          this.findData();
        },
        handlePrevChange:function(val){
          this.tableData.pageNo = val;
        },
        handleNextChange:function(val){
          this.tableData.pageNo = val;
        },
        findData() {
          var _this = this
          this.$axios.post(this.$api.flowableapi+"query/historic-process-instances",
            {
              businessKey: this.form.businessKey,
              processDefinitionName: this.form.processName,
              processDefinitionCategory: this.form.productName,
              finished: this.form.finished,
              startedBefore: this.form.startTimeRange[1],
              startedAfter: this.form.startTimeRange[0],
              finishedBefore: this.form.endTimeRange[1],
              finishedAfter: this.form.endTimeRange[0]
            },{
            params: {
              sort: "startTime",
              order: "desc",
              start: this.start,
              size: this.tableData.pageSize
            }
          })
            .then(function (response) {
              var result = response.data.data;
              for (let i = 0; i < result.length; i++){
                _this.$axios.get(result[i].processDefinitionUrl,{})
                  .then(function (response2) {
                    _this.$set(result[i],"categoryTe",response2.data.category)
                  })
              }
              _this.tableData.list = result;
              _this.tableData.totalCount = response.data.total;
            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
        },
        getDiagramByInstanceId(processInstanceId) {
          this.processInstanceId = processInstanceId;
          this.imgDialogVisible = true;
        },
        getDiagramByDefinitionId(processDefinitionId) {
          this.processDefinitionId = processDefinitionId;
          this.imgDialogVisible = true;
        },
        cancelProcessInstance(processInstanceId) {
          const _this = this;
          this.$axios.delete(this.$api.flowableapi+'runtime/process-instances/'+processInstanceId,{})
            .then(function (response) {
              if (response.status != 204) {
                _this.$message.error(response.statusText)
              } else {
                _this.$message.success("deleted")
                _this.findData()
              }
            })
            .catch(function (error) {
              _this.$message.error(error.toString())
            });
        },
        turnToTask(ordercode) {
          this.$router.push(`/home/workbench/task/${ordercode}`)
        }
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
