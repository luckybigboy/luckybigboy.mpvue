<template>
  <div class="listTemplate"
       @tap="goDetail">
    <div class="avtage">
      <img :src="item.headerLogo"
           alt=""
           class="headerImg">
      <span>{{item.headerTime}}</span>
    </div>
    <h2 class="txtName">{{item.headerTitle}}</h2>
    <div class="logoImg">
      <img :src="item.logoImg"
           alt="">
    </div>
    <div class="title">
      {{item.contentTitle}}
    </div>
    <div class="evaluate">
      <i class="iconfont icon-Starlarge"></i>
      <span>{{item.startScore}}</span>
      <i class="iconfont icon-eye"></i>
      <span>{{item.lookScore}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'listTemplate',
  props: {
    "item": Array,
    "index": Number
  },
  data () {
    return {
      isTap: false
    }
  },
  onShow () {
    this.isTap = false;
  },
  methods: {
    goDetail () {
      if (!this.isTap) {
        this.isTap = true;
        wx.navigateTo({
          url: `/pages/listDetail/main?index=${this.index}`
        })
      }
    }
  },
}
</script>
<style>
.listTemplate {
  border-bottom: 1px solid rgb(236, 236, 236);
}
.avtage {
  margin: 8px;
}
.avtage .headerImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  vertical-align: middle;
}
.avtage span {
  color: #ddd;
  margin-left: 5px;
}
.txtName {
  margin: 0 0 5px 8px;
  font-size: 20px;
}
.logoImg img {
  width: 100%;
}
.title {
  line-height: 45rpx;
  text-indent: 1em;
  padding: 0 20rpx;
}
.evaluate {
  display: flex;
  margin: 10px 8px 10rpx;
}
.evaluate i {
  font-size: 16px;
  margin-right: 5rpx;
}
.evaluate .icon-Starlarge {
  color: gold;
}
.evaluate span {
  color: #666;
}
.evaluate .icon-eye {
  margin-left: 20rpx;
  color: #666;
}
</style>