<template>
  <div class="movieDetail"
       v-if="movieItems">
    <img :src="movieItems.images.large"
         alt="">
    <h2>{{movieItems.original_title}}</h2>
    <div class="introduce">
      <p>评分:{{movieItems.rating.average}}</p>
      <p>导演:{{movieItems.directors[0].name}}</p>
      <p>主演: <span v-for="(item, index) in movieItems.casts"
              :key="index">{{item.name}}, </span></p>
    </div>
    <button class="btn">我要观影</button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'movieDetail',
  data () {
    return {
      movieItems: {}
    }
  },
  beforeMount () {
    let index = this.$mp.query.index;
    this.movieItems = this.movieItem[index];
    console.log(this.movieItems)
  },
  computed: {
    ...mapState(['movieItem'])
  },
}
</script>
<style>
.movieDetail {
  display: flex;
  flex-direction: column;
}
.movieDetail img {
  width: 70%;
  height: 600rpx;
  margin: 100rpx auto 50rpx;
}
.movieDetail h2 {
  text-align: center;
  font-size: 50rpx;
  margin-bottom: 20rpx;
}
.movieDetail .introduce {
  margin-left: 15%;
}
.movieDetail .introduce p:nth-child(2) {
  margin: 20rpx 0;
}
.movieDetail .btn {
  width: 70%;
  margin-top: 30rpx;
  background: #489b81;
  color: #fff;
  letter-spacing: 10rpx;
}
</style>