
module.exports = (config)=>{
  const pending = new Map()
  let id = 0

  function decode(data){
    return JSON.parse(data)
  }
  function encode(data){
    return JSON.stringify(data)
  }

  function response(data){
    const [channel,id,err,result] = decode(data)
    if(id == null) return [channel,result]
    if(!pending.has(id)) return 
    const [res,rej] = pending.get(id)
    if(err){ 
      [message,stack] = err
      const error = new Error(message)
      error.stack = stack
      rej(error)
    }else{
      res(result)
    }
    pending.delete(id)
  }

  function call(getWs,channel){
    return (action,...args)=>{
      return new Promise((...promise)=>{
        pending.set(++id,promise)
        getWs().send(encode([channel,id,action,args]))
      })
    }
  }

  return {
    call,
    response,
    pending,
  }
}
