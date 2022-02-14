const { Console } = require("console");
const fs = require("fs");                   

//Barn Object
const barnObj = {
    index: 0, 
    amount: 1,
    barn: null
}; 
const listOfBarns = [];         
const listOfColors = [];            //list to keeep track of colors
var animalData;

//read file
fs.readFile("./animals.json", "utf8", function(error,jsonAnimalData){
    //if read fails return
    if(error)  {
        console.log("Trouble reading file"); 
        return; 
    }
    //parse document
    try
    {
        animalData = JSON.parse(jsonAnimalData);
        for(var i = 0; i < animalData.livestock.length; i++)
        {
            var currentAnimal = animalData.livestock[i];
            if(!(currentAnimal.hasOwnProperty("barn")) && !(currentAnimal.hasOwnProperty("animals")))       //check if document is formatted correctly
                throw("JSON not formatted properly");
            var currentBarn = Object.assign(barnObj, {animals: []});        //create new barn object
            currentBarn["barn"] = "Barn_" + currentAnimal.barn;
            if(!listOfColors.includes(currentAnimal.barn))              //checks if we already have color
            {
                listOfBarns.push(Object.assign({},currentBarn));        //push current barn object into list
                listOfColors.push(currentAnimal.barn);
            }

        }   
        addAnimals();
        createNewBarns();    //create new barns if needed
        var data = JSON.stringify(listOfBarns, makeHidden, 1);          //convert list of barn objects into a JSON string
        //write to file
        fs.writeFile("solution.json",data, (error) => {
            if(error)
                console.log("Troubel reading File")
            else {
                console.log("File written successfully");
            }
        })
    }catch(error)
    {

        console.log(error);
    }
})
//function to add ahimals to Original Barn
const addAnimals = () => {
    for(var i = 0; i < listOfBarns.length; i++)
    {
        //add animals to associated barn
        for(var j = 0; j < animalData.livestock.length; j++)
        {
            var currentAnimal = animalData.livestock[j];
            if(listOfBarns[i].barn == "Barn_" + currentAnimal.barn)
            {
                listOfBarns[i].animals.push(currentAnimal.animal);
                listOfBarns[i].index++;
                
            }
        }
    }
}
//function to create new barns for barns that currently have more than 4 animals.
const createNewBarns = () => 
{
    for(var i = 0; i < listOfBarns.length; i++)
    {
        if(listOfBarns[i].index > 4)        //for barnsobj with more than 4 animals
        {
            var counter = listOfBarns[i].animals.length -1 ;
            newBarns = getBestSum(listOfBarns[i].index);
            newBarns.pop();
            for(var j = 0; j < newBarns.length; j++)
            {
                var newBarn = Object.assign(barnObj, {animals: []});        //create new barn
                //add animals to new barn while removing from original
                for(var k = 0; k < newBarns[j]; k++)
                {
                    newBarn.animals.push(listOfBarns[i].animals[counter]);
                    listOfBarns[i].animals.pop();           
                    listOfBarns[i].animals.index--;
                    counter--;
                }
                newBarn["barn"] = listOfBarns[i].barn + "_" + ++listOfBarns[i].amount;          
                listOfBarns.push(Object.assign({},newBarn));        //push new barn into listi
            }
        }
    }
}
//function to get all possible combinations of sums
const getAllSum = (target, currentSum, begin, temp, output) =>
{
    if(currentSum === target) {         //base case
        output.push(temp.slice());
    }
    //find combinations
    for(let i = begin; i < target; i++)
    {
        let tempSum = currentSum + i; 
        if((tempSum <= target) && i <= 4) {     //make combination with values less than 4
            temp.push(i); 
            getAllSum(target, tempSum, i, temp, output)
            temp.pop();
        }
        else {
            return;
         }
    }
}
//function to get the last combiation of sums
const getBestSum = function(target) {
    let output = [];
    let temp = [];
    getAllSum(target, 0, 1, temp, output);
    return output[output.length - 1];
};
//helper function that helps with hiding some of barnObj properties that we don't need
const makeHidden = (key, value) =>
{
    if(key == "index") return undefined;
    else if(key == "amount") return undefined;
    return value
}
