## Functions

<dl>
<dt><a href="#Store">Store()</a></dt>
<dd><p>Abstract base class for session stores.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#allCallback">allCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#clearCallback">clearCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#destroyCallback">destroyCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#getCallback">getCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#setCallback">setCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#lengthCallback">lengthCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#touchCallback">touchCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="Store"></a>

## Store()
Abstract base class for session stores.

**Kind**: global function  
**Access**: public  

* [Store()](#Store)
    * [.all(callback)](#Store+all)
    * [.clear(callback)](#Store+clear)
    * [.destroy(sessionId, callback)](#Store+destroy)
    * [.get(sessionId, callback)](#Store+get)
    * [.set(sessionId, session, callback)](#Store+set)
    * [.length(callback)](#Store+length)
    * [.touch(sessionId, session, callback)](#Store+touch)

<a name="Store+all"></a>

### store.all(callback)
Get all active session.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | [<code>allCallback</code>](#allCallback) | 

<a name="Store+clear"></a>

### store.clear(callback)
Clear all sessions.

**Kind**: instance method of [<code>Store</code>](#Store)  

| Param | Type |
| --- | --- |
| callback | [<code>clearCallback</code>](#clearCallback) | 

<a name="Store+destroy"></a>

### store.destroy(sessionId, callback)
Destroy the session associated with the given session ID.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Access**: public  

| Param | Type |
| --- | --- |
| sessionId | <code>string</code> | 
| callback | [<code>destroyCallback</code>](#destroyCallback) | 

<a name="Store+get"></a>

### store.get(sessionId, callback)
Fetch session by the given session ID.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Access**: public  

| Param | Type |
| --- | --- |
| sessionId | <code>string</code> | 
| callback | [<code>getCallback</code>](#getCallback) | 

<a name="Store+set"></a>

### store.set(sessionId, session, callback)
Commit the given session associated with the given sessionId to the store.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Access**: public  

| Param | Type |
| --- | --- |
| sessionId | <code>string</code> | 
| session | <code>object</code> | 
| callback | [<code>setCallback</code>](#setCallback) | 

<a name="Store+length"></a>

### store.length(callback)
Get number of active sessions.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | [<code>lengthCallback</code>](#lengthCallback) | 

<a name="Store+touch"></a>

### store.touch(sessionId, session, callback)
Touch the given session object associated with the given session ID.

**Kind**: instance method of [<code>Store</code>](#Store)  
**Access**: public  

| Param | Type |
| --- | --- |
| sessionId | <code>string</code> | 
| session | <code>object</code> | 
| callback | [<code>touchCallback</code>](#touchCallback) | 

<a name="allCallback"></a>

## allCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| session | <code>Array.&lt;Object&gt;</code> | 

<a name="clearCallback"></a>

## clearCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 

<a name="destroyCallback"></a>

## destroyCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 

<a name="getCallback"></a>

## getCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| session | <code>Array.&lt;Object&gt;</code> | 

<a name="setCallback"></a>

## setCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 

<a name="lengthCallback"></a>

## lengthCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 
| len | <code>number</code> | 

<a name="touchCallback"></a>

## touchCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| error | <code>Error</code> | 

