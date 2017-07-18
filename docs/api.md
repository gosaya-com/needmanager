## Functions

<dl>
<dt><a href="#manager">manager(option)</a></dt>
<dd><p>Need Manager</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#saveCallback">saveCallback</a> : <code>function</code></dt>
<dd><p>This callback is called when the system&#39;s save is ready.</p>
</dd>
</dl>

<a name="manager"></a>

## manager(option)
Need Manager

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> | option - The manager's configs |
| option.store | <code>Store</code> | [store=MemoryStore]  - An express-session comptaible store |
| option.needjs | <code>needjs</code> | [needjs] - A needjs engine |
| option.idkey | <code>String</code> | [idkey='sid'] - The default key for storing sid in system. |


* [manager(option)](#manager)
    * [.forget(sid, need)](#manager+forget)
    * [.inform(sid, name, info)](#manager+inform)
    * [.invoke(sid, eventName, eventData)](#manager+invoke)
    * [.load(sid, config)](#manager+load)
    * [.next(sid)](#manager+next)
    * [.register(sid, need)](#manager+register)
    * [.save(sid, callback)](#manager+save)
    * [.trigger(sid, name, father)](#manager+trigger)

<a name="manager+forget"></a>

### manager.forget(sid, need)
Forget a previous need's answer.

Use this when you need to re-run a need in the future.

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| need | <code>String</code> | need's name |

<a name="manager+inform"></a>

### manager.inform(sid, name, info)
Inform a system about a need's value.

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| name | <code>String</code> | Need's name |
| info | <code>Object</code> | Need's value |

<a name="manager+invoke"></a>

### manager.invoke(sid, eventName, eventData)
Invoke an event

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| eventName | <code>String</code> | Event name |
| eventData | <code>Object</code> | Event data |

<a name="manager+load"></a>

### manager.load(sid, config)
Load the system from previously saved state

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| config | <code>Config</code> | - A previously saved state |

<a name="manager+next"></a>

### manager.next(sid)
Process the system in the next tick

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |

<a name="manager+register"></a>

### manager.register(sid, need)
Register a need into system

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| need | <code>Need</code> |  |

<a name="manager+save"></a>

### manager.save(sid, callback)
Save system's state

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| callback | [<code>saveCallback</code>](#saveCallback) | System's state |

<a name="manager+trigger"></a>

### manager.trigger(sid, name, father)
Trigger a need for the system.

**Kind**: instance method of [<code>manager</code>](#manager)  

| Param | Type | Description |
| --- | --- | --- |
| sid | <code>String</code> | Session id |
| name | <code>String</code> | Need's name |
| father | <code>String</code> | [father=null] Do not set father, for internal purpose only |

<a name="saveCallback"></a>

## saveCallback : <code>function</code>
This callback is called when the system's save is ready.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| System's | <code>Config</code> | state |

