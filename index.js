/**
 * Need Manager
 *
 * @param option {Object} option - The manager's configs
 * @param option.store {Store} [store=MemoryStore]  - An express-session comptaible store
 * @param option.needjs {needjs} [needjs] - A needjs engine
 * @param option.idkey {String} [idkey='sid'] - The default key for storing sid in system.
 */
var manager = function(options){
    var opts = options || {};

    this.needjs = opts.needjs || new require('needjs');
    this.Need = this.needjs.Need;
    if(opts.store){
        this.store = opts.store;
    } else {
        var MemoryStore = require('./lib/memory.js');
        this.store = new MemoryStore();
    }
    this.idkey = opts.idkey || 'sid';
    this.db_options = opts.db_options || '_base_';
    this.base = new this.needjs();
    this.cache = {};
    this.queue = {};

    // Copy everything else from base
    for(var i in this.base)
        if(i instanceof Function && typeof(this[i]) ==='undefined')
            this[i] = function(sid, ...args){
                this.get(sid, function(system){
                    system[i].apply(syste, args);
                });
            }
    var self = this;
    process.nextTick(()=>{
        this.store.get(this.db_options, function(data){
            if (data)
                for(var i in data.cache){
                    sef.get(i);
                }
            process.nextTick(function(){
                self.tick;
            });
        });
    });
}

/**
 * Forget a previous need's answer.
 *
 * Use this when you need to re-run a need in the future.
 * @param {String} sid - Session id
 * @param {String} need - need's name
 */
manager.prototype.forget = function forget(sid, need){
    this.get(sid, function(system){
        system.forget(need);
    });
}

/**
 * Inform a system about a need's value.
 *
 * @param {String} sid - Session id
 * @param {String} name - Need's name
 * @param {Object} info - Need's value
 */
manager.prototype.inform = function inform(sid, name, info){
    this.get(sid, function(system){
        system.inform(name, info);
    });
}

/**
 * Invoke an event
 *
 * @param {String} sid - Session id
 * @param {String} eventName - Event name
 * @param {Object} eventData - Event data
 */
manager.prototype.invoke = function invoke(sid, eventName, eventData){
    this.get(sid, function(system){
        system.invoke(eventName, eventData);
    });
}

/**
 * Load the system from previously saved state
 *
 * @param {String} sid - Session id
 * @param {Config} config -- A previously saved state
 */
manager.prototype.load = function load(sid, config){
    this.get(sid, function(system){
        system.load(config);
    });
}

/**
 * Process the system in the next tick
 *
 * @param {String} sid - Session id
 */
manager.prototype.next = function next(sid){
    this.get(sid, function(system){
        system.next();
    });
}

/**
 * Register a need into system
 *
 * @param {String} sid - Session id
 * @param {Need} need
 */
manager.prototype.register = function register(need){
    this.base.register(need);
}

/**
 * This callback is called when the system's save is ready.
 *
 * @callback saveCallback
 * @param {Config} System's state
 */

/**
 * Save system's state
 *
 * @param {String} sid - Session id
 * @param {saveCallback} callback -  System's state
 */
manager.prototype.save = function save(sid, callback){
    var mngr = this;
    this.get(sid, function(system){
        var config = system.save();
        // Create a deep copy
        config = clone(config);
        if (typeof config.cookie == 'undefined')
            config.cookie = {};
        mngr.store.set(sid, config, function(err){
            if(err)
                throw err;
            if(callback)
                callback(system.save());
        });
    });
}

/**
 * Trigger a need for the system.
 *
 * @param {String} sid - Session id
 * @param {String} name - Need's name
 * @param {String} father - [father=null] Do not set father, for internal purpose only
 */
manager.prototype.trigger = function trigger(sid, need){
    this.get(sid, function(system){
        system.trigger(need);
    });
}

manager.prototype.get = function get(sid, callback){
    if (this.cache[sid]){
        return callback(this.cache[sid].sys);
    }
    if(this.queue[sid]){
        this.queue[sid].push(callback);
    } else {
        this.queue[sid] = [callback];
        var mngr = this;
        this.store.get(sid, function(err, session){
            if(err)
                throw err;
            var session = mngr.makeSession(sid, session);
            var q = mngr.queue[sid];
            delete mngr.queue[sid];
            do {
                var callback = q.pop();
                callback(session);
            } while(q.length != 0);
        });
    }
}

manager.prototype.makeSession = function makeSession(sid, config){
    // sys.cookie might be a problem
    var sys = new this.needjs();
    // Now our new system has basically the same dynamics as the base one
    sys.loadDynamic(this.base.saveDynamic());
    if(config)
        sys.load(config);
    this.cache[sid] = {
        sys: sys,
        sid: sid
    };
    var mngr = this;
    sys.on('stop', function(){
        if(!sys.nextTick)
            mngr.unload(sid);
    });
    sys.on('wait', function(){
        if(!sys.nextTick)
            mngr.unload(sid);
    });
    sys.data[this.idkey] = sid;
    return sys;
}

manager.prototype.unload = function unload(sid){
    this.save(sid);
    delete this.cache[sid];
    this.cache[sid] = undefined;
}

manager.prototype.tick = function tick(){
    var data = {};
    console.log(this.cache);
    data.cache = Object.keys(this.cache);

    this.store.set(this.db_options, data, function(err){
        console.log(err);
    });

    process.nextTick(()=>{
        this.tick();
    });
}

function clone(obj){
    // NOTE: Breaks Date objects.
    return JSON.parse(JSON.stringify(obj));
}

manager.Store = require('lib/store.js');
module.exports = manager;
