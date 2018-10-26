var tables = new Object();
tables.storm=({
    email:"storm@stormdance.de",
    liason:"WB",
    arrives:"Tuesday Sept 1",
    host:"Faire and Fam",
    rate:"1000 Euro",
    whatsApp:"2497972560157"
});
tables.mufasa=({
    email:"mufasa@mufdance.de",
    liason:"Anna",
    arrives:"Wed Sept 2",
    host:"AirBNB",
    rate:"700 Euro",
    whatsApp:"42865917712"
});
tables.Nobu=({
    email:"nobunagalewing@nobu.de",
    liason:"Julio",
    arrives:"Thur Sept 3",
    host:"Faire and Fam",
    rate:"800 Euro",
    whatsApp:"4972589104297"
});


let parentTree=new Array();
let tabIndex=0;


var getObject = function(obj){
	var output='';
	if(obj === null || typeof(obj) !== 'object' ){//if it's just a value (not object)
        tabIndex++;
        parentTree.push(obj)
        output+=('<input type="text" id="'+tabIndex+'" class="cell" data-celltype="cell" data-location="'+parentTree.join(">")+'" value="'+obj+'"/>'); 
        parentTree.splice(-1,1);
		return output;
	}else{
		Object.keys(obj).forEach(function(key) {
			parentTree.push(key);
            tabIndex++;
			output+=('<span class="parentRow" data-location="'+parentTree.join(">")+'" data-row="'+key+'"><span class="tableKill" class="kill" onclick="killRow(this)" data-location="'+parentTree.join(">")+'">X</span><input type="text" tabindex="'+tabIndex+'" id="'+tabIndex+'" class="key" data-celltype="key" data-location="'+parentTree.join(">")+'" value="'+key+'" />'+getObject(obj[key],key)+'</span>');
			parentTree.splice(-1,1);	
		})
		return output;
	}
}


let addRow=function(obj){
    console.log(obj)
    var loco=obj.dataset.location;
    loco=loco.split(">");
    loco.splice(-1,1);
    loco.push("placeholder");
    newKey(loco,Math.random().toString(36).substr(2, 7));
}

// when we want to destroy a row
let killRow=function(obj){
    let path=obj.dataset.location.split(">");

    path = path.filter(function(n){ return n != "" }); 

    let level = 0;

    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
            if(typeof a[b]!=="object"){
                console.log("OBJ!")
                delete a[b]; 
            }else{
                a[b]="newVal";
            }
            return;
        }else {
            return a[b];
        }
    },tables);
    showTables(obj)
}

let addCell=function(obj,value){
    console.log("addcell")
    var loco=obj.dataset.location;
    loco=loco.split(">");
    loco.splice(-1,1);
    loco.push(value);    

    path = loco.filter(function(n){ return n != "" }); 
    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length-1){
            let keytest='{"'+value+'":"val"}';
            a[b]=JSON.parse(keytest);
            return a[b];
        }else {
            return a[b];
        }
    },tables);
    showTables(obj)
}

let changeCell = function(obj,value){
    var path=(obj.dataset.location).split(">");
    path.splice(-1,1);

    path = path.filter(function(n){ return n != "" }); 
    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
            a[b]=value;
            return;
        }else {
            return a[b];
        }
    },tables);
};

let changeKey = function(obj,value){
    var loco=(obj.dataset.location).split(">");

    loco = loco.filter(function(n){ return n != "" }); 

    let level = 0;
    loco.reduce((a, b)=>{
        level++;
        if (level === loco.length){
            Object.defineProperty(a, value, Object.getOwnPropertyDescriptor(a, b));
            delete a[b];
            return;
        } else {
            return a[b];
        }
    }, tables);

    showTables(obj);

};

let newKey=function(path,value){
    console.log("Path: ",path);
    path = path.filter(function(n){ return n != "" }); 
    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
            if(a[b] === undefined)//need this to use for "new key"
                a[b]=value;
            Object.defineProperty(a, value, Object.getOwnPropertyDescriptor(a, b));
            delete a[b];
            return;
        }else {
            return a[b];
        }
    },tables);
    showTables();//Don't know the exact object to select so oh well
}

let seekExisting = function(obj){
    document.getElementById('extra').innerHTML=getObject(findObjects(tables,obj.value));
    // showTables();
}

let flat = [];
let getFlat = function(obj){
    flat = [];
    return uniq(flattenObject(obj));
}
let flattenObject = function(obj) {
        if (obj instanceof Object){
            for (let a in obj) {
                if (obj[a] instanceof Object || obj[a]!==undefined){
                    flat.push(a);
                    flattenObject(obj[a]);
                }
                else{
                    flat.push(a)
                }
            }
        }else{
            flat.push(obj) 
        }
        return(flat)
};
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function firstKey(obj){
    for (let key in obj)
            if(Object.getOwnPropertyDescriptor(obj,key))
        return key;
}

function findObjects(library, targetProp) {
    let drillPath=[];
    function drillDown(theObject) {

        let result = null;
        if (theObject instanceof Array) {
          for (let i = 0; i < theObject.length; i++) {
            drillDown(theObject[i]);
          }
        }else {
          for (let prop in theObject) {
            drillPath.push(prop);
            if(theObject.hasOwnProperty(prop)){
              if (prop === targetProp) {
                let pathSimple=drillPath[0]//
                finalResults[pathSimple]=(theObject[prop]);
              }else{

              }
              if (theObject[prop] === targetProp) {
                    let pathSimple=drillPath[drillPath.length-1]
                    let displayObj = {}
                    displayObj[drillPath[drillPath.length-1]]=theObject[prop];
                    // let pathSimple=drillPath[0]+" --> "+drillPath[drillPath.length-1]
                  finalResults[drillPath[0]]=displayObj; //can use "prop" to just show the parent label or "theObject" to show whole thing..
                  // finalResults[drillPath[0]]=({some:"value"}); //can use "prop" to just show the parent label or "theObject" to show whole thing..
              }
              if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
                drillDown(theObject[prop]);
              }
            }
          }
        }
        drillPath=[];
    }

    let finalResults=[];
    drillDown(library);
    return finalResults;
}