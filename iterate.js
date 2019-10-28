function set(obj,props=[],value){
  if(props.length === 0) return obj
  if(props.length === 1) {
    Object(obj)[props[0]] = value
    return obj
  }
  let next = Object(obj)
  const end = props.length - 1
  for(var i = 0; i < end; i++){
    next[props[i]] = Object(next[props[i+1]])
    next = next[props[i]]
  }
  next[props[end]] = value
  return obj
}

function get(obj,props=[],def){
  if(props.length === 0){
    if(obj === undefined) return def
    return obj
  }
  let next = prox
  props.forEach(prop=>{
   next = next[prop]
  })

  if(next === undefined) return def

  return next
}
function unset(obj,props){
  if(props.length === 0) return
  const prox = new Proxy(obj,handlers)
  let next = prox

  for(let i = 0; i < props.length - 1; i++){
    next = next[props[i]]
  }

  delete next[props[props.length -1]]
}
module.exports = {
  set,get,unset
}

