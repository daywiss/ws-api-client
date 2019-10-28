exports.setProxy = (obj,path=[],val)=>{
  const handlers = {
    get(target, prop, receiver){
      if(target[prop] === undefined) target[prop] = {}
      return target[prop]
    },
    set(target, prop, value){
      target[prop] = value
      return true

    }
  }
  const prox = new Proxy(obj,handlers)

  let curr = prox
  path.forEach(prop=>{
    curr = curr[prop]
  })
  curr = val
  return val
}

exports.getProxy = (obj,path=[],def)=>{
  const handlers = {
    get(target, prop, receiver){
      if(target[prop] === undefined) target[prop] = {}
      return target[prop]
    },
    set(target, prop, value){
      target[prop] = value
      return true

    }
  }
  const prox = new Proxy(obj,handlers)
  let curr = prox
  path.forEach(prop=>{
    curr = curr[prop]
  })
  if(curr === undefined) return def
  return curr
}

exports.set = (obj,path=[],val)=>{
  if(path.length === 0){
    return val
  }
  const head = path[0]
  if(path.length === 1){
    obj[head] = val
    return obj
  }
  const rest = path.slice(1)
  // const [head,...rest] = path
  obj[head] = Object(obj[head])
  exports.set(obj[head],rest,val)
  return val
}

exports.unset = (obj,path=[])=>{
  if(obj === undefined) return
  if(path.length === 0){
    return obj
  }
  const head = path[0]

  if(path.length === 1){
    if(obj[head] === undefined) return 
    return delete obj[head]
  }

  const rest = path.slice(1)
  return exports.unset(obj[head],rest)
}

exports.get = (obj,path=[],def)=>{
  if(obj === undefined) return def
  if(path.length=== 0){
    return obj
  }
  const [head,...rest] = path
  if(path.length === 1){
    if(obj[head] === undefined) return def
    return obj[head]
  }
  return exports.get(obj[head],rest,def)
}
