const {getPackageInfo, recurtion_getPackages} = require('./repository_connector');
const {fromCach, toCach} =require('./cach');

const asyncmiddleware = async(req,res,next) =>{
    const {name, tag_name}=req.params;
    const dep = await recurtion_getPackages(name,tag_name);
    req.params.dep=dep;
    console.log('Before send in asyncmiddleware');
    res.send(req.params);
}

module.exports = async function(app,db){

    app.get('/repos/:name/:tag_name',asyncmiddleware/*fromCach,getPackageInfo recurtion_getPackages*/);

    app.get('/notes:id',(req,res)=>{
        const details={'_id': req.params.id};
        res.send(details);
    });

    app.post('/notes',(req, res)=>{
        console.log(req.body);
        res.send('Hello');
    });
};