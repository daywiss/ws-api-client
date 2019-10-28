module.exports = ({keepalive=30000},{ws,connect},emit=x=>x) => {
  let cancel
  async function keepAlive(keepalive){
    // console.log('keeping connection alive',wait)
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
    resume(wait=keepalive){
      if(cancel) return
      return keepAlive(wait)
    },
  }

}

