
module.exports = app => {
    app.listen(app.get("port"), () => {
      console.log(`NTalk API - porta ${app.get("port")}`);
    });         
   
}