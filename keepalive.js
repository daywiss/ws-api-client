const assert = require('./assert')
module.exports = ({keepalive=30000},{ws,connect},emit=x=>x) => {
  assert(keepalive,'requires keepalive value in ms')
  let cancel
  async function keepAlive(){
    // console.log('keeping connection alive',keepalive)
    if(ws.readyState === ws.OPEN){
      // console.log('sending data')
      ws.send('')
    }
    if(ws.readyState === ws.CLOSED){
      await connect().then(x=>{
        ws = x
        emit('reconnect',ws)
      }).catch(err=>{
        //do nothing
      })
    }

    cancel = setTimeout(keepAlive,keepalive)
  }

  return {
    pause(){
      return clearTimeout(cancel)
    },
    resume(){
      if(cancel) return
      return keepAlive()
    },
  }

}

