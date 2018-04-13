<template>
  <div class="container">
    <div class="wrapper">
      <Row class-name="log-form mb20">
        <Col span="2">&nbsp;</Col>
        <Col span="20">
          <Row>
            <Col class-name="login-input">
              <label for="phone"><Icon type="person" size="22" /></label>
              <input type="number" name="mobile" v-model.trim="mobile" @input="constrainMobile(mobile)" id="phone">
              <span v-on:click="clearMobile"><Icon type="close-circled" size="10" v-if="isPhoneBtnShow" class="clearBtn"></Icon></span>
            </Col>
          </Row>          
          <Row>
            <Col class-name="login-input">
              <label for="pwdtext"><Icon type="locked" size="22" /></label>
              <input type="password" name="password" v-model.trim="password" id="pwdtext" @input="showClearBtn('password')">
                <span v-on:click="clearPassword">
                  <Icon type="close-circled" size="10" v-if="isPasswordBtnShow" class="clearBtn"></Icon>
                </span>
            </Col>
          </Row>
        </Col>
        <Col span="2">&nbsp;</Col>
      </Row>
      <Row>
        <Col span="2">&nbsp;</Col>
        <Col span="20">
          <div class="cus-button active mb20" @click="login">登录</div>
        </Col>
        <Col span="2">&nbsp;</Col>
      </Row>
      <Row class-name="mb20">
        <Col span="2">&nbsp;</Col>
        <Col span="20">
          <a href="#/register"><div class="cus-button">注册</div></a>
        </Col>
        <Col span="2">&nbsp;</Col>
      </Row>
      <Row v-if="isLogin">
        <Col span="7">&nbsp;</Col>
        <Col span="10" class-name="tc forget-pwd">
          <div>忘记密码 <Icon type="help-circled" class="self-text-color"></Icon></div>
        </Col>
        <Col span="7">&nbsp;</Col>
      </Row>
    </div>
    <toast-error ref="toastError"></toast-error>
  </div>
</template>

<script>
/* eslint-disable */ 
import {isRightMobile, isRightPassword, constraintLen} from '@/coms/client_func'

import toastMinx from '@/components/common/share'
import toastError from './common/toast_error'
import {mapState} from 'vuex'

export default {
  name: 'HelloWorld',
  // mixins: [comMinx],
  data () {
    return {
      value1: 0,
      // isShow: false,
      isPhoneBtnShow: false,
      isPasswordBtnShow: false,
      // ic: require('../assets/images/1-fb535ec.jpg'),
      // urls: [
      //   {url: require('../assets/images/1-fb535ec.jpg')},
      //   {url: require('../assets/images/2-34e6936.jpg')}
      // ],
      mobile: '',
      password: '',
      toastConfig: {
        msg: '',
        color: '#fff',
        size: 60,
        textSize:14
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    setLogin ()
    {
      this.isLogin = this.$store.isLogin
    }
  },
  methods: {
    validateMobile () 
    {
      const status = isRightMobile(this.mobile);  
      // this.isPhoneBtnShow = false; 
      if(status === true) return true;  
      if ( status === '') {
        this.toastConfig.msg = '手机号不能为空'
        this.$refs.toastError.toggle(this.toastConfig)
      } else if (status === false) {
        this.toastConfig.msg = '手机号有误'
        this.$refs.toastError.toggle(this.toastConfig)
      }
      return false
    },
    validatePassword ()
    {
      const status = isRightPassword(this.password); 
      // this.isPasswordBtnShow = false;
      if(status === true) return true;    
      if ( status === '') {
        this.toastConfig.msg = '密码不能为空';
        this.$refs.toastError.toggle(this.toastConfig)
      } else if ( status === -1 ) {
        this.toastConfig.msg = '密码不能小于6位';
        this.$refs.toastError.toggle(this.toastConfig)
      } else if ( status === false ) {
        this.toastConfig.msg = '密码由数字、字母、_和-组成';
        this.$refs.toastError.toggle(this.toastConfig)
      }
      return false;
    },
    setToast (time) 
    {
      this.isShow = true
      const _this = this
      setTimeout(function () {
        _this.isShow = false
      }, time || 2000)
    },
    showClearBtn (type)
    {

      if ( type === 'phone')
      {
        this.isPhoneBtnShow = true
      }
      if ( type === 'password')
      {
        this.isPasswordBtnShow  = this.password == '' ?  false : true;

      }
    },
    constrainMobile (mobile)
    {

      this.mobile == '' ?this.isPhoneBtnShow = false : this.showClearBtn('phone')
      this.mobile = constraintLen(mobile);      
    },
    clearMobile ()
    {
      this.mobile = '';
      this.isPhoneBtnShow = false;
    },
    clearPassword ()
    {
      this.password = '';
      this.isPasswordBtnShow = false;
    },
    login ()
    {
      if( this.validateMobile() === false || this.validatePassword() === false )
      {
        return;
      }
      this.$http({
        url: 'login.php',
        method: 'post',
        data: {
          password: this.password,
          mobile: this.mobile
        }
      })
      .then( res => {
        if( res.statusText === 'OK')
        {
          const data = res.data.data;
          const time = 7 * 24 * 3600;
          this.$store.commit("SET_USER_ID", { value: data.userId})
          this.$store.commit("SET_USER_NAME", {value: data.userName})
          this.$store.commit("SET_USER_TOKEN", {value: data.token})
          // this.$router.push({ name: 'register', params: {userId: data.userId}})  
          this.$router.replace({name: 'selectType', params: { userId: 1}})
        }

      })      
      .catch( err => {
        console.log(err)
      })
    }
    
  },
  components: {
    toastError
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.self-text-color{
  color: #2c2e43;
}
.container{
  top: 0;
  bottom: 0;
  position: absolute;
  background: url(../assets/images/logobg.jpg) no-repeat;
  background-size: cover;
  width: 100%;
}
.wrapper{
  top: 20%;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  padding: 2rem 0;
}
label.ivu-form-item-label{
  font-size: 1.8rem;
  color: #ffffff;
}
.cus-button{
  width: 100%;
  border: 1px solid #dddee1;
  border-radius: 40px;
  background: #f7f7f7;
  padding: 1rem;
  text-align: center;
  color: #2c2e43;
  font-size: 1.4rem;
}
.cus-button.active{
  background: #2c2e43;
  color: #ffffff;
  border: 0;
}
.mb20{
  margin-bottom: 2rem;
}
.tc{
  text-align: center;
}
.forget-pwd{
  font-size: 1.2rem;
}
.login-input{
  padding: 1rem 0;  
}
.login-input label{
  width: 8%;
  text-align: right;
  /* border: 1px solid; */
  font-size: 2rem;
  color: #2c2e43;
  display: inline-block;
  margin-right: 1rem;
}
.login-input input{
  border: 0;
  outline: 0;
  background: 0;
  border-bottom:2px solid #fff;
  width: 80%;
  height: 1.6rem;
  font-size: 1.8rem;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.clearBtn{
  position: absolute;
  margin-left: -4%;
  top: 40%;
  opacity: 0.6;
}


</style>
