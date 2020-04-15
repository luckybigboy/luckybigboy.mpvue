<template>
  <div class="box"
       v-if="userInfo">
    <img :src="userInfo.avatarUrl"
         alt=""
         class="txImg"
         v-if="isShow">
    <button open-type="getUserInfo"
            class="getBtn"
            plain
            @getuserinfo="getUserInfo"
            v-else>获取用户信息</button>
    <p v-if="isShow"
       class="nickName">{{userInfo.nickName}}的个人页面</p>
    <div class="btn"
         v-if="isShow"
         @tap="goStart">
      <p>
        开启我的个人之旅
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      userInfo: {},
      isShow: false
    }
  },
  beforeMount () {
    // 获取用户登录信息
    this.handleGetUserInfo()
  },
  methods: {
    handleGetUserInfo () {
      wx.getUserInfo({
        success: (data) => {
          this.userInfo = data.userInfo
          this.isShow = true
        },
        fail: (err) => {
          console.log('获取失败')
        }
      })
    },
    getUserInfo (data) {
      // 判断用户是否授权
      if (data.mp.detail.rawData) {
        this.handleGetUserInfo()
      }
    },
    goStart () {
      wx.switchTab({
        url: '/pages/list/main'
      })
    }
  },
}
</script>
<style>
page {
  background: #409eff;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.txImg {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  margin: 100rpx 0 0;
  /* animation: move 3s linear infinite; */
}
@keyframes move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.getBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
p.nickName {
  margin: 30rpx 0 0;
}
.btn {
  /* border: 1px solid orange; */
  padding: 20rpx 15rpx;
  margin: 100rpx 0 0;
  border-radius: 10rpx;
  background: rgb(74, 204, 176);
  color: #fff;
  /* transform: scale(1); */
}
.btn:active {
  transform: scale(0.8);
}
</style>