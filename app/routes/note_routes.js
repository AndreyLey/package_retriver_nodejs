const {getPackageInfo,recurtion_getPackages} = require('./repository_connector');
const {fromCach, toCach} =require('./cach');

module.exports = async function(app,db){

    app.get('/repos/:name/:tag_name',fromCach,/*getPackageInfo*/recurtion_getPackages,toCach);

    // app.get('/repos/:name/:tag_name',(req,res)=>{
    //     a
    //     res.send(details);
    // });
    app.get('/notes:id',(req,res)=>{
        const details={'_id': req.params.id};
        res.send(details);
    });

    app.post('/notes',(req, res)=>{
        console.log(req.body);
        res.send('Hello');
    });
};