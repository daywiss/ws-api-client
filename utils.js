module.exports.decode = function(data){
  return JSON.parse(data)
}
module.exports.encode = function(data){
  return JSON.stringify(data)
}
module.exports.isEvent = function(data){
  return data[1] == null
}

module.exports.isRpc = function(data){
  return data[1] != null
}

