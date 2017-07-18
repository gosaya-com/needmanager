needmanager is a session-manager for needjs. It can handle multiple systems of needjs who share the same logic.

First install needmanager:
```
$ npm install --save needmanager
```

Then in your project, require it.

```
var needmanager = require('needmanager');
var sys = new needmanager();
var Need = sys.Need;
```

Now you can register your needs just like you do in needjs:
```
sys.register(new Need({
    name: 'need',
    post: function(data){
    this.done();
    }
}));
```

Now for other functions, such as forget, trigger, etc you have to add an additional argument, session id or sid for short:

```
sys.trigger(0, 'main');
sys.trigger('user one', 'main');
```

Note that sid could be of anytype, although it's suggested to use either a Number or a String.

For more examples, checkout the examples folder.

# Using different stores
The default instance of needmanager uses MemoryManager to manage it's instances. needmanager's store is compatible with expressjs' session's stores. To see a full list please look [here](https://github.com/expressjs/session#compatible-session-stores).

To change the store you need to pass `store` in the configs.
```
var YourStore = require('YourStore');
var sys = new needmanager({
    store: new YourStore();
})
```

#Using different needjs engine:
You can use diferent needjs engines. To do so pass `needjs` in the configs.
```
var CustomneedJS = require('CustomneedJS');
var sys = new needmanager({
    needjs: CustomneedJS
})
```
