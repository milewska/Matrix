var tables = new Object();
tables.people=({
    storm: {
        email:"21",
        roles:{
            main:"judge",
            secondary:"performer"}
        },
      wb: {
        phones: {home: "456", cell:"123"},
        flight: "21"
      }
  });

tables.performers=({storm: {email:"21",roles:{main:"judge",secondary:"performer"}},
      wb: {
        phones: {home: "456", cell:"123"},
        flight: "21"
      }
  });


var parentTree=new Array();

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
                // a[b]="newval"
            }else{
                a[b]="newVal";
            }
            return;
        }else {
            return a[b];
        }
    },tables);

	showTables(obj);
}

var addCell=function(obj,name){
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push(name);    

    path = loco.filter(function(n){ return n != "" }); 
    let level = 0;
    path.reduce((a, b)=>{
        level++;

        if (level === path.length-1){
            var keytest='{"'+name+'":"val"}';
            a[b]=JSON.parse(keytest);
            return a[b];
        }else {
            return a[b];
        }
    },tables);

    showTables(obj);
}

var addRow=function(obj){
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push("placeholder");

    let name=Math.random().toString(36).substr(2, 7);
    newKey(loco,name);
    showTables(obj);
}

var changeCell = function(obj){
    var loco=(obj.dataset.location).split('.');
    loco.splice(-1,1);

    let i;
    let mod=tables;

    for (i = 0; i < loco.length - 1; i++)
        mod = mod[loco[i]];

    mod[loco[i]] = obj.value;

    var final = [];
    // console.log(findObjects(tables,obj.value,'val',final));
    document.getElementById('extra').innerHTML=getObject(findObjects(tables,obj.value,'val',final));


    showTables(obj);
};

var changeKey = function(obj){
    var loco=(obj.dataset.location).split('.');

    loco = loco.filter(function(n){ return n != "" }); 

    let level = 0;
    loco.reduce((a, b)=>{
        level++;
        if (level === loco.length){
            Object.defineProperty(a, obj.value, Object.getOwnPropertyDescriptor(a, b));
            delete a[b];
            return;
        } else {
            return a[b];
        }
    }, tables);

    showTables(obj);
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
};

function findObjects(obj, targetProp, targetValue, finalResults) {

  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    }
    else {
      for (let prop in theObject) {
        if(theObject.hasOwnProperty(prop)){
          console.log(prop + ': ' + theObject[prop]);
          if (prop === targetProp) {
            // console.log('--found id');
            // if (theObject[prop] === targetValue) {
              console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
            // }
          }
          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);
return finalResults;
}