<template>
  <div class="listBox">
    <swiper class="swiper"
            autoplay
            indicator-dots
            indicator-active-color="#F56C6C"
            interval="3000"
            circular>
      <swiper-item v-for="(item, index) in swiperArr"
                   :key="index">
        <img :src="item"
             alt=""
             class="imgItem">
      </swiper-item>
    </swiper>
    <listTemplate v-for="(item,index) in listArr.listItem"
                  :key="index"
                  :item="item"
                  :index="index"></listTemplate>
  </div>
</template>
<script>
import listTemplate from '@/components/list_template/list_template'
import { mapState } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      swiperArr: ['/static/images/1.jpg', '/static/images/2.jpg', '/static/images/3.jpg']
    }
  },
  components: {
    listTemplate
  },
  beforeMount () {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState([
      'listArr'
    ])
  },
}
</script>
<style>
.swiper {
  width: 100%;
  height: 400rpx;
}
.swiper .imgItem {
  width: 100%;
}
</style>