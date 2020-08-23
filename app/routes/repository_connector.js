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

async function recurtion_getPackages(req,res,next)
{
    console.log('Start fetching...')
    const {name, tag_name}=req.params;
    const dep = await fetch_and_orgenize(name,tag_name);//await get_allTree([]);
    const rec_dep = await get_allTree(dep); 
    console.log(`Repositiry: ${rec_dep.dep}`);
    req.params.dependencies=rec_dep;//await get_allTree([])};
    res.send(req.params);
    //next();
    // const response = await fetch(`https://registry.npmjs.org/${name}/${tag_name}`);
    // const data = await response.json();
    // let dep_array=[];
    // let dep_from_data = 
    // {
    //     ...data.dependencies,
    //     ...data.devDependencies
    // };
    // for(const[key,value] of Object.entries(dep_from_data))
    // {
    //     var new_dep={
    //         name : key,
    //         tag : value,
    //         dep : []
    //     };
    //     //new_dep[key]=value;
    //     new_dep.dep=[];
    //     dep_array.push(new_dep);
    // }
    /////////////////////////////////////////////////////////
    // for(var entry  of Object.entries(dep_from_data))
    // {
    //     let dependencie = Object.create(entry);
    //     dependencie.dep_arr = [];
    //     dep_array.push(dep);
    //     //console.log(entry);
    //     //dep_array.push({...entry, dep:[]});
    // }
    // Object.entries(dep_from_data).forEach(key,value=>
    //     dep_array.push({key:value, dep:[]})
    // );
    // let dep_from_data = 
    // {
    //     ...data.dependencies,
    //     ...data.devDependencies
    // };
    // for(var i in dep_from_data)
    // {
    //     //console.log(`Object ${i} and value: ${dep_from_data[i]}`);
    //     dep_array.push({i,dep : []});
    // }

    //console.log(dep_array);
    // data.dependencies.forEach(element => {
    //     console.log(element);
    //     dep_array.push({element,dep : []});
    // });
    // data.devDependencies.forEach(element => {
    //     console.log(element);
    //     dep_array.push({element,dep : []});
    // });

    //return dep_from_data;//{name:tag_name,"dep_tree": get_allTree};
}

async function get_allTree(dependencies)
{
    if(dependencies===null || dependencies.length ==0)
    {
        return [];
    }

    // for (var dependencie in dependencies )
    // {
    //     var response = async ()=>{await  fetch_and_orgenize(dependencie.name, dependencie.tag)};
    //     dependencies.dep = get_allTree(response.dep);
    // }



    // dependencies.forEach(element=>{
    //     var response = fetch_and_orgenize(element.name, element.tag);
    //     dependencies.dep = get_allTree(response.dep);

    // });

    return dependencies;
    //const {name, tag_name}=req.params;

    
}

async function fetch_and_orgenize(name, tag_name)
{
    const response = await fetch(`https://registry.npmjs.org/${name}/${tag_name}`);
    const data = await response.json();

    let dep_array=[];
    let dep_from_data = 
    {
        ...data.dependencies,
        ...data.devDependencies
    };

    for(const[key,value] of Object.entries(dep_from_data))
    {
        var new_dep={
            name : key,
            tag : value,
            dep : []
        };
        dep_array.push(new_dep);
    }

    return dep_array;
}

module.exports.recurtion_getPackages = recurtion_getPackages;
module.exports.getPackageInfo = getPackageInfo;