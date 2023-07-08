"use strict";
const common_vendor = require("../../common/vendor.js");
const store_songid = require("../../store/songid.js");
const common_utils = require("../../common/utils.js");
const common_api = require("../../common/api.js");
require("../../common/config.js");
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  const _easycom_SongItem2 = common_vendor.resolveComponent("SongItem");
  (_easycom_musichead2 + _easycom_SongItem2)();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
const _easycom_SongItem = () => "../../components/SongItem/SongItem.js";
if (!Math) {
  (_easycom_musichead + _easycom_SongItem)();
}
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const listDetail = common_vendor.ref({});
    const isLoading = common_vendor.ref(true);
    const songIdStore = store_songid.useSongIdStore();
    common_vendor.onLoad((e) => {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      console.log(e.id);
      common_api.playList(e.id).then((res) => {
        if (res.data.code == 200) {
          listDetail.value = res.data.playlist;
          songIdStore.init_ids(res.data.playlist.trackIds);
          isLoading.value = false;
          common_vendor.index.hideLoading();
        }
      });
    });
    const naviToDetail = (ids) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${ids}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return {
        a: common_vendor.p({
          title: "歌单",
          iconshow: true
        }),
        b: (_a = listDetail.value) == null ? void 0 : _a.coverImgUrl,
        c: common_vendor.t(common_vendor.unref(common_utils.formateCount)((_b = listDetail.value) == null ? void 0 : _b.playCount)),
        d: common_vendor.t((_c = listDetail.value) == null ? void 0 : _c.name),
        e: (_d = listDetail.value.creator) == null ? void 0 : _d.avatarUrl,
        f: common_vendor.t((_e = listDetail.value.creator) == null ? void 0 : _e.nickname),
        g: common_vendor.t((_f = listDetail.value) == null ? void 0 : _f.description),
        h: common_vendor.t((_g = listDetail.value) == null ? void 0 : _g.trackCount),
        i: common_vendor.f((_h = listDetail.value) == null ? void 0 : _h.tracks, (i, index, i0) => {
          var _a2, _b2;
          return {
            a: common_vendor.t(index + 1),
            b: "98a9e0b2-1-" + i0,
            c: common_vendor.p({
              name: i.name,
              privType: (_a2 = i.privilege) == null ? void 0 : _a2.flag,
              br: (_b2 = i.sq) == null ? void 0 : _b2.br,
              artiName: i.ar.map((item) => item.name),
              alName: i.al.name,
              color: "black"
            }),
            d: i.id,
            e: common_vendor.o(($event) => naviToDetail(i.id), i.id)
          };
        }),
        j: `url(${(_i = listDetail.value) == null ? void 0 : _i.coverImgUrl})`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98a9e0b2"], ["__file", "D:/Download/网易云uni-app/Music2-self/pages/list/list.vue"]]);
wx.createPage(MiniProgramPage);
