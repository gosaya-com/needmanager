'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

/**
 * Abstract base class for session stores.
 * @public
 */
function Store(){
    EventEmitter.call(this);
}

/**
 * Inherit from EventEmitter
 */

util.inherits(Store, EventEmitter);

/**
 * @callback allCallback
 * @param {Error} error
 * @param {Object[]} session
 */

/**
 * Get all active session.
 * 
 * @param {allCallback} callback
 * @public
 */
Store.prototype.all = function all(callback){
    throw new Error("Not implemented, store#all")
}

/**
 * @callback clearCallback
 * @param {Error} error
 */

/**
 * Clear all sessions.
 * @param {clearCallback} callback
 */
Store.prototype.clear = function clear(callback) {
    throw new Error("Not implemented, store#clear")
}

/**
 * @callback destroyCallback
 * @param {Error} error
 */

/**
 * Destroy the session associated with the given session ID.
 *
 * @param {string} sessionId
 * @param {destroyCallback} callback
 * @public
 */

Store.prototype.destroy = function destroy(sessionId, callback) {
    throw new Error("Not implemented, store#destroy")
}

/**
 * @callback getCallback
 * @param {Error} error
 * @param {Object[]} session
 */

/**
 * Fetch session by the given session ID.
 *
 * @param {string} sessionId
 * @param {getCallback} callback
 * @public
 */

Store.prototype.get = function get(sessionId, callback) {
    throw new Error("Not implemented, store#get")
}

/**
 * @callback setCallback
 * @param {Error} error
 */

/**
 * Commit the given session associated with the given sessionId to the store.
 *
 * @param {string} sessionId
 * @param {object} session
 * @param {setCallback} callback
 * @public
 */

Store.prototype.set = function set(sessionId, session, callback) {
    throw new Error("Not implemented, store#set")
}

/**
 * @callback lengthCallback
 * @param {Error} error
 * @param {number} len
 */

/**
 * Get number of active sessions.
 *
 * @param {lengthCallback} callback
 * @public
 */

Store.prototype.length = function length(callback) {
    throw new Error("Not implemented, store#length")
}

/**
 * @callback touchCallback
 * @param {Error} error
 */

/**
 * Touch the given session object associated with the given session ID.
 *
 * @param {string} sessionId
 * @param {object} session
 * @param {touchCallback} callback
 * @public
 */

Store.prototype.touch = function touch(sessionId, session, callback) {
    throw new Error("Not implemented, store#touch")
}

module.exports = Store;
