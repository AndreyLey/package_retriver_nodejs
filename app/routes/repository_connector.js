const fetch = require('node-fetch');
async function getPackageInfo(req,res,next)
{
        try{
            console.log('Start fetching...')
            const {name, tag_name}=req.params;
            const response = await fetch(`https://registry.npmjs.org/${name}/${tag_name}`);
            const data = await response.json();
            // console.log(data);
            console.log(`Dependencies is: `)
            console.log(data.dependencies)
            // console.log(`Dev Dependencies: `);
            // console.log(data.devDependencies);
            console.log('Fetching finished.')
            req.params={dependencies:data.dependencies, devDependencies:data.devDependencies};//, dev: data.devDependencies};
            //res.send({production: data.dependencies, dev: data.devDependencies});
            next();
        }
        catch(err)
        {
            console.log(err);
            res.status(500);
        }
    
};

module.exports.getPackageInfo = getPackageInfo;