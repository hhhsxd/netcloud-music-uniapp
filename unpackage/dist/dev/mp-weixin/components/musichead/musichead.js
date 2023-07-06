"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "musichead",
  props: {
    title: {
      type: String
    },
    iconshow: {
      type: Boolean,
      default: true
    },
    iconcolor: {
      type: String,
      default: "white"
    }
  },
  setup(__props) {
    const backTo = () => {
      common_vendor.index.navigateBack();
    };
    const toHome = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    };
    const ids = common_vendor.ref();
    common_vendor.onLoad((e) => {
      console.log(e);
      ids.value = e.id;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.iconshow
      }, __props.iconshow ? {
        b: common_vendor.o(backTo),
        c: common_vendor.o(toHome)
      } : {}, {
        d: common_vendor.t(__props.title),
        e: __props.iconcolor
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Download/网易云uni-app/Music2-self/components/musichead/musichead.vue"]]);
wx.createComponent(Component);
