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
  (_easycom_musichead + SongItem)();
}
const SongItem = () => "../../components/SongItem/SongItem.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const hotList = common_vendor.ref([]);
    const inputIn = common_vendor.ref(1);
    let recArr = common_vendor.ref([]);
    let ival = common_vendor.ref();
    let endResult = common_vendor.ref([]);
    let inputHistory = common_vendor.ref([]);
    let searchWord = common_vendor.ref(null);
    common_vendor.onLoad(() => {
      common_api.searchHot().then((res) => {
        if (res.data.code == 200)
          hotList.value = res.data.data;
      });
      common_vendor.index.getStorage({
        key: "inputHistory",
        success: (res) => {
          inputHistory.value = res.data;
        }
      });
    });
    const searchInput = (e) => {
      if (e == "") {
        inputIn.value = 1;
      }
      inputIn.value = 2;
      ival.value = e;
      common_api.searchsuggest(ival.value).then((res) => {
        recArr.value = res.data.result.allMatch;
      });
    };
    const handlerResult = (e) => {
      e = e.trim();
      if (!e) {
        inputIn.value = 1;
        return;
      }
      inputHistory.value.unshift(e);
      inputHistory.value = [...new Set(inputHistory.value)];
      if (inputHistory.value.length > 10) {
        inputHistory.value.length = 10;
      }
      common_vendor.index.setStorage({
        key: "inputHistory",
        data: inputHistory.value
      });
      inputIn.value = 3;
      common_api.searchKey(e).then((res) => {
        endResult.value = res.data.result.songs;
      });
    };
    const handleToClose = () => {
      searchWord.value = "";
      inputIn.value = 1;
    };
    const handlerToDetail = (songId) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${songId}`
      });
    };
    const clearHistory = () => {
      common_vendor.index.removeStorage({
        key: "inputHistory",
        success: (res) => {
          inputHistory.value = [];
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "搜索",
          iconshow: true,
          white: "false"
        }),
        b: common_vendor.o([($event) => common_vendor.isRef(searchWord) ? searchWord.value = $event.detail.value : searchWord = $event.detail.value, ($event) => searchInput(common_vendor.unref(searchWord))]),
        c: common_vendor.o(($event) => handlerResult(common_vendor.unref(searchWord))),
        d: common_vendor.unref(searchWord),
        e: inputIn.value !== 1
      }, inputIn.value !== 1 ? {
        f: common_vendor.o(handleToClose)
      } : {}, {
        g: inputIn.value === 1
      }, inputIn.value === 1 ? {
        h: common_vendor.o(clearHistory),
        i: common_vendor.f(common_vendor.unref(inputHistory), (i, k0, i0) => {
          return {
            a: common_vendor.t(i),
            b: i,
            c: common_vendor.o(($event) => handlerResult(i), i)
          };
        })
      } : {}, {
        j: inputIn.value === 1
      }, inputIn.value === 1 ? {
        k: common_vendor.f(hotList.value, (i, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: index < 3 ? 1 : "",
            c: common_vendor.t(i.searchWord),
            d: i.iconUrl,
            e: common_vendor.t(i.content),
            f: common_vendor.t(i.score),
            g: i.id,
            h: common_vendor.o(($event) => handlerResult(i.searchWord), i.id)
          };
        })
      } : {}, {
        l: inputIn.value === 2
      }, inputIn.value === 2 ? {
        m: common_vendor.t(common_vendor.unref(ival)),
        n: common_vendor.f(common_vendor.unref(recArr), (i, k0, i0) => {
          return {
            a: common_vendor.t(i.keyword),
            b: i.id,
            c: common_vendor.o(($event) => handlerResult(i.keyword), i.id)
          };
        })
      } : {}, {
        o: inputIn.value === 3
      }, inputIn.value === 3 ? {
        p: common_vendor.f(common_vendor.unref(endResult), (i, k0, i0) => {
          var _a, _b, _c, _d;
          return {
            a: common_vendor.o(($event) => handlerToDetail(i.id), i.id),
            b: "c10c040c-1-" + i0,
            c: common_vendor.p({
              name: i.name,
              privType: (_a = i.privilege) == null ? void 0 : _a.flag,
              br: (_b = i.privilege) == null ? void 0 : _b.maxbr,
              artiName: (_c = i.ar) == null ? void 0 : _c.map((item) => item.name),
              alName: (_d = i.al) == null ? void 0 : _d.name,
              color: "black"
            }),
            d: i.id,
            e: common_vendor.o(($event) => handlerToDetail(i.id), i.id)
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/Download/网易云uni-app/Music2-self/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
