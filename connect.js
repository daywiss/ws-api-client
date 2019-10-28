module.exports = (WS,host,emit=x=>x) => async ()=>{
  const ws = new WS(host);

  await new Promise((res,rej)=>{
    ws.onopen = event=>{
      if(ws.readyState === ws.OPEN) res() 
    }
    ws.onerror = e=>rej(new Error(e.message))
  })

  ws.onmessage = message=> emit('message',message.data)
  ws.onerror = event=> emit('error',event)
  ws.onclose = event=> emit('close',event)

  ws.onopen = event=>{
    if(ws.readyState !== ws.OPEN) return
    emit('open',event)
  }

  return ws
}
