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
var _globalVars = require("./globalVars");
var _fleetEnvironment = require("./fleetEnvironment");
// Cannot be in another file, because they are primitives which cannot be mutated after being imported
let dragged;
let playing;
/**************************/ /* CREATING FLEET */ /**************************/ const createFleet = function(fleetPart) {
    const fleet = fleetPart[0];
    const ships = [
        fleetPart[1]
    ];
    const newShipsCoords = fleetPart[2];
    const createShip = function(coords, size) {
        const bigCoords = coords?.map((coord)=>{
            return coord.toUpperCase();
        });
        if (bigCoords === undefined) return;
        const checkSpace = ships?.map((ship)=>{
            return ship?.coords?.some((coord)=>bigCoords.includes(coord));
        });
        if (checkSpace.includes(true)) {
            console.log("In such a mood it wouldn't be surprising if you had stepped with you shoe on a dog's poop \uD83C\uDF6D");
            return;
        }
        const checkSpaceAround = ships.map((ship)=>{
            return ship?.unavailabeCells?.some((cell)=>{
                if (bigCoords.includes(cell)) console.log(`You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor \u{1F602}`);
                return bigCoords.includes(cell);
            });
        });
        if (checkSpaceAround.includes(true)) return;
        const sameLetter = coords.map((coord)=>{
            return coord[0];
        });
        const sameNumber = coords.map((coord)=>{
            return coord[1];
        });
        const columnShip = [
            ...new Set(sameLetter)
        ];
        const rowShip = [
            ...new Set(sameNumber)
        ];
        if (columnShip.length !== 1 && rowShip.length !== 1) {
            console.log("Place your ships in the right order, man \uD83D\uDD7A");
            return;
        }
        if (fleet !== _globalVars.mySideMyFleet && fleet !== _globalVars.enemySideEnemyFleet) {
            const checkWholesomness = coords.map((coord, i)=>{
                const coordSlice01 = coord.slice(0, 1);
                const coordSlice1 = coord.slice(1);
                const letterAround = _globalVars.letters.indexOf(coordSlice01);
                if (coords.length > 1 && !coords.includes(_globalVars.letters[letterAround] + (coordSlice1 - 1)) && !coords.includes(_globalVars.letters[letterAround] + (+coordSlice1 + 1)) && !coords.includes(_globalVars.letters[letterAround - 1] + coordSlice1) && !coords.includes(_globalVars.letters[letterAround + 1] + coordSlice1)) return true;
            });
            if (checkWholesomness.includes(true)) {
                console.log("Place your ships in the right order, man \uD83E\uDD38\u200D\u2642\uFE0F");
                return;
            }
        }
        const cellsAround = bigCoords.reduce((acc, coord, i)=>{
            fleet.querySelector(`.${coord}`).classList.add("ship");
            const coordSlice01 = coord.slice(0, 1);
            const coordSlice1 = coord.slice(1);
            const letterAround = _globalVars.letters.indexOf(coordSlice01);
            const previousCell = coordSlice01 + (+coordSlice1 - 1);
            const nextCell = coordSlice01 + (+coordSlice1 + 1);
            const rightCell = _globalVars.letters[letterAround + 1] + coordSlice1;
            const leftCell = _globalVars.letters[letterAround - 1] + coordSlice1;
            const diagonalCells = function(number1, number2) {
                return _globalVars.letters[letterAround + number1] + (+coordSlice1 + number2);
            };
            const rightTopCell = diagonalCells(1, -1);
            const leftTopCell = diagonalCells(-1, -1);
            const leftBottomCell = diagonalCells(-1, 1);
            const rightBottomCell = diagonalCells(1, 1);
            return acc += `, ${previousCell}, ${nextCell}, ${leftCell} ,${rightCell} ,${rightTopCell} ,${leftTopCell} ,${leftBottomCell} ,${rightBottomCell}`;
        }, "");
        const readyCellsAround = [
            ...new Set(cellsAround.replace(",", "").split(",").map((cell)=>cell.trim()).filter((cell)=>_globalVars.letters.includes(cell.slice(0, 1))))
        ];
        bigCoords.forEach((pos)=>{
            console.log(pos);
            fleet.querySelector(`.${pos}`).classList.add("ship-color");
            fleet.querySelector(`.${pos}`).insertAdjacentHTML("beforebegin", `<div class="${pos} cell"></div`);
        });
        const ship = {
            coords: bigCoords,
            size: size,
            unavailabeCells: readyCellsAround
        };
        return ship;
    };
    fleet !== _globalVars.mySideEnemyFleet && fleet !== _globalVars.enemySideMyFleet && newShipsCoords.forEach((ship)=>{
        ships.push(createShip(...ship));
    });
    console.log(fleet, "fleeet");
    const cleanShips = ships.slice().filter((ship)=>ship !== undefined);
    /**************************/ /* PLACING SHIPS MANUALLY */ /**************************/ const shipEls = fleet.querySelectorAll(".ship");
    shipEls.forEach((shipEl, i)=>{
        shipEl.classList.add(`cell${i + 1}`);
    });
    const cells = [
        ...fleet.querySelectorAll("td")
    ].filter((cell)=>{
        return !cell.classList.contains("ship");
    });
    cells.forEach((cell)=>{
        cell.classList.add("dropzone");
    });
    shipEls.forEach((shipEl)=>{
        shipEl.setAttribute("draggable", true);
    });
    fleet.addEventListener("dragstart", function(e) {
        console.log("DRAGSTART");
        console.log(e.target);
        dragged = e.target;
    });
    fleet.addEventListener("dragend", function(e) {
        console.log("DRAGEND", e.target);
        fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`);
    });
    [
        "dragover",
        "dragenter",
        "dragleave",
        "drop"
    ].forEach((ev)=>{
        fleet.addEventListener(ev, function(e) {
            if (e.target.classList.contains("dropzone")) {
                console.log(ev);
                ev === "dragenter" ? e.target.classList.add("dragover") : e.target.classList.remove("dragover");
                if (ev === "drop") {
                    e.preventDefault();
                    console.log(dragged);
                    e.target.appendChild(dragged);
                    fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`).classList.replace(fleet.querySelector(`.${dragged.classList[dragged.classList.length - 1]}`).classList[0], e.target.querySelector("div").classList[0]);
                }
            }
            if (ev === "dragover") {
                e.preventDefault();
                if (e.target.classList.contains("ship")) return;
                e.target.classList.add("dragover");
            }
            if (ev === "dragleave") {
                console.log("--------DRAGLEAVE------");
                console.log(e.target);
                if (e.target.children) return;
                e.target.querySelector("td").querySelector("div").classList.add(`${dragged.classList[0]} cell`);
            }
        }, ev === "dragover" && false);
    });
    /**************************/ /* GAME START CONTROL */ /**************************/ [
        ...fleet.querySelectorAll(".ship")
    ].forEach((ship, i)=>{
        let color;
        i === 0 && (color = "#f03e3e");
        i > 0 && i < 3 && (color = "#94d82d");
        i > 0 && i > 2 && (color = "#be4bdb");
        ship.style.backgroundColor = color;
    });
    if (fleet === _globalVars.mySideMyFleet) {
        const startGameBtnMarkup = `<button class="start-game">Start playing \u{1F639}</button>`;
        document.querySelector("body").insertAdjacentHTML("afterbegin", startGameBtnMarkup);
    }
    playing = false;
    const startGameBtn = document.querySelector(".start-game");
    startGameBtn.addEventListener("click", function(e) {
        _globalVars.enemySideMyFleet.style.pointerEvents = "none";
        const findCell = function(cell) {
            let fleetSide;
            if (fleet === _globalVars.enemySideMyFleet) fleetSide = _globalVars.mySideMyFleet;
            if (fleet === _globalVars.mySideEnemyFleet) fleetSide = _globalVars.enemySideEnemyFleet;
            if (!fleetSide) return;
            return `${fleetSide.querySelector(`.${cell}`)?.classList[0]}`;
        };
        let createFleetShips = [
            [
                [
                    findCell("cell1")
                ],
                1
            ],
            // [[findCell("cell2")], [0].length],
            // [[findCell("cell3")], [0].length],
            // [
            //   [findCell("cell4"), findCell("cell5"), findCell("cell6")],
            //   [0, 0, 0].length,
            // ],
            // [[findCell("cell7"), findCell("cell8")], [0, 0].length],
            [
                [
                    findCell("cell2"),
                    findCell("cell3"),
                    findCell("cell4")
                ],
                3
            ],
            // [[findCell("cell12"), findCell("cell14")], [0, 0].length],
            [
                [
                    findCell("cell6"),
                    findCell("cell7"),
                    findCell("cell8"),
                    findCell("cell9")
                ],
                4
            ],
            // [[findCell("cell19")], [0].length],
            [
                [
                    findCell("cell5"),
                    findCell("cell10")
                ],
                2
            ]
        ];
        let createMoreShips = [
            [
                [
                    findCell("cell1")
                ],
                1
            ],
            // [[findCell("cell2")], [0].length],
            // [[findCell("cell3")], [0].length],
            // [[findCell("cell4")], [0].length],
            [
                [
                    findCell("cell2"),
                    findCell("cell3"),
                    findCell("cell4")
                ],
                3
            ],
            // [[findCell("cell8"), findCell("cell9")], [0, 0].length],
            // [[findCell("cell10"), findCell("cell11")], [0, 0].length],
            // [
            //   [findCell("cell12"), findCell("cell13"), findCell("cell14")],
            //   [0, 0, 0].length,
            // ],
            [
                [
                    findCell("cell5"),
                    findCell("cell6"),
                    findCell("cell7"),
                    findCell("cell8")
                ],
                4
            ],
            [
                [
                    findCell("cell9"),
                    findCell("cell10")
                ],
                2
            ]
        ];
        console.log(createFleetShips);
        if (fleet === _globalVars.enemySideMyFleet) createFleetShips.forEach((ship)=>{
            ships.push(createShip(...ship));
        });
        if (fleet === _globalVars.mySideEnemyFleet) createMoreShips.forEach((ship)=>{
            ships.push(createShip(...ship));
        });
        if (fleet === _globalVars.mySideEnemyFleet || fleet === _globalVars.enemySideMyFleet) {
            _globalVars.bothSideShips.push(ships);
            fleet === _globalVars.mySideEnemyFleet && _globalVars.bothSideShips.push("mySideEnemyFleet");
            fleet === _globalVars.enemySideMyFleet && _globalVars.bothSideShips.push("enemySideMyFleet");
            const flattenedBothSideShips = _globalVars.bothSideShips.flat(2);
            if (!flattenedBothSideShips.includes(undefined) && flattenedBothSideShips.includes("mySideEnemyFleet") && flattenedBothSideShips.includes("enemySideMyFleet")) {
                playing = true;
                console.log("Game started \uD83E\uDD70");
            } else {
                console.log("Place your ships in the right way \uD83D\uDE03");
                return;
            }
        }
        // Making sure that I will not destroy my own ship ;)
        if (playing) {
            console.log(playing, "playing");
            _globalVars.mySideMyFleet.style.pointerEvents = "none";
            _globalVars.enemySideEnemyFleet.style.pointerEvents = "none";
        }
    });
    /**************************/ /* GAME CONTROL */ /**************************/ _globalVars.mySideMyFleet.classList.add("player0");
    playing === true && (_globalVars.enemySideMyFleet.style.pointerEvents = "none");
    [
        _globalVars.mySideEnemyFleet,
        _globalVars.enemySideMyFleet
    ].forEach((fleet)=>{
        fleet.addEventListener("click", function(e) {
            if (e.target.classList.contains("ship") || e.target.textContent !== "" || e.target.querySelector(".ship")?.classList.contains("ship")) return;
            console.log(fleet, "float");
            const turn = playing && fleet === _globalVars.enemySideMyFleet ? _globalVars.mySideEnemyFleet : _globalVars.enemySideMyFleet;
            playing && (turn.style.pointerEvents = "auto");
            playing && (fleet.style.pointerEvents = "none");
        });
    });
    /**************************/ /* SHOOTING LOGIC */ /**************************/ fleet.addEventListener("click", function(e) {
        e.preventDefault();
        console.log(playing, "lay");
        if (!playing || e.target.querySelector(".ship")?.classList.contains("ship")) {
            console.log("dropzone");
            return;
        }
        const miss = "&bull;";
        const addMarkToFleet = function(fleet) {
            if (e.target.classList[0] === "dropzone") return fleet.querySelector(`.${e.target.querySelector("div").classList[0]}`);
            else return fleet.querySelector(`.${e.target.classList[0]}`);
        };
        if (!e.target.closest(".ship") && e.target.textContent === "") {
            e.target.querySelector("div").classList.add("miss");
            e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);
            if (e.target.closest(".enemy-side--my-float")?.querySelector(`.${e.target.classList[0]}`)) {
                addMarkToFleet(_globalVars.mySideMyFleet).classList.add("miss");
                addMarkToFleet(_globalVars.mySideMyFleet).insertAdjacentHTML("afterbegin", miss);
            } else {
                addMarkToFleet(_globalVars.enemySideEnemyFleet).classList.add("miss");
                addMarkToFleet(_globalVars.enemySideEnemyFleet).insertAdjacentHTML("afterbegin", miss);
            }
        }
        if (e.target.closest(".ship")?.textContent === "") {
            const injuredShipPos = ships.findIndex((ship)=>{
                return ship?.coords?.includes(e.target.classList[0]);
            });
            e.target.classList.add("injure");
            const injure = "&cross;";
            e.target.insertAdjacentHTML("afterbegin", injure);
            const destroyedShipCoords = ships[injuredShipPos].coords.map((_, i)=>{
                return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`).nextElementSibling.classList.contains("injure");
            });
            if (e.target.closest(".enemy-side--my-float")?.querySelector(`.${e.target.classList[0]}`)) {
                addMarkToFleet(_globalVars.mySideMyFleet).nextElementSibling.insertAdjacentHTML("afterbegin", injure);
                addMarkToFleet(_globalVars.mySideMyFleet).nextElementSibling.classList.add("injure");
            } else {
                addMarkToFleet(_globalVars.enemySideEnemyFleet).nextElementSibling.insertAdjacentHTML("afterbegin", injure);
                addMarkToFleet(_globalVars.enemySideEnemyFleet).nextElementSibling.classList.add("injure");
            }
            if (!destroyedShipCoords.includes(false)) {
                const destroyedShip = ships[injuredShipPos].coords.map((_, i)=>{
                    return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`);
                });
                const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells.filter((cell)=>{
                    // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
                    return !ships[injuredShipPos].coords.includes(cell);
                }).map((cell, i)=>{
                    const cellAround = fleet.querySelector(`.${cell}`);
                    // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
                    cellAround && (cellAround.style.fontSize = "3.9rem");
                    const surroundDestroyedShip = function(fleet, cellAround) {
                        cellAround?.textContent === "" && fleet.querySelector(`.${cell}`)?.insertAdjacentHTML("afterbegin", miss);
                        !cellAround?.classList.contains("miss") && cellAround?.classList.add("cell-around");
                        cellAround && (cellAround.style.fontSize = "3.9rem");
                    };
                    const markContraryFleet = function(fleet) {
                        const cellAroundContrarySide = fleet.querySelector(`.${cell}`);
                        surroundDestroyedShip(fleet, cellAroundContrarySide);
                    };
                    e.target.closest(".ship").closest(".enemy-side--my-float") && markContraryFleet(_globalVars.mySideMyFleet);
                    e.target.closest(".ship").closest(".my-side--enemy-float") && markContraryFleet(_globalVars.enemySideEnemyFleet);
                    // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
                    surroundDestroyedShip(fleet, cellAround);
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
            if (fleet === _globalVars.mySideEnemyFleet) addNotification(player0);
            if (fleet !== _globalVars.mySideEnemyFleet) addNotification(player1);
            _globalVars.notificatonWindow.classList.remove("hidden");
            _globalVars.overlay.classList.remove("hidden");
            [
                _globalVars.mySideEnemyFleet,
                _globalVars.enemySideMyFleet
            ].forEach((fleet)=>playing && (fleet.style.pointerEvents = "none"));
        };
        const closeNotificationWindow = function() {
            _globalVars.notificatonWindow.classList.add("hidden");
            _globalVars.overlay.classList.add("hidden");
        };
        if (areAllShipsInjured) openNotificationWindow();
        _globalVars.btnCloseNotificationWindow.addEventListener("click", closeNotificationWindow);
        _globalVars.overlay.addEventListener("click", closeNotificationWindow);
        document.addEventListener("keydown", function(e) {
            // console.log(e.key);
            if (e.key === "Escape" && !_globalVars.notificatonWindow.classList.contains("hidden")) closeNotificationWindow();
        });
    });
};
[
    [
        _globalVars.mySideMyFleet,
        _globalVars.mySideMyShips,
        _globalVars.createMyShips
    ],
    [
        _globalVars.mySideEnemyFleet,
        _globalVars.mySideEnemyShips,
        _globalVars.createEnemyShips
    ],
    [
        _globalVars.enemySideEnemyFleet,
        _globalVars.enemySideEnemyShips,
        _globalVars.createEnemyShips
    ],
    [
        _globalVars.enemySideMyFleet,
        _globalVars.enemySideMyShips,
        _globalVars.createMyShips
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
 // Now I can manually place ships where I want and they will be duplicated and I can play as in the real game, but to set everything properly I first need to place right parts of ships together and if they will not be connected in the right way, then there will be a mess, so I need to find a condition which will help me in this situation.
 // Everything is working perfectly, there is no way you will start the game when you misplaced any of your ships, it will just not allow it! So, it's playable, but right now there is a big mess, so I need to clean it up and refactor the code :)
 // Current situation: all code in the controller and css is refactored, now the controller file contains about 670 lines of code, now it's time to divide it up to different files

},{"./globalVars":"gb5d6","./fleetEnvironment":"iXTJE"}],"gb5d6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bothSideShips", ()=>bothSideShips);
parcelHelpers.export(exports, "mySideMyFleet", ()=>mySideMyFleet);
parcelHelpers.export(exports, "mySideEnemyFleet", ()=>mySideEnemyFleet);
parcelHelpers.export(exports, "enemySideEnemyFleet", ()=>enemySideEnemyFleet);
parcelHelpers.export(exports, "enemySideMyFleet", ()=>enemySideMyFleet);
parcelHelpers.export(exports, "seas", ()=>seas);
parcelHelpers.export(exports, "notificatonWindow", ()=>notificatonWindow);
parcelHelpers.export(exports, "overlay", ()=>overlay);
parcelHelpers.export(exports, "btnCloseNotificationWindow", ()=>btnCloseNotificationWindow);
parcelHelpers.export(exports, "letters", ()=>letters);
parcelHelpers.export(exports, "seaFleet", ()=>seaFleet);
parcelHelpers.export(exports, "createMyShips", ()=>createMyShips);
parcelHelpers.export(exports, "createEnemyShips", ()=>createEnemyShips);
parcelHelpers.export(exports, "playing", ()=>playing);
parcelHelpers.export(exports, "mySideMyShips", ()=>mySideMyShips);
parcelHelpers.export(exports, "enemySideEnemyShips", ()=>enemySideEnemyShips);
parcelHelpers.export(exports, "mySideEnemyShips", ()=>mySideEnemyShips);
parcelHelpers.export(exports, "enemySideMyShips", ()=>enemySideMyShips);
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
let createMyShips = [
    [
        [
            "e1"
        ],
        1
    ],
    // [["j1"], ["e1"].length],
    // [["a3"], ["e1"].length],
    // [["h10"], ["e1"].length],
    // [["i7", "j7"], ["e6", "e7"].length],
    // [["a9", "a10"], ["e6", "e7"].length],
    [
        [
            "j9",
            "j10"
        ],
        2
    ],
    [
        [
            "a5",
            "a6",
            "a7"
        ],
        3
    ],
    // [["c8", "d8", "e8"], ["J4", "I4", "h4"].length],
    [
        [
            "c10",
            "d10",
            "e10",
            "f10"
        ],
        4
    ]
];
let createEnemyShips = [
    [
        [
            "a1"
        ],
        1
    ],
    // [["c1"], ["d10"].length],
    // [["e1"], ["d10"].length],
    // [["g1"], ["d10"].length],
    // [["i5", "j5"], ["e6", "e7"].length],
    // [["i7", "j7"], ["e6", "e7"].length],
    [
        [
            "i10",
            "h10"
        ],
        2
    ],
    // [["b4", "c4", "d4"], ["J4", "I4", "h4"].length],
    [
        [
            "a8",
            "a9",
            "a10"
        ],
        3
    ],
    [
        [
            "c10",
            "d10",
            "e10",
            "f10"
        ],
        4
    ]
];
let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];
let bothSideShips = [];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"iXTJE":[function(require,module,exports) {
var _globalVars = require("./globalVars");
const markup = _globalVars.seaFleet.map((item, i)=>`
    <tr class="row-${i + 1}">
<th>${item}</th>
 ${_globalVars.letters.map((letter)=>`<td class=" dropzone"><div class="${letter}${i + 1} cell" ></div></td>`).join("")}
</tr>
`).join("");
const markupSeaHead = ` ${_globalVars.seaFleet.map((_, i)=>{
    return i > 0 ? `<th>${_globalVars.letters[i]}</th>` : `<th></th> 
        <th>${_globalVars.letters[i]}</th>`;
}).join("")}`;
[
    _globalVars.mySideMyFleet,
    _globalVars.mySideEnemyFleet,
    _globalVars.enemySideEnemyFleet,
    _globalVars.enemySideMyFleet
].forEach((container)=>container.insertAdjacentHTML("afterbegin", markup));
console.log(`${_globalVars.mySideMyFleet.querySelector(".F10").classList[0]}`, "bomba");
[
    ..._globalVars.seas
].forEach((sea)=>sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead));

},{"./globalVars":"gb5d6"}]},["f0HGD","aenu9"], "aenu9", "parcelRequire3129")

//# sourceMappingURL=index.e37f48ea.js.map
