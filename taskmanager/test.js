function getHelloMessage(name){
    return "Hello " + name + ", how is it going?";
}
function sum(a,b){
    return a + b;
}

// classes
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.owner = "Student";
    }
}

function testClass() {
    let c1 = new Car("Form","A", "1934");
    console.log(c1);
}


function Dog(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;;
}

function createObjects(){
    //object literal
    let data = {
        name: 'Test1',
        speed: 111,
        color: "red",
        size: 12
    };
    console.log(data);

    //object constructor
    let fido = new Dog("Fido", 2, 'white');
    console.log(fido);

    let lola = new Dog("Lola", 4, 'pink');
    console.log(lola);
}

function runTests(){
    console.log("Starting Tests");

    let message = getHelloMessage("Andrew");
    console.log(message);

    let result = sum(12,49);
    console.log("The result is: " + result); //61

    // HomeWork 1
    //** you should not all the user to divide by zero. show an error if user tries to divide by zero. */
    let divRes = divide(9, 3);
    let divRes2 = divide(1, 8);
    let divRes3 = divide(10, 0);
    console.log("results", divRes, divRes2, divRes3);
}
function divide(num1, num2){
    if(num2 == 0){
        console.log("You can't divide by zero, silly goose!");
        return 0;
    }

    return num1/num2;
}

function testAjaxGet(){
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function(response) {
            console.log("server says: ", response);
        },
        error: function (errorDetails) {
            console.log("Error", errorDetails);
        }
    });
}

function testArrays(){
    let nums = [1,123,543,3,3456,5678,234,4567,789,234];
    // sum the nums and print the total
    let total = 0;
    for(let i=0; i<nums.length; i++){
        total += nums[i];
    }
    console.log("Total: ", total);
}