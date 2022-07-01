// const storage = localStorage;
const crStorage = chrome.storage.local;

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

function initData(fn) {
  crStorage.get(
    ["width", "wUnit", "height", "hUnit", "color", "grid"],
    ({ width, wUnit, height, hUnit, color, grid }) =>
      fn({ width, wUnit, height, hUnit, color, grid })
  );
}

function updatePage({ width, wUnit, height, hUnit, color, grid }) {
  wInp.value = width;
  for (const opt of wSel.children) {
    if (opt.value === wUnit) opt.selected = true;
  }

  hInp.value = height;
  for (const opt of hSel.children) {
    if (opt.value === hUnit) opt.selected = true;
  }

  cInp.value = color;

  for (const opt of sSel.children) {
    if (opt.value === grid) opt.selected = true;
  }
}

function genImageCode(grid, color) {
  switch (grid) {
    case "row":
      return `linear-gradient(
        to top, ${color} 0.1vh,
        transparent 0.1vh 100%)`;
    case "col":
      return `linear-gradient(
        to left, ${color} 0.1vh,
        transparent 0.1vh 100%)`;
    case "all":
      return `linear-gradient(
        to top, ${color} 0.1vh,
        transparent 0.1vh 100%),
        linear-gradient(
        to left, ${color} 0.1vh,
        transparent 0.1vh 100%)`;
    default:
      return "";
  }
}

function showGrid(width, wUnit, height, hUnit, imageCode) {
  document.body.style.backgroundSize = `${width}${wUnit} ${height}${hUnit}`;
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundImage = imageCode;
}

function hideGrid() {
  document.body.style.backgroundSize = "";
  document.body.style.backgroundRepeat = "";
  document.body.style.backgroundImage = "";
}

function changeGridSize(width, wUnit, height, hUnit) {
  document.body.style.backgroundSize = `${width}${wUnit} ${height}${hUnit}`;
}

function changeGridColor(imageCode) {
  document.body.style.backgroundImage = imageCode;
}

function changeSize() {
  let width = wInp.value;
  let wUnit;
  for (const opt of wSel.children) {
    if (opt.selected === true) wUnit = opt.value;
  }
  let height = hInp.value;
  let hUnit;
  for (const opt of hSel.children) {
    if (opt.selected === true) hUnit = opt.value;
  }

  crStorage.set({ width, wUnit, height, hUnit });
  return { width, wUnit, height, hUnit };
}

function changeColor() {
  let color = cInp.value;

  crStorage.set({ color });
  return color;
}

function changeGrid() {
  let grid = sSel.value;

  crStorage.set({ grid });
  return grid;
}

show.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  initData(({ width, wUnit, height, hUnit, color, grid }) => {
    let imageCode = genImageCode(grid, color);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showGrid,
      args: [width, wUnit, height, hUnit, imageCode],
    });
  });
});

hide.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: hideGrid,
  });
});

chgSize.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  initData(() => {
    const { width, wUnit, height, hUnit } = changeSize();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changeGridSize,
      args: [width, wUnit, height, hUnit],
    });
  });
});

chgColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  initData(({ grid }) => {
    const color = changeColor();
    let imageCode = genImageCode(grid, color);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: changeGridColor,
      args: [imageCode],
    });
  });
});

reset.addEventListener("click", () => {
  const width = "6.25";
  const wUnit = "vw";
  const height = "2";
  const hUnit = "rem";
  const color = "#d3d3d3";
  const grid = "row";

  crStorage.set({ width, wUnit, height, hUnit, color, grid });
  updatePage({ width, wUnit, height, hUnit, color, grid });
});

sSel.addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  initData(({ width, wUnit, height, hUnit, color, grid }) => {
    grid = changeGrid();
    let imageCode = genImageCode(grid, color);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showGrid,
      args: [width, wUnit, height, hUnit, imageCode],
    });
  });
});

initData(updatePage);
