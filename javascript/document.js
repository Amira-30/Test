const orignal= {
    name: "alex",
    setting:{
        theme: "dark"
    }
};
const copy= {...orignal,setting:{...orignal.setting}}
copy.setting.theme= "light";
console.log(orignal.setting.theme);


let x= 3; 
let y= x++;
console.log(x, y);


let a = 10;
if( a = 5){
    console.log("hello");
    
}


