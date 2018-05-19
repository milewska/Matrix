//name, contact, phone, email, whatsapp, flight in, flight out, pay rate, flight cost

var people = new Array();

const addPerson = function(personJson){
	people.push(personJson);
	peoplePost = JSON.stringify(people)
	return people.length;
}

addPerson({name:"Mike",type:"guest",contact:"WB",phone:"321",email:"mike@block1750.com",pay:"$1"});
addPerson({name:"WB",type:["liason","host"],phone:"21"})

var types = new Array();

types = new Object();

types['guest']=new Array();


types.push({"guest"})
types.push({"liason"})
types.push({"volunteer"})
types.push({"leed"})
types.push({"contact"})
types.push({"host"})


//people: 
//types: guest, liason, volunteer, lead


const getData = function(table,column){

}
