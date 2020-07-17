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
    const item = initiateActor.items.find((i) => i.name === itemName);
    console.log(event);
    return item.rollAttack({ event });
}
Hooks.on("hotbarDrop", (_hotbar, data, slot) => {
    Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])("Handling hotbarDrop");
    Object(_Macro__WEBPACK_IMPORTED_MODULE_2__["createMacro"])(data.data, slot);
    return false;
});
Hooks.on("renderChatMessage", (message, _html) => {
    Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])("Got chat message");
    Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])(message);
    if (game.user.id === message.user.id && message.isRoll) {
        Object(_Logger__WEBPACK_IMPORTED_MODULE_1__["log"])("Got self roll");
        game.user.targets.forEach(async (target) => {
            const intendedGM = game.users.entities.find((u) => u.isGM && u.active);
            const attackData = {
                targetId: target.data._id,
                totalDamage: 9,
            };
            const socketMessage = new _Socket__WEBPACK_IMPORTED_MODULE_3__["Message"]("action_name", intendedGM.id, "foobarbazmessage", attackData);
            manager.broadcastData(socketMessage);
            const actor = target.actor;
            const attributes = actor.data.data.attributes;
            const templateData = {
                targetAttributes: attributes,
                damageAppliedString: "Nailed it.",
            };
            Object(_ChatManager__WEBPACK_IMPORTED_MODULE_0__["sendHitMessage"])(templateData, actor);
        });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoYXRNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01hY3JvLnRzIiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIiwid2VicGFjazovLy8uL3NyYy9Tb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQU8sTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFlBQWlCLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDbEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxjQUFjLENBQUMsa0RBQWtELEVBQUUsWUFBWSxDQUFDO0lBQzdHLE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FB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Q0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLGFBQWEsQ0FBQyxPQUFnQjtRQUNuQyxxRUFBcUU7UUFDckUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUM7U0FDeEM7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztDQUNGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9NYWluLnRzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IHNlbmRIaXRNZXNzYWdlID0gYXN5bmMgKHRlbXBsYXRlRGF0YTogYW55LCBhY3RvcjogYW55KSA9PiB7XG4gICAgY29uc3QgbWVzc2FnZUNvbnRlbnQgPSBhd2FpdCByZW5kZXJUZW1wbGF0ZShcIm1vZHVsZXMvc3RhcmZpbmRlcnFvbC9wdWJsaWMvdGVtcGxhdGVzL2hpdHMuaHRtbFwiLCB0ZW1wbGF0ZURhdGEpXG4gICAgY29uc3QgY2hhdERhdGEgPSB7XG4gICAgICB1c2VyOiBnYW1lLnVzZXIuX2lkLFxuICAgICAgc3BlYWtlcjogeyBhY3RvciwgYWxpYXM6IGFjdG9yPy5uYW1lIH0sXG4gICAgICBjb250ZW50OiBtZXNzYWdlQ29udGVudCxcbiAgICB9XG4gICAgQ2hhdE1lc3NhZ2UuY3JlYXRlKGNoYXREYXRhKVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQgeyBjb25zb2xlLmxvZyhcIlN0YXJmaW5kZXIgUW9sIHwgXCIsIC4uLmFyZ3MpIH1cbiIsImV4cG9ydCBjb25zdCBjcmVhdGVNYWNybyA9IGFzeW5jIChpdGVtOiBhbnksIHNsb3Q6IG51bWJlcikgPT4ge1xuICBjb25zdCBjb21tYW5kID0gYFN0YXJmaW5kZXJRT0wuZG9Sb2xsKGV2ZW50LCBcIiR7aXRlbS5uYW1lfVwiKWBcbiAgY29uc3QgbWFjcm8gPSBhd2FpdCBNYWNyby5jcmVhdGUoe1xuICAgIG5hbWU6IGAke2l0ZW0ubmFtZX0gLSAke2l0ZW0udHlwZX1gLFxuICAgIHR5cGU6IFwic2NyaXB0XCIsXG4gICAgaW1nOiBpdGVtLmltZyxcbiAgICBjb21tYW5kLFxuICAgIGZsYWdzOiB7IFwic3RhcmZpbmRlcnFvbC5pdGVtTWFjcm9cIjogdHJ1ZSB9LFxuICB9KSBhcyBNYWNyb1xuICBhd2FpdCBnYW1lLnVzZXIuYXNzaWduSG90YmFyTWFjcm8obWFjcm8sIHNsb3QpXG59XG4iLCJpbXBvcnQge3NlbmRIaXRNZXNzYWdlfSBmcm9tIFwiLi9DaGF0TWFuYWdlclwiXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9Mb2dnZXJcIlxuaW1wb3J0IHtjcmVhdGVNYWNyb30gZnJvbSBcIi4vTWFjcm9cIlxuaW1wb3J0IHtNYW5hZ2VyLCBNZXNzYWdlfSBmcm9tIFwiLi9Tb2NrZXRcIlxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cgeyBTdGFyZmluZGVyUU9MOiBhbnkgfVxufVxuXG5jb25zdCBoYW5kbGVEYW1hZ2VQb3N0ID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgbG9nKFwiSGFuZGxpbmcgZGFtYWdlXCIpXG4gIGNvbnN0IHRva2VuID0gY2FudmFzLnRva2Vucy5nZXQobWVzc2FnZS5kYXRhLnRhcmdldElkKVxuICBhd2FpdCB0b2tlbi5hY3Rvci51cGRhdGUoe1xuICAgIFwiZGF0YS5hdHRyaWJ1dGVzLmhwLnZhbHVlXCI6IHRva2VuLmFjdG9yLmRhdGEuZGF0YS5hdHRyaWJ1dGVzLmhwLnZhbHVlIC0gbWVzc2FnZS5kYXRhLnRvdGFsRGFtYWdlLFxuICB9KVxufVxuXG5jb25zdCBwcm9jZXNzU29ja2V0TWVzc2FnZSA9IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gIHN3aXRjaCAobWVzc2FnZS5hY3Rpb25OYW1lKSB7XG4gICAgY2FzZSBcImFjdGlvbl9uYW1lXCI6XG4gICAgICBpZiAoIWdhbWUudXNlci5pc0dNKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBhd2FpdCBoYW5kbGVEYW1hZ2VQb3N0KG1lc3NhZ2UpXG4gICAgICBicmVha1xuICB9XG59XG5cbmxldCBtYW5hZ2VyOiBNYW5hZ2VyXG5Ib29rcy5vbmNlKFwiaW5pdFwiLCBhc3luYyAoKSA9PiB7XG4gIGxvZyhcIkluaXRpYWxpemluZyBzdGFyZmluZGVyLXFvbFwiKVxuICB3aW5kb3cuU3RhcmZpbmRlclFPTCA9IHtcbiAgICBkb1JvbGwsXG4gIH1cbn0pXG5cbkhvb2tzLm9uY2UoXCJyZWFkeVwiLCBhc3luYyAoKSA9PiB7XG4gIG1hbmFnZXIgPSBuZXcgTWFuYWdlcihwcm9jZXNzU29ja2V0TWVzc2FnZSlcbn0pXG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb1JvbGwoZXZlbnQsIGl0ZW1OYW1lLCB7dHlwZSA9IFwid2VhcG9uXCIsIHZlcnNhdGlsZT1mYWxzZSwgdG9rZW4gPSBudWxsfT17dHlwZTpcIndlYXBvblwiLCB2ZXJzYXRpbGU6IGZhbHNlLCB0b2tlbjogbnVsbH0pIHtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb1JvbGwoZXZlbnQ6IGFueSwgaXRlbU5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzcGVha2VyID0gQ2hhdE1lc3NhZ2UuZ2V0U3BlYWtlcigpXG4gIGNvbnN0IHRva2VuID0gY2FudmFzLnRva2Vucy5nZXQoc3BlYWtlci50b2tlbilcbiAgY29uc3QgaW5pdGlhdGVBY3RvciA9IHRva2VuID8gdG9rZW4uYWN0b3IgOiBnYW1lLmFjdG9ycy5nZXQoc3BlYWtlci5hY3RvcilcbiAgY29uc3QgaXRlbSA9IGluaXRpYXRlQWN0b3IuaXRlbXMuZmluZCgoaTogSXRlbSkgPT4gaS5uYW1lID09PSBpdGVtTmFtZSlcbiAgY29uc29sZS5sb2coZXZlbnQpXG4gIHJldHVybiBpdGVtLnJvbGxBdHRhY2soeyBldmVudCB9KVxufVxuXG5Ib29rcy5vbihcImhvdGJhckRyb3BcIiwgKF9ob3RiYXI6IGFueSwgZGF0YTogYW55LCBzbG90OiBudW1iZXIpID0+IHtcbiAgbG9nKFwiSGFuZGxpbmcgaG90YmFyRHJvcFwiKVxuICBjcmVhdGVNYWNybyhkYXRhLmRhdGEsIHNsb3QpXG4gIHJldHVybiBmYWxzZVxufSlcblxuSG9va3Mub24oXCJyZW5kZXJDaGF0TWVzc2FnZVwiLCAobWVzc2FnZTogQ2hhdE1lc3NhZ2UsIF9odG1sOiBhbnkpID0+IHtcbiAgbG9nKFwiR290IGNoYXQgbWVzc2FnZVwiKVxuICBsb2cobWVzc2FnZSlcbiAgaWYgKGdhbWUudXNlci5pZCA9PT0gbWVzc2FnZS51c2VyLmlkICYmIG1lc3NhZ2UuaXNSb2xsKSB7XG4gICAgbG9nKFwiR290IHNlbGYgcm9sbFwiKVxuICAgIGdhbWUudXNlci50YXJnZXRzLmZvckVhY2goYXN5bmMgKHRhcmdldCkgPT4ge1xuICAgICAgY29uc3QgaW50ZW5kZWRHTSA9IGdhbWUudXNlcnMuZW50aXRpZXMuZmluZCgodTogVXNlcikgPT4gdS5pc0dNICYmIHUuYWN0aXZlKVxuICAgICAgY29uc3QgYXR0YWNrRGF0YSA9IHtcbiAgICAgICAgdGFyZ2V0SWQ6IHRhcmdldC5kYXRhLl9pZCxcbiAgICAgICAgdG90YWxEYW1hZ2U6IDksXG4gICAgICB9XG4gICAgICBjb25zdCBzb2NrZXRNZXNzYWdlID0gbmV3IE1lc3NhZ2UoXCJhY3Rpb25fbmFtZVwiLCBpbnRlbmRlZEdNIS5pZCwgXCJmb29iYXJiYXptZXNzYWdlXCIsIGF0dGFja0RhdGEpXG4gICAgICBtYW5hZ2VyLmJyb2FkY2FzdERhdGEoc29ja2V0TWVzc2FnZSlcblxuICAgICAgY29uc3QgYWN0b3IgPSB0YXJnZXQuYWN0b3JcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBhY3Rvci5kYXRhLmRhdGEuYXR0cmlidXRlc1xuXG4gICAgICBjb25zdCB0ZW1wbGF0ZURhdGEgPSB7XG4gICAgICAgIHRhcmdldEF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAgIGRhbWFnZUFwcGxpZWRTdHJpbmc6IFwiTmFpbGVkIGl0LlwiLFxuICAgICAgfVxuICAgICAgc2VuZEhpdE1lc3NhZ2UodGVtcGxhdGVEYXRhLCBhY3RvcilcbiAgICB9KVxuICB9XG59KVxuIiwiaW1wb3J0IHtsb2d9IGZyb20gXCIuL0xvZ2dlclwiXG5cbmNvbnN0IG1vZHVsZVNvY2tldCA9IFwibW9kdWxlLnN0YXJmaW5kZXJxb2xcIlxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb25OYW1lOiBzdHJpbmcsIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcsIHB1YmxpYyBpbnRlbmRlZEZvcjogc3RyaW5nLCBwdWJsaWMgZGF0YTogYW55KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hbmFnZXIge1xuICBwcml2YXRlIHNvY2tldCA9IGdhbWUuc29ja2V0IGFzIGFueVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjYWxsYmFjazogKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNvY2tldC5vbihtb2R1bGVTb2NrZXQsIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgICBsb2coXCJQcm9jZXNzaW5nIHNvY2tldCBtZXNzYWdlXCIpXG4gICAgICBjYWxsYmFjayhtZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYnJvYWRjYXN0RGF0YShtZXNzYWdlOiBNZXNzYWdlKTogdm9pZCB7XG4gICAgLy8gaWYgbm90IGEgZ20gYnJvYWRjYXN0IHRoZSBtZXNzYWdlIHRvIGEgZ20gd2hvIGNhbiBhcHBseSB0aGUgZGFtYWdlXG4gICAgaWYgKGdhbWUudXNlci5pZCAhPT0gbWVzc2FnZS5pbnRlbmRlZEZvcikge1xuICAgICAgdGhpcy5zb2NrZXQuZW1pdChtb2R1bGVTb2NrZXQsIG1lc3NhZ2UpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsbGJhY2sobWVzc2FnZSlcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=