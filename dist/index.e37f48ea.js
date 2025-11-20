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
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _globalVarsJs = require("./globalVars.js");
var _makeShipsJs = require("./makeShips.js");
var _makeShipsJsDefault = parcelHelpers.interopDefault(_makeShipsJs);
var _fleetEnvironmentJs = require("./fleetEnvironment.js");
var _placeShipsManuallyJs = require("./placeShipsManually.js");
var _placeShipsManuallyJsDefault = parcelHelpers.interopDefault(_placeShipsManuallyJs);
var _gameStartControlJs = require("./gameStartControl.js");
var _shootingLogicJs = require("./shootingLogic.js");
var _shootingLogicJsDefault = parcelHelpers.interopDefault(_shootingLogicJs);
var _startNewGameJs = require("./startNewGame.js");
/**************************/ /* CREATE FLEET */ /**************************/ const createFleet = function(fleetParts) {
    const fleet = fleetParts[0];
    const newShipsCoords = fleetParts[2];
    fleet !== (0, _globalVarsJs.mySideEnemyFleet) && fleet !== (0, _globalVarsJs.enemySideMyFleet) && newShipsCoords.forEach((ship)=>{
        (0, _makeShipsJsDefault.default)(...ship, fleetParts);
    });
    let ships = fleetParts[1];
    console.log(fleetParts[1], "ships");
    console.log(fleet, "fleet");
    /**************************/ /* PLACING SHIPS MANUALLY */ /**************************/ (0, _placeShipsManuallyJsDefault.default)(fleet, fleetParts);
    /**************************/ /* GAME START CONTROL */ /**************************/ (0, _gameStartControlJs.gameStartControl)(fleet, fleetParts);
    /**************************/ /* GAME CONTROL */ /**************************/ // fleet !== mySideMyFleet &&
    //   fleet !== enemySideEnemyFleet &&
    //   gameControl(fleet);
    /**************************/ /* START NEW GAME */ /**************************/ (fleet === (0, _globalVarsJs.mySideMyFleet) || fleet === (0, _globalVarsJs.enemySideEnemyFleet)) && (0, _startNewGameJs.startNewGame)(fleet, fleetParts);
    /**************************/ /* SHOOTING LOGIC */ /**************************/ (0, _shootingLogicJsDefault.default)(fleet, ships);
};
[
    [
        (0, _globalVarsJs.mySideMyFleet),
        (0, _globalVarsJs.mySideMyShips),
        (0, _globalVarsJs.createMyShips)
    ],
    [
        (0, _globalVarsJs.mySideEnemyFleet),
        (0, _globalVarsJs.mySideEnemyShips),
        (0, _globalVarsJs.createEnemyShips)
    ],
    [
        (0, _globalVarsJs.enemySideEnemyFleet),
        (0, _globalVarsJs.enemySideEnemyShips),
        (0, _globalVarsJs.createEnemyShips)
    ],
    [
        (0, _globalVarsJs.enemySideMyFleet),
        (0, _globalVarsJs.enemySideMyShips),
        (0, _globalVarsJs.createMyShips)
    ]
].forEach((container, i)=>createFleet(container)); /**************************/  /* MY TASKS AND CONCLUSIONS DURING DEVELOPMENT(NOT FROM THE VERY BEGINNING) */  /**************************/  // The situation about now: I created right spicing rules, so now I would not be able to put one ship on the next or previos cell of another ship, so all ships are at least one cell away from each other
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
 // Part of the funtionality is already applied, now it's time to somehow link 2 fleets together
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
 // Now I will make "New game" button which will reset everything to the initial state
 // While trying to make new game functionality I run into problems connected with the code architecture so, I decided to refactor it again and it worked! Now the controller has only 75 lines of code and also 8 different files of js nicely splitted up and connected successfully. So now it can be the right time finally make the new game button work as intended
 // After long hours(actually quick) of work the new game button works perfectly, it's refactor time
 // Now all code is refactored and from all files there is only 1 if statement which isn't a guard clause because it contains guard clause itself
 // It would be a nice idea if the first player was choosed randomly, let's implement this
 // The first player will be chosen randomly and also some borders were added to the sea and nice animation effect was added to cells around a destroyed ship
 // Now I need the ships on all sides to look the same while playing
 // Try to refactor all big logical operators with helper function
 // All big groupings with logical operator are replaced with helper functions(which contain statements) and ternary operators
 // All imported variables are imported directly and not as an object which makes it more convenient to work with
 // Now the fleet which is waiting for the opponent is partly transparent which shows that it's your opponent turn
 // There can be added a feature of writing opponent names which will may be a nice touch to the game
 // Now opponents name can written or if not then a default name will be used instead. Right now players can offer start a new game and if both agreed then the new game will start, this work both as in the game and also after the game finished. There are also 2 button of ready to start action when you built your fleet and waiting when your opponent will be ready to play. Right now there is a big mess, so let's refactor it another time
 // All code is refactored, a lot of things are tested, and probably somewhere something isn't right, but when I start to test it again and again and then I change one thing which can be a reason and after that I cannot find that bug
 // Binoculars feature implemented, the secret bug from previous writing is found and fixed, gameplay with arrow keys was done but then removed(too much control of another opponent with just a keyboard)
 // Improved sea-container, now it's time to implement timer feature in which every player will be given 30 sec to make a shot
 // Where should the timer implementation be? Probably game control
 // When it should start and stop?
 // When game starts, the timer starts, when move is done the timer restarts, when timer finished the game is lost
 // Where should I put the timer?
 // The timer feature is working quite well, now it's time of refactoring
 // Unexpected bug with 4-sized ship is fixed, the code is refactored, now it's time think about the next step
 // Binoculars feature:
 // 1. When you destroyed a ship for which destruction there should be an award in a kind of magic video camera then for 10 seconds hovering effect on ships will be different from hovering effect on empty cells
 // If destroyed ship has reward class then add binoculars to the fleet on which that ship was destroyed, but before I need randomly add this reward class to the ship in the beginning of the game
 // Take all ship's classes and assign one of them to the ship
 // Design is improved and probably will stay the same, now it's time to write some instructions about the game rules
 // All instructions are written and look good, now it's time to place buttons and inputs to the right places
 // The app is finished in relation to features. All functionalities and features are 100% complete(at least till the moment I find a bug or two 😄). Now it's time of big refactoring
 // All code is refactored and right now I am writing comments for my code

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./globalVars.js":"gb5d6","./makeShips.js":"8mnMH","./fleetEnvironment.js":"iXTJE","./placeShipsManually.js":"3iktl","./gameStartControl.js":"fXv0K","./shootingLogic.js":"6WpIw","./startNewGame.js":"hGRP7"}],"gkKU3":[function(require,module,exports) {
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

},{}],"gb5d6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bothSideShips", ()=>bothSideShips);
parcelHelpers.export(exports, "mySideMyFleet", ()=>mySideMyFleet);
parcelHelpers.export(exports, "mySideEnemyFleet", ()=>mySideEnemyFleet);
parcelHelpers.export(exports, "enemySideEnemyFleet", ()=>enemySideEnemyFleet);
parcelHelpers.export(exports, "enemySideMyFleet", ()=>enemySideMyFleet);
parcelHelpers.export(exports, "seas", ()=>seas);
parcelHelpers.export(exports, "seaContainers", ()=>seaContainers);
parcelHelpers.export(exports, "notificatonWindow1", ()=>notificatonWindow1);
parcelHelpers.export(exports, "notificatonWindow2", ()=>notificatonWindow2);
parcelHelpers.export(exports, "btnCloseNotificationWindow1", ()=>btnCloseNotificationWindow1);
parcelHelpers.export(exports, "btnCloseNotificationWindow2", ()=>btnCloseNotificationWindow2);
parcelHelpers.export(exports, "newGameBtn1", ()=>newGameBtn1);
parcelHelpers.export(exports, "newGameBtn2", ()=>newGameBtn2);
parcelHelpers.export(exports, "startGameBtn1", ()=>startGameBtn1);
parcelHelpers.export(exports, "startGameBtn2", ()=>startGameBtn2);
parcelHelpers.export(exports, "changeUsernameBtn1", ()=>changeUsernameBtn1);
parcelHelpers.export(exports, "changeUsernameBtn2", ()=>changeUsernameBtn2);
parcelHelpers.export(exports, "username1Input", ()=>username1Input);
parcelHelpers.export(exports, "username2Input", ()=>username2Input);
parcelHelpers.export(exports, "menuBtnsContainer1", ()=>menuBtnsContainer1);
parcelHelpers.export(exports, "menuBtnsContainer2", ()=>menuBtnsContainer2);
parcelHelpers.export(exports, "playerUsername1", ()=>playerUsername1);
parcelHelpers.export(exports, "playerUsername2", ()=>playerUsername2);
parcelHelpers.export(exports, "errorMessage1", ()=>errorMessage1);
parcelHelpers.export(exports, "errorMessage2", ()=>errorMessage2);
parcelHelpers.export(exports, "inputUsernameLabel2", ()=>inputUsernameLabel2);
parcelHelpers.export(exports, "submitUsername2", ()=>submitUsername2);
parcelHelpers.export(exports, "inputUsernameLabel1", ()=>inputUsernameLabel1);
parcelHelpers.export(exports, "submitUsername1", ()=>submitUsername1);
parcelHelpers.export(exports, "letters", ()=>letters);
parcelHelpers.export(exports, "seaFleet", ()=>seaFleet);
parcelHelpers.export(exports, "allTimers", ()=>allTimers);
parcelHelpers.export(exports, "waitingForOpponentLabel1", ()=>waitingForOpponentLabel1);
parcelHelpers.export(exports, "waitingForOpponentLabel2", ()=>waitingForOpponentLabel2);
parcelHelpers.export(exports, "createMyShips", ()=>createMyShips);
parcelHelpers.export(exports, "createEnemyShips", ()=>createEnemyShips);
parcelHelpers.export(exports, "mySideMyShips", ()=>mySideMyShips);
parcelHelpers.export(exports, "enemySideEnemyShips", ()=>enemySideEnemyShips);
parcelHelpers.export(exports, "mySideEnemyShips", ()=>mySideEnemyShips);
parcelHelpers.export(exports, "enemySideMyShips", ()=>enemySideMyShips);
parcelHelpers.export(exports, "resultsMessage1", ()=>resultsMessage1);
parcelHelpers.export(exports, "resultsMessage2", ()=>resultsMessage2);
parcelHelpers.export(exports, "player1", ()=>player1);
parcelHelpers.export(exports, "player2", ()=>player2);
parcelHelpers.export(exports, "lowerLetters", ()=>lowerLetters);
parcelHelpers.export(exports, "duration", ()=>duration);
parcelHelpers.export(exports, "lottieSplash", ()=>lottieSplash);
var _shipMakeHelpersJs = require("./shipMakeHelpers.js");
// FLEET ENVIRONMENT
const mySideMyFleet = document.querySelector(".my-side--my-fleet");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-fleet");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-fleet");
const enemySideMyFleet = document.querySelector(".enemy-side--my-fleet");
const seaContainers = document.querySelectorAll(".sea-container");
const seas = document.querySelectorAll(".sea");
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
const lowerLetters = letters.map((letter)=>letter.toLowerCase());
const seaFleet = Array.from({
    length: 10
}, (_, i)=>i + 1);
const startGameBtn1 = document.querySelector(".fleet-1");
const startGameBtn2 = document.querySelector(".fleet-2");
const player1 = document.querySelector(".username-1").textContent;
const player2 = document.querySelector(".username-2").textContent;
const allTimers = [
    ...document.querySelectorAll(".timer-label")
];
const waitingForOpponentLabel1 = document.querySelector(".waiting-opponent-1");
const waitingForOpponentLabel2 = document.querySelector(".waiting-opponent-2");
const errorMessage1 = document.querySelector(".error-message-1");
const errorMessage2 = document.querySelector(".error-message-2");
let createMyShips = [
    [
        [
            "d1"
        ],
        1
    ],
    [
        [
            "f1"
        ],
        1
    ],
    [
        [
            "h1"
        ],
        1
    ],
    [
        [
            "j1"
        ],
        1
    ],
    [
        [
            "a5",
            "b5"
        ],
        2
    ],
    [
        [
            "d5",
            "e5"
        ],
        2
    ],
    [
        [
            "b3",
            "c3",
            "d3"
        ],
        3
    ],
    [
        [
            "g4",
            "h4"
        ],
        2
    ],
    [
        [
            "c7",
            "d7",
            "e7"
        ],
        3
    ],
    [
        [
            "c9",
            "d9",
            "e9",
            "f9"
        ],
        4
    ]
];
let readyEnemyShips = [];
let createShipCount = 0;
function createShip({ randomRange, randomLetterRangeProp, size }) {
    createShipCount++;
    console.log("createShipCountrand", createShipCount);
    const checkFleetBusiness = readyEnemyShips?.flatMap((coord)=>coord?.toLowerCase());
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const randomNumberForLetter = Math.floor(Math.random() * 10);
    const randomLetter = lowerLetters[randomNumberForLetter];
    const randomFromRange = (0, _shipMakeHelpersJs.randomNumberFromRange)(randomRange[0], randomRange[1]);
    const randomLetterRange = (0, _shipMakeHelpersJs.randomLetterFun)(randomLetterRangeProp[0], randomLetterRangeProp[1]);
    // Is horizontal or not
    const isHorizontal = Math.random() < 0.5;
    const isTop = Math.random() < 0.5;
    const isRight = Math.random() < 0.5;
    const randomCoordByNumber = randomLetter + randomFromRange;
    const randomCoordByLetter = randomLetterRange + randomNumber;
    if (isHorizontal) console.log("randomCoordbyLetter", randomCoordByLetter);
    if (!isHorizontal) console.log("randomCoordByNumber", randomCoordByNumber);
    let firstCoord, secondCoord, thirdCoord, fourthCoord;
    if (!isHorizontal && isTop) {
        firstCoord = randomCoordByNumber;
        secondCoord = randomLetter + (randomFromRange - 1);
        thirdCoord = randomLetter + (randomFromRange - 2);
        fourthCoord = randomLetter + (randomFromRange - 3);
    }
    if (!isHorizontal && !isTop) {
        firstCoord = randomCoordByNumber;
        secondCoord = randomLetter + (randomFromRange + 1);
        thirdCoord = randomLetter + (randomFromRange + 2);
        fourthCoord = randomLetter + (randomFromRange + 3);
    }
    if (isHorizontal && isRight) {
        firstCoord = randomCoordByLetter;
        secondCoord = lowerLetters[lowerLetters.indexOf(randomLetterRange) + 1] + randomNumber;
        thirdCoord = lowerLetters[lowerLetters.indexOf(randomLetterRange) + 2] + randomNumber;
        fourthCoord = lowerLetters[lowerLetters.indexOf(randomLetterRange) + 3] + randomNumber;
    }
    if (isHorizontal && !isRight) {
        firstCoord = randomCoordByLetter;
        secondCoord = lowerLetters[lowerLetters.indexOf(randomLetterRange) - 1] + randomNumber;
        thirdCoord = lowerLetters[lowerLetters.indexOf(randomLetterRange) - 2] + randomNumber;
        fourthCoord = lowerLetters[lowerLetters.indexOf(randomLetterRange) - 3] + randomNumber;
    }
    if (size === 1) {
        const oneCellShipWithSurroundings = [
            firstCoord,
            ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                coord: firstCoord,
                lowerLetters,
                top: "top",
                bottom: "bottom",
                right: "right",
                left: "left",
                topLeft: "topLeft",
                topRight: "topRight",
                bottomLeft: "bottomLeft",
                bottomRight: "bottomRight"
            })
        ];
        const isShipDangerous = (0, _shipMakeHelpersJs.checkShipSafety)(oneCellShipWithSurroundings, checkFleetBusiness);
        if (isShipDangerous) return (0, _shipMakeHelpersJs.remakeShip)(randomRange, randomLetterRangeProp, size, createShip);
        readyEnemyShips = [
            ...readyEnemyShips,
            firstCoord
        ];
        console.log("readyEnemeyShipsrand", readyEnemyShips);
        return [
            [
                firstCoord
            ],
            oneCellShipWithSurroundings
        ];
    }
    if (size === 2) {
        let twoCellShipWithSurroundings;
        if (isHorizontal && isRight) {
            console.log("Horizontal and Rightrand", firstCoord);
            twoCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    bottom: "bottom",
                    left: "left",
                    topLeft: "topLeft",
                    bottomLeft: "bottomLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    topRight: "topRight",
                    bottomRight: "bottomRight"
                })
            ];
        }
        if (isHorizontal && !isRight) {
            console.log("Horizontal and Leftrand", firstCoord);
            twoCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    topRight: "topRight",
                    bottomRight: "bottomRight"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    bottom: "bottom",
                    left: "left",
                    topLeft: "topLeft",
                    bottomLeft: "bottomLeft"
                })
            ];
            console.log("superLeftrand", twoCellShipWithSurroundings);
        }
        if (!isHorizontal && isTop) {
            console.log("Vertical and Toprand", firstCoord);
            twoCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                // First coord
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    bottomRight: "bottomRight",
                    bottom: "bottom",
                    left: "left",
                    right: "right",
                    bottomLeft: "bottomLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    left: "left",
                    right: "right",
                    topRight: "topRight",
                    topLeft: "topLeft"
                })
            ];
        }
        if (!isHorizontal && !isTop) {
            console.log("Vertical and Bottomrand", firstCoord);
            twoCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    left: "left",
                    right: "right",
                    topRight: "topRight",
                    topLeft: "topLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    bottomRight: "bottomRight",
                    bottom: "bottom",
                    left: "left",
                    right: "right",
                    bottomLeft: "bottomLeft"
                })
            ];
        }
        console.log("checkFleetForBusinessrand", checkFleetBusiness);
        const isShipDangerous = (0, _shipMakeHelpersJs.checkShipSafety)(twoCellShipWithSurroundings, checkFleetBusiness);
        if (isShipDangerous) return (0, _shipMakeHelpersJs.remakeShip)(randomRange, randomLetterRangeProp, size, createShip);
        readyEnemyShips = [
            ...readyEnemyShips,
            firstCoord,
            secondCoord
        ];
        console.log(firstCoord, secondCoord, "randcoords");
        console.log("readyEnemeyShipsrand", readyEnemyShips);
        return [
            [
                firstCoord,
                secondCoord
            ]
        ];
    }
    if (size === 3) {
        let threeCellShipWithSurroundings;
        if (isHorizontal && isRight) {
            console.log("Horizontal and Rightrand", firstCoord);
            threeCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    bottom: "bottom",
                    left: "left",
                    topLeft: "topLeft",
                    bottomLeft: "bottomLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    bottom: "bottom"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    topRight: "topRight",
                    bottomRight: "bottomRight"
                })
            ];
        }
        if (isHorizontal && !isRight) {
            console.log("Horizontal and Leftrand", firstCoord);
            threeCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    topRight: "topRight",
                    bottomRight: "bottomRight"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    bottom: "bottom"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    top: "top",
                    bottom: "bottom",
                    left: "left",
                    topLeft: "topLeft",
                    bottomLeft: "bottomLeft"
                })
            ];
        }
        if (!isHorizontal && isTop) {
            console.log("Vertical and Toprand", firstCoord);
            threeCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    bottomRight: "bottomRight",
                    bottom: "bottom",
                    left: "left",
                    right: "right",
                    bottomLeft: "bottomLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    left: "left",
                    right: "right"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    top: "top",
                    left: "left",
                    right: "right",
                    topRight: "topRight",
                    topLeft: "topLeft"
                })
            ];
        }
        if (!isHorizontal && !isTop) {
            console.log("Vertical and Bottomrand", firstCoord);
            threeCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    left: "left",
                    right: "right",
                    topRight: "topRight",
                    topLeft: "topLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    left: "left",
                    right: "right"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    bottomRight: "bottomRight",
                    bottom: "bottom",
                    left: "left",
                    right: "right",
                    bottomLeft: "bottomLeft"
                })
            ];
        }
        console.log("checkFleetForBusinessrand", checkFleetBusiness);
        const isShipDangerous = (0, _shipMakeHelpersJs.checkShipSafety)(threeCellShipWithSurroundings, checkFleetBusiness);
        if (isShipDangerous) return (0, _shipMakeHelpersJs.remakeShip)(randomRange, randomLetterRangeProp, size, createShip);
        readyEnemyShips = [
            ...readyEnemyShips,
            firstCoord,
            secondCoord,
            thirdCoord
        ];
        return [
            [
                firstCoord,
                secondCoord,
                thirdCoord
            ]
        ];
    }
    if (size === 4) {
        // size 4
        let fourCellShipWithSurroundings;
        if (isHorizontal && isRight) {
            console.log("Horizontal and Rightrand", firstCoord);
            fourCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                fourthCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    bottom: "bottom",
                    left: "left",
                    topLeft: "topLeft",
                    bottomLeft: "bottomLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    bottom: "bottom"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    top: "top",
                    bottom: "bottom"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: fourthCoord,
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    topRight: "topRight",
                    bottomRight: "bottomRight"
                })
            ];
        }
        if (isHorizontal && !isRight) {
            console.log("Horizontal and Leftrand", firstCoord);
            fourCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                fourthCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    topRight: "topRight",
                    bottomRight: "bottomRight"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    top: "top",
                    bottom: "bottom"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    top: "top",
                    bottom: "bottom"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: fourthCoord,
                    top: "top",
                    bottom: "bottom",
                    left: "left",
                    topLeft: "topLeft",
                    bottomLeft: "bottomLeft"
                })
            ];
        }
        if (!isHorizontal && isTop) {
            console.log("Vertical and Toprand", firstCoord);
            fourCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                fourthCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    bottomRight: "bottomRight",
                    bottom: "bottom",
                    left: "left",
                    right: "right",
                    bottomLeft: "bottomLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    left: "left",
                    right: "right"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    left: "left",
                    right: "right"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: fourthCoord,
                    top: "top",
                    left: "left",
                    right: "right",
                    topRight: "topRight",
                    topLeft: "topLeft"
                })
            ];
        }
        if (!isHorizontal && !isTop) {
            console.log("Vertical and Bottomrand", firstCoord);
            fourCellShipWithSurroundings = [
                firstCoord,
                secondCoord,
                thirdCoord,
                fourthCoord,
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: firstCoord,
                    top: "top",
                    left: "left",
                    right: "right",
                    topRight: "topRight",
                    topLeft: "topLeft"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: secondCoord,
                    left: "left",
                    right: "right"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: thirdCoord,
                    left: "left",
                    right: "right"
                }),
                ...(0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters,
                    coord: fourthCoord,
                    bottomRight: "bottomRight",
                    bottom: "bottom",
                    left: "left",
                    right: "right",
                    bottomLeft: "bottomLeft"
                })
            ];
        }
        console.log("checkFleetForBusinessrand", checkFleetBusiness);
        const isShipDangerous = (0, _shipMakeHelpersJs.checkShipSafety)(fourCellShipWithSurroundings, checkFleetBusiness);
        if (isShipDangerous) return (0, _shipMakeHelpersJs.remakeShip)(randomRange, randomLetterRangeProp, size, createShip);
        readyEnemyShips = [
            ...readyEnemyShips,
            firstCoord,
            secondCoord,
            thirdCoord,
            fourthCoord
        ];
        return [
            [
                firstCoord,
                secondCoord,
                thirdCoord,
                fourthCoord
            ]
        ];
    }
}
const [fourCellShip] = createShip?.({
    randomRange: [
        4,
        7
    ],
    randomLetterRangeProp: [
        "d",
        "g"
    ],
    size: 4
});
const [fourCellShipTwo] = createShip?.({
    randomRange: [
        4,
        7
    ],
    randomLetterRangeProp: [
        "d",
        "g"
    ],
    size: 4
});
const [threeCellShipOne] = createShip?.({
    randomRange: [
        3,
        8
    ],
    randomLetterRangeProp: [
        "c",
        "h"
    ],
    size: 3
});
const [threeCellShipTwo] = createShip?.({
    randomRange: [
        3,
        8
    ],
    randomLetterRangeProp: [
        "c",
        "h"
    ],
    size: 3
});
const [twoCellShipOne] = createShip?.({
    randomRange: [
        2,
        9
    ],
    randomLetterRangeProp: [
        "b",
        "i"
    ],
    size: 2
});
const [twoCellShipTwo] = createShip?.({
    randomRange: [
        2,
        9
    ],
    randomLetterRangeProp: [
        "b",
        "i"
    ],
    size: 2
});
const [twoCellShipThree] = createShip?.({
    randomRange: [
        2,
        9
    ],
    randomLetterRangeProp: [
        "b",
        "i"
    ],
    size: 2
});
const [oneCellShipOne] = createShip?.({
    randomRange: [
        1,
        10
    ],
    randomLetterRangeProp: [
        "a",
        "j"
    ],
    size: 1
});
const [oneCellShipTwo] = createShip?.({
    randomRange: [
        1,
        10
    ],
    randomLetterRangeProp: [
        "a",
        "j"
    ],
    size: 1
});
const [oneCellShipThree] = createShip?.({
    randomRange: [
        1,
        10
    ],
    randomLetterRangeProp: [
        "a",
        "j"
    ],
    size: 1
});
const [oneCellShipFour] = createShip?.({
    randomRange: [
        1,
        10
    ],
    randomLetterRangeProp: [
        "a",
        "j"
    ],
    size: 1
});
// const [twoCellShipThree] = createShip?.({
//   randomRange: [2, 9],
//   randomLetterRangeProp: ["b", "i"],
//   size: 2,
// });
createShipCount = 0;
// }
// Make it flat and check whether we have a new coord there or not, and if yes then we regenerate a random number again and stuff again, top and bottom do all coords, and right and left do only the side coords
let createEnemyShips = [
    [
        oneCellShipOne,
        oneCellShipOne.length
    ],
    [
        oneCellShipTwo,
        oneCellShipTwo.length
    ],
    [
        oneCellShipThree,
        oneCellShipThree.length
    ],
    [
        oneCellShipFour,
        oneCellShipFour.length
    ],
    [
        twoCellShipOne,
        twoCellShipOne.length
    ],
    [
        twoCellShipTwo,
        twoCellShipTwo.length
    ],
    [
        twoCellShipThree,
        twoCellShipThree.length
    ],
    [
        threeCellShipOne,
        threeCellShipOne.length
    ],
    [
        threeCellShipTwo,
        threeCellShipTwo.length
    ],
    [
        fourCellShip,
        fourCellShip.length
    ]
];
let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];
let bothSideShips = [];
// NOTIFICATION WINDOW
const notificatonWindow1 = document.querySelector(".notification-window.player-1");
const notificatonWindow2 = document.querySelector(".notification-window.player-2");
const resultsMessage1 = document.querySelector(".results-message");
const resultsMessage2 = document.querySelector(".results-message-2");
const btnCloseNotificationWindow1 = document.querySelector(".close-notification-window");
const btnCloseNotificationWindow2 = document.querySelector(".close-notification-window-2");
// const overlay = document.querySelector(".overlay");
// MENU BUTTONS
const menuBtnsContainer1 = document.querySelector(".menu-btns-container-1");
const menuBtnsContainer2 = document.querySelector(".menu-btns-container-2");
const playerUsername1 = document.querySelector(".player-username-1");
const playerUsername2 = document.querySelector(".player-username-2");
const newGameBtn1 = document.querySelector(".new-game-btn.player-1");
const newGameBtn2 = document.querySelector(".new-game-btn.player-2");
const changeUsernameBtn1 = document.querySelector(".change-username-btn-1");
const changeUsernameBtn2 = document.querySelector(".change-username-btn-2");
// FILL USERNAME FORM
const username1Input = document.querySelector(".fill-username--player-1");
const username2Input = document.querySelector(".fill-username--player-2");
const inputUsernameLabel2 = document.querySelector(".your-name-2");
const inputUsernameLabel1 = document.querySelector(".your-name-1");
const submitUsername1 = document.querySelector(".submit-username--fleet-1");
const submitUsername2 = document.querySelector(".submit-username--fleet-2");
const duration = {
    duration: 0
};
const lottieSplash = {
    waterSplash: ""
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./shipMakeHelpers.js":"2URfe"}],"2URfe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "randomNumberFromRange", ()=>randomNumberFromRange);
parcelHelpers.export(exports, "randomLetterFun", ()=>randomLetterFun);
parcelHelpers.export(exports, "checkShipSafety", ()=>checkShipSafety);
parcelHelpers.export(exports, "remakeShip", ()=>remakeShip);
parcelHelpers.export(exports, "generateSurroundingFields", ()=>generateSurroundingFields);
function randomNumberFromRange(min, max) {
    // min ≤ result ≤ max  (both inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomLetterFun(min, max) {
    const start = min.charCodeAt(0);
    const end = max.charCodeAt(0);
    const code = Math.floor(Math.random() * (end - start + 1)) + start;
    return String.fromCharCode(code).toLowerCase();
}
function checkShipSafety(fullShipWithSurroundings, checkFleetBusiness) {
    console.log("fullShipWithSurroundingsrand", fullShipWithSurroundings, fullShipWithSurroundings.filter((coord)=>typeof coord === "string").filter((coord)=>checkFleetBusiness.find((point)=>point?.toLowerCase() === coord?.toLowerCase())).length);
    return fullShipWithSurroundings.filter((coord)=>typeof coord === "string").filter((coord)=>checkFleetBusiness.find((point)=>point === coord)).length;
}
function remakeShip(randomRange, randomLetterRangeProp, size, createShip) {
    const [ship, shipWithSurroundings] = createShip?.({
        randomRange,
        randomLetterRangeProp,
        size
    });
    return [
        ship,
        shipWithSurroundings
    ];
}
function generateSurroundingFields({ coord, lowerLetters, top, bottom, left, right, topRight, topLeft, bottomRight, bottomLeft }) {
    let shipSurroundings = [];
    function isCoordNumberLegit(coordNumber) {
        if (coordNumber < 1 || coordNumber > 10) return false;
        return true;
    }
    if (top) {
        if (isCoordNumberLegit(Number(coord.slice(1)) - 1)) shipSurroundings = [
            coord.slice(0, 1) + (Number(coord.slice(1)) - 1)
        ];
    }
    if (bottom) {
        if (isCoordNumberLegit(Number(coord.slice(1)) + 1)) shipSurroundings = [
            ...shipSurroundings,
            coord.slice(0, 1) + (Number(coord.slice(1)) + 1)
        ];
    }
    if (left) shipSurroundings = [
        ...shipSurroundings,
        lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] + Number(coord.slice(1))
    ];
    if (right) shipSurroundings = [
        ...shipSurroundings,
        lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] + Number(coord.slice(1))
    ];
    if (topLeft) {
        if (isCoordNumberLegit(Number(coord.slice(1)) - 1)) shipSurroundings = [
            ...shipSurroundings,
            lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] + (Number(coord.slice(1)) - 1)
        ];
    }
    if (topRight) {
        if (isCoordNumberLegit(Number(coord.slice(1)) - 1)) shipSurroundings = [
            ...shipSurroundings,
            lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] + (Number(coord.slice(1)) - 1)
        ];
    }
    if (bottomLeft) {
        if (isCoordNumberLegit(Number(coord.slice(1)) + 1)) shipSurroundings = [
            ...shipSurroundings,
            lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] + (Number(coord.slice(1)) + 1)
        ];
    }
    if (bottomRight) {
        if (isCoordNumberLegit(Number(coord.slice(1)) + 1)) shipSurroundings = [
            ...shipSurroundings,
            lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] + (Number(coord.slice(1)) + 1)
        ];
    }
    // shipSurroundings = [
    //   // Top and Bottom
    //   coord.slice(0, 1) + (Number(coord.slice(1)) + 1),
    //   coord.slice(0, 1) + (Number(coord.slice(1)) - 1),
    //   // Right top and bottom
    //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
    //     (Number(coord.slice(1)) - 1),
    //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
    //     (Number(coord.slice(1)) + 1),
    //   // Left and Right
    //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
    //     Number(coord.slice(1)),
    //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) + 1] +
    //     Number(coord.slice(1)),
    //   // Left top and bottom
    //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
    //     (Number(coord.slice(1)) - 1),
    //   lowerLetters[lowerLetters.indexOf(coord.slice(0, 1)) - 1] +
    //     (Number(coord.slice(1)) + 1),
    // ];
    return shipSurroundings;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8mnMH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(coords, size, fleetParts) {
        const fleet = fleetParts[0];
        const ships = fleetParts[1];
        const letters = _globalVarsJs.letters;
        const bigCoords = coords?.map((coord)=>{
            return coord.toUpperCase();
        });
        // if (bigCoords === undefined) {
        //   return;
        // }
        // Check whether two or more ships were placed in the same cell, which is impossible now, but during development was
        const checkSpace = fleetParts[1]?.map((ship, i)=>{
            return ship?.coords?.some((coord)=>{
                return bigCoords.includes(coord);
            });
        });
        if (checkSpace.includes(true)) {
            console.log("Place your ships in the right way\uD83C\uDF6D");
            return false;
        }
        // Check if your ship was placed on the neighbour cells of other ships which is against the rules
        const checkSpaceAround = fleetParts[1].map((ship)=>{
            return ship?.unavailabeCells?.some((cell)=>{
                if (bigCoords.includes(cell)) console.log(`You cannot place your ship on ${cell} because it's around another ship. Find a better place to drop an anchor \u{1F602}`);
                return bigCoords.includes(cell);
            });
        });
        if (checkSpaceAround.includes(true)) return false;
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
        console.log(columnShip);
        // Defining if ship parts connected in the right way, or probably one part is in the cell which is diagonally opposite to another part of the same ship
        if (columnShip.length !== 1 && rowShip.length !== 1) {
            console.log("Place your ships in the right order, man \uD83D\uDD7A");
            return false;
        }
        // Checks whether every ship is whole or not
        const checkShipsWholesomness = function() {
            if (fleet === _globalVarsJs.mySideMyFleet || fleet === _globalVarsJs.enemySideEnemyFleet) return;
            const checkShipsWholesomness = coords.map((coord, i)=>{
                const cellAttributes = (0, _helpersJs.selectCellsAround)(coord);
                // Condition checks all ships which have more then one part and every coord of that ship should contain at least one of the coords to the right, left, top or bottom and if not this means that this ship doesn't have all parts connected one after another
                if (coords.length > 1 && !coords.includes(letters[cellAttributes.letterAround] + (cellAttributes.coordSlice1 - 1)) && !coords.includes(letters[cellAttributes.letterAround] + (+cellAttributes.coordSlice1 + 1)) && !coords.includes(letters[cellAttributes.letterAround - 1] + cellAttributes.coordSlice1) && !coords.includes(letters[cellAttributes.letterAround + 1] + cellAttributes.coordSlice1)) return false;
            });
            if (checkShipsWholesomness.includes(false)) {
                console.log(ships, "ships");
                console.log("Place your ships in the right order, man \uD83E\uDD38\u200D\u2642\uFE0F");
                return false;
            }
        };
        if (checkShipsWholesomness() === false) return false;
        // Computing all cells around damaged ship part
        const cellsAround = bigCoords.reduce((acc, coord, i)=>{
            fleet.querySelector(`.${coord}`)?.classList.add("ship");
            const cellAttributes = (0, _helpersJs.selectCellsAround)(coord);
            const coordSlice01 = cellAttributes.coordSlice01;
            const coordSlice1 = cellAttributes.coordSlice1;
            const letterAround = cellAttributes.letterAround;
            const previousCell = cellAttributes.previousCell;
            const nextCell = cellAttributes.nextCell;
            const rightCell = cellAttributes.rightCell;
            const leftCell = cellAttributes.leftCell;
            const diagonalCells = function(number1, number2) {
                return letters[letterAround + number1] + (+coordSlice1 + number2);
            };
            const rightTopCell = diagonalCells(1, -1);
            const leftTopCell = diagonalCells(-1, -1);
            const leftBottomCell = diagonalCells(-1, 1);
            const rightBottomCell = diagonalCells(1, 1);
            return acc += `, ${previousCell}, ${nextCell}, ${leftCell} ,${rightCell} ,${rightTopCell} ,${leftTopCell} ,${leftBottomCell} ,${rightBottomCell}`;
        }, "");
        // Every ship part contains 8 cells around and if ship has more than 1 part this means that cells will be repeated and because of this here by creating a set I get rid of duplicate coordinates, but there are also coords on which ship parts themselves are placed, so, they will be taken care of later
        const readyCellsAround = [
            ...new Set(cellsAround.replace(",", "").split(",").map((cell)=>cell.trim()).filter((cell)=>letters.includes(cell.slice(0, 1))))
        ];
        console.log(bigCoords, "bigCoords");
        bigCoords.forEach((pos)=>{
            const shipPartEl = fleet.querySelector(`.${pos}`);
            if (shipPartEl) {
                shipPartEl.classList.add("ship-color");
                shipPartEl.textContent = size;
            }
            // This is needed for placement reasons, of course a better idea is not to have this at all, but it is as it is
            fleet.querySelector(`.${pos}`)?.insertAdjacentHTML("beforebegin", `<div class="${pos} cell"></div`);
        });
        const ship = {
            coords: bigCoords,
            size: size,
            unavailabeCells: readyCellsAround,
            direction: [
                ...new Set(sameNumber)
            ].length > [
                ...new Set(sameLetter)
            ].length ? "column" : "row"
        };
        ships.push(ship);
        // Paint similar ships with different colors
        if (fleet === _globalVarsJs.mySideMyFleet || fleet === _globalVarsJs.enemySideEnemyFleet) {
            const twoCellShips = ships.filter((ship)=>{
                return ship.size === 2;
            });
            twoCellShips.forEach((ship, index)=>{
                ship.coords.forEach((coord, i)=>{
                    index === 0 && (fleet.querySelector(`.${coord}`).nextElementSibling.style.backgroundColor = "#22b8cf");
                    index === 1 && (fleet.querySelector(`.${coord}`).nextElementSibling.style.backgroundColor = "#12b886");
                });
            });
            const threeCellShips = ships.filter((ship)=>{
                return ship.size === 3;
            });
            threeCellShips.forEach((ship, index)=>{
                ship.coords.forEach((coord, i)=>{
                    index === 0 && (fleet.querySelector(`.${coord}`).nextElementSibling.style.backgroundColor = "#cc5de8");
                });
            });
        }
        console.log(ships, "ships");
    });
var _globalVarsJs = require("./globalVars.js");
var _helpersJs = require("./helpers.js");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./globalVars.js":"gb5d6","./helpers.js":"hGI1E"}],"hGI1E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timer", ()=>timer);
parcelHelpers.export(exports, "buildShipBorder", ()=>buildShipBorder);
parcelHelpers.export(exports, "getSeaOpacityBack", ()=>getSeaOpacityBack);
parcelHelpers.export(exports, "closeNotificationWindow1", ()=>closeNotificationWindow1);
parcelHelpers.export(exports, "closeNotificationWindow2", ()=>closeNotificationWindow2);
parcelHelpers.export(exports, "allowForbidClick", ()=>allowForbidClick);
parcelHelpers.export(exports, "timerClock", ()=>timerClock);
parcelHelpers.export(exports, "startTimer", ()=>startTimer);
parcelHelpers.export(exports, "selectCellsAround", ()=>selectCellsAround);
parcelHelpers.export(exports, "openUsernameForm", ()=>openUsernameForm);
parcelHelpers.export(exports, "closeUsernameForm", ()=>closeUsernameForm);
parcelHelpers.export(exports, "sleep", ()=>sleep);
var _configJs = require("./config.js");
var _gameStartControlJs = require("./gameStartControl.js");
var _globalVarsPauseJs = require("./globalVarsPause.js");
var _showEndResultsJs = require("./showEndResults.js");
var _showEndResultsJsDefault = parcelHelpers.interopDefault(_showEndResultsJs);
let timer;
const buildShipBorder = function(borderParts) {
    const ship = borderParts[0];
    const coord = borderParts[1];
    const i = borderParts[2];
    const arr = borderParts[3];
    const addBorder = borderParts[4];
    const color = borderParts[5] && borderParts[5];
    console.log(ship);
    ship.direction === "column" ? i === 0 && addBorder("borderTop", coord, color) : i === 0 && addBorder("borderLeft", coord, color);
    ship.direction === "column" ? i === arr.length - 1 && addBorder("borderBottom", coord, color) : i === arr.length - 1 && addBorder("borderRight", coord, color);
    ship.direction === "column" ? addBorder("borderLeft", coord, color) : addBorder("borderTop", coord, color);
    ship.direction === "column" ? addBorder("borderRight", coord, color) : addBorder("borderBottom", coord, color);
};
const getSeaOpacityBack = function() {
    [
        ...document.querySelectorAll(".sea")
    ].forEach((sea)=>{
        sea.style.opacity = "1";
    });
};
const closeNotificationWindow1 = function() {
    (0, _globalVarsPauseJs.notificatonWindow1).classList.add("hidden");
// overlay.classList.add("hidden");
};
const closeNotificationWindow2 = function() {
    (0, _globalVarsPauseJs.notificatonWindow2).classList.add("hidden");
// overlay.classList.add("hidden");
};
const allowForbidClick = function(fleet, state) {
    fleet.style.pointerEvents = state;
};
const timerClock = function(time, labelTimer) {
    // Define number of minutes
    const min = String(Math.trunc(time / (0, _configJs.SECONDS_IN_MINUTE))).padStart(2, 0);
    // Define number of seconds
    const sec = String(Math.trunc(time % (0, _configJs.SECONDS_IN_MINUTE))).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    return `${min}:${sec}`;
};
const startTimer = function(fleet, newGame = false) {
    // When new game starts timer stops
    if (newGame) {
        clearInterval(timer);
        return;
    }
    // Every time when turn changes I need to clear the previous timer because it won't go by itself
    if (timer) {
        console.log(timer);
        clearInterval(timer);
    }
    const contraryFleet = fleet === (0, _globalVarsPauseJs.enemySideMyFleet) ? (0, _globalVarsPauseJs.mySideMyFleet) : (0, _globalVarsPauseJs.enemySideEnemyFleet);
    const timeLeftLabel = fleet.closest(".sea-container").querySelector(".timer-label");
    const timeContraryLeftLabel = contraryFleet.closest(".sea-container").querySelector(".timer-label");
    const labelTimer = fleet.closest(".sea-container").querySelector(".timer-time");
    timeLeftLabel.style.opacity = "100";
    const labelContraryTimer = contraryFleet.closest(".sea-container").querySelector(".timer-time");
    timeContraryLeftLabel.style.opacity = "100";
    const tick = function() {
        labelContraryTimer.textContent = timerClock(time, labelTimer);
        if (time === 0) {
            console.log((0, _gameStartControlJs.playingCheck).playing, "play", time);
            const fleetSide = fleet === (0, _globalVarsPauseJs.mySideEnemyFleet) ? (0, _globalVarsPauseJs.enemySideMyFleet) : (0, _globalVarsPauseJs.mySideEnemyFleet);
            clearInterval(timer);
            timeLeftLabel.style.opacity = "0";
            console.log(fleet, "fleet");
            (0, _showEndResultsJsDefault.default)(fleetSide, true);
        }
        time--;
    };
    let time = (0, _configJs.TIME_LENGTHS).shotTime;
    tick();
    // The function is called every second
    timer = setInterval(tick, 1000);
};
const selectCellsAround = function(cell) {
    const coordSlice01 = cell.slice(0, 1);
    const coordSlice1 = cell.slice(1);
    const letterAround = (0, _globalVarsPauseJs.letters).indexOf(coordSlice01);
    const previousCell = coordSlice01 + (+coordSlice1 - 1);
    const nextCell = coordSlice01 + (+coordSlice1 + 1);
    const rightCell = (0, _globalVarsPauseJs.letters)[letterAround + 1] + coordSlice1;
    const leftCell = (0, _globalVarsPauseJs.letters)[letterAround - 1] + coordSlice1;
    return {
        coordSlice01,
        coordSlice1,
        letterAround,
        previousCell,
        nextCell,
        rightCell,
        leftCell
    };
};
const toggleUsernameForm = function(fleet, display) {
    const fleetIsMySideMyFleet = fleet === (0, _globalVarsPauseJs.mySideMyFleet);
    // Shows and hides items when it's required
    (fleetIsMySideMyFleet ? [
        (0, _globalVarsPauseJs.username1Input),
        (0, _globalVarsPauseJs.inputUsernameLabel1),
        (0, _globalVarsPauseJs.submitUsername1)
    ] : [
        (0, _globalVarsPauseJs.username2Input),
        (0, _globalVarsPauseJs.inputUsernameLabel2),
        (0, _globalVarsPauseJs.submitUsername2)
    ]).forEach((item)=>{
        console.log(item.style.display);
        item.style.display = display;
    });
    const changeDisplayState = function(state, toggleMethod) {
        if (fleetIsMySideMyFleet) {
            (0, _globalVarsPauseJs.changeUsernameBtn1).style.display = state;
            (0, _globalVarsPauseJs.newGameBtn1).style.display = state;
            (0, _globalVarsPauseJs.playerUsername1)?.classList[toggleMethod]("data");
        }
        if (!fleetIsMySideMyFleet) {
            (0, _globalVarsPauseJs.changeUsernameBtn2).style.display = state;
            (0, _globalVarsPauseJs.newGameBtn2).style.display = state;
            (0, _globalVarsPauseJs.playerUsername2)?.classList[toggleMethod]("data");
        }
    };
    if (display !== "flex") changeDisplayState("flex", "add");
    if (display === "flex") changeDisplayState("none", "remove");
};
const openUsernameForm = function(fleet, display) {
    toggleUsernameForm(fleet, display);
};
const closeUsernameForm = function(fleet, display) {
    toggleUsernameForm(fleet, display);
};
function sleep(timeInMilliseconds) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, timeInMilliseconds);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./config.js":"k5Hzs","./gameStartControl.js":"fXv0K","./globalVarsPause.js":"bAcK9","./showEndResults.js":"2csmh"}],"k5Hzs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AMOUNT_OF_DESTROYERS", ()=>AMOUNT_OF_DESTROYERS);
parcelHelpers.export(exports, "MIN_INPUT_LENGTH", ()=>MIN_INPUT_LENGTH);
parcelHelpers.export(exports, "NEW_GAME_AGREEMENT_COMPLETE_LENGTH", ()=>NEW_GAME_AGREEMENT_COMPLETE_LENGTH);
parcelHelpers.export(exports, "BOTH_FLEETS_READY_COMPLETE_LENGTH", ()=>BOTH_FLEETS_READY_COMPLETE_LENGTH);
parcelHelpers.export(exports, "IN_BETWEEN_SHIP_PART_LENGTH", ()=>IN_BETWEEN_SHIP_PART_LENGTH);
parcelHelpers.export(exports, "SECONDS_IN_MINUTE", ()=>SECONDS_IN_MINUTE);
parcelHelpers.export(exports, "APPEAR_TIME", ()=>APPEAR_TIME);
parcelHelpers.export(exports, "TIME_LENGTHS", ()=>TIME_LENGTHS);
const AMOUNT_OF_DESTROYERS = 4;
const MIN_INPUT_LENGTH = 2;
const NEW_GAME_AGREEMENT_COMPLETE_LENGTH = 2;
const BOTH_FLEETS_READY_COMPLETE_LENGTH = 2;
const IN_BETWEEN_SHIP_PART_LENGTH = 4;
const SECONDS_IN_MINUTE = 60;
const APPEAR_TIME = 100;
const TIME_LENGTHS = {
    shotTime: 15,
    bonusTime: 5
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fXv0K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "playingCheck", ()=>playingCheck);
parcelHelpers.export(exports, "bothFleetsReady", ()=>bothFleetsReady);
parcelHelpers.export(exports, "newGameAgreement", ()=>newGameAgreement);
parcelHelpers.export(exports, "whoseTurn", ()=>whoseTurn);
parcelHelpers.export(exports, "gameStartControl", ()=>gameStartControl);
var _configJs = require("./config.js");
var _globalVarsJs = require("./globalVars.js");
var _helpersJs = require("./helpers.js");
var _shootingLogicJs = require("./shootingLogic.js");
var _makeShipsJs = require("./makeShips.js");
var _makeShipsJsDefault = parcelHelpers.interopDefault(_makeShipsJs);
// Shows the current state of the game
const playingCheck = {
    playing: false
};
const whoseTurn = {
    turn: ""
};
// Helps to define whether both sides built their fleets and ready to start or not
let bothFleetsReady = [];
// Helpes to define whether both sides agree to start a new game or not
let newGameAgreement = [];
// This variable is for random number to define who will be the first to start the game
let firstTurn;
// Helps to define whether all ships are placed in the right way or not
let checkCells;
const gameStartControl = function(fleet, fleetParts) {
    const fleetIsEnemySideMyFleet = fleet === (0, _globalVarsJs.enemySideMyFleet);
    const startPlaying = function() {
        playingCheck.playing = false;
        // Reset newGameAgreement
        newGameAgreement.splice(0);
        fleet === (0, _globalVarsJs.mySideEnemyFleet) && (firstTurn = Math.random());
        // Right now this isn't necessary because the button just disappers after being clicked
        (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.startGameBtn1) : (0, _globalVarsJs.startGameBtn2)).setAttribute("disabled", true);
        (0, _helpersJs.allowForbidClick)(fleet, "none");
        console.log(fleet);
        // Finds all ship parts and takes their coords
        const findCell = function(cell) {
            return `${(fleetIsEnemySideMyFleet ? (0, _globalVarsJs.mySideMyFleet) : (0, _globalVarsJs.enemySideEnemyFleet)).querySelector(`.${cell}`)?.classList[0]}`;
        };
        let createFleetShips = [
            [
                [
                    findCell("cell1")
                ],
                1
            ],
            [
                [
                    findCell("cell2")
                ],
                1
            ],
            [
                [
                    findCell("cell3")
                ],
                1
            ],
            [
                [
                    findCell("cell4")
                ],
                1
            ],
            [
                [
                    findCell("cell8"),
                    findCell("cell9")
                ],
                2
            ],
            [
                [
                    findCell("cell10"),
                    findCell("cell11")
                ],
                2
            ],
            [
                [
                    findCell("cell12"),
                    findCell("cell13")
                ],
                2
            ],
            [
                [
                    findCell("cell5"),
                    findCell("cell6"),
                    findCell("cell7")
                ],
                3
            ],
            [
                [
                    findCell("cell14"),
                    findCell("cell15"),
                    findCell("cell16")
                ],
                3
            ],
            [
                [
                    findCell("cell17"),
                    findCell("cell18"),
                    findCell("cell19"),
                    findCell("cell20")
                ],
                4
            ]
        ];
        let enemyUpperCaseShips = (0, _globalVarsJs.createEnemyShips).map((el)=>{
            const properArray = [
                el[0].map((coord)=>coord.toUpperCase()),
                el[1]
            ];
            return properArray;
        });
        let createMoreShips = enemyUpperCaseShips;
        //  [
        //   [[findCell("cell1")], [0].length],
        //   [[findCell("cell2")], [0].length],
        //   [[findCell("cell3")], [0].length],
        //   [[findCell("cell7")], [0].length],
        //   [[findCell("cell13"), findCell("cell14")], [0, 0].length],
        //   [[findCell("cell17"), findCell("cell18")], [0, 0].length],
        //   [[findCell("cell19"), findCell("cell20")], [0, 0].length],
        //   [
        //     [findCell("cell4"), findCell("cell5"), findCell("cell6")],
        //     [0, 0, 0].length,
        //   ],
        //   [
        //     [findCell("cell12"), findCell("cell15"), findCell("cell16")],
        //     [0, 0, 0].length,
        //   ],
        //   [
        //     [
        //       findCell("cell8"),
        //       findCell("cell9"),
        //       findCell("cell10"),
        //       findCell("cell11"),
        //     ],
        //     [0, 0, 0, 0].length,
        //   ],
        // ];
        const createManuallyPlacedShips = function(createSource, ships) {
            // Reset previous ships
            ships.splice(0);
            // When fleet is built before manually placing ships, coords are sorted, but when one ship part moved to another place then ships coords may be messed up and so I sorted them again
            let sortCoords = createSource.map((ship)=>{
                // ship contains fleet, coords, size and direction
                const sortedLeters = ship[0].map((coord)=>{
                    return coord.slice(0, 1);
                }).sort();
                const sortedNumbers = ship[0].map((coord)=>{
                    return coord.slice(1);
                }).sort((a, b)=>a - b);
                const sortedCoords = ship[0].map((coord, i)=>{
                    return sortedLeters[i] + sortedNumbers[i];
                });
                console.log(sortedCoords);
                if ((0, _makeShipsJsDefault.default)(sortedCoords, ship[1], fleetParts) === false) return false;
                // This part is required to keep 4-cell ships whole because unlike other ships when this ships divided into 2 part then condition when at least 1 cell to the right, left, top and bottom still will be fulfilled
                if (sortedCoords.length === 4) {
                    const inBetweenShipParts = sortedCoords.filter((cell, i, arr)=>{
                        return i !== 0 && i !== arr.length - 1;
                    });
                    // Here is a similar idea as before, but here the ship is whole only if in between ship parts have 2 neighbour ship parts each which will be checked later and based on that it will be defined whether the ship is whole or not
                    checkCells = inBetweenShipParts.map((cell)=>{
                        const cellAttrbs = (0, _helpersJs.selectCellsAround)(cell);
                        const selectCell = function(cell) {
                            // Only cells which contain ships have nextElementSibling
                            return fleet.querySelector(`.${cell}`)?.nextElementSibling;
                        };
                        return [
                            selectCell(cellAttrbs.previousCell),
                            selectCell(cellAttrbs.nextCell),
                            selectCell(cellAttrbs.rightCell),
                            selectCell(cellAttrbs.leftCell)
                        ];
                    }).map((cellArr)=>{
                        return cellArr.filter((cellEl)=>{
                            return cellEl && cellEl;
                        });
                    });
                }
            });
            // if (fleet === mySideEnemyFleet || fleet === enemySideEnemyFleet) {
            //   sortCoords = sortCoords.map((coord) =>
            //     coord === false ? undefined : coord
            //   );
            //   checkCells = [
            //     [true, true],
            //     [true, true],
            //   ];
            // }
            console.log("checksells", checkCells);
            return sortCoords;
        };
        const checkProperShipPlacement = function() {
            const resetWrongShipPlacement = function() {
                console.log("Place your ships in the right way, \uD83D\uDC12");
                (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.startGameBtn1) : (0, _globalVarsJs.startGameBtn2)).removeAttribute("disabled", true);
                (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.errorMessage1) : (0, _globalVarsJs.errorMessage2)).style.opacity = "100";
                [
                    ...fleet.querySelectorAll("td")
                ].forEach((cell)=>{
                    cell.querySelector(".ship")?.remove();
                    cell.removeAttribute("style");
                    cell.querySelector(".cell").textContent = "";
                }), // Clear ships arr
                fleetParts[1].splice(0);
                return false;
            };
            if (// The function call depends on what fleet is current one and later it checks whether 4-cell ship is whole or not
            createManuallyPlacedShips(fleetIsEnemySideMyFleet ? createFleetShips : createMoreShips, fleetIsEnemySideMyFleet ? (0, _globalVarsJs.enemySideMyShips) : (0, _globalVarsJs.mySideEnemyShips)).includes(false) || checkCells?.flat(2).length !== (0, _configJs.IN_BETWEEN_SHIP_PART_LENGTH)) return resetWrongShipPlacement();
        };
        if (checkProperShipPlacement() === false) {
            console.log("Yeah, that is wrong");
            return;
        }
        const ships = fleetParts[1];
        // If ships were placed in the right way this means that the fleet is ready to play and ships are pushed in the arr bellow
        (0, _globalVarsJs.bothSideShips).push(ships);
        // If ships were placed in the wrong way and the "Ready to start" button was pressed, then an error message bellow the grid will appear showing that ship placement is wrong. But if after that ships were placed in the right way then after pressing the button that error message will be gone
        (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.errorMessage1) : (0, _globalVarsJs.errorMessage2)).style.opacity = "0";
        // If code execution reaches this place, this means that ships were placed in the right way and player is ready to play
        bothFleetsReady.push(true);
        (0, _helpersJs.allowForbidClick)(fleetIsEnemySideMyFleet ? (0, _globalVarsJs.mySideMyFleet) : (0, _globalVarsJs.enemySideEnemyFleet), "none");
        // Filtering out one-cell ships
        const destroyers = ships.filter((ship)=>{
            const shipEl = fleet.querySelector(`.${ship.coords[0]}`);
            return ship.coords.length === 1;
        });
        // Randomly define which destroyer will contain reward
        const rewardDestroyer = Math.trunc(Math.random() * (0, _configJs.AMOUNT_OF_DESTROYERS)) + 1;
        // Assign reward
        destroyers.forEach((destroyer, i)=>{
            i + 1 === rewardDestroyer && fleet.querySelector(`.${destroyer.coords[0]}`).nextElementSibling.classList.add("reward");
        });
        const addBorder = function(borderSide, coord) {
            const fleetSide = fleetIsEnemySideMyFleet ? (0, _globalVarsJs.mySideMyFleet) : (0, _globalVarsJs.enemySideEnemyFleet);
            fleetSide && (fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[borderSide] = "2px solid  #22b8cf");
        };
        if (bothFleetsReady.length === 1) {
            (fleet === (0, _globalVarsJs.mySideEnemyFleet) ? (0, _globalVarsJs.enemySideEnemyFleet) : (0, _globalVarsJs.mySideMyFleet)).querySelectorAll(".ship").forEach((ship)=>{
                ship.classList.remove("ship-color");
                ship.textContent = "";
                ship.style.backgroundColor = "#e6fcf5";
            });
            fleet.querySelectorAll(".ship").forEach((ship)=>{
                ship.textContent = "";
            // ship.style.backgroundColor = "#e6fcf5";
            });
        }
        [
            ...document.querySelectorAll(".ship")
        ].forEach((shipEl)=>{
            bothFleetsReady.length === 2 && (shipEl.textContent = "");
        });
        // Changes background-color of ships of the player who pressed "Ready to start" button the second
        bothFleetsReady.length === (0, _configJs.BOTH_FLEETS_READY_COMPLETE_LENGTH) && [
            (0, _globalVarsJs.mySideMyFleet),
            (0, _globalVarsJs.enemySideEnemyFleet)
        ].forEach((fleet)=>{
            fleet.querySelectorAll(`.ship`).forEach((ship)=>{
                ship.style.backgroundColor = "#e6fcf5";
            });
        });
        ships.map((ship, i)=>{
            ship.coords.map((coord, i, arr)=>{
                // Once player is ready to start, border will be built on ships
                (0, _helpersJs.buildShipBorder)([
                    ship,
                    coord,
                    i,
                    arr,
                    addBorder
                ]);
            });
        });
        // All actions relative to your own fleet are finished, so there are left thing to do with the second sea part
        if (fleet !== (0, _globalVarsJs.mySideEnemyFleet) && fleet !== (0, _globalVarsJs.enemySideMyFleet)) return;
        /* fleet === mySideEnemyFleet && bothSideShips.push("mySideEnemyFleet");

    fleetIsEnemySideMyFleet && bothSideShips.push("enemySideMyFleet"); */ const flattenedBothSideShips = (0, _globalVarsJs.bothSideShips).flat(2);
        console.log(flattenedBothSideShips, "both");
        (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.startGameBtn1) : (0, _globalVarsJs.startGameBtn2)).style.display = "none";
        // When your opponent is ready to play, you will see a message informing about that
        (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.waitingForOpponentLabel1) : (0, _globalVarsJs.waitingForOpponentLabel2)).style.opacity = "100";
        // If both player are ready to play then informing messages will disappear
        if (flattenedBothSideShips.length === createFleetShips.length * 2 /* + 2 */ ) [
            (0, _globalVarsJs.waitingForOpponentLabel1),
            (0, _globalVarsJs.waitingForOpponentLabel2)
        ].forEach((label)=>{
            label.style.opacity = "0";
        });
        console.log(flattenedBothSideShips);
        if (// The condition which fulfillment shows that ships were placed in the right way
        flattenedBothSideShips.length === createFleetShips.length * 2 /* + 2 &&
      flattenedBothSideShips.includes("mySideEnemyFleet") &&
      flattenedBothSideShips.includes("enemySideMyFleet") */ ) {
            [
                (0, _globalVarsJs.changeUsernameBtn1),
                (0, _globalVarsJs.changeUsernameBtn2)
            ].forEach((btn)=>{
                btn.setAttribute("disabled", true);
            });
            (0, _helpersJs.closeUsernameForm)((0, _globalVarsJs.mySideMyFleet), "none");
            (0, _helpersJs.closeUsernameForm)((0, _globalVarsJs.enemySideEnemyFleet), "none");
            playingCheck.playing = true;
            console.log("Game started \uD83E\uDD70");
            const audio = document.getElementById("halloween");
            audio.loop = true;
            audio.volume = 0.4;
            audio.currentTime = 0;
            audio.play();
            console.log(playingCheck.playing, "playing");
            // lottieSplash.waterSplash = new DotLottie({
            //   container: document.getElementById("dotlottie-canvas"),
            //   src: "https://lottie.host/b2c16b47-ffa0-49df-ad07-bd4e918a6254/jzIHDnTf5u.lottie",
            //   loop: false,
            //   autoplay: true,
            // });
            // Disable right-click
            document.addEventListener("contextmenu", (e)=>e.preventDefault());
            function ctrlShiftKey(e, key) {
                return e.ctrlKey && e.shiftKey && e.key === key.charCodeAt(0);
            }
            document.onkeydown = (e)=>{
                // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
                if (e.key === 123 || ctrlShiftKey(e, "I") || ctrlShiftKey(e, "J") || ctrlShiftKey(e, "C") || e.ctrlKey && e.key === "U".charCodeAt(0)) return false;
            };
            // Making sure that I will not destroy my own ship ;)
            (0, _helpersJs.allowForbidClick)((0, _globalVarsJs.mySideMyFleet), "none");
            (0, _helpersJs.allowForbidClick)((0, _globalVarsJs.enemySideEnemyFleet), "none");
        }
        if (!playingCheck.playing) return;
        (0, _helpersJs.getSeaOpacityBack)();
        const defineFirstTurn = function(fleet, contraryFleet) {
            whoseTurn.turn = fleet;
            (0, _helpersJs.allowForbidClick)(fleet, "auto");
            (0, _helpersJs.startTimer)(fleet);
            if (whoseTurn.turn === (0, _globalVarsJs.enemySideMyFleet) && fleet === (0, _globalVarsJs.enemySideMyFleet)) (0, _shootingLogicJs.computerShotHandler)();
            contraryFleet.closest(".sea").style.opacity = "0.7";
        };
        if (fleet === (0, _globalVarsJs.mySideEnemyFleet) || fleet === (0, _globalVarsJs.enemySideMyFleet)) {
            firstTurn < 0.5 && defineFirstTurn((0, _globalVarsJs.mySideEnemyFleet), (0, _globalVarsJs.enemySideMyFleet));
            if (firstTurn >= 0.5) defineFirstTurn((0, _globalVarsJs.enemySideMyFleet), (0, _globalVarsJs.mySideEnemyFleet));
        }
        [
            (0, _globalVarsJs.newGameBtn1),
            (0, _globalVarsJs.newGameBtn2)
        ].forEach((btn)=>{
            btn.removeAttribute("disabled", true);
        });
    };
    fleet !== (0, _globalVarsJs.mySideMyFleet) && fleet !== (0, _globalVarsJs.enemySideEnemyFleet) && (fleetIsEnemySideMyFleet ? (0, _globalVarsJs.startGameBtn1) : (0, _globalVarsJs.startGameBtn2)).addEventListener("click", startPlaying);
    function sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    // Computer is ready to play in 5 seconds
    setTimeout(async function() {
        (0, _globalVarsJs.startGameBtn2).click();
    }, 5000);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./makeShips.js":"8mnMH","./config.js":"k5Hzs","./globalVars.js":"gb5d6","./helpers.js":"hGI1E","./shootingLogic.js":"6WpIw"}],"6WpIw":[function(require,module,exports) {
/* eslint-disable no-unused-vars */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet, ships) {
        const shootingLogic = function(e) {
            e.preventDefault();
            // Here are possible 2 options: first is that this variable will be a truthy value because it will successfully select desired element, but second options is that this value will be undefined. So, both of this values make it enough to select the right cell. For example if my opponent shot in a cell of enemySideMyFleet which is his side then that spot will be selected because it happened on his side, but if I shot a cell of mySideEnemyFleet then it will be undefined because closest method will not find enemySideMyFleet in mySideEnemyFleet, so, which means that this is the second option and a cell of mySideEnemyFleet will be chosen when this variable will be used
            const selectChosenCell = e.target.closest(".enemy-side--my-fleet")?.querySelector(`.${e.target.classList[0]}`);
            // e.target.addEventListener("click", () => {
            // });
            // console.log(e.target, "target");
            const addMarkToFleet = function(fleet) {
                // If the first condition is true this means that the shot missed and reached dropzone containing empty cell
                if (e.target.classList[0] === "dropzone") {
                    const audio = document.getElementById("water-splash");
                    audio.currentTime = 0;
                    audio.play();
                    return fleet.querySelector(`.${e.target.querySelector("div").classList[0]}`);
                }
                // If this is true then this means that the shot damaged a ship
                if (e.target.classList[0] !== "dropzone") {
                    const audio = document.getElementById("fun-explosion");
                    audio.currentTime = 0;
                    audio.play();
                    console.log("fleet.querySelector(`.${e.target.classList[0]}`", fleet.querySelector(`.${e.target.classList[0]}`));
                    return fleet.querySelector(`.${e.target.classList[0]}`);
                }
            };
            const containsShip = !(0, _gameStartControlJs.playingCheck).playing || e.target.querySelector(".ship")?.classList.contains("ship");
            // If I made a shot in dropzone containing ship instead of ship itself then this will not count and you can shoot again. This is done this way to make it simplier to select empty cell inside of dropzone which doesn't contain a ship
            if (containsShip) {
                console.log("dropzone");
                return;
            }
            const miss = "&#x1F30A;";
            const whoseFleet = fleet === (0, _globalVarsJs.mySideEnemyFleet) ? (0, _globalVarsJs.enemySideEnemyFleet) : (0, _globalVarsJs.mySideMyFleet);
            // Removing visual indicators to last missed field in all 4 sea containers
            if (fleet === (0, _globalVarsJs.mySideEnemyFleet) && e.target.textContent === "") {
                (0, _globalVarsJs.mySideEnemyFleet).querySelector(".last-shot")?.classList.remove("last-shot");
                (0, _globalVarsJs.enemySideEnemyFleet).querySelector(".last-shot")?.classList.remove("last-shot");
            }
            if (fleet === (0, _globalVarsJs.enemySideMyFleet) && e.target.textContent === "") {
                (0, _globalVarsJs.mySideMyFleet).querySelector(".last-shot")?.classList.remove("last-shot");
                (0, _globalVarsJs.enemySideMyFleet).querySelector(".last-shot")?.classList.remove("last-shot");
            }
            // Adding visual indicators to last missed field in all 4 sea containers
            // For missed fields
            if (e.target.classList.contains("dropzone") && e.target.textContent === "") {
                e.target.querySelector(".cell").classList.add("last-shot");
                whoseFleet.querySelector(`.${e.target.querySelector("div").classList[0]}`).classList.add("last-shot");
            }
            // For shipped fields
            if (e.target.classList[0] !== "dropzone" && e.target.textContent === "") {
                e.target.classList.add("last-shot");
                whoseFleet.querySelector(`.${e.target.classList[0]}`).nextElementSibling?.classList.add("last-shot");
            }
            const addMissMark = function() {
                if (e.target.textContent !== "") return;
                // This and a piece of code below add a class and insert textContent in the fleet which was clicked
                e.target.querySelector("div").classList.add("miss");
                e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);
                // These 2 if-statements basically do the same thing as above but duplicating this to the second sea part
                if (selectChosenCell) {
                    addMarkToFleet((0, _globalVarsJs.mySideMyFleet)).classList.add("miss");
                    addMarkToFleet((0, _globalVarsJs.mySideMyFleet)).insertAdjacentHTML("afterbegin", miss);
                }
                if (!selectChosenCell) {
                    addMarkToFleet((0, _globalVarsJs.enemySideEnemyFleet)).classList.add("miss");
                    addMarkToFleet((0, _globalVarsJs.enemySideEnemyFleet)).insertAdjacentHTML("afterbegin", miss);
                }
            };
            // Calls the function when player misses ship
            !e.target.closest(".ship") && addMissMark();
            // If cell in which you shot is already marked then code execution will stop here because the code below marks damaged ships which is already done at this point if target is a marked ship part and if not then the cell was already marked as missed which means that textContent of the target is already not empty in these cases
            if (e.target.textContent !== "") {
                console.log(e.target);
                console.log("You already shot that cell or you missed");
                return;
            }
            const injuredShipPartPos = ships.findIndex((ship)=>{
                // Find ship index in the ships arr which was damaged
                return ship?.coords?.includes(e.target.classList[0]);
            });
            console.log(ships);
            e.target.classList.add("injure");
            const injure = "&cross;";
            // e.target.insertAdjacentHTML("afterbegin", injure);
            // A nice neat trick when you don't need empty string but you also don't need it to be filled with something visible, so you just add empty space
            e.target.textContent = " ";
            // Checks whether ship is only damaged or destroyed completely
            const destroyedShipCoords = ships[injuredShipPartPos].coords.map((_, i)=>{
                return fleet.querySelector(`.${ships[injuredShipPartPos]?.coords[i]}`).nextElementSibling.classList.contains("injure");
            });
            // Duplicate damage mark on the second sea part
            if (selectChosenCell) {
                addMarkToFleet((0, _globalVarsJs.mySideMyFleet)).nextElementSibling.classList.add("injure");
                // When a ship is damaged or destroyed then timer refreshes
                (0, _helpersJs.startTimer)(fleet);
            }
            if (!selectChosenCell) {
                addMarkToFleet((0, _globalVarsJs.enemySideEnemyFleet)).nextElementSibling.classList.add("injure");
                (0, _helpersJs.startTimer)(fleet);
            }
            if (destroyedShipCoords.includes(false)) console.log("");
            else {
                const explosion = document.getElementById("explosion");
                explosion.currentTime = 0;
                explosion.play();
            // audio.currentTime = 0;
            // audio.play();
            }
            // If ships is destroyed completely it's time to add border to it, but if not then execution stops here
            if (destroyedShipCoords.includes(false)) return;
            const addBorder = function(borderSide, coord, color = "#FA5252") {
                const selectTd = function(fleetSide) {
                    fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[borderSide] = `2px solid ${color} `;
                };
                selectTd(fleet);
                // Select tds for adding border to ships of the second sea part
                selectTd(fleet === (0, _globalVarsJs.enemySideMyFleet) ? (0, _globalVarsJs.mySideMyFleet) : (0, _globalVarsJs.enemySideEnemyFleet));
            };
            ships[injuredShipPartPos].coords.map((coord, i, arr)=>{
                (0, _helpersJs.buildShipBorder)([
                    ships[injuredShipPartPos],
                    coord,
                    i,
                    arr,
                    addBorder
                ]);
                // Code below if-statement will be executed only for 1-cell ships
                if (ships[injuredShipPartPos].coords.length !== 1) return;
            // Check whether 1-cell ship contains reward class or not
            // const rewardShip = fleet
            //   .querySelector(`.${coord}`)
            //   .nextElementSibling.classList.contains("reward");
            // if (!rewardShip) {
            //   return;
            // }
            // Adds special class which is necessary for reward feature
            // fleet.classList.add("binoculars");
            // const labelBinocularsReward = fleet
            //   .closest(".sea-container")
            //   .querySelector(".binoculars-reward-label");
            // const labelTimer = fleet
            //   .closest(".sea-container")
            //   .querySelector(".timer");
            // labelBinocularsReward.style.opacity = "100";
            // const tick = function () {
            //   timerClock(time, labelTimer);
            //   if (time === 0) {
            //     clearInterval(timer);
            //     labelBinocularsReward.style.opacity = "0";
            //     fleet.classList.remove("binoculars");
            //     console.log("Magic video camera removed");
            //   }
            //   time--;
            // };
            // let time = TIME_LENGTHS.bonusTime;
            // tick();
            // This will make timer
            // const timer = setInterval(tick, 1000);
            });
            const filledAreaAroundShip = ships[injuredShipPartPos].unavailabeCells.filter((cell)=>{
                // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
                return !ships[injuredShipPartPos].coords.includes(cell);
            }).filter((cell)=>{
                return fleet.querySelector(`.${cell}`)?.textContent === "";
            }).map((cell, i)=>{
                const cellAround = fleet.querySelector(`.${cell}`);
                // console.log(cellAround, "cellAround");
                // There is also can be an imaginary 11th cell when it comes to bottom ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
                // cellAround && (cellAround.style.fontSize = "3.2rem");
                const surroundDestroyedShip = function(fleet, cellAround) {
                    const surroundSign = "&#x1F4A7";
                    cellAround?.textContent === "" && fleet.querySelector(`.${cell}`)?.insertAdjacentHTML("afterbegin", surroundSign);
                    /*   fleet
              .querySelector(`.${cell}`)
              ?.insertAdjacentHTML("afterbegin", miss); */ !cellAround?.classList.contains("miss") && cellAround?.classList.add("cell-around");
                    // cellAround && (cellAround.style.fontSize = "3.2rem");
                    cellAround.style.visibility = "hidden";
                    // This is done for nice animation effect
                    setTimeout(function() {
                        cellAround.style.visibility = "visible";
                    }, i * (0, _configJs.APPEAR_TIME));
                };
                const markContraryFleet = function(fleet) {
                    const cellAroundContrarySide = fleet.querySelector(`.${cell}`);
                    surroundDestroyedShip(fleet, cellAroundContrarySide);
                };
                e.target.closest(".ship").closest(".enemy-side--my-fleet") && markContraryFleet((0, _globalVarsJs.mySideMyFleet));
                e.target.closest(".ship").closest(".my-side--enemy-fleet") && markContraryFleet((0, _globalVarsJs.enemySideEnemyFleet));
                // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
                surroundDestroyedShip(fleet, cellAround);
            });
            /**************************/ /* CONTROLLING THE END OF THE GAME */ /**************************/ (0, _showEndResultsJsDefault.default)(fleet);
        };
        fleet.addEventListener("click", function(e) {
            if (e.target.textContent === "" && !e.target.classList.contains("miss") && !e.target.classList.contains("cell-around")) {
                const audio = document.getElementById("cannon");
                audio.currentTime = 0;
                audio.play();
            }
            let rect = e.target.getBoundingClientRect();
            // loadImage("../img/sea-icon-heavy.jpg");
            // if (e.target.classList.contains("dropzone")) {
            //   console.log("New animation is being loaded", new Date().getSeconds());
            //   splash = document.createElement("canvas");
            //   splash.id = "dotlottie-canvas";
            //   splash.className = "lottie-water-splash";
            //   document.body.appendChild(splash);
            //   lottieSplash.waterSplash = new DotLottie({
            //     canvas: document.querySelector("#dotlottie-canvas"),
            //     src: "https://lottie.host/b2c16b47-ffa0-49df-ad07-bd4e918a6254/jzIHDnTf5u.lottie",
            //     loop: false,
            //     autoplay: false,
            //   });
            // }
            if (fleet === (0, _globalVarsJs.enemySideMyFleet)) {
                if (e.target.classList[0] === "dropzone") rect = (0, _globalVarsJs.mySideMyFleet).querySelector(`.${e.target.querySelector(".cell")?.classList[0]}`).getBoundingClientRect();
                if (e.target.classList.contains("ship")) {
                    console.log("e.target", e.target);
                    rect = (0, _globalVarsJs.mySideMyFleet).querySelector(`.${e.target?.classList[0]}`).closest(".dropzone").getBoundingClientRect();
                }
            }
            console.log("rect", rect);
            // launchBombTo(e.clientX, e.clientY);
            if (e.target.textContent === "" && !e.target.classList.contains("miss") && !e.target.classList.contains("cell-around")) launchBombTo(rect.left + rect.width / 2, rect.top + rect.height / 2, fleet, e.target);
            setTimeout(function() {
                // if (fleet === mySideEnemyFleet || fleet === enemySideMyFleet)
                (0, _gameControlJs.gameControlHandler)(e, fleet);
                shootingLogic(e);
                computerShotHandler();
            }, (0, _globalVarsJs.duration).duration * 1000);
        });
    });
parcelHelpers.export(exports, "computerShotHandler", ()=>computerShotHandler);
var _globalVarsJs = require("./globalVars.js");
var _shipMakeHelpersJs = require("./shipMakeHelpers.js");
var _showEndResultsJs = require("./showEndResults.js");
var _showEndResultsJsDefault = parcelHelpers.interopDefault(_showEndResultsJs);
var _gameStartControlJs = require("./gameStartControl.js");
var _helpersJs = require("./helpers.js");
var _configJs = require("./config.js");
var _gameControlJs = require("./gameControl.js");
// The last damaged ship cell
let lastDamagingShot;
// Surrounding coords of the damaged ship cell
let surroundingCoords;
// All damaged ships parts of one ship
let lastInjuredShip = [];
// const LAUNCH_X = 90;
let LAUNCH_Y = window.innerHeight * 0.78;
let waterSplashLottie;
let splash;
let loadedImage;
// Bomb flight duration time
console.log("Just to push");
function filterOutNonEmptyCells(array) {
    return array.filter((el)=>!el.querySelector(".miss")).filter((el)=>!el.querySelector(".injure")).filter((el)=>!el.querySelector(".cell-around"));
}
function finishOffDamagedShip(ships, direction) {
    let allMyShips = filterOutNonEmptyCells(ships);
    const areAllCellsTaken = filterOutNonEmptyCells(allMyShips).length === 0;
    if (areAllCellsTaken) {
        const lastShotTopBottomCells = (0, _shipMakeHelpersJs.generateSurroundingFields)({
            lowerLetters: (0, _globalVarsJs.lowerLetters),
            coord: lastDamagingShot.classList[0].toLowerCase(),
            ...direction === "vertical" && {
                top: "top"
            },
            ...direction === "vertical" && {
                bottom: "bottom"
            },
            ...direction === "horizontal" && {
                left: "left"
            },
            ...direction === "horizontal" && {
                right: "right"
            }
        });
        allMyShips = lastShotTopBottomCells.filter((coord)=>typeof coord === "string").map((coord)=>(0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).closest(".dropzone"));
        allMyShips = filterOutNonEmptyCells(allMyShips);
        if (allMyShips.length === 0) {
            const otherCoord = lastInjuredShip.find((el)=>{
                const topBottomCells = (0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters: (0, _globalVarsJs.lowerLetters),
                    coord: el.classList[0].toLowerCase(),
                    ...direction === "vertical" && {
                        top: "top"
                    },
                    ...direction === "vertical" && {
                        bottom: "bottom"
                    },
                    ...direction === "horizontal" && {
                        left: "left"
                    },
                    ...direction === "horizontal" && {
                        right: "right"
                    }
                }).filter((coord)=>typeof coord === "string").map((coord)=>(0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).closest(".dropzone"));
                return filterOutNonEmptyCells(topBottomCells).length;
            });
            if (otherCoord) {
                allMyShips = (0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters: (0, _globalVarsJs.lowerLetters),
                    coord: otherCoord.classList[0].toLowerCase(),
                    ...direction === "vertical" && {
                        top: "top"
                    },
                    ...direction === "vertical" && {
                        bottom: "bottom"
                    },
                    ...direction === "horizontal" && {
                        left: "left"
                    },
                    ...direction === "horizontal" && {
                        right: "right"
                    }
                }).filter((coord)=>typeof coord === "string").map((coord)=>(0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).closest(".dropzone"));
                allMyShips = filterOutNonEmptyCells(allMyShips);
            }
        }
    }
    return allMyShips;
}
function launchBombTo(targetX, targetY, fleet, target) {
    const LAUNCH_X = fleet === (0, _globalVarsJs.mySideEnemyFleet) ? 90 : window.innerWidth - 90;
    // 1. Create bomb
    const bomb = document.createElement("div");
    bomb.className = "bomb";
    bomb.style.left = LAUNCH_X + "px";
    bomb.style.top = LAUNCH_Y + "px";
    document.body.appendChild(bomb);
    // 2. Physics: parabolic trajectory
    const dx = targetX - LAUNCH_X;
    const dy = targetY - LAUNCH_Y;
    const distance = Math.hypot(dx, dy);
    const gravity = 400; // arc strength
    (0, _globalVarsJs.duration).duration = distance / 1500 + 0.5; // flight time (seconds)
    console.log("duration", (0, _globalVarsJs.duration));
    let startTime = null;
    function animateBomb(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / ((0, _globalVarsJs.duration).duration * 1000), 1);
        // Easing: smooth acceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        // Parabolic path: x = linear, y = quadratic
        const x = LAUNCH_X + dx * progress;
        const y = LAUNCH_Y + window.scrollY + dy * progress - Math.sin(progress * Math.PI) * (distance * 0.3);
        bomb.style.left = x + "px";
        bomb.style.top = y + "px";
        if (progress < 1) requestAnimationFrame(animateBomb);
        else {
            // 3. Explode
            !target.classList.contains("dropzone") && createExplosion(x, y);
            bomb.remove();
            if (target.classList.contains("dropzone") && !target.classList.contains("miss") && !target.classList.contains("cell-around")) // createWaterSplash(x, y);
            createWaterSplashGif(x, y);
        }
    }
    requestAnimationFrame(animateBomb);
}
// Explosion function
function createExplosion(x, y) {
    console.log("x, y", x, y);
    const boom = document.createElement("div");
    boom.className = "explosion";
    boom.style.left = x + "px";
    boom.style.top = y + "px";
    document.body.appendChild(boom);
    setTimeout(function() {
        boom.classList.add("smoke");
    }, 350);
    setTimeout(()=>{
        boom.remove();
    }, 2000);
    // Resize handler
    window.addEventListener("resize", function() {
        LAUNCH_Y = window.innerHeight;
    });
}
function createPlungeSplash(x, y) {
    const splash = document.createElement("div");
    const fallTime = 720;
    splash.className = "plunge";
    splash.style.left = x + "px";
    splash.style.top = y + "px";
    document.body.appendChild(splash);
    // Jet + Crown
    splash.innerHTML = `<div class="jet"></div><div class="crown"</div>`;
    // Chunky water chunks
    for(let i = 0; i < 22; i++)setTimeout(function() {
        const c = document.createElement("div");
        c.className = "chunk";
        const size = Math.random() * 12 + 8;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 40 + 20;
        c.style.width = c.style.height = size + "px";
        c.style.left = Math.cos(angle) * dist + "px";
        c.style.top = "-80px";
        c.style.animationDelay = Math.random() * 0.2 + "s";
        splash.appendChild(c);
    }, i * 45);
    // Three shockwaves
    [
        0,
        200,
        400
    ].forEach((delay, i)=>{
        setTimeout(()=>{
            const s = document.createElement("div");
            s.className = "shockwave";
            s.style.borderWidth = 6 - i * 1.5 + "px";
            splash.appendChild(s);
        }, delay);
    });
    setTimeout(function() {
        splash.remove();
    }, fallTime);
}
function createVSplash(x, y) {
    const splash = document.createElement("div");
    const fallTime = 720;
    splash.classList = "vsplash";
    splash.style.left = x + "px";
    splash.style.top = y + "px";
    document.body.appendChild(splash);
    setTimeout(function() {
        splash.remove();
    }, fallTime);
}
function createWaterSplash(x, y) {
    const fallTime = 1200;
    const localSplash = splash;
    // splash = document.createElement("canvas");
    // splash.id = "dotlottie-canvas";
    // splash.className = "lottie-water-splash";
    splash.style.left = x + "px";
    splash.style.top = y + "px";
    // document.body.appendChild(splash);
    if ((0, _globalVarsJs.lottieSplash).waterSplash) {
        console.log("The animation should play \uD83D\uDE20", +new Date());
        (0, _globalVarsJs.lottieSplash).waterSplash.play();
    }
    setTimeout(function() {
        console.log("splash", splash);
        console.log("removed", +new Date());
        localSplash.remove();
    }, fallTime);
}
function playWaterSplashLottie(x, y) {
    const waterSplashLottie = document.querySelector("#dotlottie-canvas");
    if (waterSplashLottie) {
        waterSplashLottie.style.left = x + "px";
        waterSplashLottie.style.top = y + "px";
        waterSplashLottie?.play();
    }
}
async function loadImage(src) {
    try {
        return new Promise((resolve, reject)=>{
            const img = new Image();
            img.onload = ()=>resolve(img);
            img.onerror = ()=>reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    } catch (error) {
        console.error("error in loadImage", error);
    }
}
async function createWaterSplashGif(x, y) {
    try {
        const fallTime = 1200;
        // const splash = document.querySelector("#water-splash-gif");
        const splash = await loadImage("../../animations/water-splash.gif");
        // splash.src = "../img/sea-icon-sm.jpg";
        // splash.alt = "Water splash animation";
        // splash.className = "lottie-water-splash";
        // console.log("Image starts loading");
        // console.log("Image finished loading");
        // splash.src = "../../animations/water-splash.gif";
        // await loadImage("../img/sea-icon.png");
        console.log("splash", splash);
        splash.alt = "Water splash animation";
        splash.className = "lottie-water-splash";
        splash.style.left = x + "px";
        splash.style.top = y + "px";
        splash.style.display = "";
        // const clonedSplash = splash.cloneNode(true);
        // splash.parentNode.replaceChild(clonedSplash, splash);
        // clonedSplash.src = "";
        // clonedSplash.src = splash.src;
        // const splashSrc = splash.src;
        // splash.src = "";
        // splash.src = splashSrc;
        // document.body.appendChild(splash);
        setTimeout(function() {
            // clonedSplash.style.display = "none";
            splash.remove();
        }, fallTime);
    } catch (error) {
        console.error("error happend", error);
    }
}
function computerShotHandler() {
    try {
        if (!(0, _gameStartControlJs.playingCheck).playing) {
            console.log("The game is over \uD83D\uDCAF");
            return;
        }
        if ((0, _gameStartControlJs.whoseTurn).turn === (0, _globalVarsJs.enemySideMyFleet)) {
            let allMyShips = [
                ...(0, _globalVarsJs.enemySideMyFleet).querySelectorAll("td")
            ];
            allMyShips = filterOutNonEmptyCells(allMyShips);
            // Backup to use
            let oldShips = allMyShips;
            if (lastDamagingShot) {
                // injured parts is just an array of coordinates of damanged ship parts
                let injuredShipParts = lastInjuredShip.map(// Here I just take the first coord to make further decisions about finishing off the damaged ship
                (coord)=>coord.classList[0]);
                const IsThisVertical = injuredShipParts.length > 1 && injuredShipParts[0]?.slice(0, 1) === injuredShipParts[1]?.slice(0, 1);
                allMyShips = filterOutNonEmptyCells(surroundingCoords);
                if (injuredShipParts.length > 1) {
                    if (IsThisVertical) {
                        // I filter surrounding coords because there is a possibility that from one side there is a damaged part and from another side there is unchecked cell, it finds that cells to shot next
                        allMyShips = surroundingCoords.filter((coord)=>{
                            return injuredShipParts[0].slice(0, 1) === coord.querySelector(".cell").classList[0].slice(0, 1);
                        });
                        allMyShips = finishOffDamagedShip(allMyShips, "vertical");
                    }
                    if (!IsThisVertical) {
                        allMyShips = surroundingCoords.filter((coord)=>{
                            return injuredShipParts[0].slice(1) === coord.querySelector(".cell").classList[0].slice(1);
                        });
                        allMyShips = finishOffDamagedShip(allMyShips, "horizontal");
                    }
                }
                const allSurroundingsFromFullShip = [
                    ...lastInjuredShip.map((coord)=>{
                        const dubl = (0, _shipMakeHelpersJs.generateSurroundingFields)({
                            lowerLetters: (0, _globalVarsJs.lowerLetters),
                            coord: coord?.classList[0].toLowerCase(),
                            top: "top",
                            bottom: "bottom",
                            right: "right",
                            left: "left"
                        });
                        return dubl;
                    })
                ].flatMap((el)=>el).filter((coord)=>typeof coord === "string");
                // Deciding whether the current ship is destroyed or not
                if (allSurroundingsFromFullShip.length && allSurroundingsFromFullShip.filter((coord)=>(0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).classList.contains("miss") || (0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).classList.contains("cell-around") || (0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).nextElementSibling?.classList.contains("injure")).length === allSurroundingsFromFullShip.length) {
                    allMyShips = oldShips;
                    lastInjuredShip = [];
                    lastDamagingShot = "";
                }
            }
            const timeout = (0, _shipMakeHelpersJs.randomNumberFromRange)(1, 5);
            console.log("timeout", timeout);
            if (allMyShips.length === 0) return;
            const randomIndex = Math.floor(Math.random() * allMyShips.length);
            const randomElement = allMyShips[randomIndex];
            if (!randomElement.querySelector(".ship") && !randomElement.querySelector(".miss") && !randomElement.querySelector(".cell-around")) setTimeout(function() {
                randomElement.click();
            }, 1000);
            if (!randomElement.querySelector(".injure") && !randomElement.querySelector(".miss") && !randomElement.querySelector(".cell-around") && randomElement.querySelector(".ship")) {
                lastDamagingShot = randomElement.querySelector(".ship");
                lastInjuredShip = [
                    ...lastInjuredShip,
                    randomElement.querySelector(".ship")
                ];
                console.log("lastDamagingShot is real now", lastDamagingShot);
                if (lastInjuredShip.length === 1) surroundingCoords = (0, _shipMakeHelpersJs.generateSurroundingFields)({
                    lowerLetters: (0, _globalVarsJs.lowerLetters),
                    coord: randomElement.querySelector(".cell")?.classList[0].toLowerCase(),
                    top: "top",
                    bottom: "bottom",
                    right: "right",
                    left: "left"
                }).filter((coord)=>typeof coord === "string").map((coord)=>(0, _globalVarsJs.enemySideMyFleet).querySelector(`.${coord.toUpperCase()}`).closest(".dropzone"));
                setTimeout(function() {
                    randomElement.querySelector(".ship")?.click();
                }, 1000);
            }
            console.log("Clicked:", randomElement.children[0]);
        }
    } catch (error) {
        console.error(error, "Error happend \u2049\uFE0F");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./globalVars.js":"gb5d6","./shipMakeHelpers.js":"2URfe","./showEndResults.js":"2csmh","./gameStartControl.js":"fXv0K","./helpers.js":"hGI1E","./config.js":"k5Hzs","./gameControl.js":"dx0uc"}],"2csmh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet, noTime = false) {
        const allShips = [
            ...fleet.querySelectorAll(".ship")
        ];
        const injuredShips = allShips.filter((ship)=>{
            // Checks all ships on the fleet and those which are destroyed will be returned
            if (ship.classList.contains("injure")) return ship;
        });
        // .filter((ship, i, arr) => {
        //   if (ship) {
        //     return ship;
        //   }
        // });
        console.log(fleet);
        const areAllShipsInjured = injuredShips.length === allShips.length;
        const runOutOfTime = noTime ? true : false;
        console.log("runOUtOftime", runOutOfTime);
        if (!areAllShipsInjured && !runOutOfTime) return;
        // If code execution is at this point - this means the game is finished
        const audio = document.getElementById("halloween");
        audio.currentTime = 0;
        audio.pause();
        clearInterval((0, _helpersJs.timer));
        console.log(areAllShipsInjured, "areAll");
        console.log(runOutOfTime, "areAll");
        (0, _gameStartControlJs.playingCheck).playing = false;
        // Composing the result message
        const composeMessage = function(messageEl, fleetSide) {
            messageEl.textContent !== "" && (messageEl.textContent = "");
            messageEl.insertAdjacentHTML("afterbegin", `You ${fleet === fleetSide ? "won" : "lost"} the battle! ${fleet === fleetSide ? "Congratulations! \uD83C\uDF8A" : "Get lucky other time \uD83D\uDE10"}`);
        };
        // Show notification window
        const openNotificationWindow = function() {
            const addNotification = function() {
                composeMessage((0, _globalVarsPauseJs.resultsMessage1), (0, _globalVarsPauseJs.enemySideMyFleet));
                composeMessage((0, _globalVarsPauseJs.resultsMessage2), (0, _globalVarsPauseJs.mySideEnemyFleet));
            };
            fleet === (0, _globalVarsPauseJs.mySideEnemyFleet) && addNotification((0, _globalVarsPauseJs.player1));
            fleet !== (0, _globalVarsPauseJs.mySideEnemyFleet) && addNotification((0, _globalVarsPauseJs.player2));
            (0, _globalVarsPauseJs.notificatonWindow1).classList.remove("hidden");
            (0, _globalVarsPauseJs.notificatonWindow2).classList.remove("hidden");
            // overlay.classList.remove("hidden");
            [
                (0, _globalVarsPauseJs.mySideEnemyFleet),
                (0, _globalVarsPauseJs.enemySideMyFleet)
            ].forEach((fleet)=>{
                fleet.style.pointerEvents = "none";
                (0, _helpersJs.getSeaOpacityBack)();
            });
        };
        (areAllShipsInjured || runOutOfTime) && openNotificationWindow();
        (areAllShipsInjured || runOutOfTime) && (0, _globalVarsPauseJs.allTimers).forEach((timerEl)=>{
            timerEl.style.opacity = "0";
        });
        (0, _globalVarsPauseJs.btnCloseNotificationWindow1).addEventListener("click", (0, _helpersJs.closeNotificationWindow1));
        // overlay.addEventListener("click", closeNotificationWindow);
        (0, _globalVarsPauseJs.btnCloseNotificationWindow2).addEventListener("click", (0, _helpersJs.closeNotificationWindow2));
    // overlay.addEventListener("click", closeNotificationWindow2);
    // document.addEventListener("keydown", function (e) {
    //   // console.log(e.key);
    //   e.key === "Escape" &&
    //     !notificatonWindow.classList.contains("hidden") &&
    //     !notificatonWindow2.classList.contains("hidden") &&
    //     closeNotificationWindow();
    // });
    });
var _globalVarsPauseJs = require("./globalVarsPause.js");
var _gameStartControlJs = require("./gameStartControl.js");
var _helpersJs = require("./helpers.js");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./globalVarsPause.js":"bAcK9","./gameStartControl.js":"fXv0K","./helpers.js":"hGI1E"}],"bAcK9":[function(require,module,exports) {
// FLEET ENVIRONMENT
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bothSideShips", ()=>bothSideShips);
parcelHelpers.export(exports, "mySideMyFleet", ()=>mySideMyFleet);
parcelHelpers.export(exports, "mySideEnemyFleet", ()=>mySideEnemyFleet);
parcelHelpers.export(exports, "enemySideEnemyFleet", ()=>enemySideEnemyFleet);
parcelHelpers.export(exports, "enemySideMyFleet", ()=>enemySideMyFleet);
parcelHelpers.export(exports, "seas", ()=>seas);
parcelHelpers.export(exports, "seaContainers", ()=>seaContainers);
parcelHelpers.export(exports, "notificatonWindow1", ()=>notificatonWindow1);
parcelHelpers.export(exports, "notificatonWindow2", ()=>notificatonWindow2);
parcelHelpers.export(exports, "btnCloseNotificationWindow1", ()=>btnCloseNotificationWindow1);
parcelHelpers.export(exports, "btnCloseNotificationWindow2", ()=>btnCloseNotificationWindow2);
parcelHelpers.export(exports, "newGameBtn1", ()=>newGameBtn1);
parcelHelpers.export(exports, "newGameBtn2", ()=>newGameBtn2);
parcelHelpers.export(exports, "startGameBtn1", ()=>startGameBtn1);
parcelHelpers.export(exports, "startGameBtn2", ()=>startGameBtn2);
parcelHelpers.export(exports, "changeUsernameBtn1", ()=>changeUsernameBtn1);
parcelHelpers.export(exports, "changeUsernameBtn2", ()=>changeUsernameBtn2);
parcelHelpers.export(exports, "username1Input", ()=>username1Input);
parcelHelpers.export(exports, "username2Input", ()=>username2Input);
parcelHelpers.export(exports, "menuBtnsContainer1", ()=>menuBtnsContainer1);
parcelHelpers.export(exports, "menuBtnsContainer2", ()=>menuBtnsContainer2);
parcelHelpers.export(exports, "playerUsername1", ()=>playerUsername1);
parcelHelpers.export(exports, "playerUsername2", ()=>playerUsername2);
parcelHelpers.export(exports, "errorMessage1", ()=>errorMessage1);
parcelHelpers.export(exports, "errorMessage2", ()=>errorMessage2);
parcelHelpers.export(exports, "inputUsernameLabel2", ()=>inputUsernameLabel2);
parcelHelpers.export(exports, "submitUsername2", ()=>submitUsername2);
parcelHelpers.export(exports, "inputUsernameLabel1", ()=>inputUsernameLabel1);
parcelHelpers.export(exports, "submitUsername1", ()=>submitUsername1);
parcelHelpers.export(exports, "letters", ()=>letters);
parcelHelpers.export(exports, "seaFleet", ()=>seaFleet);
parcelHelpers.export(exports, "allTimers", ()=>allTimers);
parcelHelpers.export(exports, "waitingForOpponentLabel1", ()=>waitingForOpponentLabel1);
parcelHelpers.export(exports, "waitingForOpponentLabel2", ()=>waitingForOpponentLabel2);
parcelHelpers.export(exports, "createMyShips", ()=>createMyShips);
parcelHelpers.export(exports, "createEnemyShips", ()=>createEnemyShips);
parcelHelpers.export(exports, "mySideMyShips", ()=>mySideMyShips);
parcelHelpers.export(exports, "enemySideEnemyShips", ()=>enemySideEnemyShips);
parcelHelpers.export(exports, "mySideEnemyShips", ()=>mySideEnemyShips);
parcelHelpers.export(exports, "enemySideMyShips", ()=>enemySideMyShips);
parcelHelpers.export(exports, "resultsMessage1", ()=>resultsMessage1);
parcelHelpers.export(exports, "resultsMessage2", ()=>resultsMessage2);
parcelHelpers.export(exports, "player1", ()=>player1);
parcelHelpers.export(exports, "player2", ()=>player2);
const mySideMyFleet = document.querySelector(".my-side--my-fleet");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-fleet");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-fleet");
const enemySideMyFleet = document.querySelector(".enemy-side--my-fleet");
const seaContainers = document.querySelectorAll(".sea-container");
const seas = document.querySelectorAll(".sea");
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
const startGameBtn1 = document.querySelector(".fleet-1");
const startGameBtn2 = document.querySelector(".fleet-2");
const player1 = document.querySelector(".username-1").textContent;
const player2 = document.querySelector(".username-2").textContent;
const allTimers = [
    ...document.querySelectorAll(".timer-label")
];
const waitingForOpponentLabel1 = document.querySelector(".waiting-opponent-1");
const waitingForOpponentLabel2 = document.querySelector(".waiting-opponent-2");
const errorMessage1 = document.querySelector(".error-message-1");
const errorMessage2 = document.querySelector(".error-message-2");
let createMyShips = [
    [
        [
            "d1"
        ],
        1
    ],
    [
        [
            "f1"
        ],
        1
    ],
    [
        [
            "h1"
        ],
        1
    ],
    [
        [
            "j1"
        ],
        1
    ],
    [
        [
            "a5",
            "b5"
        ],
        2
    ],
    [
        [
            "d5",
            "e5"
        ],
        2
    ],
    [
        [
            "b3",
            "c3",
            "d3"
        ],
        3
    ],
    [
        [
            "c7",
            "d7",
            "e7"
        ],
        3
    ],
    [
        [
            "g4",
            "h4"
        ],
        2
    ],
    [
        [
            "c9",
            "d9",
            "e9",
            "f9"
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
    [
        [
            "c1"
        ],
        1
    ],
    [
        [
            "e1"
        ],
        1
    ],
    [
        [
            "a3"
        ],
        1
    ],
    [
        [
            "i5",
            "j5"
        ],
        2
    ],
    [
        [
            "i7",
            "j7"
        ],
        2
    ],
    [
        [
            "d4",
            "e4",
            "f4",
            "g4"
        ],
        4
    ],
    [
        [
            "h2",
            "i2",
            "j2"
        ],
        3
    ],
    [
        [
            "e9",
            "f9"
        ],
        2
    ],
    [
        [
            "b5",
            "b6",
            "b7"
        ],
        3
    ]
];
let mySideMyShips = [];
let enemySideEnemyShips = [];
let mySideEnemyShips = [];
let enemySideMyShips = [];
let bothSideShips = [];
// NOTIFICATION WINDOW
const notificatonWindow1 = document.querySelector(".notification-window.player-1");
const notificatonWindow2 = document.querySelector(".notification-window.player-2");
const resultsMessage1 = document.querySelector(".results-message");
const resultsMessage2 = document.querySelector(".results-message-2");
const btnCloseNotificationWindow1 = document.querySelector(".close-notification-window");
const btnCloseNotificationWindow2 = document.querySelector(".close-notification-window-2");
// const overlay = document.querySelector(".overlay");
// MENU BUTTONS
const menuBtnsContainer1 = document.querySelector(".menu-btns-container-1");
const menuBtnsContainer2 = document.querySelector(".menu-btns-container-2");
const playerUsername1 = document.querySelector(".player-username-1");
const playerUsername2 = document.querySelector(".player-username-2");
const newGameBtn1 = document.querySelector(".new-game-btn.player-1");
const newGameBtn2 = document.querySelector(".new-game-btn.player-2");
const changeUsernameBtn1 = document.querySelector(".change-username-btn-1");
const changeUsernameBtn2 = document.querySelector(".change-username-btn-2");
// FILL USERNAME FORM
const username1Input = document.querySelector(".fill-username--player-1");
const username2Input = document.querySelector(".fill-username--player-2");
const inputUsernameLabel2 = document.querySelector(".your-name-2");
const inputUsernameLabel1 = document.querySelector(".your-name-1");
const submitUsername1 = document.querySelector(".submit-username--fleet-1");
const submitUsername2 = document.querySelector(".submit-username--fleet-2");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dx0uc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "gameControlHandler", ()=>gameControlHandler) // export default function () {
 //   // playingCheck.playing === true &&
 //   //   (enemySideMyFleet.style.pointerEvents = "none");
 //   [mySideEnemyFleet, enemySideMyFleet].forEach((fleet) => {
 //     console.log(playingCheck.playing);
 //     // Adding an event listener to fleets on which we try to find ships
 //     fleet.addEventListener("click", async function (e) {
 //       console.log("this in gameControl", this, fleet);
 //       // deferExecution(e, this);
 //       await sleep((duration.duration - 0.2) * 1000);
 //       console.log("this AFter sleep", this, fleet);
 //       gameControlHandler(e, this);
 //     });
 //   });
 // }
;
var _globalVarsPauseJs = require("./globalVarsPause.js");
var _gameStartControlJs = require("./gameStartControl.js");
var _helpersJs = require("./helpers.js");
function gameControlHandler(e, fleet) {
    console.log("fleet in the gameControlHandler", fleet, e);
    if (// Check complition of conditions which define whether the turn should or should not be changed
    e.target.classList.contains("ship") || e.target.textContent !== "" || e.target.querySelector(".ship")?.classList.contains("ship")) return;
    const turn = (0, _gameStartControlJs.playingCheck).playing && fleet === (0, _globalVarsPauseJs.enemySideMyFleet) ? (0, _globalVarsPauseJs.mySideEnemyFleet) : (0, _globalVarsPauseJs.enemySideMyFleet);
    (0, _gameStartControlJs.whoseTurn).turn = turn;
    console.log("turn", turn);
    if ((0, _gameStartControlJs.playingCheck).playing) {
        turn.style.pointerEvents = "auto";
        fleet.closest(".sea").style.opacity = "0.7";
        (0, _helpersJs.startTimer)(turn);
        /*   fleet.closest(".sea-container").querySelector(".timer-label") && */ fleet.closest(".sea-container").querySelector(".timer-label").style.opacity = "0";
        // Selecting part of the fleet which is on your opponent's side
        const fleetSide = fleet === (0, _globalVarsPauseJs.enemySideMyFleet) ? (0, _globalVarsPauseJs.mySideMyFleet) : (0, _globalVarsPauseJs.enemySideEnemyFleet);
        fleetSide.closest(".sea-container").querySelector(".timer-label").style.opacity = "0";
    }
    // The turn changed and because of this the side which turn it was before will be unavailable for clicks
    (0, _gameStartControlJs.playingCheck).playing && (fleet.style.pointerEvents = "none");
    turn.closest(".sea").style.opacity = "1";
}

},{"./globalVarsPause.js":"bAcK9","./gameStartControl.js":"fXv0K","./helpers.js":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iXTJE":[function(require,module,exports) {
var _globalVarsJs = require("./globalVars.js");
/* <th>${item}</th> */ // Creates fleet cells
let markup = (0, _globalVarsJs.seaFleet).map((item, i)=>`
     <tr class="row-${i + 1}">
 ${(0, _globalVarsJs.letters).map((letter)=>`<td class="dropzone"><div class="${letter}${i + 1} cell"></div></td>`).join("")}
</tr>
`).join("");
// Creates sea head
let markupSeaHead = ` ${(0, _globalVarsJs.seaFleet).map((_, i)=>{
    return i > 0 ? `<th>${(0, _globalVarsJs.letters)[i]}</th>` : ` 
        <th>${(0, _globalVarsJs.letters)[i]}</th>`;
}).join("")}`;
// let markupLetters = ` ${seaFleet
//   .map((item, i) => {
//     return `<p class="column-letter column-letter-${i + 1}">${letters[i]}</p>`;
//   })
//   .join("")}`;
// Creates numbers on the left side of the grid - similar to creating letters on the sea head
let markupNumbers = ` ${(0, _globalVarsJs.seaFleet).map((item, i)=>{
    return `<p class="row-number row-number-${i + 1}">${i + 1}</p>`;
}).join("")}`;
[
    (0, _globalVarsJs.mySideMyFleet),
    (0, _globalVarsJs.mySideEnemyFleet),
    (0, _globalVarsJs.enemySideEnemyFleet),
    (0, _globalVarsJs.enemySideMyFleet)
].forEach((container)=>{
    container.insertAdjacentHTML("afterbegin", markup);
});
[
    ...(0, _globalVarsJs.seas)
].forEach((sea)=>{
    sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead);
    // sea.insertAdjacentHTML("afterbegin", markupLetters);
    sea.insertAdjacentHTML("afterbegin", markupNumbers);
}); // [...seaContainers].forEach((seaContainer) => {
 //   seaContainer.insertAdjacentHTML("afterbegin", markupLetters);
 //   seaContainer.insertAdjacentHTML("afterbegin", markupNumbers);
 // });

},{"./globalVars.js":"gb5d6"}],"3iktl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet) {
        // A variable for ship which will be dragged which should be accessbile in several functions
        let dragged;
        const shipEls = fleet.querySelectorAll(".ship");
        shipEls.forEach((shipEl, i)=>{
            // Adding to every ship part an identification name
            shipEl.classList.add(`cell${i + 1}`);
            shipEl.setAttribute("draggable", true);
        });
        fleet.addEventListener("dragstart", function(e) {
            console.log("DRAGSTART");
            console.log(e.target);
            // Dragged ship is assigned to dragged variable to use later when drop event happens
            dragged = e.target;
        });
        // fleet.addEventListener("dragend", function (e) {
        //   console.log("DRAGEND", e.target);
        // });
        [
            "dragover",
            "dragenter",
            "dragleave",
            "drop"
        ].forEach((ev)=>{
            fleet.addEventListener(ev, function(e) {
                console.log(ev, e.target, "ran");
                e.target.classList.contains("dropzone") && (console.log(ev), e.target.classList.remove("dragover"));
                if (ev === "drop") {
                    e.preventDefault();
                    console.log(dragged, e.target);
                    // Prevent dropping on ships
                    if (e.target.classList.contains("ship")) return;
                    // Ship placed inside dropzone(or td element)
                    e.target.appendChild(dragged);
                    // For example: cell5
                    const shipPartIdentifier = dragged.classList[dragged.classList.length - 1];
                    console.log(shipPartIdentifier);
                    // Replace ship class which defines position of a ship with class of a cell where the ship was dropped
                    fleet.querySelector(`.${shipPartIdentifier}`).classList.replace(fleet.querySelector(`.${shipPartIdentifier}`).classList[0], e.target.querySelector("div")?.classList[0]);
                }
                const checkDragoverE = function() {
                    e.preventDefault();
                    if (ev !== "dragover") return;
                    if (e.target.classList.contains("ship")) return;
                    // Adds background color to the cell over which a ship hovers
                    e.target.classList.add("dragover");
                };
                checkDragoverE();
            }, // Stop event bubbling(if I am not mistaken)
            ev === "dragover" && false);
        });
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGRP7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startNewGame", ()=>startNewGame);
var _configJs = require("./config.js");
var _gameStartControlJs = require("./gameStartControl.js");
var _globalVarsJs = require("./globalVars.js");
var _helpersJs = require("./helpers.js");
var _placeShipsManuallyJs = require("./placeShipsManually.js");
var _placeShipsManuallyJsDefault = parcelHelpers.interopDefault(_placeShipsManuallyJs);
var _makeShipsJs = require("./makeShips.js");
var _makeShipsJsDefault = parcelHelpers.interopDefault(_makeShipsJs);
const startNewGame = function(fleet) {
    const fleetIsMySideMyFleet = fleet === (0, _globalVarsJs.mySideMyFleet);
    const definePlayerNumber = fleetIsMySideMyFleet ? 1 : 2;
    const newGameBtn = fleetIsMySideMyFleet ? (0, _globalVarsJs.newGameBtn1) : (0, _globalVarsJs.newGameBtn2);
    const changeUsernameBtn = fleetIsMySideMyFleet ? (0, _globalVarsJs.changeUsernameBtn1) : (0, _globalVarsJs.changeUsernameBtn2);
    changeUsernameBtn.addEventListener("click", function(e) {
        (0, _helpersJs.openUsernameForm)(fleet, "flex");
    });
    const submitBtn = document.querySelector(`.submit-username--fleet-${definePlayerNumber}`);
    const inputUsername = document.querySelector(`.fill-username--player-${definePlayerNumber}`);
    const usernameLabel = document.querySelector(`.username-${definePlayerNumber}`);
    const submitUsernames = function() {
        // Default player name
        inputUsername.value = (fleetIsMySideMyFleet ? "First" : "Second") + "-player";
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const checkUsernameCase = function(input) {
                return input.value.toLowerCase().slice(0, 1).toUpperCase() + input.value.slice(1).toLowerCase();
            };
            const playerUsername = checkUsernameCase(inputUsername).trim();
            if (playerUsername.length < (0, _configJs.MIN_INPUT_LENGTH)) {
                console.log("Your username should contains at least 2 letters");
                return;
            }
            if (playerUsername.includes(" ")) {
                console.log(playerUsername, "username");
                console.log("Your username should not contain empty spaces");
                return;
            }
            usernameLabel.textContent = "";
            usernameLabel.insertAdjacentHTML("afterbegin", playerUsername + "'s ships");
            inputUsername.value = "";
            console.log(playerUsername);
            (0, _helpersJs.closeUsernameForm)(fleet, "none");
        });
    };
    submitUsernames();
    newGameBtn.addEventListener("click", function() {
        fleetIsMySideMyFleet && !(0, _gameStartControlJs.newGameAgreement).includes("mySideMyFleet") && (0, _gameStartControlJs.newGameAgreement).push("mySideMyFleet");
        fleet === (0, _globalVarsJs.enemySideEnemyFleet) && !(0, _gameStartControlJs.newGameAgreement).includes("enemySideEnemyFleet") && (0, _gameStartControlJs.newGameAgreement).push("enemySideEnemyFleet");
        // Defines whether both player pressed "New Game" button or not
        if ((0, _gameStartControlJs.newGameAgreement).length !== (0, _configJs.NEW_GAME_AGREEMENT_COMPLETE_LENGTH)) return;
        const refreshFleets = function() {
            (0, _helpersJs.closeNotificationWindow1)();
            (0, _helpersJs.closeNotificationWindow2)();
            (0, _helpersJs.getSeaOpacityBack)();
            (0, _globalVarsJs.allTimers).forEach((timerEl)=>{
                timerEl.style.opacity = "0";
            });
            (0, _helpersJs.startTimer)(fleet, true);
            (0, _gameStartControlJs.playingCheck).playing = false;
            [
                [
                    (0, _globalVarsJs.mySideMyFleet),
                    "auto"
                ],
                [
                    (0, _globalVarsJs.enemySideEnemyFleet),
                    "auto"
                ],
                [
                    (0, _globalVarsJs.mySideEnemyFleet),
                    "none"
                ],
                [
                    (0, _globalVarsJs.enemySideMyFleet),
                    "none"
                ]
            ].forEach((item)=>(0, _helpersJs.allowForbidClick)(...item));
            (0, _globalVarsJs.newGameBtn1).setAttribute("disabled", true);
            (0, _globalVarsJs.newGameBtn2).setAttribute("disabled", true);
            const clearAndRefreshFleets = function() {
                [
                    ...document.querySelectorAll("td")
                ].forEach((cell)=>{
                    cell.querySelector(".ship")?.remove();
                    cell.querySelector(".miss")?.classList.remove("miss");
                    cell.removeAttribute("style");
                    cell.querySelector(".cell-around")?.classList.remove("cell-around");
                    cell.querySelector(".cell").textContent = "";
                });
                (0, _globalVarsJs.mySideMyShips).splice(0);
                (0, _globalVarsJs.enemySideEnemyShips).splice(0);
                (0, _globalVarsJs.createMyShips).forEach((ship)=>{
                    (0, _makeShipsJsDefault.default)(...ship, [
                        (0, _globalVarsJs.mySideMyFleet),
                        (0, _globalVarsJs.mySideMyShips),
                        (0, _globalVarsJs.createMyShips)
                    ]);
                });
                (0, _globalVarsJs.createEnemyShips).forEach((ship)=>{
                    (0, _makeShipsJsDefault.default)(...ship, [
                        (0, _globalVarsJs.enemySideEnemyFleet),
                        (0, _globalVarsJs.enemySideEnemyShips),
                        (0, _globalVarsJs.createEnemyShips)
                    ]);
                });
                (0, _globalVarsJs.startGameBtn1).removeAttribute("disabled", true);
                (0, _globalVarsJs.startGameBtn2).removeAttribute("disabled", true);
                [
                    (0, _globalVarsJs.changeUsernameBtn1),
                    (0, _globalVarsJs.changeUsernameBtn2)
                ].forEach((btn)=>{
                    btn.removeAttribute("disabled", true);
                });
                (0, _globalVarsJs.startGameBtn1).style.display = "";
                (0, _globalVarsJs.startGameBtn2).style.display = "";
                (0, _gameStartControlJs.bothFleetsReady).splice(0);
                (0, _globalVarsJs.bothSideShips).splice(0);
            };
            if (fleetIsMySideMyFleet || fleet === (0, _globalVarsJs.enemySideEnemyFleet)) clearAndRefreshFleets();
            (0, _placeShipsManuallyJsDefault.default)((0, _globalVarsJs.mySideMyFleet), [
                (0, _globalVarsJs.mySideMyFleet),
                (0, _globalVarsJs.mySideMyShips),
                (0, _globalVarsJs.createMyShips)
            ]);
            (0, _placeShipsManuallyJsDefault.default)((0, _globalVarsJs.enemySideEnemyFleet), [
                (0, _globalVarsJs.enemySideEnemyFleet),
                (0, _globalVarsJs.enemySideEnemyShips),
                (0, _globalVarsJs.createEnemyShips)
            ]);
        };
        refreshFleets();
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./config.js":"k5Hzs","./gameStartControl.js":"fXv0K","./globalVars.js":"gb5d6","./helpers.js":"hGI1E","./placeShipsManually.js":"3iktl","./makeShips.js":"8mnMH"}]},["f0HGD","aenu9"], "aenu9", "parcelRequire3129")

//# sourceMappingURL=index.e37f48ea.js.map
