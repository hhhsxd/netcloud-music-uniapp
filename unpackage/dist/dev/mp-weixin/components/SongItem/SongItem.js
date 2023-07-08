"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "SongItem",
  props: {
    name: String,
    privType: Number,
    artiName: Array,
    alName: String,
    br: Number,
    color: {
      type: String,
      default: "#c6c2bf"
    }
  },
  setup(__props) {
    const songItem = __props;
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(songItem).name),
        b: common_vendor.unref(songItem).color,
        c: common_vendor.unref(songItem).br >= 999e3
      }, common_vendor.unref(songItem).br >= 999e3 ? {
        d: common_assets._imports_0
      } : {}, {
        e: common_vendor.unref(songItem).privType & false
      }, common_vendor.unref(songItem).privType & false ? {
        f: common_assets._imports_1
      } : {}, {
        g: common_vendor.t((_a = common_vendor.unref(songItem).artiName) == null ? void 0 : _a.join("/")),
        h: common_vendor.t(common_vendor.unref(songItem).alName)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50ee9f3d"], ["__file", "D:/Download/网易云uni-app/Music2-self/components/SongItem/SongItem.vue"]]);
wx.createComponent(Component);
