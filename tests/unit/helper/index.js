var oriProcessArgv = [];
process.argv.forEach(function(item){
    oriProcessArgv.push(item);
});

exports.setProcessArgs = function(args){
    process.argv = [];
    oriProcessArgv.forEach(function(item){
        process.argv.push(item);
    });

    args.split(' ').forEach(function(item){
        process.argv.push(item);
    });
};