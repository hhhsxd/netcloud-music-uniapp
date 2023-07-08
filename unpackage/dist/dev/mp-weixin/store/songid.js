"use strict";
const common_vendor = require("../common/vendor.js");
const useSongIdStore = common_vendor.defineStore("songid", () => {
  const ListIds = common_vendor.ref([]);
  const nextId = common_vendor.ref("");
  const init_ids = (ids) => {
    ListIds.value = ids;
  };
  const next_change = (e) => {
    for (let i = 0; i < ListIds.value.length; i++) {
      if (ListIds.value[i].id == e) {
        nextId.value = ListIds.value[i + 1].id;
      }
    }
  };
  return {
    ListIds,
    nextId,
    next_change,
    init_ids
  };
});
exports.useSongIdStore = useSongIdStore;
