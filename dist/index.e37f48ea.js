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
var _globalVars = require("./globalVars");
var _makeShips = require("./makeShips");
var _makeShipsDefault = parcelHelpers.interopDefault(_makeShips);
var _fleetEnvironment = require("./fleetEnvironment");
var _placeShipsManually = require("./placeShipsManually");
var _placeShipsManuallyDefault = parcelHelpers.interopDefault(_placeShipsManually);
var _gameStartControl = require("./gameStartControl");
var _gameControl = require("./gameControl");
var _gameControlDefault = parcelHelpers.interopDefault(_gameControl);
var _shootingLogic = require("./shootingLogic");
var _shootingLogicDefault = parcelHelpers.interopDefault(_shootingLogic);
var _startNewGame = require("./startNewGame");
/**************************/ /* CREATE FLEET */ /**************************/ const createFleet = function(fleetParts) {
    const fleet = fleetParts[0];
    const newShipsCoords = fleetParts[2];
    fleet !== (0, _globalVars.mySideEnemyFleet) && fleet !== (0, _globalVars.enemySideMyFleet) && newShipsCoords.forEach((ship)=>{
        (0, _makeShipsDefault.default)(...ship, fleetParts);
    });
    let ships = fleetParts[1];
    console.log(fleetParts[1], "ships");
    console.log(fleet, "fleet");
    /**************************/ /* PLACING SHIPS MANUALLY */ /**************************/ (0, _placeShipsManuallyDefault.default)(fleet, fleetParts);
    /**************************/ /* GAME START CONTROL */ /**************************/ (0, _gameStartControl.gameStartControl)(fleet, fleetParts);
    /**************************/ /* GAME CONTROL */ /**************************/ (0, _gameControlDefault.default)(fleet);
    /**************************/ /* START NEW GAME */ /**************************/ (fleet === (0, _globalVars.mySideMyFleet) || fleet === (0, _globalVars.enemySideEnemyFleet)) && (0, _startNewGame.startNewGame)(fleet, fleetParts);
    /**************************/ /* SHOOTING LOGIC */ /**************************/ (0, _shootingLogicDefault.default)(fleet, ships);
};
[
    [
        (0, _globalVars.mySideMyFleet),
        (0, _globalVars.mySideMyShips),
        (0, _globalVars.createMyShips)
    ],
    [
        (0, _globalVars.mySideEnemyFleet),
        (0, _globalVars.mySideEnemyShips),
        (0, _globalVars.createEnemyShips)
    ],
    [
        (0, _globalVars.enemySideEnemyFleet),
        (0, _globalVars.enemySideEnemyShips),
        (0, _globalVars.createEnemyShips)
    ],
    [
        (0, _globalVars.enemySideMyFleet),
        (0, _globalVars.enemySideMyShips),
        (0, _globalVars.createMyShips)
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
 // Design is improved and probably will stay the same, now it's time to write some instructions about the game rules
 // All instructions are written and look good, now it's time to place buttons and inputs to the right places

},{"./globalVars":"gb5d6","./makeShips":"8mnMH","./fleetEnvironment":"iXTJE","./placeShipsManually":"3iktl","./gameStartControl":"fXv0K","./gameControl":"dx0uc","./shootingLogic":"6WpIw","./startNewGame":"hGRP7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gb5d6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bothSideShips", ()=>bothSideShips);
parcelHelpers.export(exports, "mySideMyFleet", ()=>mySideMyFleet);
parcelHelpers.export(exports, "mySideEnemyFleet", ()=>mySideEnemyFleet);
parcelHelpers.export(exports, "enemySideEnemyFleet", ()=>enemySideEnemyFleet);
parcelHelpers.export(exports, "enemySideMyFleet", ()=>enemySideMyFleet);
parcelHelpers.export(exports, "seas", ()=>seas);
parcelHelpers.export(exports, "seaContainers", ()=>seaContainers);
parcelHelpers.export(exports, "notificatonWindow", ()=>notificatonWindow);
parcelHelpers.export(exports, "notificatonWindow2", ()=>notificatonWindow2);
parcelHelpers.export(exports, "btnCloseNotificationWindow", ()=>// overlay,
    btnCloseNotificationWindow);
parcelHelpers.export(exports, "btnCloseNotificationWindow2", ()=>btnCloseNotificationWindow2);
parcelHelpers.export(exports, "newGameBtn", ()=>newGameBtn);
parcelHelpers.export(exports, "newGameBtn2", ()=>newGameBtn2);
parcelHelpers.export(exports, "startGameBtn", ()=>startGameBtn);
parcelHelpers.export(exports, "startGameBtn2", ()=>startGameBtn2);
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
const mySideMyFleet = document.querySelector(".my-side--my-fleet");
const mySideEnemyFleet = document.querySelector(".my-side--enemy-fleet");
const enemySideEnemyFleet = document.querySelector(".enemy-side--enemy-fleet");
const enemySideMyFleet = document.querySelector(".enemy-side--my-fleet");
const seas = document.querySelectorAll(".sea");
const seaContainers = document.querySelectorAll(".sea-container");
const notificatonWindow = document.querySelector(".notification-window.player-1");
const notificatonWindow2 = document.querySelector(".notification-window.player-2");
// const overlay = document.querySelector(".overlay");
const btnCloseNotificationWindow = document.querySelector(".close-notification-window");
const btnCloseNotificationWindow2 = document.querySelector(".close-notification-window-2");
const newGameBtn = document.querySelector(".new-game-btn.player-1");
const newGameBtn2 = document.querySelector(".new-game-btn.player-2");
const startGameBtn = document.querySelector(".fleet-1");
const startGameBtn2 = document.querySelector(".fleet-2");
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
const allTimers = [
    ...document.querySelectorAll(".timer-label")
];
const waitingForOpponentLabel1 = document.querySelector(".waiting-opponent-1");
const waitingForOpponentLabel2 = document.querySelector(".waiting-opponent-2");
let createMyShips = [
    [
        [
            "e1"
        ],
        1
    ],
    [
        [
            "j1"
        ],
        1
    ],
    // [["a3"], ["e1"].length],
    // [["h10"], ["e1"].length],
    // [["i7", "j7"], ["e6", "e7"].length],
    // [["a9", "a10"], ["e6", "e7"].length],
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
    // [["c8", "d8", "e8"], ["J4", "I4", "h4"].length],
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
    // [["e1"], ["d10"].length],
    // [["g1"], ["d10"].length],
    // [["i5", "j5"], ["e6", "e7"].length],
    // [["i7", "j7"], ["e6", "e7"].length],
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
            "e2",
            "f2",
            "g2"
        ],
        3
    ],
    [
        [
            "e9",
            "f9"
        ],
        2
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

},{}],"8mnMH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _globalVars = require("./globalVars");
var _helpers = require("./helpers");
exports.default = createShip = function(coords, size, fleetParts) {
    const fleet = fleetParts[0];
    const ships = fleetParts[1];
    const letters = _globalVars.letters;
    const bigCoords = coords?.map((coord)=>{
        return coord.toUpperCase();
    });
    if (bigCoords === undefined) return;
    const checkSpace = fleetParts[1]?.map((ship, i)=>{
        return ship?.coords?.some((coord)=>{
            return bigCoords.includes(coord);
        });
    });
    if (checkSpace.includes(true)) {
        console.log("In such a mood it wouldn't be surprising if you stepped with you shoe on a dog's poop \uD83C\uDF6D");
        return false;
    }
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
    if (columnShip.length !== 1 && rowShip.length !== 1) {
        console.log("Place your ships in the right order, man \uD83D\uDD7A");
        return false;
    }
    if (fleet !== _globalVars.mySideMyFleet && fleet !== _globalVars.enemySideEnemyFleet) {
        const checkWholesomness = coords.map((coord, i)=>{
            const cellAttributes = (0, _helpers.selectCellsAround)(coord);
            if (coords.length > 1 && !coords.includes(letters[cellAttributes.letterAround] + (cellAttributes.coordSlice1 - 1)) && !coords.includes(letters[cellAttributes.letterAround] + (+cellAttributes.coordSlice1 + 1)) && !coords.includes(letters[cellAttributes.letterAround - 1] + cellAttributes.coordSlice1) && !coords.includes(letters[cellAttributes.letterAround + 1] + cellAttributes.coordSlice1)) return false;
        });
        if (checkWholesomness.includes(false)) {
            console.log(ships, "sho");
            console.log("Place your ships in the right order, man \uD83E\uDD38\u200D\u2642\uFE0F");
            return false;
        }
    }
    const cellsAround = bigCoords.reduce((acc, coord, i)=>{
        fleet.querySelector(`.${coord}`)?.classList.add("ship");
        const cellAttributes = (0, _helpers.selectCellsAround)(coord);
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
    const readyCellsAround = [
        ...new Set(cellsAround.replace(",", "").split(",").map((cell)=>cell.trim()).filter((cell)=>letters.includes(cell.slice(0, 1))))
    ];
    console.log(bigCoords, "flu");
    bigCoords.forEach((pos)=>{
        const cellEl = fleet.querySelector(`.${pos}`);
        cellEl?.classList.add("ship-color");
        cellEl && (cellEl.textContent = size);
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
    console.log(ships, "ships");
};

},{"./globalVars":"gb5d6","./helpers":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGI1E":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildShipBorder", ()=>buildShipBorder);
parcelHelpers.export(exports, "getSeaOpacityBack", ()=>getSeaOpacityBack);
parcelHelpers.export(exports, "closeNotificationWindow", ()=>closeNotificationWindow);
parcelHelpers.export(exports, "closeNotificationWindow2", ()=>closeNotificationWindow2);
parcelHelpers.export(exports, "allowForbidClick", ()=>allowForbidClick);
parcelHelpers.export(exports, "timerClock", ()=>timerClock);
parcelHelpers.export(exports, "startTimer", ()=>startTimer);
parcelHelpers.export(exports, "selectCellsAround", ()=>selectCellsAround);
var _globalVars = require("./globalVars");
var _showEndResults = require("./showEndResults");
var _showEndResultsDefault = parcelHelpers.interopDefault(_showEndResults);
let timer, labelContraryTimer;
const buildShipBorder = function(borderParts) {
    const ship = borderParts[0];
    const coord = borderParts[1];
    const i = borderParts[2];
    const arr = borderParts[3];
    const addBorder = borderParts[4];
    const color = borderParts[5] && borderParts[5];
    console.log(ship);
    ship.direction === "column" ? i === 0 && addBorder("borderTop", coord, color) : i === 0 && addBorder("borderLeft", coord, color);
    // 2. Add  bottom to the last cell
    ship.direction === "column" ? i === arr.length - 1 && addBorder("borderBottom", coord, color) : i === arr.length - 1 && addBorder("borderRight", coord, color);
    // 3. Right and left
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
const closeNotificationWindow = function() {
    (0, _globalVars.notificatonWindow).classList.add("hidden");
// overlay.classList.add("hidden");
};
const closeNotificationWindow2 = function() {
    (0, _globalVars.notificatonWindow2).classList.add("hidden");
// overlay.classList.add("hidden");
};
const allowForbidClick = function(fleet, state) {
    fleet.style.pointerEvents = state;
};
const timerClock = function(time, labelTimer) {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    return `${min}:${sec}`;
};
const startTimer = function(fleet, newGame = false) {
    // Timer feature
    if (newGame) {
        clearInterval(timer);
        return;
    }
    if (timer) {
        console.log(timer);
        clearInterval(timer);
    }
    const contraryFleet = fleet === (0, _globalVars.enemySideMyFleet) ? (0, _globalVars.mySideMyFleet) : (0, _globalVars.enemySideEnemyFleet);
    const timeLeftLabel = fleet.closest(".sea-container").querySelector(".timer-label");
    const timeContraryLeftLabel = contraryFleet.closest(".sea-container").querySelector(".timer-label");
    const labelTimer = fleet.closest(".sea-container").querySelector(".timer-time");
    timeLeftLabel.style.opacity = "100";
    labelContraryTimer = contraryFleet.closest(".sea-container").querySelector(".timer-time");
    timeContraryLeftLabel.style.opacity = "100";
    const tick = function() {
        labelContraryTimer.textContent = timerClock(time, labelTimer);
        if (time === 0) {
            clearInterval(timer);
            timeLeftLabel.style.opacity = "0";
            (0, _showEndResultsDefault.default)(fleet, true);
        }
        time--;
    };
    let time = 10;
    tick();
    timer = setInterval(tick, 1000);
};
const selectCellsAround = function(cell) {
    const coordSlice01 = cell.slice(0, 1);
    const coordSlice1 = cell.slice(1);
    const letterAround = (0, _globalVars.letters).indexOf(coordSlice01);
    const previousCell = coordSlice01 + (+coordSlice1 - 1);
    const nextCell = coordSlice01 + (+coordSlice1 + 1);
    const rightCell = (0, _globalVars.letters)[letterAround + 1] + coordSlice1;
    const leftCell = (0, _globalVars.letters)[letterAround - 1] + coordSlice1;
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

},{"./globalVars":"gb5d6","./showEndResults":"2csmh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2csmh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet, noTime = false) {
        const resultsMessage = document.querySelector(".results-message");
        const resultsMessage2 = document.querySelector(".results-message-2");
        const allShips = [
            ...fleet.querySelectorAll(".ship")
        ];
        const player1 = document.querySelector(".username-1").textContent;
        const player2 = document.querySelector(".username-2").textContent;
        const injuredShips = allShips.map((ship)=>{
            if (ship.classList.contains("injure")) return ship;
        }).filter((ship)=>{
            // It can be undefined
            if (ship) return ship;
        });
        console.log(fleet);
        const areAllShipsInjured = injuredShips.length === allShips.length;
        const runOutOfTime = noTime ? true : false;
        if (!areAllShipsInjured && !runOutOfTime) return;
        console.log(areAllShipsInjured, "areAll");
        console.log(runOutOfTime, "areAll");
        const composeMessage = function(messageEl, fleetSide) {
            messageEl.textContent !== "" && (messageEl.textContent = "");
            messageEl.insertAdjacentHTML("afterbegin", `You ${fleet === fleetSide ? "won" : "lost"} the battle! ${fleet === fleetSide ? "Congratulations! \uD83C\uDF8A" : "Get lucky other time \uD83D\uDE10"}`);
        };
        // Show notification window
        const openNotificationWindow = function() {
            const addNotification = function(player) {
                composeMessage(resultsMessage, (0, _globalVars.enemySideMyFleet));
                composeMessage(resultsMessage2, (0, _globalVars.mySideEnemyFleet));
            };
            fleet === (0, _globalVars.mySideEnemyFleet) && addNotification(player1);
            fleet !== (0, _globalVars.mySideEnemyFleet) && addNotification(player2);
            (0, _globalVars.notificatonWindow).classList.remove("hidden");
            (0, _globalVars.notificatonWindow2).classList.remove("hidden");
            // overlay.classList.remove("hidden");
            [
                (0, _globalVars.mySideEnemyFleet),
                (0, _globalVars.enemySideMyFleet)
            ].forEach((fleet)=>(0, _gameStartControl.playingCheck).playing && (fleet.style.pointerEvents = "none"), (0, _helpers.getSeaOpacityBack)());
        };
        (areAllShipsInjured || runOutOfTime) && openNotificationWindow();
        (areAllShipsInjured || runOutOfTime) && (0, _globalVars.allTimers).forEach((timerEl)=>{
            timerEl.style.opacity = "0";
        });
        (0, _globalVars.btnCloseNotificationWindow).addEventListener("click", (0, _helpers.closeNotificationWindow));
        // overlay.addEventListener("click", closeNotificationWindow);
        (0, _globalVars.btnCloseNotificationWindow2).addEventListener("click", (0, _helpers.closeNotificationWindow2));
    // overlay.addEventListener("click", closeNotificationWindow2);
    // document.addEventListener("keydown", function (e) {
    //   // console.log(e.key);
    //   e.key === "Escape" &&
    //     !notificatonWindow.classList.contains("hidden") &&
    //     !notificatonWindow2.classList.contains("hidden") &&
    //     closeNotificationWindow();
    // });
    });
var _globalVars = require("./globalVars");
var _gameStartControl = require("./gameStartControl");
var _helpers = require("./helpers");

},{"./globalVars":"gb5d6","./gameStartControl":"fXv0K","./helpers":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fXv0K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "playingCheck", ()=>playingCheck);
parcelHelpers.export(exports, "bothFleetsReady", ()=>bothFleetsReady);
parcelHelpers.export(exports, "newGameAgreement", ()=>newGameAgreement);
parcelHelpers.export(exports, "gameStartControl", ()=>gameStartControl);
var _globalVars = require("./globalVars");
var _helpers = require("./helpers");
const playingCheck = {
    playing: false
};
let bothFleetsReady = [];
let newGameAgreement = [];
let firstTurn = "";
let checkCells;
const gameStartControl = function(fleet, fleetParts) {
    // playing = false;
    const fleetIsEnemySideMyFleet = fleet === (0, _globalVars.enemySideMyFleet);
    const startPlaying = function(e) {
        playingCheck.playing = false;
        newGameAgreement.splice(0);
        fleet === (0, _globalVars.mySideEnemyFleet) && (firstTurn = Math.random());
        (fleetIsEnemySideMyFleet ? (0, _globalVars.startGameBtn) : (0, _globalVars.startGameBtn2)).setAttribute("disabled", true);
        (0, _helpers.allowForbidClick)(fleet, "none");
        console.log(fleet);
        const findCell = function(cell) {
            return `${(fleetIsEnemySideMyFleet ? (0, _globalVars.mySideMyFleet) : (0, _globalVars.enemySideEnemyFleet)).querySelector(`.${cell}`)?.classList[0]}`;
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
            // [[findCell("cell2")], [0].length],
            // [[findCell("cell3")], [0].length],
            // [
            //   [findCell("cell4"), findCell("cell5"), findCell("cell6")],
            //   [0, 0, 0].length,
            // ],
            // [[findCell("cell7"), findCell("cell8")], [0, 0].length],
            [
                [
                    findCell("cell3"),
                    findCell("cell4"),
                    findCell("cell5")
                ],
                3
            ],
            // [[findCell("cell12"), findCell("cell14")], [0, 0].length],
            [
                [
                    findCell("cell6"),
                    findCell("cell7")
                ],
                2
            ],
            [
                [
                    findCell("cell8"),
                    findCell("cell9"),
                    findCell("cell10"),
                    findCell("cell11")
                ],
                4
            ]
        ];
        let createMoreShips = [
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
            // [[findCell("cell2")], [0].length],
            // [[findCell("cell3")], [0].length],
            // [[findCell("cell4")], [0].length],
            [
                [
                    findCell("cell6"),
                    findCell("cell7"),
                    findCell("cell8"),
                    findCell("cell9")
                ],
                4
            ],
            [
                [
                    findCell("cell3"),
                    findCell("cell4"),
                    findCell("cell5")
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
                    findCell("cell10"),
                    findCell("cell11")
                ],
                2
            ]
        ];
        const createManuallyPlacedShips = function(createSource, ships) {
            ships.splice(0);
            const sortCoords = createSource.map((ship)=>{
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
                if (createShip(sortedCoords, ship[1], fleetParts) === false) return false;
                if (sortedCoords.length === 4) {
                    const inBetweenShipParts = sortedCoords.filter((cell, i, arr)=>{
                        return i !== 0 && i !== arr.length - 1;
                    });
                    checkCells = inBetweenShipParts.map((cell)=>{
                        fleet.querySelector(`.${cell}`).classList;
                        const cellAttrbs = (0, _helpers.selectCellsAround)(cell);
                        const selectCell = function(cell) {
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
                    console.log(inBetweenShipParts, "inBetween");
                    console.log(checkCells.flat(2), "check");
                }
            });
            return sortCoords;
        };
        const checkProperShipPlacement = function() {
            const resetWrongShipPlacement = function() {
                console.log("Place your ships in the right way, \uD83D\uDC12");
                (fleetIsEnemySideMyFleet ? (0, _globalVars.startGameBtn) : (0, _globalVars.startGameBtn2)).removeAttribute("disabled", true);
                [
                    ...fleet.querySelectorAll("td")
                ].forEach((cell)=>{
                    cell.querySelector(".ship")?.remove();
                    cell.removeAttribute("style");
                    cell.querySelector(".cell").textContent = "";
                }), console.log(fleetParts[1]);
                fleetParts[1].splice(0);
                return false;
            };
            if (createManuallyPlacedShips(fleetIsEnemySideMyFleet ? createFleetShips : createMoreShips, fleetIsEnemySideMyFleet ? (0, _globalVars.enemySideMyShips) : (0, _globalVars.mySideEnemyShips)).includes(false) || checkCells.flat(2).length !== 4) return resetWrongShipPlacement();
        };
        if (checkProperShipPlacement() === false) {
            console.log("Yeah, that is wrong");
            return;
        }
        bothFleetsReady.push(true);
        (0, _helpers.allowForbidClick)(fleetIsEnemySideMyFleet ? (0, _globalVars.mySideMyFleet) : (0, _globalVars.enemySideEnemyFleet), "none");
        [
            ...document.querySelectorAll(".ship")
        ].forEach((shipEl)=>{
            bothFleetsReady.length === 2 && (shipEl.textContent = "");
        });
        const ships = fleetParts[1];
        const submarines = ships.filter((ship)=>{
            const shipEl = fleet.querySelector(`.${ship.coords[0]}`);
            console.log(shipEl.classList[0]);
            return ship.coords.length === 1;
        });
        const rewardSubmarine = Math.trunc(Math.random() * 2) + 1;
        console.log(rewardSubmarine);
        console.log(submarines);
        submarines.forEach((submarine, i)=>{
            i + 1 === rewardSubmarine && fleet.querySelector(`.${submarine.coords[0]}`).nextElementSibling.classList.add("reward");
        });
        (0, _globalVars.bothSideShips).push(ships);
        const addBorder = function(borderSide, coord) {
            const fleetSide = fleetIsEnemySideMyFleet ? (0, _globalVars.mySideMyFleet) : (0, _globalVars.enemySideEnemyFleet);
            fleetSide && (fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[borderSide] = "2px solid #3bc9db");
        };
        if (bothFleetsReady.length === 1) {
            (fleet === (0, _globalVars.mySideEnemyFleet) ? (0, _globalVars.enemySideEnemyFleet) : (0, _globalVars.mySideMyFleet)).querySelectorAll(".ship").forEach((ship)=>{
                ship.classList.remove("ship-color");
                ship.textContent = "";
            });
            fleet.querySelectorAll(".ship").forEach((ship)=>{
                ship.classList.remove("ship-color");
                ship.textContent = "";
            });
        }
        bothFleetsReady.length === 2 && [
            (0, _globalVars.mySideMyFleet),
            (0, _globalVars.enemySideEnemyFleet)
        ].forEach((fleet)=>{
            fleet.querySelectorAll(`.ship`).forEach((ship)=>{
                ship.style.backgroundColor = "#e6fcf5";
            });
        });
        ships.map((ship, i)=>{
            ship.coords.map((coord, i, arr)=>{
                (0, _helpers.buildShipBorder)([
                    ship,
                    coord,
                    i,
                    arr,
                    addBorder
                ]);
            });
        });
        if (fleet !== (0, _globalVars.mySideEnemyFleet) && fleet !== (0, _globalVars.enemySideMyFleet)) return;
        fleet === (0, _globalVars.mySideEnemyFleet) && (0, _globalVars.bothSideShips).push("mySideEnemyFleet");
        fleetIsEnemySideMyFleet && (0, _globalVars.bothSideShips).push("enemySideMyFleet");
        // bothSideShips.includes('mySideEnemyFleet') ||  bothSideShips.includes('mySideEnemyFleet')
        const flattenedBothSideShips = (0, _globalVars.bothSideShips).flat(2);
        console.log(flattenedBothSideShips, "both");
        // flattenedBothSideShips.length === createFleetShips.length + 1  &&
        //   ((fleetIsEnemySideMyFleet ? startGameBtn : startGameBtn2).textContent =
        //     "Waiting for the opponent...");
        (fleetIsEnemySideMyFleet ? (0, _globalVars.startGameBtn) : (0, _globalVars.startGameBtn2)).style.display = "none";
        (fleetIsEnemySideMyFleet ? (0, _globalVars.waitingForOpponentLabel1) : (0, _globalVars.waitingForOpponentLabel2)).style.opacity = "100";
        if (flattenedBothSideShips.length === createFleetShips.length * 2 + 2) [
            (0, _globalVars.waitingForOpponentLabel1),
            (0, _globalVars.waitingForOpponentLabel2)
        ].forEach((label)=>{
            label.style.opacity = "0";
        });
        // [startGameBtn, startGameBtn2].forEach((btn) => {
        //   btn.style.display = "none";
        // });
        console.log(flattenedBothSideShips);
        if (flattenedBothSideShips.length === createFleetShips.length * 2 + 2 && flattenedBothSideShips.includes("mySideEnemyFleet") && flattenedBothSideShips.includes("enemySideMyFleet")) {
            playingCheck.playing = true;
            console.log("Game started \uD83E\uDD70");
            console.log(playingCheck.playing, "playing");
            // Disable right-click
            // document.addEventListener("contextmenu", (e) => e.preventDefault());
            // function ctrlShiftKey(e, key) {
            //   return e.ctrlKey && e.shiftKey && e.key === key.charCodeAt(0);
            // }
            // (document.onkeydown = (e) => {
            //   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
            //   if (
            //     e.key === 123 ||
            //     ctrlShiftKey(e, "I") ||
            //     ctrlShiftKey(e, "J") ||
            //     ctrlShiftKey(e, "C") ||
            //     (e.ctrlKey && e.key === "U".charCodeAt(0))
            //   )
            //     return false;
            // }),
            // Making sure that I will not destroy my own ship ;)
            (0, _helpers.allowForbidClick)((0, _globalVars.mySideMyFleet), "none"), (0, _helpers.allowForbidClick)((0, _globalVars.enemySideEnemyFleet), "none");
        }
        console.log(firstTurn);
        if (!playingCheck.playing) return;
        (0, _helpers.getSeaOpacityBack)();
        (0, _globalVars.mySideEnemyFleet) && (firstTurn < 0.5 && ((0, _helpers.allowForbidClick)((0, _globalVars.mySideEnemyFleet), "auto"), (0, _helpers.startTimer)((0, _globalVars.mySideEnemyFleet)), (0, _globalVars.enemySideMyFleet).closest(".sea").style.opacity = "0.7"), firstTurn >= 0.5 && ((0, _helpers.allowForbidClick)((0, _globalVars.enemySideMyFleet), "auto"), (0, _helpers.startTimer)((0, _globalVars.enemySideMyFleet)), (0, _globalVars.mySideEnemyFleet).closest(".sea").style.opacity = "0.7"));
        [
            (0, _globalVars.newGameBtn),
            (0, _globalVars.newGameBtn2)
        ].forEach((btn)=>{
            console.log("btn");
            btn.removeAttribute("disabled", true);
        });
    };
    fleet !== (0, _globalVars.mySideMyFleet) && fleet !== (0, _globalVars.enemySideEnemyFleet) && (fleetIsEnemySideMyFleet ? (0, _globalVars.startGameBtn) : (0, _globalVars.startGameBtn2)).addEventListener("click", startPlaying);
}; // Nice idea about making binoculars for 10 seconds to find more ships
 // Binoculars feature:
 // 1. When you destroyed a ship for which destruction there should be an award in a kind of magic video camera then for 10 seconds hovering effect on ships will be different from hovering effect on empty cells
 // If destroyed ship has reward class then add binoculars to the fleet on which that ship was destroyed, but before I need randomly add this reward class to the ship in the beginning of the game
 // Take all ship's classes and assign one of them to the ship

},{"./globalVars":"gb5d6","./helpers":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iXTJE":[function(require,module,exports) {
var _globalVars = require("./globalVars");
let markup = (0, _globalVars.seaFleet).map((item, i)=>`
     <tr class="row-${i + 1}">
 ${(0, _globalVars.letters).map((letter)=>`<td class="dropzone"><div class="${letter}${i + 1} cell"></div></td>`).join("")}
</tr>
`).join("");
let markupSeaHead = ` ${(0, _globalVars.seaFleet).map((_, i)=>{
    return i > 0 ? `<th>${(0, _globalVars.letters)[i]}</th>` : ` 
        <th>${(0, _globalVars.letters)[i]}</th>`;
}).join("")}`;
let markupLetters = ` ${(0, _globalVars.seaFleet).map((item, i)=>{
    return `<p class="column-letter column-letter-${i + 1}">${(0, _globalVars.letters)[i]}</p>`;
}).join("")}`;
let markupNumbers = ` ${(0, _globalVars.seaFleet).map((item, i)=>{
    return `<p class="row-number row-number-${i + 1}">${i + 1}</p>`;
}).join("")}`;
[
    (0, _globalVars.mySideMyFleet),
    (0, _globalVars.mySideEnemyFleet),
    (0, _globalVars.enemySideEnemyFleet),
    (0, _globalVars.enemySideMyFleet)
].forEach((container)=>{
    container.insertAdjacentHTML("afterbegin", markup);
});
[
    ...(0, _globalVars.seas)
].forEach((sea)=>{
    sea.querySelector("tr").insertAdjacentHTML("afterbegin", markupSeaHead);
    // sea.insertAdjacentHTML("afterbegin", markupLetters);
    sea.insertAdjacentHTML("afterbegin", markupNumbers);
}); // [...seaContainers].forEach((seaContainer) => {
 //   seaContainer.insertAdjacentHTML("afterbegin", markupLetters);
 //   seaContainer.insertAdjacentHTML("afterbegin", markupNumbers);
 // });

},{"./globalVars":"gb5d6"}],"3iktl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet, fleetParts) {
        let dragged;
        const shipEls = fleet.querySelectorAll(".ship");
        const ships = fleetParts[1];
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
            fleet.querySelector(`.${dragged?.classList[dragged.classList.length - 1]}`);
        });
        [
            "dragover",
            "dragenter",
            "dragleave",
            "drop"
        ].forEach((ev)=>{
            fleet.addEventListener(ev, function(e) {
                e.target.classList.contains("dropzone") && (console.log(ev), e.target.classList.remove("dragover"));
                if (ev === "drop") {
                    e.preventDefault(), console.log(dragged, e.target);
                    if (e.target.classList.contains("ship")) return;
                    // !e.target.classList.contains("ship") &&
                    e.target.appendChild(dragged);
                    const movedShipPart = dragged.classList[dragged.classList.length - 1];
                    console.log(movedShipPart);
                    fleet.querySelector(`.${movedShipPart}`).classList.replace(fleet.querySelector(`.${movedShipPart}`).classList[0], e.target.querySelector("div")?.classList[0]);
                }
                const checkDragoverE = function() {
                    e.preventDefault();
                    console.log(e, "put");
                    if (ev !== "dragover") return;
                    if (e.target.classList.contains("ship") || e.target.classList.length === 0) return;
                    e.target.classList.add("dragover");
                };
                checkDragoverE();
            }, ev === "dragover" && false);
        });
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dx0uc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet) {
        (0, _globalVars.mySideMyFleet).classList.add("player0");
        (0, _gameStartControl.playingCheck).playing === true && ((0, _globalVars.enemySideMyFleet).style.pointerEvents = "none");
        [
            (0, _globalVars.mySideEnemyFleet),
            (0, _globalVars.enemySideMyFleet)
        ].forEach((fleet)=>{
            console.log((0, _gameStartControl.playingCheck).playing);
            fleet.addEventListener("click", function(e) {
                if (e.target.classList.contains("ship") || e.target.textContent !== "" || e.target.querySelector(".ship")?.classList.contains("ship")) return;
                const turn = (0, _gameStartControl.playingCheck).playing && fleet === (0, _globalVars.enemySideMyFleet) ? (0, _globalVars.mySideEnemyFleet) : (0, _globalVars.enemySideMyFleet);
                if ((0, _gameStartControl.playingCheck).playing) {
                    turn.style.pointerEvents = "auto", fleet.closest(".sea").style.opacity = "0.7";
                    (0, _helpers.startTimer)(turn);
                    fleet.closest(".sea-container").querySelector(".timer-label") && (fleet.closest(".sea-container").querySelector(".timer-label").style.opacity = "0");
                    const fleetSide = fleet === (0, _globalVars.enemySideMyFleet) ? (0, _globalVars.mySideMyFleet) : (0, _globalVars.enemySideEnemyFleet);
                    fleetSide.closest(".sea-container").querySelector(".timer-label").style.opacity = "0";
                }
                (0, _gameStartControl.playingCheck).playing && (fleet.style.pointerEvents = "none"), turn.closest(".sea").style.opacity = "1";
            });
        });
    });
var _globalVars = require("./globalVars");
var _gameStartControl = require("./gameStartControl");
var _helpers = require("./helpers");

},{"./globalVars":"gb5d6","./gameStartControl":"fXv0K","./helpers":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6WpIw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(fleet, ships) {
        const shootingLogic = function(e) {
            e.preventDefault();
            console.log(e.target, "target");
            if (!(0, _gameStartControl.playingCheck).playing || e.target.querySelector(".ship")?.classList.contains("ship")) {
                console.log("dropzone");
                return;
            }
            const miss = "&bull;";
            const addMarkToFleet = function(fleet) {
                if (e.target.classList[0] === "dropzone") return fleet.querySelector(`.${e.target.querySelector("div").classList[0]}`);
                if (e.target.classList[0] !== "dropzone") return fleet.querySelector(`.${e.target.classList[0]}`);
            };
            const addMissMark = function() {
                if (e.target.textContent !== "") return;
                e.target.querySelector("div").classList.add("miss");
                e.target.querySelector("div").insertAdjacentHTML("afterbegin", miss);
                e.target.closest(".enemy-side--my-fleet")?.querySelector(`.${e.target.classList[0]}`) && (addMarkToFleet((0, _globalVars.mySideMyFleet)).classList.add("miss"), addMarkToFleet((0, _globalVars.mySideMyFleet)).insertAdjacentHTML("afterbegin", miss)), !e.target.closest(".enemy-side--my-fleet")?.querySelector(`.${e.target.classList[0]}`) && (addMarkToFleet((0, _globalVars.enemySideEnemyFleet)).classList.add("miss"), addMarkToFleet((0, _globalVars.enemySideEnemyFleet)).insertAdjacentHTML("afterbegin", miss));
            };
            !e.target.closest(".ship") && addMissMark();
            if (e.target.closest(".ship")?.textContent !== "") return;
            const injuredShipPos = ships.findIndex((ship)=>{
                return ship?.coords?.includes(e.target.classList[0]);
            });
            console.log(ships);
            e.target.classList.add("injure");
            const injure = "&cross;";
            e.target.insertAdjacentHTML("afterbegin", injure);
            const destroyedShipCoords = ships[injuredShipPos].coords.map((_, i)=>{
                return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`).nextElementSibling.classList.contains("injure");
            });
            e.target.closest(".enemy-side--my-fleet")?.querySelector(`.${e.target.classList[0]}`) && (addMarkToFleet((0, _globalVars.mySideMyFleet)).nextElementSibling.insertAdjacentHTML("afterbegin", injure), addMarkToFleet((0, _globalVars.mySideMyFleet)).nextElementSibling.classList.add("injure"), (0, _helpers.startTimer)(fleet));
            !e.target.closest(".enemy-side--my-fleet")?.querySelector(`.${e.target.classList[0]}`) && (addMarkToFleet((0, _globalVars.enemySideEnemyFleet)).nextElementSibling.insertAdjacentHTML("afterbegin", injure), addMarkToFleet((0, _globalVars.enemySideEnemyFleet)).nextElementSibling.classList.add("injure"), (0, _helpers.startTimer)(fleet));
            if (destroyedShipCoords.includes(false)) return;
            const addBorder = function(borderSide, coord, color = "#ff6f6f") {
                const selectTd = function(fleetSide) {
                    fleetSide.querySelector(`.${coord}`).closest(".dropzone").style[borderSide] = `2px solid ${color} `;
                };
                selectTd(fleet);
                selectTd(fleet === (0, _globalVars.enemySideMyFleet) ? (0, _globalVars.mySideMyFleet) : (0, _globalVars.enemySideEnemyFleet));
            };
            ships[injuredShipPos].coords.map((coord, i, arr)=>{
                (0, _helpers.buildShipBorder)([
                    ships[injuredShipPos],
                    coord,
                    i,
                    arr,
                    addBorder
                ]);
                if (ships[injuredShipPos].coords.length !== 1) return;
                const rewardShip = fleet.querySelector(`.${coord}`).nextElementSibling.classList.contains("reward");
                if (!rewardShip) return;
                fleet.classList.add("binoculars");
                const labelBinocularsReward = fleet.closest(".sea-container").querySelector(".binoculars-reward-label");
                const labelTimer = fleet.closest(".sea-container").querySelector(".timer");
                labelBinocularsReward.style.opacity = "100";
                const tick = function() {
                    (0, _helpers.timerClock)(time, labelTimer);
                    if (time === 0) {
                        clearInterval(timer);
                        labelBinocularsReward.style.opacity = "0";
                        fleet.classList.remove("binoculars");
                        console.log("Magic item removed");
                    }
                    time--;
                };
                let time = 3;
                tick();
                const timer = setInterval(tick, 1000);
            });
            const destroyedShip = ships[injuredShipPos].coords.map((cell, i)=>{
                return fleet.querySelector(`.${ships[injuredShipPos]?.coords[i]}`);
            });
            const filledAreaAroundShip = ships[injuredShipPos].unavailabeCells.filter((cell)=>{
                // Filtering out coords on which the ship inself is placed, because unavailableCells also included them
                return !ships[injuredShipPos].coords.includes(cell);
            }).filter((cell)=>{
                return fleet.querySelector(`.${cell}`)?.textContent === "";
            }).map((cell, i, arr)=>{
                console.log(new Date());
                const cellAround = fleet.querySelector(`.${cell}`);
                console.log(cellAround, "cellAround");
                // There is also can be an imaginary 11th cell when it comes to side ships(because unavailableCells contains them, but only for conveniency reason), so there is a check whether that cell exists or not, because there is no 11th cell exists in the sea(Means that this could be misunderstood as if 11th cell exists but transparent)
                cellAround && (cellAround.style.fontSize = "3.2rem");
                const surroundDestroyedShip = function(fleet, cellAround) {
                    console.log(new Date());
                    cellAround?.textContent === "" && fleet.querySelector(`.${cell}`)?.insertAdjacentHTML("afterbegin", miss);
                    !cellAround?.classList.contains("miss") && cellAround?.classList.add("cell-around");
                    cellAround && (cellAround.style.fontSize = "3.2rem");
                    cellAround.classList.contains("injure") && (cellAround.style.fontSize = "3.2rem");
                    cellAround.style.visibility = "hidden";
                    setTimeout(function() {
                        cellAround.style.visibility = "visible";
                    }, i * 100);
                };
                const markContraryFleet = function(fleet) {
                    const cellAroundContrarySide = fleet.querySelector(`.${cell}`);
                    surroundDestroyedShip(fleet, cellAroundContrarySide);
                };
                e.target.closest(".ship").closest(".enemy-side--my-fleet") && markContraryFleet((0, _globalVars.mySideMyFleet));
                e.target.closest(".ship").closest(".my-side--enemy-fleet") && markContraryFleet((0, _globalVars.enemySideEnemyFleet));
                // If the cell is empty then a new mark will be inserted, but if there is something inside then nothing will happen
                surroundDestroyedShip(fleet, cellAround);
            });
            /**************************/ /* CONTROLLING THE END OF THE GAME */ /**************************/ (0, _showEndResultsDefault.default)(fleet);
        };
        fleet.addEventListener("click", function(e) {
            shootingLogic(e);
        });
    });
var _globalVars = require("./globalVars");
var _showEndResults = require("./showEndResults");
var _showEndResultsDefault = parcelHelpers.interopDefault(_showEndResults);
var _gameStartControl = require("./gameStartControl");
var _helpers = require("./helpers");

},{"./globalVars":"gb5d6","./showEndResults":"2csmh","./gameStartControl":"fXv0K","./helpers":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGRP7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startNewGame", ()=>startNewGame);
var _gameStartControl = require("./gameStartControl");
var _globalVars = require("./globalVars");
var _helpers = require("./helpers");
var _placeShipsManually = require("./placeShipsManually");
var _placeShipsManuallyDefault = parcelHelpers.interopDefault(_placeShipsManually);
const startNewGame = function(fleet, fleetParts) {
    const fleetIsMySideMyFleet = fleet === (0, _globalVars.mySideMyFleet);
    const submitBtn = document.querySelector(`.submit-username--fleet-${fleetIsMySideMyFleet ? 1 : 2}`);
    const inputPlayer1Username = document.querySelector(".fill-username--player-1");
    const inputPlayer2Username = document.querySelector(".fill-username--player-2");
    const username1Label = document.querySelector(".username-1");
    const username2Label = document.querySelector(".username-2");
    console.log(inputPlayer1Username);
    const submitUsernames = function() {
        inputPlayer1Username.value = "player-1";
        inputPlayer2Username.value = "player-2";
        submitBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const checkUsernameCase = function(input) {
                return input.value.toLowerCase().slice(0, 1).toUpperCase() + input.value.slice(1).toLowerCase() + "'s ships";
            };
            const player1Username = checkUsernameCase(inputPlayer1Username);
            const player2Username = checkUsernameCase(inputPlayer2Username);
            if (fleetIsMySideMyFleet ? player1Username.length < 2 : player2Username.length < 2) {
                console.log("Your username should contains atleast 2 letters");
                return;
            }
            (fleetIsMySideMyFleet ? username1Label : username2Label).textContent = "";
            const playerUsername = fleetIsMySideMyFleet ? player1Username : player2Username;
            const usernameLabel = fleetIsMySideMyFleet ? username1Label.insertAdjacentHTML("afterbegin", playerUsername) : username2Label.insertAdjacentHTML("afterbegin", playerUsername);
            fleetIsMySideMyFleet ? inputPlayer1Username.value = "" : inputPlayer2Username.value = "";
            console.log(playerUsername);
        });
    };
    submitUsernames();
    (fleetIsMySideMyFleet ? (0, _globalVars.newGameBtn) : (0, _globalVars.newGameBtn2)).addEventListener("click", function(e) {
        fleetIsMySideMyFleet && !(0, _gameStartControl.newGameAgreement).includes("mySideMyFleet") && (0, _gameStartControl.newGameAgreement).push("mySideMyFleet");
        fleet === (0, _globalVars.enemySideEnemyFleet) && !(0, _gameStartControl.newGameAgreement).includes("enemySideEnemyFleet") && (0, _gameStartControl.newGameAgreement).push("enemySideEnemyFleet");
        if ((0, _gameStartControl.newGameAgreement).length !== 2) return;
        const refreshFleets = function() {
            (0, _helpers.closeNotificationWindow)();
            (0, _helpers.closeNotificationWindow2)();
            (fleetIsMySideMyFleet ? (0, _globalVars.startGameBtn) : (0, _globalVars.startGameBtn2)).removeAttribute("disabled", true);
            (0, _helpers.getSeaOpacityBack)();
            (0, _globalVars.allTimers).forEach((timerEl)=>{
                timerEl.style.opacity = "0";
            });
            (0, _helpers.startTimer)(fleet, true);
            (0, _gameStartControl.playingCheck).playing = false;
            [
                [
                    (0, _globalVars.mySideMyFleet),
                    "auto"
                ],
                [
                    (0, _globalVars.enemySideEnemyFleet),
                    "auto"
                ],
                [
                    (0, _globalVars.mySideEnemyFleet),
                    "none"
                ],
                [
                    (0, _globalVars.enemySideMyFleet),
                    "none"
                ]
            ].forEach((item)=>(0, _helpers.allowForbidClick)(...item));
            const clearFleets = function() {
                [
                    ...document.querySelectorAll("td")
                ].forEach((cell)=>{
                    cell.querySelector(".ship")?.remove();
                    cell.querySelector(".miss")?.classList.remove("miss");
                    cell.removeAttribute("style");
                    cell.querySelector(".cell-around")?.classList.remove("cell-around");
                    cell.querySelector(".cell").textContent = "";
                }), (0, _globalVars.mySideMyShips).splice(0), (0, _globalVars.enemySideEnemyShips).splice(0), (0, _globalVars.createMyShips).forEach((ship)=>{
                    createShip(...ship, [
                        (0, _globalVars.mySideMyFleet),
                        (0, _globalVars.mySideMyShips),
                        (0, _globalVars.createMyShips)
                    ]);
                }), (0, _globalVars.createEnemyShips).forEach((ship)=>{
                    createShip(...ship, [
                        (0, _globalVars.enemySideEnemyFleet),
                        (0, _globalVars.enemySideEnemyShips),
                        (0, _globalVars.createEnemyShips)
                    ]);
                }), (0, _globalVars.newGameBtn).setAttribute("disabled", true), (0, _globalVars.newGameBtn2).setAttribute("disabled", true), (0, _globalVars.startGameBtn).removeAttribute("disabled", true), (0, _globalVars.startGameBtn2).removeAttribute("disabled", true), (0, _globalVars.startGameBtn).style.display = "", (0, _globalVars.startGameBtn2).style.display = "", (0, _globalVars.startGameBtn).textContent = "Ready to start", (0, _globalVars.startGameBtn2).textContent = "Ready to start", (0, _gameStartControl.bothFleetsReady).splice(0);
                (0, _globalVars.bothSideShips).splice(0);
            };
            fleetIsMySideMyFleet && clearFleets();
            fleet === (0, _globalVars.enemySideEnemyFleet) && clearFleets();
            (0, _placeShipsManuallyDefault.default)((0, _globalVars.mySideMyFleet), [
                (0, _globalVars.mySideMyFleet),
                (0, _globalVars.mySideMyShips),
                (0, _globalVars.createMyShips)
            ]);
            (0, _placeShipsManuallyDefault.default)((0, _globalVars.enemySideEnemyFleet), [
                (0, _globalVars.enemySideEnemyFleet),
                (0, _globalVars.enemySideEnemyShips),
                (0, _globalVars.createEnemyShips)
            ]);
        };
        refreshFleets();
    });
};

},{"./gameStartControl":"fXv0K","./globalVars":"gb5d6","./helpers":"hGI1E","./placeShipsManually":"3iktl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["f0HGD","aenu9"], "aenu9", "parcelRequire3129")

//# sourceMappingURL=index.e37f48ea.js.map
