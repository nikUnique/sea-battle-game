// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"f0HGD":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d113fd8ce37f48ea";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aenu9":[function(require,module,exports) {
const mySideMyFleet = document.querySelector(".my-side--my-float");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-float");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-float");
const enemySideMyFleet = document.querySelector(".enemy-side--my-float");
const seas = document.querySelectorAll(".sea");
const notificatonWindow = document.querySelector(".notification-window");
const overlay = document.querySelector(".overlay");
const btnCloseNotificationWindow = document.querySelector(".close-notification-window");
const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"
];
const seaFleet = Array.from({
    length: 10
}, (_, i)=>i + 1);
let createMyShips, createEnemyShips;
createMyShips = [
    // [
    //   [`${mySideMyFleet.querySelector(".F10").classList[0]}`],
    //   [`${mySideMyFleet.querySelector(".F10")}`].length,
    // ],
    // [["A1", "A2", "A3", "a4"], ["A1", "A2", "A3", "a4"].length],
    // [["B4", "B5"], ["B4", "B5"].length],
    [
        [
            "e1"
        ],
        1
    ],
    [
        [
            "e6",
            "e7"
        ],
        2
    ],
    [
        [
            "J4",
            "I4",
            "h4"
        ],
        3
    ]
];
createEnemyShips = [
    // [["B6", "B7"], ["B6", "B7"].length],
    // [["I2"], ["I2"].length],
    // [["J10"], ["J10"].length],
    // [["F7"], ["F7"].length],
    // [["c1", "c2", "c3", "c4"], ["c1", "c2", "c3", "c4"].length],
    [
        [
            "f3"
        ],
        1
    ],
    [
        [
            "b4",
            "c4",
            "d4"
        ],
        3
    ],
    [
        [
            "i8",
            "i9"
        ],
        2
    ]
];
let dragged;
let playing;
let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];
/**************************/ /* CREATING SHIPS */ /**************************/ const markup = seaFleet.map((item, i)=>`
    <tr class="row-${i + 1}">
<th>${item}</th>
 ${letters.map((letter)=>`<td class=" dropzone"><div class="${letter}${i + 1} cell" ></div></td>`).join("")}
</tr>
`).join("");
const markupSeaHead = ` ${seaFleet.map((_, i)=>{
    return i > 0 ? `<th>${letters[i]}</th>` : `<th></th> 
        <th>${letters[i]}</th>`;
}).join("")}`;
[
    mySideMyFleet,
    mySideEnemyFleet,
    enemySideEnemyFleet,
    enemySideMyFleet
].forEach((container)=>container.insertAdjacentHTML("afterbegin", markup));
console.log(`${mySideMyFleet.querySelector(".F10").classList[0]}`, "bomba");
[
    ...seas
].forEach((sea)=>sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead));
const createFleet = function(fleetPart) {
    const fleet = fleetPart[0];
    const ships = [
        fleetPart[1]
    ];
    const newShipsCoords = fleetPart[2];
    // if (fleet === mySideEnemyFleet || fleet === enemySideMyFleet) return;
    console.log(fleet);
    console.log(ships);
    console.log("FLEET");
    const createShip = function(coords, size, duplicateFleet) {
        // console.log(duplicateFleet, "duplicateFleet");
        console.log(fleet, "fleet");
        console.log(coords);
        const bigCoords = coords?.map((coord)=>{
            console.log(coord);
            return coord.toUpperCase();
        });
        if (bigCoords === undefined) return;
        const checkSpace = /*  duplicateFleet
      ? ""
      : */ ships?.map((ship)=>{
            return ship?.coords?.some((coord)=>bigCoords.includes(coord));
        });
        console.log(checkSpace);
        if (checkSpace.includes(true)) {
            console.log("In such a mood it wouldn't be surprising if you had stepped with you shoe on a dog's poop \uD83C\uDF6D");
            return;
        }
        // duplicateFleet && console.log(cleanShips, "before duplicate");
        const checkSpaceAround = /* duplicateFleet ? cleanShips : */ ships.map((ship)=>{
            return ship?.unavailabeCells?.some((cell)=>{
                if (bigCoords.includes(cell)) console.log(`You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor \u{1F602}`);
                return bigCoords.includes(cell);
            });
        });
        console.log(checkSpaceAround, "checkSpaceAround");
        if (checkSpaceAround.includes(true)) return;
        const cellsAround = bigCoords.reduce((acc, coord)=>{
            // console.log(duplicateFleet);
            /* duplicateFleet
        ? duplicateFleet.querySelector(`.${coord}`).classList.add("ship")
        : */ fleet.querySelector(`.${coord}`).classList.add("ship");
            const coordSlice01 = coord.slice(0, 1);
            const coordSlice1 = coord.slice(1);
            const letterAround = letters.indexOf(coordSlice01);
            const previousCell = coordSlice01 + (+coordSlice1 - 1);
            const nextCell = coordSlice01 + (+coordSlice1 + 1);
            const rightCell = letters[letterAround + 1] + coordSlice1;
            const leftCell = letters[letterAround - 1] + coordSlice1;
            const diagonalCells = function(number1, number2) {
                return letters[letterAround + number1] + (+coordSlice1 + number2);
            };
            const rightTopCell = diagonalCells(1, -1);
            const leftTopCell = diagonalCells(-1, -1);
            const leftBottomCell = diagonalCells(-1, 1);
            const rightBottomCell = diagonalCells(1, 1);
            return acc += `, ${previousCell}, ${nextCell}, ${leftCell} ,${rightCell} ,${rightTopCell} ,${leftTopCell} ,${leftBottomCell} ,${rightBottomCell}`;
        }, "");
        const readyCellsAround = [
            ...new Set(cellsAround.replace(",", "").split(",").map((cell)=>cell.trim()).filter((cell)=>letters.includes(cell.slice(0, 1))))
        ];
        console.log(readyCellsAround);
        // console.log(duplicateFleet)
        bigCoords.forEach((pos)=>{
            console.log(pos);
            /* duplicateFleet
        ? (duplicateFleet.querySelector(`.${pos}`).style.backgroundColor =
            "yellow")
        :  */ fleet.querySelector(`.${pos}`).style.backgroundColor = "#fcc419";
            fleet.querySelector(`.${pos}`).insertAdjacentHTML("beforebegin", `<div class="${pos} cell"></div`);
        });
        const ship = {
            coords: bigCoords,
            size: size,
            unavailabeCells: readyCellsAround
        };
        return ship;
    // ships.push(ship);
    };
    // [
    //   [["d4"], 1],
    //   [["e7", "e8"], 2],
    //   [["h6", "G6", "I6"], 3],
    //   [["D4"], 1],
    //   [["I2"], 1],
    //   [["J10"], 1],
    //   [["F10"], 1],
    //   [["A1", "A2", "A3", "A4"], 4],
    //   [["B4", "B5"], 2],
    //   [["J3", "I3"], 2],
    //   [["e1"], 1],
    //   [["e2"], 1],
    // ]
    fleet !== mySideEnemyFleet && fleet !== enemySideMyFleet && newShipsCoords.forEach((ship)=>{
        ships.push(createShip(...ship));
    });
    console.log(fleet, "fleeet");
    const cleanShips = ships.slice().filter((ship)=>ship !== undefined);
    /**************************/ /* PLACING SHIPS MANUALLY */ /**************************/ const shipEls = fleet.querySelectorAll(".ship");
    shipEls.forEach((shipEl, i)=>{
        shipEl.classList.add(`cell${i + 1}`);
    });
    const targets = [
        ...fleet.querySelectorAll("td")
    ].filter((ship)=>{
        return !ship.classList.contains("ship");
    });
    targets.forEach((target)=>{
        target.classList.add("dropzone");
    });
    shipEls.forEach((source)=>{
        source.setAttribute("draggable", true);
    });
    shipEls.forEach((source)=>{
        source.addEventListener("dragstart", function(e) {
            console.log("DRAGSTART");
            dragged = e.target;
        });
    });
    shipEls.forEach((source)=>{
        source.addEventListener("dragend", function(e) {
            // e.preventDefault();
            console.log("DRAGEND", e.target);
            fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`);
        // .classList.replace(
        //   mySideMyFleet.querySelector(
        //     `.${dragged.classList[dragged.classList.length - 1]}`
        //   ).classList[0],
        //   e.target.querySelector(".cell").classList[0]
        // );
        });
    });
    [
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
    ].forEach((ev)=>{
        targets.forEach((target)=>{
            target.addEventListener(ev, function(e) {
                if (e.target.classList.contains("dropzone")) {
                    console.log(ev);
                    ev === "dragenter" ? e.target.classList.add("dragover") : e.target.classList.remove("dragover");
                    if (ev === "drop") {
                        e.preventDefault();
                        e.target.appendChild(dragged);
                    }
                }
                if (ev === "dragover") {
                    e.preventDefault();
                    if (e.target.classList.contains("ship")) return;
                    e.target.classList.add("dragover");
                /* [0] =
              e.target.querySelector("div").classList[0]; */ }
                if (ev === "dragleave") {
                    console.log("--------DRAGLEAVE------");
                    console.log(e.target);
                    if (e.target.children) return;
                    console.log(dragged.classList[0]);
                    e.target.querySelector("td").querySelector("div").classList.add(`${dragged.classList[0]} cell`);
                // .insertAdjacentHTML(
                //   "afterbegin",
                //   `<div class="${dragged.classList[0]} cell"></div`
                // );
                }
            }, ev === "dragover" && false);
        });
    });
    //  Create an arr with ships as cleanShips
    // How to create this arr?
    // 1) When a drop events happen, I need to take out a class of the cell and to put it into arr
    // let niceShipArr = [];
    console.log(cleanShips, "cleanShips");
    targets.forEach((target)=>{
        target.addEventListener("drop", function(e) {
            e.preventDefault();
            console.log(e.target);
            console.log(e.target.querySelector("div").classList[0], " cell2");
            console.log(`${fleet.querySelector(".cell2").classList[0]}`, "cell2");
            console.log(e.target, "cell");
            console.log(e.target.querySelector("div").classList[0], "cell");
            /*  [...mySideMyFleet.querySelectorAll(".ship")] */ /* .forEach((ship) => { */ console.log(e.target.querySelector("div").classList[0], "DRAGEND drop");
            fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`).classList.replace(fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`).classList[0], e.target.querySelector("div").classList[0]);
        /*  }); */ });
    });
    /**************************/ /* GAME START CONTROL */ /**************************/ let createFleetShips, createMoreShips;
    [
        ...fleet.querySelectorAll(".ship")
    ].forEach((ship, i)=>{
        let color;
        i === 0 && (color = "#f03e3e");
        i > 0 && i < 4 && (color = "#94d82d");
        i > 0 && i > 3 && (color = "#be4bdb");
        ship.style.backgroundColor = color;
    });
    // if (fleet === enemySideEnemyFleet) return;
    if (fleet === mySideMyFleet) {
        const startGameBtnMarkup = `<button class="start-game">Start playing \u{1F639}</button>`;
        document.querySelector("body").insertAdjacentHTML("afterbegin", startGameBtnMarkup);
    }
    /*  const contrarySideDuplicateFleet =
    fleet === mySideMyFleet ? enemySideMyFleet : mySideEnemyFleet; */ playing = false;
    const startGameBtn = document.querySelector(".start-game");
    startGameBtn.addEventListener("click", function(e) {
        enemySideMyFleet.style.pointerEvents = "none";
        fleet.querySelectorAll(".ship");
        console.log(cleanShips);
        // const allShips = [...mySideMyFleet.querySelectorAll(".ship")];
        // const duplicateFleet = mySideMyFleet.cloneNode(true);
        // enemySideMyFleet.innerHTML = duplicateFleet.innerHTML;
        // const anotherDuplicateFleet = enemySideEnemyFleet.cloneNode(true);
        // mySideEnemyFleet.innerHTML = anotherDuplicateFleet.innerHTML;
        const findCell = function(cell) {
            let fleetSide;
            if (fleet === enemySideMyFleet) fleetSide = mySideMyFleet;
            if (fleet === mySideEnemyFleet) fleetSide = enemySideEnemyFleet;
            if (!fleetSide) return;
            console.log(cell);
            console.log(fleet);
            console.log(mySideMyFleet.querySelector(`.${cell}`));
            return `${fleetSide.querySelector(`.${cell}`).classList[0]}`;
        };
        createFleetShips = [
            [
                [
                    findCell("cell1")
                ],
                [
                    findCell("cell1")
                ].length
            ],
            [
                [
                    findCell("cell5"),
                    findCell("cell6")
                ],
                2
            ],
            [
                [
                    findCell("cell2"),
                    findCell("cell3"),
                    findCell("cell4")
                ],
                3
            ]
        ];
        createMoreShips = [
            [
                [
                    findCell("cell1")
                ],
                [
                    findCell("cell1")
                ].length
            ],
            [
                [
                    findCell("cell5"),
                    findCell("cell6")
                ],
                2
            ],
            [
                [
                    findCell("cell2"),
                    findCell("cell3"),
                    findCell("cell4")
                ],
                3
            ]
        ];
        console.log(newShipsCoords);
        if (fleet === enemySideMyFleet) {
            createFleetShips.forEach((ship)=>{
                ships.push(createShip(...ship));
            });
            console.log(createFleetShips, "createFleetShips");
        }
        if (fleet === mySideEnemyFleet) createMoreShips.forEach((ship)=>{
            ships.push(createShip(...ship));
        });
        playing = true;
        console.log("Game started \uD83E\uDD70");
        // Make sure that I will not destroy my own ship ;)
        if (playing) {
            console.log(playing, "playing");
            mySideMyFleet.style.pointerEvents = "none";
            enemySideEnemyFleet.style.pointerEvents = "none";
        }
    });
    // const e6 = mySideMyFleet.querySelector(".E6");
    // enemySideMyFleet.style.position = "relative";
    // const e7 = enemySideMyFleet.querySelector(".E7");
    // e7.closest("td").style.position = "relative";
    // e7.style.cssText = `
    // position: absolute;
    // height: 40%;
    // top: -50%;
    // left: -50%;
    // background-color: yellow;
    // `;
    // e7.closest("td").rowSpan = "2";
    // e7.closest("td").style.height = "100%";
    // const sh = `<div class="purple" style = height:50%;></div
    // <div class="blue" style = height:50%;></div`;
    // e7.closest("td").insertAdjacentHTML("afterbegin", sh);
    // const twoCellShip = `<div class="two-cell"></div>`;
    // mySideMyFleet
    //   .querySelector(".E6")
    //   .insertAdjacentHTML("afterbegin", twoCellShip);
    /**************************/ /* GAME CONTROL */ /**************************/ // const defineFleet =
    //   fleet === mySideMyFleet ? enemySideMyFleet : mySideEnemyFleet;
    mySideMyFleet.classList.add("player0");
    playing === true && (enemySideMyFleet.style.pointerEvents = "none");
    [
        mySideEnemyFleet,
        enemySideMyFleet
    ].forEach((fleet)=>{
        fleet.addEventListener("click", function(e) {
            console.log("---------MEGA BRUMWELL------- \uD83D\uDC16");
            if (e.target.classList.contains("ship") || e.target.textContent !== "") return;
            console.log(fleet, "float");
            const turn = playing && fleet === enemySideMyFleet ? mySideEnemyFleet : enemySideMyFleet;
            playing && (turn.style.pointerEvents = "auto");
            playing && (fleet.style.pointerEvents = "none");
        });
    });
    /**************************/ /* SHOOTING LOGIC */ /**************************/ console.log(playing);
    // console.log(
    //   fleet === mySideMyFleet ? enemySideMyFleet : mySideEnemyFleet,
    //   "goo"
    // );
    /*  (fleet === mySideMyFleet
    ? enemySideMyFleet
    : mySideEnemyFleet
  ) */ fleet.addEventListener("click", function(e) {
        e.preventDefault();
        console.log(e.target);
        console.log(playing, "lay");
        if (!playing) return;
        const miss = "&bull;";
        const addMarkToFleet = function(fleet) {
            console.log(e.target, "target");
            console.log(fleet.querySelector(`.${e.target.classList[0]}`));
            console.log(e.target.children);
            if (e.target.classList[0] === "dropzone") {
                console.log(fleet, "bug");
                console.log("zone");
                return fleet.querySelector(`.${e.target.querySelector("div").classList[0]}`);
            } else {
                console.log(`------${fleet}----------`);
                console.log(e.target);
                console.log(e.target.classList[0]);
                console.log(fleet.querySelector(`.${e.target.classList[0]}`));
                console.log("none");
                return fleet.querySelector(`.${e.target.classList[0]}`);
            }
        // return fleet.querySelector(
        //   e.target.classList[0] === "dropzone"
        //     ? `.${e.target.querySelector("div").classList[0]}`
        //     : `.${e.target.classList[0]}`
        // );
        };
        if (!e.target.closest(".ship") && e.target.textContent === "") {
            e.target.querySelector("div").classList.add("miss");
            e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);
            if (e.target.closest(".enemy-side--my-float")?.querySelector(`.${e.target.classList[0]}`)) {
                addMarkToFleet(mySideMyFleet).classList.add("miss");
                addMarkToFleet(mySideMyFleet).insertAdjacentHTML("afterbegin", miss);
            } else {
                addMarkToFleet(enemySideEnemyFleet).classList.add("miss");
                addMarkToFleet(enemySideEnemyFleet).insertAdjacentHTML("afterbegin", miss);
            }
        }
        if (e.target.closest(".ship")?.textContent === "") {
            console.log(ships, "duuper");
            const injuredShipPos = ships.findIndex((ship)=>{
                console.log(ship.coords);
                return ship?.coords?.includes(e.target.classList[0]);
            });
            console.log(injuredShipPos, "pos");
            console.log(e.target);
            e.target.classList.add("injure");
            const injure = "&cross;";
            e.target.insertAdjacentHTML("afterbegin", injure);
            console.log(ships[injuredShipPos], "shipi");
            const destroyedShipCoords = ships[injuredShipPos].coords.map((_, i)=>{
                console.log(fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`).nextElementSibling.classList, "bood");
                return /* defineFleet */ fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`).nextElementSibling.classList.contains("injure");
            });
            console.log(destroyedShipCoords, "destr");
            console.log("how often this happens");
            if (e.target.closest(".enemy-side--my-float")?.querySelector(`.${e.target.classList[0]}`)) {
                console.log(addMarkToFleet(mySideMyFleet).nextElementSibling, "burn");
                addMarkToFleet(mySideMyFleet).nextElementSibling.insertAdjacentHTML("afterbegin", injure);
                addMarkToFleet(mySideMyFleet).nextElementSibling.classList.add("injure");
            } else {
                addMarkToFleet(enemySideEnemyFleet).nextElementSibling.insertAdjacentHTML("afterbegin", injure);
                addMarkToFleet(enemySideEnemyFleet).nextElementSibling.classList.add("injure");
            }
            if (!destroyedShipCoords.includes(false)) {
                console.log("beny");
                const destroyedShip = ships[injuredShipPos].coords.map((_, i)=>{
                    return /* defineFleet */ fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`);
                });
                console.log(destroyedShip);
                const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells.filter((cell)=>{
                    // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
                    return !ships[injuredShipPos].coords.includes(cell);
                }).map((cell, i)=>{
                    const cellAround = /* defineFleet */ fleet.querySelector(`.${cell}`);
                    // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
                    cellAround && (cellAround.style.fontSize = "4rem");
                    console.log("Bormer");
                    const surroundDestroyedShip = function(fleet, cellAround) {
                        console.log(fleet, "before round");
                        console.log(cellAround, "WHERE ARE YOU?");
                        cellAround?.textContent === "" && fleet.querySelector(`.${cell}`)?.insertAdjacentHTML("afterbegin", miss);
                        !cellAround?.classList.contains("miss") && cellAround?.classList.add("cell-around");
                        cellAround && (cellAround.style.fontSize = "4rem");
                    };
                    const markContraryFleet = function(fleet) {
                        const cellAroundContrarySide = fleet.querySelector(`.${cell}`);
                        console.log(cellAroundContrarySide, "STUCK");
                        surroundDestroyedShip(fleet, cellAroundContrarySide);
                    };
                    if (e.target.closest(".ship").closest(".enemy-side--my-float")) markContraryFleet(mySideMyFleet);
                    if (e.target.closest(".ship").closest(".my-side--enemy-float")) markContraryFleet(enemySideEnemyFleet);
                    // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
                    surroundDestroyedShip(/* defineFleet */ fleet, cellAround);
                });
            }
        }
        /**************************/ /* CONTROLLING THE END OF THE GAME */ /**************************/ const allShips = [
            ...fleet.querySelectorAll(".ship")
        ];
        const injuredShips = allShips.map((ship)=>{
            if (ship.classList.contains("injure")) return ship;
        }).filter((ship)=>{
            if (ship) return ship;
        });
        const areAllShipsInjured = injuredShips.length === allShips.length;
        // Show notification window
        const openNotificationWindow = function() {
            const resultsMessage = document.querySelector(".results-message");
            const player0 = "Dendy";
            const player1 = "Many";
            const addNotification = function(player) {
                resultsMessage.insertAdjacentHTML("afterbegin", `${player} won the game`);
            };
            if (/* defineFleet */ fleet === mySideEnemyFleet) addNotification(player0);
            if (/* defineFleet */ fleet !== mySideEnemyFleet) addNotification(player1);
            notificatonWindow.classList.remove("hidden");
            overlay.classList.remove("hidden");
            [
                mySideEnemyFleet,
                enemySideMyFleet
            ].forEach((fleet)=>playing && (fleet.style.pointerEvents = "none"));
        };
        const closeNotificationWindow = function() {
            notificatonWindow.classList.add("hidden");
            overlay.classList.add("hidden");
        };
        if (areAllShipsInjured) openNotificationWindow();
        btnCloseNotificationWindow.addEventListener("click", closeNotificationWindow);
        overlay.addEventListener("click", closeNotificationWindow);
        document.addEventListener("keydown", function(e) {
            // console.log(e.key);
            if (e.key === "Escape" && !notificatonWindow.classList.contains("hidden")) closeNotificationWindow();
        });
    });
};
[
    [
        mySideMyFleet,
        mySideMyShips,
        createMyShips
    ],
    [
        mySideEnemyFleet,
        mySideEnemyShips,
        createEnemyShips
    ],
    [
        enemySideEnemyFleet,
        enemySideEnemyShips,
        createEnemyShips
    ],
    [
        enemySideMyFleet,
        enemySideMyShips,
        createMyShips
    ]
].forEach((container, i)=>createFleet(container)); // The situation about now: I created right spicing rules, so now I would not be able to put one ship on the next or previos cell of another ship, so all ships are at least one cell away from each other
 // Now it's time to do some refactoring
 // Refactoring finished, now it's time to think about shooting feature
 // When I click on a cell I need to extract a class of it
 // Next step: when I click on a ship a symbol of injured or destoryed ship should be shown
 // Now it's visible whether the shoot hit the goal or not. Now it's time to surround a destroyed ship with dots
 // When I injure a ship which is more than one cell I want to not fill space around with dots, but when the ship is completely destoryed I want to fill space around with dots
 // Right now spaces which are empty but shot will be marked with one color, but spaces which weren't shot around the destroyed ship will be marked with another color, so, what was planned is completed
 // Now it's time to refactor
 // All 3 files are refactored nicely, now it's time to think about the next feature
 // How am I going to control the end of the game? When all coords in all ships have class "injured" then I need to do some action, for example show some modal window with the results of the battle
 // The logic of defining whether all ships damaged or not is defined, not it's time to show notification message
 // Now notification window shows up when all ships are destroyed, what to do next? Now I should think about applying the same functionality to the enemy part
 // Part of the funtionalit is already aplied, now it's time to somehow link 2 fleets together
 // Now I need to make sure that when I shoot mySideEnemyFleet that only will change enemySideEnemyFleet
 // The situaton for now: the last goal is completed, my enemy shoots only affect my side and my shoots only affect his side, now it's time of refactoring
 // At this point everything is nice refactored, now it's time to think about the next feature: I need to create turns. This means that it can be my turn or my enemy's turn
 // Turns are created and work like intended, let's figure out the winner of the game
 // The winner is defined, now it's time to do something about ship placing
 // Now ships are not longer the same on both sides, all planned goals untill now are completed, now it's time to think about another feature
 // Now I can create some input form inputting coords for ships
 // Now I don't need any input form or anything like that! Now the ships are draggable, so I can manually do this!
 // All code is refactored and this time I should make a feature to first place ships and only then to play
 // In the beginning I place my ships on my side and when I push the start button, then my ships will render on my opponent's side
 // Right now after pushing start button duplicate fleet is rendered and it's playable, everything after duplicating the fleet is working, however, I still cannot  place ships manually, I can drag a ship and drop it somewhere, but it will not be duplicated to another side, so this is what should be fixed, but before let's refactor the code
 // Now I can manually place ships where I want and they will be duplicated and I can play as in the real game, but to set everything properly I first need to place right part of ships together and if they will not be connected in the right way, then there will be a mess, so I need to find a condition which will help me in this situation.

},{}]},["f0HGD","aenu9"], "aenu9", "parcelRequire3129")

//# sourceMappingURL=index.e37f48ea.js.map
