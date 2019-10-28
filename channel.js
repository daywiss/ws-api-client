const Connect = require('./connect')
const RPC = require('./rpc')
module.exports = async (WS,host,emit=x=>x)=>{
  const ws = await Connect(WS,host)
  return ws
}


