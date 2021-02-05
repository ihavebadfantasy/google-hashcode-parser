# Google Hashcode parser

### This helper is made to parse .in/.txt/no-extension input files to array of arrays line by line and generate .out file from array of arrays

## Usage
1. Drag your input files to input directory
2. Add your solver to solvers directory (check out solvers/ExampleSolver and app/SolutionCreator to be aware of solvers writing rules)

`node index.js a_example PracticeSolver`

Where: 
a_example - name of input file 
PracticeSolver - name of your problem solver.

output:

will be {input file name}.out file which is valid to submit for Google score counter

## Extra
Collect.js is listed in package.json as a dependency, it is pretty handy to manipulate arrays but aware of using it in nested cycles because it is pretty slow!
Collect.js documentation:
https://collect.js.org/installation.html
