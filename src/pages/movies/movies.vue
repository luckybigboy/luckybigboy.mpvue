<template>
  <div class="movie"
       v-if="movieList">
    <div class="content"
         v-for="(item, index) in movieList"
         :key="index"
         @tap="goMovieDetail(index)">
      <img :src="item.images.large"
           alt=""
           v-if="item.images.large">
      <div class="center">
        <h2>{{item.original_title}}</h2>
        <p class="year">年份: {{item.year}}</p>
        <p class="author">导演: {{item.directors[0].name}}</p>
      </div>
      <div class="score">{{item.rating.average}}</div>
    </div>
  </div>
</template>
<script>
const movie_url = 'http://t.yushu.im/v2/movie/top250';
export default {
  name: 'movie',
  data () {
    return {
      movieList: [],
      isTap: false
    }
  },
  onShow () {
    this.isTap = false;
    console.log(111, this.isTap);
  },
  beforeMount () {
    this.getMoviesList()
  },
  // 下拉刷新
  onPullDownRefresh () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getMoviesList();
    console.log('刷新了')
  },
  // // 上拉加载更多
  // onReachBottom () {
  //   // 显示加载图标
  //   wx.showLoading({
  //     title: '玩命加载中...'
  //   })
    
  // },
  methods: {
    getMoviesList () {
      wx.showNavigationBarLoading();
      this.$http.get(movie_url).then(data => {
        this.movieList = data.data.subjects;
        this.$store.dispatch("getMovieItem", this.movieList);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }).catch(err => {
        console.log(err)
      })
    },
    // 跳转电影详情
    goMovieDetail (index) {
      console.log(this.isTap);
      if (!this.isTap) {
        this.isTap = true;
        wx.navigateTo({
          url: `/pages/movieDetail/main?index=${index}`
        })
      }
    }
  },
}
</script>
<style>
.movie {
  display: flex;
  flex-direction: column;
  padding: 10rpx;
}
.content {
  display: flex;
  padding-bottom: 20rpx;
  padding-top: 10rpx;
  border-bottom: 1px solid #eee;
}
.content img {
  width: 128rpx;
  height: 128rpx;
  margin-right: 20rpx;
}
.content .center {
  width: 70%;
}
.content .center h2 {
  font-size: 32rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content .center .year {
  font-size: 28rpx;
  color: #999;
  margin: 5rpx 0;
}
.content .center .author {
  font-size: 30rpx;
  color: #666;
}
.content .score {
  font-size: 35rpx;
  color: red;
}
</style>