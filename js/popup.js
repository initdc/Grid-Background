// const UNITS = [
//   "px",
//   "cm",
//   "mm",
//   "in",
//   "pc",
//   "pt",
//   "ch",
//   "em",
//   "rem",
//   "vh",
//   "vw",
//   "vmin",
//   "vmax",
// ];
let width = "6.25";
let wUnit = "vw";

let height = "2";
let hUnit = "rem";

// let color = "lightgray";
let color = "#d3d3d3";
let grid = "row";

let imageCode;

switch (grid) {
  case "row":
    imageCode = `linear-gradient(
        to top,
        ${color} 0.1vh,
        transparent 0.1vh 100%)`;
    break;
  case "col":
    imageCode = `linear-gradient(
        to left,
        ${color} 0.1vh,
        transparent 0.1vh 100%)`;
    break;
  case "all":
    imageCode = `linear-gradient(
        to top,
        ${color} 0.1vh,
        transparent 0.1vh 100%),
        linear-gradient(to left, ${color} 0.1vh, transparent 0.1vh 100%)`;
    break;

  default:
    imageCode = "";
}

const storage = localStorage;
// const crStorage = chrome.storage.local;

const wInp = document.getElementById("w-inp");
const wSel = document.getElementById("w-sel");
const hInp = document.getElementById("h-inp");
const hSel = document.getElementById("h-sel");
const cInp = document.getElementById("c-inp");
const chgSize = document.getElementById("chg-size");
const chgColor = document.getElementById("chg-color");
const reset = document.getElementById("reset");

const sSel = document.getElementById("s-sel");
const hide = document.getElementById("hide");
const show = document.getElementById("show");

wInp.value = width;
for (const opt of wSel.children) {
  if (opt.textContent === wUnit) opt.selected = true;
}

hInp.value = height;
for (const opt of hSel.children) {
  if (opt.textContent === hUnit) opt.selected = true;
}

cInp.value = color;
for (const opt of sSel.children) {
  if (opt.textContent === show) opt.selected = true;
}

function showGrid() {
  document.body.style.backgroundSize = `6.25vw 2rem`;
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundImage = `linear-gradient(
    to top,
    #d3d3d3 0.1vh,
    transparent 0.1vh 100%)`;
}

function hideGrid() {
  document.body.style.backgroundSize = "";
  document.body.style.backgroundRepeat = "";
  document.body.style.backgroundImage = "";
}

show.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showGrid,
  });
});

hide.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: hideGrid,
  });
});
