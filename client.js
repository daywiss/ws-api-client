const State = require('./state')
const assert = require('assert')
const Connect = require('./connect')
const RPC = require('./rpc')
const KeepAlive = require('./keepalive')
module.exports = async (WS,config={},state={},emit=x=>x)=>{

  const {host,channels=[]} = config
  assert(host,'requires host')

  assert(channels,'requires channels')

  const rpc = RPC(config)

  const setState = State(state)

  function handleMessage(type,message){
    emit(type,message)

    if(type !== 'message') return

    const event = rpc.response(message)

    if(event){
      const [channel,updates=[]] = event
      updates.forEach(function setOneState(data){
        setState(channel,data)
      })
      emit('change',channel,state[channel],state)
    }
  }

  const connect = Connect(WS,host,handleMessage)

  let ws = await connect()

  function getWs(){
    return ws
  }

  const keepAlive = KeepAlive(config,{ws,connect},(type,newws)=>{
    ws = newws
    emit(type,ws)
  })

  keepAlive.resume()

  const client = channels.reduce((result,channel)=>{
    assert(!result[channel],'Reserved channel name: ' + channel)
    result[channel] = {call:rpc.call(getWs,channel)}
    return result
  },{rpc,getWs,setState,...keepAlive,connect})


  return client
}
