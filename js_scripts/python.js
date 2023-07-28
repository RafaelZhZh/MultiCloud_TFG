const {PythonShell} =require('python-shell');

function conectAWS(){
    var path = require('path');
    const PythonShell = require('python-shell').PythonShell;

    var nombre = "Rafa";
    var options = {
        mode: 'text',
        //pythonPath: 'path/to/python',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, '..\\python_scripts\\'),
        args : [nombre]
    }

    PythonShell.run('helloworld.py', options).then(messages=>{
        console.log('results: %j', messages);
    });

}

