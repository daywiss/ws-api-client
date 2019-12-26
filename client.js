const State = require('./state')
const assert = require('assert')
const Connect = require('./connect')
const RPC = require('./rpc')
const KeepAlive = require('./keepalive')
const {decode,encode,isEvent,isRpc} = require('./utils')

module.exports = async (WS,config={},emit=x=>x,state={})=>{

  const {host,channels=[]} = config
  assert(host,'requires host')

  assert(channels,'requires channels')

  const rpc = RPC(config)

  const setState = State(state)

  function handleMessage(type,data){
    const messages = decode(data) 

    let change = false
    messages.forEach(message=>{
      if(isEvent(message)){
        change = true
        setState(message[0],message[2])
      }else if(isRpc(message)){
        rpc.response(message)
      }
    })

    if(change) emit('change',state)
  }

  const connect = Connect(WS,host,(type,data)=>{

    if(type=='message'){
      handleMessage(type,data)
    }else{
      emit(type,data)
    }
  })

  let ws = await connect()

  function getWs(){
    return ws
  }

  const keepAlive = KeepAlive(config,{ws,connect},(type,newws)=>{
    ws = newws
    emit(type,ws)
  })

  keepAlive.resume()

  function close(){
    keepAlive.pause()
    ws.close()
  }

  const client = channels.reduce((result,channel)=>{
    result.actions[channel] = rpc.call(getWs,channel)
    return result
  },{actions:{},rpc,getWs,setState,...keepAlive,connect,close})


  return client
}
