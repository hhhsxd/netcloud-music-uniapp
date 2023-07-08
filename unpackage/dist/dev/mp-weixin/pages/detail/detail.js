"use strict";
const common_vendor = require("../../common/vendor.js");
const store_songid = require("../../store/songid.js");
const common_utils = require("../../common/utils.js");
const common_api = require("../../common/api.js");
require("../../common/config.js");
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  _easycom_musichead2();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
if (!Math) {
  (_easycom_musichead + SongItem)();
}
const SongItem = () => "../../components/SongItem/SongItem.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const songIdStore = store_songid.useSongIdStore();
    const songInfo = common_vendor.ref({});
    const songCom = common_vendor.ref([]);
    const isPlay = common_vendor.ref(true);
    const isRota = common_vendor.ref(true);
    let backgroundAudio = {};
    let lyricIndex = common_vendor.ref(0);
    let showLyric = [];
    let timer = null;
    common_vendor.onLoad((e) => {
      getMusicInfo(e);
    });
    common_vendor.onUnload(() => {
      backgroundAudio.destroy();
      clearInterval(timer);
    });
    const getMusicInfo = (e) => {
      songIdStore.next_change(e.id);
      Promise.all([common_api.songDetail(e.id), common_api.songComment(e.id), common_api.songLyric(e.id), common_api.songSimi(e.id), common_api.songUrl(e.id)]).then((res) => {
        if (res[0].data.code == 200) {
          songInfo.value.name = res[0].data.songs[0].name;
          songInfo.value.pic = res[0].data.songs[0].al.picUrl;
        }
        if (res[1].data.code == 200) {
          songCom.value = res[1].data.hotComments;
        }
        if (res[2].data.code == 200) {
          let lyric = res[2].data.lrc.lyric;
          const reg = /\[([^\]]+)\]([^\[]+)/g;
          let result = [];
          lyric.replace(reg, ($0, $1, $2) => {
            result.push({ "time": formateToSec($1), "lyric": $2 });
          });
          showLyric = result;
          listenLyric();
        }
        if (res[3].data.code == 200) {
          songInfo.value.recom = res[3].data.songs;
        }
        if (res[4].data.code == 200) {
          songInfo.value.music = res[4].data.data[0].url;
          backgroundAudio = common_vendor.index.createInnerAudioContext();
          backgroundAudio.src = `${songInfo.value.music}`;
          listenLyric();
          backgroundAudio.autoplay = true;
          backgroundAudio.onPlay(() => {
            isPlay.value = true;
            isRota.value = true;
            listenLyric();
          });
          backgroundAudio.onPause(() => {
            isPlay.value = false;
            isRota.value = false;
            clearInterval(timer);
          });
          backgroundAudio.onEnded(() => {
            handlerToDetail(songIdStore.nextId);
          });
        }
      });
    };
    const handleToPause = () => {
      if (backgroundAudio.paused) {
        backgroundAudio.play();
      } else {
        backgroundAudio.pause();
      }
    };
    const formateToSec = (value) => {
      let arr = value.split(":");
      return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
    };
    const listenLyric = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        var _a, _b, _c;
        for (var i = 0; i <= showLyric.length; i++) {
          if (backgroundAudio.currentTime > ((_a = showLyric[showLyric.length - 1]) == null ? void 0 : _a.time)) {
            lyricIndex.value = showLyric.length - 1;
            break;
          }
          if (backgroundAudio.currentTime > ((_b = showLyric[i]) == null ? void 0 : _b.time) && backgroundAudio.currentTime < ((_c = showLyric[i + 1]) == null ? void 0 : _c.time)) {
            lyricIndex.value = i;
          }
        }
      }, 500);
    };
    const handlerToDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: songInfo.value.pic,
        b: common_vendor.p({
          title: songInfo.value.name,
          iconshow: true,
          white: true
        }),
        c: songInfo.value.pic,
        d: isRota.value ? 1 : "",
        e: !isPlay.value
      }, !isPlay.value ? {} : {}, {
        f: isPlay.value
      }, isPlay.value ? {} : {}, {
        g: common_vendor.o(handleToPause),
        h: common_vendor.f(common_vendor.unref(showLyric), (i, index, i0) => {
          return {
            a: common_vendor.t(i.lyric),
            b: index,
            c: index == common_vendor.unref(lyricIndex) ? 1 : ""
          };
        }),
        i: "translateY(" + -(common_vendor.unref(lyricIndex) - 1) * 82 + "rpx)",
        j: common_vendor.f(songInfo.value.recom, (i, k0, i0) => {
          return {
            a: i.album.picUrl,
            b: common_vendor.o(($event) => handlerToDetail(i.id), i.id),
            c: "7fb202ba-1-" + i0,
            d: common_vendor.p({
              name: i.name,
              privType: i.privilege.flag,
              br: i.privilege.maxbr,
              artiName: i.artists.map((item) => item.name),
              alName: i.album.name,
              color: _ctx.black
            }),
            e: i.id
          };
        }),
        k: songCom.value.length == 0
      }, songCom.value.length == 0 ? {} : {}, {
        l: common_vendor.f(songCom.value, (i, k0, i0) => {
          return {
            a: i.user.avatarUrl,
            b: common_vendor.t(i.user.nickname),
            c: common_vendor.t(common_vendor.unref(common_utils.formateTime)(i.time)),
            d: common_vendor.t(i.likedCount),
            e: common_vendor.t(i.content),
            f: i.id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Download/网易云uni-app/Music2-self/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
