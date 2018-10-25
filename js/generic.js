var tables = new Object();
tables.storm=({
        email:"21",
        contact:"Anna"
  });
tables.mufasa=({
        email:"2321",
        contact:"WB"
  });


let parentTree=new Array();

let tabIndex=0;

var getObject = function(obj){
	var output='';
	if(obj === null || typeof(obj) !== 'object' ){//if it's just a value (not object)
        tabIndex++;
        parentTree.push(obj)
        output+=('<input type="text" id="'+tabIndex+'" class="cell" data-celltype="cell" data-location="'+parentTree.join(".")+'" value="'+obj+'"/>'); 
        parentTree.splice(-1,1);
		return output;
	}else{
		Object.keys(obj).forEach(function(key) {
			parentTree.push(key);
            tabIndex++;
			output+=('<br/><span class="parentRow" data-location="'+parentTree.join(".")+'" data-row="'+key+'"><span class="tableKill" class="kill" onclick="killRow(this)" data-location="'+parentTree.join(".")+'">X</span><input type="text" tabindex="'+tabIndex+'" id="'+tabIndex+'" class="key" data-celltype="key" data-location="'+parentTree.join(".")+'" value="'+key+'" />'+getObject(obj[key],key)+'</span>');
			parentTree.splice(-1,1);	
		})
		return output;
	}
}

// when we want to destroy a row
let killRow=function(obj){
    let path=obj.dataset.location.split('.');

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
let addRow=function(obj){
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push("placeholder");

    let name=Math.random().toString(36).substr(2, 7);
    newKey(loco,name);
}

let addCell=function(obj,name){
    console.log("addcell")
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push(name);    

    path = loco.filter(function(n){ return n != "" }); 
    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length-1){
            let keytest='{"'+name+'":"val"}';
            a[b]=JSON.parse(keytest);
            return a[b];
        }else {
            return a[b];
        }
    },tables);
    showTables(obj)
}

let changeCell = function(obj,value){
    console.log('ChangeCell Val',value)
    var path=(obj.dataset.location).split('.');
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

    seekExisting(obj);
};

let changeKey = function(obj,value){
    // let path=(obj.dataset.location).split('.');
    // newKey(path,value);
    console.log("obj: ",obj, "Value: ",value)

    var loco=(obj.dataset.location).split('.');

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
    showTables()
}

let seekExisting = function(obj){
    document.getElementById('extra').innerHTML=getObject(findObjects(tables,obj.value));
}
let getFlat = function(obj){
    flat = [];
    flattenObject(obj)
    return uniq(flat);
}

let flat = [];
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
};
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function findObjects(library, targetProp) {
    function drillDown(theObject) {
        let result = null;
        if (theObject instanceof Array) {
          for (let i = 0; i < theObject.length; i++) {
            drillDown(theObject[i]);
          }
        }else {
          for (let prop in theObject) {
            if(theObject.hasOwnProperty(prop)){
              if (prop === targetProp) {
                finalResults.push(theObject[prop]);
              }
              if (theObject[prop] === targetProp) {
                  finalResults.push(theObject); //can use "prop" to just show the label..
              }
              if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
                drillDown(theObject[prop]);
              }
            }
          }
        }
    }

    let finalResults=[];
    drillDown(library);
    return finalResults;
}