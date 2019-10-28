# WS API CLIENT
Standard websocket client for openservice-ws.

## Install
`yarn add git@github.com:daywiss/ws-api-client.git`

## Usage
Install for your frontend project.

```js
import Client from 'ws-api-client'

//websockets must be supported in browser

const config = {
  host:'wss://yourwebsockethosturl',
  //your action/state channels, this is dependent on your server implementation
  channels:[
    //common example channels
    'public',
    'private',
    'auth',
  ]
}

const initState = {
  //some initial state
}

function handleStateChange(channel,channelState,fullState){
  //do something with the new state
  dispatch('updateChannelState')(channel,channelState)
}

Client(Websocket,config,initState,handleStateChange).then(api=>{
  //your api is an object with channels
  //see api documentation.
  //api = {
  //  public:{
  //    call(action,...arguments)=>promise,
  //  },
  //  private:{
  //    call(action,...arguments)=>promise,
  //  },
  //  auth:{
  //    call(action,...arguments)=>promise,
  //  },
  //  //low level objects available
  //  rpc:{
  //    call(),      //manually call api
  //    response(),  //manually respond to a pending call
  //    pending(),   //view all pending calls
  //  },
  //  setState(),  //manually set state, you need to know what you are doing
  //  getWs(),     //get websocket object
  //}

})

```
