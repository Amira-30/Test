const orignal= {
    name: "alex",
    setting:{
        theme: "dark"
    }
};
const copy= {...orignal,setting:{...orignal.setting}}
copy.setting.theme= "light";
console.log(orignal.setting.theme);

