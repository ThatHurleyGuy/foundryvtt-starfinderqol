/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ChatManager.ts":
/*!****************************!*\
  !*** ./src/ChatManager.ts ***!
  \****************************/
/*! exports provided: sendHitMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendHitMessage", function() { return sendHitMessage; });
const sendHitMessage = async (templateData, actor) => {
    const messageContent = await renderTemplate("modules/starfinderqol/public/templates/hits.html", templateData);
    const chatData = {
        user: game.user._id,
        speaker: { actor, alias: actor === null || actor === void 0 ? void 0 : actor.name },
        content: messageContent,
    };
    ChatMessage.create(chatData);
};


/***/ }),

/***/ "./src/Logger.ts":
/*!***********************!*\
  !*** ./src/Logger.ts ***!
  \***********************/
/*! exports provided: log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
function log(...args) { console.log("Starfinder Qol | ", ...args); }


/***/ }),

/***/ "./src/Macro.ts":
/*!**********************!*\
  !*** ./src/Macro.ts ***!
  \**********************/
/*! exports provided: createMacro */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMacro", function() { return createMacro; });
const createMacro = async (item, slot) => {
    const command = `StarfinderQOL.doRoll(event, "${item.name}")`;
    const macro = await Macro.create({
        name: `${item.name} - ${item.type}`,
        type: "script",
        img: item.img,
        command,
        flags: { "starfinderqol.itemMacro": true },
    });
    await game.user.assignHotbarMacro(macro, slot);
};


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! exports provided: doRoll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doRoll", function() { return doRoll; });
/* harmony import */ var _ChatManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatManager */ "./src/ChatManager.ts");
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logger */ "./src/Logger.ts");
/* harmony import */ var _Macro__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Macro */ "./src/Macro.ts");
/* harmony import */ var _Socket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Socket */ "./src/Socket.ts");




const handleDamagePost = async (message) => {
    Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])("Handling damage");
    const token = canvas.tokens.get(message.data.targetId);
    await token.actor.update({
        "data.attributes.hp.value": token.actor.data.data.attributes.hp.value - message.data.totalDamage,
    });
};
const processSocketMessage = async (message) => {
    switch (message.actionName) {
        case "action_name":
            if (!game.user.isGM) {
                break;
            }
            await handleDamagePost(message);
            break;
    }
};
let manager;
Hooks.once("init", async () => {
    Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])("Initializing starfinder-qol");
    window.StarfinderQOL = {
        doRoll,
    };
});
Hooks.once("ready", async () => {
    manager = new _Socket__WEBPACK_IMPORTED_MODULE_3__["Manager"](processSocketMessage);
});
// export async function doRoll(event, itemName, {type = "weapon", versatile=false, token = null}={type:"weapon", versatile: false, token: null}) {
async function doRoll(event, itemName) {
    const speaker = ChatMessage.getSpeaker();
    const token = canvas.tokens.get(speaker.token);
    const initiateActor = token ? token.actor : game.actors.get(speaker.actor);
    game.user.targets.forEach(async (target) => {
        const intendedGM = game.users.entities.find((u) => u.isGM && u.active);
        const attackData = {
            targetId: target.data._id,
            totalDamage: 9,
        };
        const socketMessage = new _Socket__WEBPACK_IMPORTED_MODULE_3__["Message"]("action_name", intendedGM.id, "foobarbazmessage", attackData);
        manager.broadcastData(socketMessage);
        const actor = target.actor;
        const item = initiateActor.items.find((i) => i.name === itemName);
        const attributes = actor.data.data.attributes;
        await item.rollAttack({ event });
        const templateData = {
            targetAttributes: attributes,
            damageAppliedString: "Nailed it.",
        };
        Object(_ChatManager__WEBPACK_IMPORTED_MODULE_0__["sendHitMessage"])(templateData, actor);
    });
}
Hooks.on("hotbarDrop", (_hotbar, data, slot) => {
    Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])("Handling hotbarDrop");
    Object(_Macro__WEBPACK_IMPORTED_MODULE_2__["createMacro"])(data.data, slot);
    return false;
});


/***/ }),

/***/ "./src/Socket.ts":
/*!***********************!*\
  !*** ./src/Socket.ts ***!
  \***********************/
/*! exports provided: Message, Manager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return Manager; });
/* harmony import */ var _Logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logger */ "./src/Logger.ts");

const moduleSocket = "module.starfinderqol";
class Message {
    constructor(actionName, message, intendedFor, data) {
        this.actionName = actionName;
        this.message = message;
        this.intendedFor = intendedFor;
        this.data = data;
    }
}
class Manager {
    constructor(callback) {
        this.callback = callback;
        this.socket = game.socket;
        this.socket.on(moduleSocket, (message) => {
            Object(_Logger__WEBPACK_IMPORTED_MODULE_0__["log"])("Processing socket message");
            callback(message);
        });
    }
    broadcastData(message) {
        // if not a gm broadcast the message to a gm who can apply the damage
        if (game.user.id !== message.intendedFor) {
            this.socket.emit(moduleSocket, message);
        }
        else {
            this.callback(message);
        }
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoYXRNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hY3JvLnRzIiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9Tb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQU8sTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFlBQWlCLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxjQUFjLENBQUMsa0RBQWtELEVBQUUsWUFBWSxDQUFDO0lBQzdHLE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FB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dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvTWFpbi50c1wiKTtcbiIsImV4cG9ydCBjb25zdCBzZW5kSGl0TWVzc2FnZSA9IGFzeW5jICh0ZW1wbGF0ZURhdGE6IGFueSwgYWN0b3I6IGFueSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gYXdhaXQgcmVuZGVyVGVtcGxhdGUoXCJtb2R1bGVzL3N0YXJmaW5kZXJxb2wvcHVibGljL3RlbXBsYXRlcy9oaXRzLmh0bWxcIiwgdGVtcGxhdGVEYXRhKVxuICAgIGNvbnN0IGNoYXREYXRhID0ge1xuICAgICAgdXNlcjogZ2FtZS51c2VyLl9pZCxcbiAgICAgIHNwZWFrZXI6IHsgYWN0b3IsIGFsaWFzOiBhY3Rvcj8ubmFtZSB9LFxuICAgICAgY29udGVudDogbWVzc2FnZUNvbnRlbnQsXG4gICAgfVxuICAgIENoYXRNZXNzYWdlLmNyZWF0ZShjaGF0RGF0YSlcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBsb2coLi4uYXJnczogYW55W10pOiB2b2lkIHsgY29uc29sZS5sb2coXCJTdGFyZmluZGVyIFFvbCB8IFwiLCAuLi5hcmdzKSB9XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlTWFjcm8gPSBhc3luYyAoaXRlbTogYW55LCBzbG90OiBudW1iZXIpID0+IHtcbiAgY29uc3QgY29tbWFuZCA9IGBTdGFyZmluZGVyUU9MLmRvUm9sbChldmVudCwgXCIke2l0ZW0ubmFtZX1cIilgXG4gIGNvbnN0IG1hY3JvID0gYXdhaXQgTWFjcm8uY3JlYXRlKHtcbiAgICBuYW1lOiBgJHtpdGVtLm5hbWV9IC0gJHtpdGVtLnR5cGV9YCxcbiAgICB0eXBlOiBcInNjcmlwdFwiLFxuICAgIGltZzogaXRlbS5pbWcsXG4gICAgY29tbWFuZCxcbiAgICBmbGFnczogeyBcInN0YXJmaW5kZXJxb2wuaXRlbU1hY3JvXCI6IHRydWUgfSxcbiAgfSkgYXMgTWFjcm9cbiAgYXdhaXQgZ2FtZS51c2VyLmFzc2lnbkhvdGJhck1hY3JvKG1hY3JvLCBzbG90KVxufVxuIiwiaW1wb3J0IHtzZW5kSGl0TWVzc2FnZX0gZnJvbSBcIi4vQ2hhdE1hbmFnZXJcIlxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vTG9nZ2VyXCJcbmltcG9ydCB7Y3JlYXRlTWFjcm99IGZyb20gXCIuL01hY3JvXCJcbmltcG9ydCB7TWFuYWdlciwgTWVzc2FnZX0gZnJvbSBcIi4vU29ja2V0XCJcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHsgU3RhcmZpbmRlclFPTDogYW55IH1cbn1cblxuY29uc3QgaGFuZGxlRGFtYWdlUG9zdCA9IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gIGxvZyhcIkhhbmRsaW5nIGRhbWFnZVwiKVxuICBjb25zdCB0b2tlbiA9IGNhbnZhcy50b2tlbnMuZ2V0KG1lc3NhZ2UuZGF0YS50YXJnZXRJZClcbiAgYXdhaXQgdG9rZW4uYWN0b3IudXBkYXRlKHtcbiAgICBcImRhdGEuYXR0cmlidXRlcy5ocC52YWx1ZVwiOiB0b2tlbi5hY3Rvci5kYXRhLmRhdGEuYXR0cmlidXRlcy5ocC52YWx1ZSAtIG1lc3NhZ2UuZGF0YS50b3RhbERhbWFnZSxcbiAgfSlcbn1cblxuY29uc3QgcHJvY2Vzc1NvY2tldE1lc3NhZ2UgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZSkgPT4ge1xuICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uTmFtZSkge1xuICAgIGNhc2UgXCJhY3Rpb25fbmFtZVwiOlxuICAgICAgaWYgKCFnYW1lLnVzZXIuaXNHTSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgYXdhaXQgaGFuZGxlRGFtYWdlUG9zdChtZXNzYWdlKVxuICAgICAgYnJlYWtcbiAgfVxufVxuXG5sZXQgbWFuYWdlcjogTWFuYWdlclxuSG9va3Mub25jZShcImluaXRcIiwgYXN5bmMgKCkgPT4ge1xuICBsb2coXCJJbml0aWFsaXppbmcgc3RhcmZpbmRlci1xb2xcIilcbiAgd2luZG93LlN0YXJmaW5kZXJRT0wgPSB7XG4gICAgZG9Sb2xsLFxuICB9XG59KVxuXG5Ib29rcy5vbmNlKFwicmVhZHlcIiwgYXN5bmMgKCkgPT4ge1xuICBtYW5hZ2VyID0gbmV3IE1hbmFnZXIocHJvY2Vzc1NvY2tldE1lc3NhZ2UpXG59KVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9Sb2xsKGV2ZW50LCBpdGVtTmFtZSwge3R5cGUgPSBcIndlYXBvblwiLCB2ZXJzYXRpbGU9ZmFsc2UsIHRva2VuID0gbnVsbH09e3R5cGU6XCJ3ZWFwb25cIiwgdmVyc2F0aWxlOiBmYWxzZSwgdG9rZW46IG51bGx9KSB7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9Sb2xsKGV2ZW50OiBhbnksIGl0ZW1OYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgc3BlYWtlciA9IENoYXRNZXNzYWdlLmdldFNwZWFrZXIoKVxuICBjb25zdCB0b2tlbiA9IGNhbnZhcy50b2tlbnMuZ2V0KHNwZWFrZXIudG9rZW4pXG4gIGNvbnN0IGluaXRpYXRlQWN0b3IgPSB0b2tlbiA/IHRva2VuLmFjdG9yIDogZ2FtZS5hY3RvcnMuZ2V0KHNwZWFrZXIuYWN0b3IpXG5cbiAgZ2FtZS51c2VyLnRhcmdldHMuZm9yRWFjaChhc3luYyAodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgaW50ZW5kZWRHTSA9IGdhbWUudXNlcnMuZW50aXRpZXMuZmluZCgodTogVXNlcikgPT4gdS5pc0dNICYmIHUuYWN0aXZlKVxuICAgIGNvbnN0IGF0dGFja0RhdGEgPSB7XG4gICAgICB0YXJnZXRJZDogdGFyZ2V0LmRhdGEuX2lkLFxuICAgICAgdG90YWxEYW1hZ2U6IDksXG4gICAgfVxuICAgIGNvbnN0IHNvY2tldE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShcImFjdGlvbl9uYW1lXCIsIGludGVuZGVkR00hLmlkLCBcImZvb2JhcmJhem1lc3NhZ2VcIiwgYXR0YWNrRGF0YSlcbiAgICBtYW5hZ2VyLmJyb2FkY2FzdERhdGEoc29ja2V0TWVzc2FnZSlcblxuICAgIGNvbnN0IGFjdG9yID0gdGFyZ2V0LmFjdG9yXG4gICAgY29uc3QgaXRlbSA9IGluaXRpYXRlQWN0b3IuaXRlbXMuZmluZCgoaTogSXRlbSkgPT4gaS5uYW1lID09PSBpdGVtTmFtZSlcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gYWN0b3IuZGF0YS5kYXRhLmF0dHJpYnV0ZXNcblxuICAgIGF3YWl0IGl0ZW0ucm9sbEF0dGFjayh7IGV2ZW50IH0pXG5cbiAgICBjb25zdCB0ZW1wbGF0ZURhdGEgPSB7XG4gICAgICB0YXJnZXRBdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgZGFtYWdlQXBwbGllZFN0cmluZzogXCJOYWlsZWQgaXQuXCIsXG4gICAgfVxuICAgIHNlbmRIaXRNZXNzYWdlKHRlbXBsYXRlRGF0YSwgYWN0b3IpXG4gIH0pXG59XG5cbkhvb2tzLm9uKFwiaG90YmFyRHJvcFwiLCAoX2hvdGJhcjogYW55LCBkYXRhOiBhbnksIHNsb3Q6IG51bWJlcikgPT4ge1xuICBsb2coXCJIYW5kbGluZyBob3RiYXJEcm9wXCIpXG4gIGNyZWF0ZU1hY3JvKGRhdGEuZGF0YSwgc2xvdClcbiAgcmV0dXJuIGZhbHNlXG59KVxuIiwiaW1wb3J0IHtsb2d9IGZyb20gXCIuL0xvZ2dlclwiXG5cbmNvbnN0IG1vZHVsZVNvY2tldCA9IFwibW9kdWxlLnN0YXJmaW5kZXJxb2xcIlxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb25OYW1lOiBzdHJpbmcsIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcsIHB1YmxpYyBpbnRlbmRlZEZvcjogc3RyaW5nLCBwdWJsaWMgZGF0YTogYW55KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hbmFnZXIge1xuICBwcml2YXRlIHNvY2tldCA9IGdhbWUuc29ja2V0IGFzIGFueVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjYWxsYmFjazogKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNvY2tldC5vbihtb2R1bGVTb2NrZXQsIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICBsb2coXCJQcm9jZXNzaW5nIHNvY2tldCBtZXNzYWdlXCIpXG4gICAgICBjYWxsYmFjayhtZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYnJvYWRjYXN0RGF0YShtZXNzYWdlOiBNZXNzYWdlKTogdm9pZCB7XG4gICAgLy8gaWYgbm90IGEgZ20gYnJvYWRjYXN0IHRoZSBtZXNzYWdlIHRvIGEgZ20gd2hvIGNhbiBhcHBseSB0aGUgZGFtYWdlXG4gICAgaWYgKGdhbWUudXNlci5pZCAhPT0gbWVzc2FnZS5pbnRlbmRlZEZvcikge1xuICAgICAgdGhpcy5zb2NrZXQuZW1pdChtb2R1bGVTb2NrZXQsIG1lc3NhZ2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsbGJhY2sobWVzc2FnZSlcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=