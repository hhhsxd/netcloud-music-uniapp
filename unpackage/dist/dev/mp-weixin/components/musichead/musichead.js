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
    white: {
      type: Boolean,
      default: false
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
    const statusbarheight = common_vendor.ref(0);
    const barheight = common_vendor.ref(0);
    common_vendor.onLoad((e) => {
      ids.value = e.id;
      statusbarheight.value = common_vendor.index.getSystemInfoSync().statusBarHeight;
      const { top, height } = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      barheight.value = height ? height + (top - statusbarheight.value) * 2 : 38;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `${statusbarheight.value}px`,
        b: __props.iconshow
      }, __props.iconshow ? {
        c: common_vendor.o(backTo),
        d: common_vendor.o(toHome)
      } : {}, {
        e: common_vendor.t(__props.title),
        f: __props.white ? 1 : "",
        g: `${barheight.value}px`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Download/网易云uni-app/Music2-self/components/musichead/musichead.vue"]]);
wx.createComponent(Component);
