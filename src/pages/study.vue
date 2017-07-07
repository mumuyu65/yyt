<template>
  <div class="main study">
      <div class="zj-list" style="width:243px;">
          <div class="inner-container" style="width:243px;">
            <ul class="list-unstyled study-tab" >
              <li class="active"><a href="#home" data-toggle="tab"><h4>基础课件</h4></a></li>
              <li><a href="#seniorClass" data-toggle="tab"><h4>高级课件</h4></a></li>
              <li><a href="#Teachers" data-toggle="tab"><h4>讲师风采</h4></a></li>
            </ul>
          </div>
      </div>
      <div class="zhibo" style="width:857px;">
         <div id="myTabContent" class="tab-content">
             <div id="home" class="tab-pane fade in active">
                <div style="width:100%; height:900px; overflow:hidden;">
                    <iframe id="fancybox-frame" style="width:100%; height:100%;" name="fancybox-frame1498977255677" frameborder="0" hspace="0" scrolling="auto" src="http://vip.chuangyingzhibo.com/AdTiList.asp?AdTi=7&amp;iRoomID=7000"></iframe>
                </div>
            </div>
            <div id="seniorClass"  class="tab-pane fade" >
                <div style="width:100%; height:900px; overflow:hidden;">
                    <iframe id="fancybox-frame" style="width:100%; height:100%;" name="fancybox-frame1498977255677" frameborder="0" hspace="0" scrolling="auto" src="http://vip.chuangyingzhibo.com/AdTiList.asp?AdTi=8&amp;iRoomID=7000"></iframe>
                </div>
            </div>
            <div id="Teachers"  class="tab-pane fade" >
                <div style="width:100%; height:900px; overflow:hidden;">
                    <iframe id="fancybox-frame" style="width:100%; height:100%;" name="fancybox-frame1498977255677"
                     frameborder="0" hspace="0" scrolling="auto" src="http://vip.chuangyingzhibo.com/mstd.asp?roomid=7000"></iframe>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import API from '@/api/API'
//实例化api
const api = new API();

export default {
  name: 'Study',
  data () {
    return {

    }
  },
}
</script>

<style scoped>
    .study-tab li a{
        color:#fff;
        text-decoration:none;
    }

    .study-tab {
        margin-bottom:20px;
        display:inline-block;
        vertical-align:top;
        width:100%;
        padding:0 20px;
        height:100%;
    }

    .tab-content{
        width:100%;
        display:inline-block;
        background-color:#fff;
    }

    .study-tab li{
        text-align:center;
        padding:20px 0;
        border-bottom:1px solid transparent;
    }

    .study-tab li.active{
        border-bottom:1px solid #f00;
    }

    #dialog{
        width:1100px !important;
            }

</style>
