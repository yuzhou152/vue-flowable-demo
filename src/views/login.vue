<template>
    <div class="lay-login">
      <el-card class="box-card">
        <h2>登陆</h2>
        <el-form :model="loginForm" :rules="rules" ref="lForm" size="large">
          <el-form-item prop="passport">
            <el-input v-model="loginForm.passport" placeholder="请输入用户名" ></el-input>
          </el-form-item>
          <el-form-item prop="passwd">
            <el-input :type="passwordType" v-model="loginForm.passwd" placeholder="请输入密码" ></el-input>
            <img v-if="passwordType === ''" src="@/assets/icon/icon_showpwd.png" alt="" @click="showPwd()"/>
            <img v-else src="@/assets/icon/hide_pwd.png" alt="" @click="showPwd()"/>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('lForm')">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
    export default {
      name: "login",
      data(){
        return {
          loginForm:{
            passport:'',
            passwd:''
          },
          rules:{
            passport: [
              { required: true, message: '请输入用户名！', trigger: 'blur' },
              { min: 3, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ],
            passwd: [
              { required: true, message: '请输入密码！', trigger: 'blur' },
              { min: 3, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ]
          },
          passwordType:'password'
        }
      },
      methods:{
        showPwd(){
          console.log(this)
          if (this.passwordType === '') {
            this.passwordType = 'password'
          } else {
            this.passwordType = ''
          }
        },
        login(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$store.commit("updataUser",this.loginForm);
              this.$router.push("/home/");
            }
          })
        }
      }
    }
</script>

<style scoped>
  .box-card {
    width: 300px;
    height: 366px;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-top: -183px;
    margin-left: -150px;
    text-align: center;
  }
  .box-card h2 {
    font-size:24px ;
    font-weight: bold;
    margin: 10px auto 50px auto;
  }
  .el-form {
    width: 240px;
    margin: 35px auto auto auto;
  }
  .el-form img {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .el-button {
    margin-top: 30px;
    width: 240px;
  }
</style>
