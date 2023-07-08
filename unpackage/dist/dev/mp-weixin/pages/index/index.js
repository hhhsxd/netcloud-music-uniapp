"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api = require("../../common/api.js");
require("../../common/config.js");
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  _easycom_musichead2();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
if (!Math) {
  _easycom_musichead();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const listItem = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const getTopList = async () => {
      const res = await common_api.topList();
      if (res.length) {
        setTimeout(() => {
          listItem.value = res;
          isLoading.value = false;
        }, 1e3);
      }
    };
    common_vendor.onLoad(() => {
      getTopList();
    });
    const naviTo = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/list/list?id=${id}`
      });
    };
    const handleTosearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "网易云音乐",
          iconshow: false,
          white: false
        }),
        b: common_vendor.o(handleTosearch),
        c: common_vendor.f(listItem.value, (item, k0, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.t(item.updateFrequency),
            c: common_vendor.f(item == null ? void 0 : item.tracks, (i, index, i1) => {
              return {
                a: common_vendor.t(i.first + `-` + i.second),
                b: i.id
              };
            }),
            d: item.id,
            e: common_vendor.o(($event) => naviTo(item.id), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/Download/网易云uni-app/Music2-self/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
