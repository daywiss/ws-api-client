const Connect = require('./connect')
const RPC = require('./rpc')
module.exports = async (WS,host,channel,emit=x=>x)=>{

  const ws = await Connect(WS,`${host}/${channel}`)

  const rpc = RPC({},ws)

  ws.onmessage = msg =>{
    const data = rpc.response(msg.data)
    if(data == null) return
    emit(data)
  }

  return {
    call:rpc.call,
    socket:ws,
  }
}

