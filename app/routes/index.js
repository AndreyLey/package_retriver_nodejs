const noteRoutes= require('./note_routes');

module.exports = function(app,fetch,db){
    noteRoutes(app,fetch,db);
}