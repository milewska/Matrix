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
var killRow=function(obj){
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

var addCell=function(obj,name){
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

var addRow=function(obj){
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push("placeholder");

    let name=Math.random().toString(36).substr(2, 7);
    newKey(loco,name);
}

var changeCell = function(obj){
    let value=obj.value
    console.log('val',value)
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
    showTables()
    showTables(obj);

    seekExisting(obj);
};

var changeKey = function(obj){
    let path=(obj.dataset.location).split('.');
    newKey(path,obj.value);
};

var newKey=function(path,value){
    path = path.filter(function(n){ return n != "" }); 
    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
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

var seekExisting = function(obj){
    document.getElementById('extra').innerHTML=findObjects(tables,obj.value);
}

function findObjects(library, targetProp) {
    let finalResults=[];
    drillDown(library);

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
                console.log('--found id');
                finalResults.push(theObject[prop]);
                // if (theObject[prop] === targetProp) {
                //   console.log('----found prop', prop, ', ', theObject[prop]);
                //   // finalResults.push(theObject);
                // }
              }
              if (theObject[prop] === targetProp) {
                  console.log('----found prop', prop, ', ', theObject[prop]);
                  finalResults.push(theObject); //can use "prop" to just show the label..
              }
              if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
                drillDown(theObject[prop]);
              }
            }
          }
        }
    }

    return getObject(finalResults);
}