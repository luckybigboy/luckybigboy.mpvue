<template>
  <div class="listDetail"
       v-if="listItem">
    <div class="headerBox">
      <img :src="[!active?listItem.logoImg:listItem.music.musicImg]"
           alt=""
           class="headerImg">
      <i class="iconfont "
         @tap="playMusic"
         :class="[active?'icon-bofang': 'icon-zanting']"></i>
    </div>
    <div class="content">
      <div class="personal">
        <img src="/static/images/user.png"
             alt="">
        <span class="titleName">{{listItem.headerTitle}}</span>
        <span>发布于{{listItem.headerTime}}</span>
      </div>
      <p class="name">{{listItem.name}}</p>
      <div class="share">
        <div class="iconBox">
          <i class="iconfont icon-wenzhang"
             @tap="collect"
             :class="{'on': isCollected}"></i><i class="iconfont icon-fenxiang"
             :class="{'on': isShare}"
             @tap="share"></i>
        </div>
        <div class="line"></div>
      </div>
      <div class="clearfix"></div>
      <button open-type="share">转发此文章</button>
      <div class="details">
        {{listItem.contentTitle}}
      </div>
    </div>
  </div>
</template>
<script>
import musicPlay from '@/data/musicPlay'
import { mapState } from 'vuex'
export default {
  name: 'listDetail',
  data () {
    return {
      listItem: {},
      isCollected: false,
      active: false,
      isShare: false
    }
  },
  beforeMount () {
    // 创建音乐
    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    this.index = this.$mp.query.index;
    // 查看是否收藏
    let OldCollected = wx.getStorageSync('isCollected');
    if (!OldCollected) {
      wx.setStorage({
        key: 'isCollected',
        data: {}
      })
    } else {
      this.isCollected = (OldCollected[this.index] ? true : false);
    }

    musicPlay.defaultIndex === this.index && musicPlay.isPlay ? this.active = true : this.active = false

    // 监听音乐是否播放
    this.backgroundAudioManager.onPlay(() => {
      console.log('播放');
      this.active = true;
      musicPlay.defaultIndex = this.index;
      musicPlay.isPlay = true;
    })
    this.backgroundAudioManager.onPause(() => {
      console.log('暂停');
      this.active = false;
      musicPlay.isPlay = false;
    })
  },
  mounted () {
    this.listItem = this.listArr.listItem[this.$mp.query.index]
    console.log(this.listItem)
  },
  computed: {
    ...mapState(['listArr'])
  },
  methods: {
    collect () {
      this.isCollected = !this.isCollected;
      let collectTitle = this.isCollected ? '收藏成功' : '取消收藏';
      wx.showToast({
        title: collectTitle,
        icon: 'success',
        duration: 2000
      })

      // 缓存中是否已经收藏
      let OldCollected = wx.getStorageSync('isCollected');
      OldCollected[this.index] = this.isCollected;
      // 将收藏的状态放在缓存中
      wx.setStorage({
        key: 'isCollected',
        data: OldCollected
      })
    },
    // music
    playMusic () {
      this.active = !this.active;
      let { dataUrl, title } = this.listItem.music;
      if (this.active) {
        this.backgroundAudioManager.src = dataUrl;
        this.backgroundAudioManager.title = title;
      } else {
        this.backgroundAudioManager.pause();
      }
    },

    // 分享
    share () {
      this.isShare = !this.isShare
      wx.showActionSheet({
        itemList: ['分享到QQ', '分享到微博', '分享到微信'],
        success (res) {
          console.log(res.tapIndex)
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    }
  },
}
</script>
<style>
.listDetail {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.listDetail .headerBox {
  position: relative;
}
.listDetail .headerBox .headerImg {
  width: 100%;
  height: 400rpx;
}
.listDetail .headerBox i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 80rpx;
  color: ;
}
.listDetail .content {
  padding: 0 10rpx;
}
.listDetail .content .personal img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  vertical-align: middle;
}
.listDetail .content .personal span {
  color: #666;
}
.listDetail .content .personal .titleName {
  margin-right: 10rpx;
}
.listDetail .content .name {
  font-size: 40rpx;
  margin: 10rpx 5prx;
}
.listDetail .content .share {
  position: relative;
}
.listDetail .content .share .iconBox {
  display: flex;
  float: right;
  margin-right: 20px;
  background: #fff;
}
.listDetail .content .share .iconBox i {
  font-size: 80rpx;
  color: #ddd;
}
.listDetail .content .share .iconBox i:first-child {
  margin-right: 10rpx;
}
.listDetail .content .share .iconBox i:first-child.on,
.listDetail .content .share .iconBox i:last-child.on {
  color: rgb(135, 216, 135);
}
.listDetail .content .share .line {
  width: 90%;
  height: 1px;
  background: #ddd;
  position: absolute;
  top: 41rpx;
  z-index: -10;
}
.listDetail .content button {
  width: 300rpx;
  margin-bottom: 20rpx;
  margin-top: 30rpx;
}
.clearfix {
  clear: both;
}
</style>