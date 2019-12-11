const NODE_ENV = process.env.NODE_ENV || 'development'
if(NODE_ENV === 'development' && module.hot){
  module.hot.accept();
}