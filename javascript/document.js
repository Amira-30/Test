
let rows = Number(prompt("Enter your rows"));
let output = "";
for(let i= 1; i <= rows; i ++){
 for(let a= 1; a <= rows - i; a ++){
    output= " ";
}
for(let y= 1; y <= i; y ++){
    output += "*";
}
output+= "\n";
}
console.log("" + output + "");