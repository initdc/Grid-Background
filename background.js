const width = "6.25";
const wUnit = "vw";
const height = "2";
const hUnit = "rem";
const color = "#d3d3d3";
const grid = "row";

const crStorage = chrome.storage.local;

chrome.runtime.onInstalled.addListener(() => {
  crStorage.set({ width, wUnit, height, hUnit, color, grid });
});
