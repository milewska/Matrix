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


var isObject = function(obj){
	if(obj !== null && typeof obj === 'object' )
		return true
	else
		return false;
}

var parentTree=new Array();

var getObject = function(obj){
	var output='';

	if(obj === null || typeof(obj) !== 'object' ){//if it's just a value (not object)
        parentTree.push(obj)
		output+=('<span class="cell" data-celltype="cell" data-location="'+parentTree.join(".")+'">'+obj+'</span>')
        parentTree.splice(-1,1);
        // output+='<span id="'+parentTree.join(".")+'" class="tableAdd" onclick="addRow(this)" data-location="'+parentTree.join(".")+'" data-celltype="add"> + </span>';
		return output;
	}else{
		Object.keys(obj).forEach(function(key) {
			parentTree.push(key);
			output+=('<br/><span class="parentRow" data-location="'+parentTree.join(".")+'" data-row="'+key+'"><span class="tableKill" class="kill" onclick="killRow(this)" data-location="'+parentTree.join(".")+'">X</span><span id="'+parentTree.join("-")+'" class="cell" data-celltype="key" data-location="'+parentTree.join(".")+'">'+key+'</span>'+getObject(obj[key],key)+'</span>');
			parentTree.splice(-1,1);	
			
			// output+='<span id="'+parentTree.join(".")+'" class="tableAdd" onclick="addRow(this)" data-location="'+parentTree.join(".")+'" data-celltype="add"> + </span>';
		})
		return output;
	}
}

var randomKey=function(pre){return pre+(Math.floor(Math.random()*10000))};

var killRow=function(obj){
	setDeep(tables, obj.dataset.location.split('.'),"","kill");
	showTables();
}

var addRow=function(obj){
    var loco=obj.dataset.location//+".newKey"
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push(randomKey("newkey"));
    setDeep(tables,loco,randomKey("downValue"),"add");
    showTables();
}

var changeCell = function(obj){
    console.log("Change Obj: ", obj);
    var loco=obj.dataset.location//+".newKey"
    loco=loco.split('.');
    if(obj.dataset.celltype=="cell")
        loco.splice(-1,1);
	
    setDeep(tables, loco, obj.innerHTML, obj.dataset.celltype);
	showTables();
};

var enterDown=function(obj) {
    addRow(obj);
}
var tabDown=function(obj) {
    addRow(obj)
}


/**
 * Dynamically sets a deeply nested value in an object.
 * Optionally "bores" a path to it if its undefined.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 */
function setDeep(obj, path, value, mode) {
    console.log("TB:",tables)
	path = path.filter(function(n){ return n != "" }); 

    let level = 0;

    path.reduce((a, b)=>{
        level++;
      
      // 	if(typeof a !== "object"){
      //       console.log("deep nonobj")
    		// a={}; 
    		// // a[b] = {inset:"vaL"};
    		// // return a[b];
      //   }
      // Object.defineProperty(o, new_key, Object.getOwnPropertyDescriptor(o, old_key));
        if (level === path.length){
        	if(mode=="key"){
        		console.log("Deep: key",a,b,value,a[b]);
        		Object.defineProperty(a, value, Object.getOwnPropertyDescriptor(a, b));
    			delete a[b];
                return;
        	}else if (mode=="kill"){
        		delete a[b];
        		return;
        	}else if (mode=="add"){
                console.log("Deep: add",a,b,value,a[b]);
                a[b]=value;
                Object.defineProperty(a, value, Object.getOwnPropertyDescriptor(a, b));
                delete a[b];
                return;
            }else if (mode=="cell"){
        		console.log("Deep: cell, a: ",a, ". B: ",b,". Value: ",value,". A[B]: ",a[b]);
        		a[b]=value;
        		return a[b];
        	}
            if(typeof a !== "object"){
                console.log("NOTOBJ",a,value);
                a=value;
                b=value
                // return a;
            }
            a[b] = {};
            return a;
        } else {
            return a[b];
        }
    }, obj);
}