var Store = require('./lib/store.js');
var MemoryStore = require('./lib/memory.js');

/**
 * Need Manager
 *
 * @param option {Object} option - The manager's configs
 * @param option.store {Store} option - An express-session comptaible store
 */
var manager = function(options){
    var opts = options || {};

    this.needjs = opts.needjs || require('needjs');
    this.store = opts.store || new MemoryStore(); // TODO

    this.idkey = opts.idkey || 'sid';
    this.base = new this.needjs();

    this.cache = {};
    this.queue = {};
}

manager.prototype.forget = function forget(sid, need){
    this.get(sid, function(system){
        system.forget(need);
    });
}

manager.prototype.inform = function inform(sid, name, info){
    this.get(sid, function(system){
        system.inform(name, info);
    });
}

manager.prototype.invoke = function invoke(sid, eventName, eventData){
    this.get(sid, function(system){
        system.invoke(eventName, eventData);
    });
}

manager.prototype.load = function load(sid, config){
    this.get(sid, function(system){
        system.load(config);
    });
}

manager.prototype.next = function next(sid){
    this.get(sid, function(system){
        system.next();
    });
}

manager.prototype.register = function register(need){
    this.base.register(need);
}

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
    console.log("unloading");
    this.save(sid);
    delete this.cache[sid];
    this.cache[sid] = undefined;
}

function clone(obj){
    // NOTE: Breaks Date objects.
    return JSON.parse(JSON.stringify(obj));
}

module.exports = manager;
