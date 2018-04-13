<template>
    <div class="page_wrapper">
        <header-top :headerOptions="headerOptions"></header-top>
        <div class="content">
            <div class="fill_information" v-if="type == 'company'">
                <Form :model="formInfo" :label-width="60">
                    <FormItem label="公司证件">
                        <div class="privie-image" v-if="formInfo.fileUrl"><img :src="formInfo.fileUrl"></div>
                        <Upload action="http://test.api.com/upload" :on-error="uploadError" :format="formInfo.uplaodFileType" :on-remove="uploadRemove" :on-exceeded-size="uploadExceededSize" :max-size="formInfo.size" :on-success="uploadSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传营业执照</Button>
                        </Upload>                        
                    </FormItem>
                    <FormItem label="选择城市">
                        <Input v-model="formInfo.pca" placeholder="选择城市" @click.native="showCityPicker"></Input>
                    </FormItem>     
                    <FormItem label="公司地址">
                        <Input v-model="formInfo.address" placeholder="请输入公司地址"></Input>
                    </FormItem>
                    <FormItem label="负责人">
                        <Input v-model="formInfo.name" placeholder="用于资料审核"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <Input v-model="formInfo.mobile" placeholder="用于内部业务联系"></Input>
                    </FormItem>
                </Form>      
            </div>  
            <div class="fill_information" v-else>
                <Form :model="formInfo" :label-width="100">
                    <FormItem label="身份证(正反面)">
                        <div class="privie-image" v-if="personalInfo.fileUrl"><img :src="personalInfo.fileUrl"></div>
                        <Upload action="http://test.api.com/upload" :on-error="uploadError" :format="personalInfo.uplaodFileType" :on-remove="uploadRemove" :on-exceeded-size="uploadExceededSize" :max-size="personalInfo.size" :on-success="uploadSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传身份证</Button>
                        </Upload>                        
                    </FormItem>                    
                    <FormItem label="选择职业">
                        <Select v-model="personalInfo.job" style="width:200px">
                            <Option v-for="item in jobList" :value="item.value" :key="item.index">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="姓名">
                        <Input v-model="personalInfo.name" placeholder="用于资料审核"></Input>
                    </FormItem>
                    <FormItem label="手机号">
                        <Input v-model="personalInfo.mobile" placeholder="用于内部业务联系"></Input>
                    </FormItem>
                    <FormItem label="邀请码">
                        <Input v-model="personalInfo.mobile" placeholder="如果没有可不填写"></Input>
                    </FormItem>
                </Form>
                <Row>
                    <Col></Col>
                </Row>      
            </div>                     
        </div> 
        <footer-bottom>
            <com-button v-if="type=='company'" class="btn_com" v-on:buttonAction="submitInfo" :buttonOptions="buttonOptions"></com-button>
            <com-button v-if="type=='personal'" class="btn_com" v-on:buttonAction="submitPersonInfo" :buttonOptions="buttonOptions"></com-button>
        </footer-bottom>
        <div class="cityPickerMode" v-if="type == 'company' && isShowMask">
            <div class="cityPicker">
                <smooth-picker ref="smoothPicker" :data="cityList" :change="changeCityPicker" />
            </div>
            <div class="cityPickerTitle">请选择省市区<div @click="confirmCity">确定</div></div>
            <div class="mask" @click="closeCityPicker"></div>
        </div>    
        <toast-error ref="toastError"></toast-error>
    </div>
</template>
<script>
import {headerTop, footerBottom, comButton, cityPicker} from './config/componets'
import toastError from './common/toast_error'
import 'vue-smooth-picker/dist/css/style.css'
import {SmoothPicker} from 'vue-smooth-picker'

export default {
    data () {
        return {
            headerOptions: {
                title: '填写用户信息'
            },
            buttonOptions: {
                value: '提交'
            },            
            type: '',
            isShowError:false,
            toastConfig: {
                msg: '',
                color: '#fff',
                size: 60,
                textSize:14,
                time: 1000
            },
            formInfo: {
                // isUploadFile: false,
                fileUrl: '',
                address: '',
                pca: '',
                mobile: '',
                name: '',
                size: 300,
                uplaodFileType: ['png','jpg','jpeg','gif']
            },
            pcaArr: [],
            
            // isShowCityPicker: false,
            isShowMask: false,
            isShowError: false,
            pcaList: [],
            cityList: [
                {
                    currentIndex: 0,
                    flex: 1,
                    list: [
                        
                    ],
                    onClick: this.clickOnPlan,
                    textAlign: 'center',
                    className: 'row-group'
                },
                {
                    currentIndex: 0,
                    flex: 1,
                    list: [
                        
                    ],
                    onClick: this.clickOnPlan,
                    textAlign: 'center',
                    className: 'row-group'
                },
                {
                    currentIndex: 0,
                    flex: 1,
                    list: [
                        
                    ],
                    onClick: this.clickOnProduct,
                    textAlign: 'center',
                    className: 'row-group'
                }
            ],
            jobList: [{
                value: '',
                label: ''
            }],
            personalInfo: {
                job: '',
                mobile: '',
                name: '',
                fileUrl: '',
                size: 300,
                uplaodFileType: ['png','jpg','jpeg','gif']
            }

        }
    },
    beforeRouteEnter (to, from, next) {    
        const type = to.params.type;
        if ( type === 'company') {
            next( vm => {
                vm.type = type
                vm.headerOptions.title = '填写企业信息'
            })
        } else if ( type === 'personal' ) {            
            next(vm => {
                    vm.type = type
                    vm.headerOptions.title = '填写个人信息'
                    vm.$http({
                        url: 'getJobList.php',
                        method: 'get'
                    })
                    .then( res => {
                        const data = res.data.data;
                        let list = [];
                        data.forEach( el => {
                            list.push({value: el, label: el});                    
                        })
                        vm.jobList = list
                    })
                    .catch( err => {
                        console.log(err)
                    })                    
                })
        } else {
            // next( vm => {vm.$router.replace({name: 'index'})})
            next('/index')
        }
    },
    methods: {
        //个人页面
        submitPersonInfo () {
            if ( !this.personalInfo.fileUrl  ) {
                this.toastConfig.msg = '没有上传个人证件'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.personalInfo.job) {
                this.toastConfig.msg = '请选择职业'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.personalInfo.name) {
                this.toastConfig.msg = '请填写真实姓名'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.personalInfo.mobile) {
                this.toastConfig.msg = '请填写手机号'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            }
            this.$http({
                url: 'fillCopmpanyInfo.php',
                method: 'post',
                data: {
                    info: JSON.stringify (this.formInfo)
                }                
            })
            .then( res => {
                if (res.data.code == 0) {
                    const data = res.data.data;
                    console.log(data.mobile)
                    this.$router.push({name: 'tripCenter', params: {type: "personal"}})
                } else {
                    throw res.data.msg;
                }
            })
            .catch( err => {
                console.log(err)
            })
        },
        
        //公司信息提交
        submitInfo () {
            if ( !this.formInfo.fileUrl ) {
                this.toastConfig.msg = '没有上传公司证件'
                // this.isShowError = true
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.formInfo.pca) {
                this.toastConfig.msg = '请选择省市区'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.formInfo.address) {
                this.toastConfig.msg = '请填写地址'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.formInfo.name) {
                this.toastConfig.msg = '请填写负责人'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            } else if ( !this.formInfo.mobile) {
                this.toastConfig.msg = '请填写手机号'
                this.$refs.toastError.toggle(this.toastConfig)
                return;
            }            
            this.$http({
                url: 'fillCopmpanyInfo.php',
                method: 'post',
                data: {
                    info: JSON.stringify (this.formInfo)
                }                
            })
            .then( res => {
                if (res.data.code == 0) {
                    const data = res.data.data;
                    console.log(data.mobile)
                    this.$router.push({name: 'tripCenter', params: {type: "company"}})
                } else {
                    throw res.data.msg;
                }
            })
            .catch( err => {
                console.log(err)
            })
        },
        //上传文件超出设定大小
        uploadExceededSize () {
            this.$Message.warning('图片大小不能超过：'+this.formInfo.size + 'kb')
        },
        //上传文件出错
        uploadError (error, file, fileList) {
            this.$Message.error('上传出错：'+error.toString())
        },
        //移除文件
        uploadRemove (file, fileList) {
            this.$http({
                url: 'image/delete.php',
                methods: "get",
                params: {
                    url: decodeURIComponent(file.response.data.url)
                }
            })
            .then( res => {
                if (res.data.code !== 0) {                    
                    throw res.data.msg;
                }
                this.formInfo.fileUrl = fileList.length > 0 ? fileList[fileList.length -1].response.data.url : ''
               
            })
            .catch(error => {
                console.log(error)
            })
        },
        //上传成功
        uploadSuccess(response, file, fileList) {            
            if ( response.code == 0) {
                if ( this.type === 'company') {
                    this.formInfo.isUploadFile = true
                    this.formInfo.fileUrl = response.data.url;
                } else {
                    this.personalInfo.isUploadFile = true
                    this.personalInfo.fileUrl = response.data.url;
                }
            }
        },
        changeCityPicker (gIndex, iIndex) {
            const id = this.pcaList.length > 0 ? this.pcaList[gIndex][iIndex].id : '';
            const _this = this;

            if (gIndex == 0) {
                const list = this.getCityData(id, 'province');
                let res = [];
                _this.pcaArr[0] = this.pcaList[gIndex][iIndex].name
                list.then( list => {
                     list.cityList.forEach( (el, i) => {
                        res[i] = el.name;
                    })
                    _this.$refs.smoothPicker.setGroupData(1,Object.assign(_this.cityList[1],{currentIndex:0, list:res}))
                    _this.pcaList[1] = list.cityList;
                    _this.pcaArr[1] = res[0];                                 
                    res = [];                    
                    list.areaList.forEach((el, i) => {
                        res[i] = el.name;
                    })
                    _this.$refs.smoothPicker.setGroupData(2,Object.assign(_this.cityList[2],{currentIndex:0, list:res}))                   
                    _this.pcaList[2] = list.areaList;                    
                    _this.pcaArr[2] = res[0];
                    _this.formInfo.pca = _this.pcaArr.join(' ')
                })
                .catch(err => {
                    console.log(err)
                })
               
            }
            if (gIndex == 1) {
                const list = this.getCityData(id, 'city');
                let res = [];
                list.then( list => {
                    list.areaList.forEach( (el, i) => {
                        res[i] = el.name;
                    })
                     _this.pcaList[2] = list.areaList;
                    _this.pcaArr[1] = _this.cityList[1].list[iIndex];
                    _this.pcaArr[2] = res[0];
                    _this.$refs.smoothPicker.setGroupData(2,Object.assign(_this.cityList[2],{currentIndex:0, list:res}))                   
                })
                .catch(err => {
                    console.log(err)
                })
            }
            if (gIndex == 2) {
                _this.pcaArr[2] = _this.cityList[2].list[iIndex]
            }

        },
        showCityPicker () {
            this.isShowMask = true   
            const res = this.getCityData();
            res.then(res => {
                let _this = this;   
                let list = [];
                _this.pcaList = [res.provinceList, res.cityList, res.areaList];
                res.provinceList.forEach( (el, i) => {                    
                    list[i] = el.name
                });    
                _this.cityList[0].list = list
                list = [];
                res.cityList.forEach( (el, i) => {
                    list[i] = el.name
                })
                _this.cityList[1].list = list
                list = [];
                res.areaList.forEach( (el, i) => {
                    list[i] = el.name
                })
                _this.cityList[2].list = list
            })
            .catch( err => {
                console.log(err)
            })
            
        },
        //确认选择
        confirmCity () {
            this.formInfo.pca = this.pcaArr.join(' ') 
            this.closeCityPicker()
        },
        //初始化省市区列表
        async getCityData (id, pcaType) {
            let city, province, area, cityList, provinceList, areaList, params, provinceId, cityId;
            let _this = this;
            //省份列表
            if ( typeof id === 'undefined' && typeof pcaType === 'undefined') {
                province = await this.$http({
                        url: 'getAddresslist.php',
                        method: 'get',
                        params: {
                            name: 'province'
                        }              
                })
                if (province.statusText !== 'OK') throw '获取省份数据失败';
                provinceList = province.data.data;
                _this.pcaArr[0] = provinceList[0].name;
            }
           
            //市列表
            if ( province && province.data.data.length > 0) {
                provinceId = province.data.data[0].id
            } else if (pcaType === 'province' && typeof id !== 'undefined') {
                provinceId = id                
            }
           
            if (provinceId) {
                city = await this.$http({
                    url: 'getAddresslist.php',
                    method: 'get',
                    params: {
                    pid: provinceId,
                    type: 'city'
                }
                })
                if (city.statusText !== 'OK') throw '获取市区数据失败'
                cityList = city.data.data
                _this.pcaArr[1] = cityList[0].name;
            }

            //区列表        
            if ( city && city.data.data.length > 0) {
                cityId = cityList[0].id    
            } else if (pcaType === 'city' && typeof id !== 'undefined') {
                cityId = id                
            }
            if ( cityId ) {
                area = await this.$http({
                    url: 'getAddresslist.php',
                    method: 'get',
                    params: {
                    pid: cityId ,
                    type: 'area'
                }      
                })
                if ( area.statusText !== 'OK') throw '获取地区数据失败'
                areaList = area.data.data
                _this.pcaArr[2] = areaList[0].name;
            }

            return {provinceList: provinceList, cityList: cityList, areaList: areaList}
                
        },        
        closeCityPicker () {
            this.isShowMask = false
        }
    },
    components: {
        headerTop,
        footerBottom,
        comButton,
        toastError,
        SmoothPicker
    }
}
</script>

<style scoped>
    .fill_information {
        width: 100%;
        padding: 3rem  1rem 5rem 1rem;
    }
    .cityPickerMode{
        /* position: absolute;
        bottom: -5rem;
        width: 100%;
        z-index: 200; */
    }
    .cityPickerTitle {
        width: 100%;
        height: 4rem;
        background: #cccccc;
        position: absolute;
        bottom: 10rem;
        z-index: 200;
        font-size: 1.6rem;
        text-align: center;
        line-height: 4rem;
    }
    .cityPickerTitle div{
        position: absolute;
        right: 1rem;
        top: 0;
        color: #2d8cf0;        
    }
    .privie-image {
        position: absolute;
        right: 1rem;
        border: 1px solid #ccc;
        width: 30%;
        height: 100%;
    }
    .privie-image img {
        width: 100%;
        height: 100%;
    }
</style>
