# LogicGate Software Engineering Internship Challenge

## How to Run 
After Extracting, open the terminal and cd into ArdonnissZimero_Submission directory
from there run the following command to run the program. 

``` 
npm start

```

Alternatively you can also just type the command 

```
node index.js 

````
The program will then create an solution.json within the directory that contains the output of the program.

## Summary

LogicGate recently bought a farm that has many different colored barns containing an assortment of animals. Farmer Kunkel would like to improve efficiency at the farm by ensuring that the animals are evenly distributed across all barns. He also wants to keep the animals happy by putting them in their favorite color barns. There are a number of requirements that Farmer Kunkel must adhere to when distributing animals which are listed below.

## Requirements

Using the animals.json file, evenly distribute the animals into each barn by the color of the barn they are associated with. For example, a goat may be associated with the color green, so this goat can only be distributed to green barns.  Barns have a maximum capacity of 4 animals per barn.  The distribution difference between each barn of the same color cannot be greater than one.   

For example, if there are 11 animals with the favorite color blue and 3 blue barns, there should be 4 in the first and second and 3 in the third. Output a valid JSON that describes the state of each barn.

Please describe every methods (functions) and any classes created with additional code comments.


## Example output JSON format

    [
      {"barn": "Barn_Green", "animals":["Duck"]},
      {"barn": "Barn_Green_2", "animals":["Goat"]},
      {"barn": "Barn_Brown", "animals":["Goat","Duck"]}
    ]

## Bonus

### Unit Tests

Create unit tests that validate's your program's output. Aim for ~85% test coverage.

### Error/Edge case Handling

* Handle a case where not every animal fits into a barn
* Throw an exception and halt the program if the input JSON is not properly formatted
