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

var getObject = function(obj){
	var output='';
	if(obj === null || typeof(obj) !== 'object' ){//if it's just a value (not object)
        parentTree.push(obj)
		// output+=('<span class="cell" data-celltype="cell" data-location="'+parentTree.join(".")+'">'+obj+'</span>')
        output+=('<input type="text" class="cell" data-celltype="cell" data-location="'+parentTree.join(".")+'" value="'+obj+'"/>'); 
        parentTree.splice(-1,1);
		return output;
	}else{
		Object.keys(obj).forEach(function(key) {
			parentTree.push(key);
			output+=('<br/><span class="parentRow" data-location="'+parentTree.join(".")+'" data-row="'+key+'"><span class="tableKill" class="kill" onclick="killRow(this)" data-location="'+parentTree.join(".")+'">X</span><input type="text" id="'+parentTree.join("-")+'" class="key" data-celltype="key" data-location="'+parentTree.join(".")+'" value="'+key+'" />'+getObject(obj[key],key)+'</span>');
            // output+=('<br/> <span class="parentRow" data-location="'+parentTree.join(".")+'" data-row="'+key+'"><span class="tableKill" class="kill" onclick="killRow(this)" data-location="'+parentTree.join(".")+'">X</span><input type="text" id="'+parentTree.join("-")+'" class="key" data-celltype="key" data-location="'+parentTree.join(".")+'" value="'+getObject(obj[key],key)+'"/>');
			parentTree.splice(-1,1);	
		})
		return output;
	}
}

//Function to generate a random key name because only unique keys can exist
var randomKey=function(pre){return pre+(Math.floor(Math.random()*10000))};

// when we want to destroy a row
var killRow=function(obj){
    let path=obj.dataset.location.split('.');

    path = path.filter(function(n){ return n != "" }); 

    let level = 0;

    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
            delete a[b];
            return;
        }else {
            return a[b];
        }
    },tables);

	showTables();
}

var addCell=function(obj,name){
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);
    loco.push(name);
    addTab(loco,name);
    
    showTables();
}

var addRow=function(obj){
    var loco=obj.dataset.location;
    loco=loco.split('.');
    loco.splice(-1,1);

    let name=randomKey("new")
    loco.push("placeholder");
    newKey(loco,name);

    showTables();
}

var changeCell = function(obj){
    console.log("Change Cell: ", obj);
    var loco=(obj.dataset.location).split('.');
    loco.splice(-1,1);
    setCell(loco,obj.value);

	showTables();
};

var changeKey = function(obj){
    console.log("Change Key: ", obj);
    var loco=(obj.dataset.location).split('.');
    setKey(loco, obj.value, 'key');

    showTables();
};



var addTab=function(path,value){
    path = path.filter(function(n){ return n != "" }); 

    let level = 0;
    path.reduce((a, b)=>{
        level++;

        if (level === path.length-1){
            console.log("addtab",a,b,value,a[b]);
            var keytest='{"'+value+'":"val"}';
            a[b]=JSON.parse(keytest);
            return a[b];
        }else {
            return a[b];
        }
    },tables);
};


var newKey=function(path,value){
    path = path.filter(function(n){ return n != "" }); 

    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
            if(typeof a !== "object"){
                console.log("ADDCELL")
                a[b]={somekey:"val"};
                return a[b];
            }
            a[b]=value;
            Object.defineProperty(a, value, Object.getOwnPropertyDescriptor(a, b));
            delete a[b];
            return;
        }else {
            return a[b];
        }
    },tables);
};

function setCell(path, value) {
    var i;
    let obj=tables;

    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
}


function setKey(path, value, mode) {
	path = path.filter(function(n){ return n != "" }); 

    let level = 0;
    path.reduce((a, b)=>{
        level++;
        if (level === path.length){
    		console.log("Deep: key",a,b,value,a[b]);
    		Object.defineProperty(a, value, Object.getOwnPropertyDescriptor(a, b));
			delete a[b];
            return;
        } else {
            return a[b];
        }
    }, tables);
}