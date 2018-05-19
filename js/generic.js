//name, contact, phone, email, whatsapp, flight in, flight out, pay rate, flight cost

var tables = new Object();
tables.people=({storm: {phone:"321",whatsapp:"123",email:"21",roles:{main:"judge",secondary:"performer"}},
      wb: {
        phones: {home: "456", cell:"123"},
        flight: "21"
      },
      Mufasa: {
        phones: "123",
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
		output+=("<span class='cell' data-location='"+parentTree.join('.')+"'>"+obj+"</span>")
		return output;
	}else{
		Object.keys(obj).forEach(function(key) {
			parentTree.push(key);
			output+=("<br/><span class='parentRow' data-location='"+parentTree.join('.')+"' data-row='"+key+"'><span class='tableKill' class='kill' onclick='killRow(this)' data-tableid='"+key+"' data-location='"+parentTree.join('.')+"' data-celltype='kill'>X</span><span class='cell' data-celltype='key' data-location='"+parentTree.join('.')+"' data-cell='"+key+"'>"+key+"</span>"+getObject(obj[key],key)+"</span>")
			parentTree.splice(-1,1);	
			
			output+='<span class="tableAdd" id="'+key+'Button" onclick="addRow(this)" data-tableid="'+key+'" data-location="'+parentTree.join(".")+'" data-celltype="add"> + </span>';
		})
		return output;
	}
}

var killRow=function(obj){
	console.log(obj.dataset.location.split('.'))
	setDeep(tables, obj.dataset.location.split('.'),"death",obj.dataset.celltype);
	showTables();
}

var addRow=function(obj){
	var loco=obj.dataset.location;
	loco=loco.split(".");
	loco.push("newkey"+Math.floor(Math.random()*1000))
	console.log(loco)
	setDeep(tables,loco,"value",obj.dataset.celltype);
	showTables();
}

var changeCell = function(obj){
	console.log("CHANGED",obj,obj.dataset.location);
	setDeep(tables, obj.dataset.location.split('.'), obj.innerHTML,obj.dataset.celltype);
	showTables();
};

var keyDown=function(obj) {
	console.log(obj.keyCode)
    var TABKEY = 9;
    if(obj.keyCode == TABKEY) {
    	obj.preventDefault();
        obj.innerHTML += "tab";

    }
}


/**
 * Dynamically sets a deeply nested value in an object.
 * Optionally "bores" a path to it if its undefined.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 */
function setDeep(obj, path, value, cellType) {
	console.log("deep")	
	path = path.filter(function(n){ return n != "" }); 

    let level = 0;

    path.reduce((a, b)=>{
        level++;
      
      // 	if(typeof a !== "object"){
    		// a={}; 
    		// a[b] = {inset:"vaL"};
    		// return a[b];
      //   }
        if (level === path.length){
        	if(cellType=="key"){
        		console.log("key",a,b,value,a[b]);
        		Object.defineProperty(a, value,
        		Object.getOwnPropertyDescriptor(a, b));
    			delete a[b];
        		return;
        	}else if (cellType=="kill"){
        		delete a[b];
        		return;
        	}else if(typeof a !== "object"){
        		a={}; 
        		a[b] = {inset:"vaL"};
        		return;
            }else {
        		console.log("cell")
        		a[b]=value;
        		return a[b];
        	}
            a[b] = {};
            // a[b] = {value};
            return a;
        } else {
            return a[b];
        }
    }, obj);
}