var trainData= new Firebase('https://fcrutgers.firebaseio.com/');

var name = '';
var destination ='';
var time = '';
var frequency = '';

	$('#submit').on('click',function(){
		// take the values of the inputed information 
		name = $('#trainName').val();
		destination = $('#destinationInput').val();
		time = $('#firstTrainTimeInput').val();
		frequency = $('#frequencyInput').val();
		// push info to firebase
		trainData.push({
			name: name,
			destination: destination,
			time: time,
			frequency:frequency,

		});
		// clear the input fields
		$('#nameInput').val('');
		$('#destinationInput').val('');
		$('#firstTrainTimeInput').val('');
		$('#frequencyInput').val('');
		// dont refresh the page 

		return false;
	});
// use the recent append child to learn append information. 
trainData.on("child_added", function(snapshot) {

	// Log everything that's coming out of snapshot
	console.log(snapshot.val().name + " name");
	console.log(snapshot.val().destination + "destination");
	console.log(snapshot.val().time + " time");
	console.log(snapshot.val().frequency +" frequency");

	// Create a new Table row. outside of the for loop 	
	var tableRow = $('<tr>');	

	// Create a variable to store information for the time & frequency 
	var firstTime = snapshot.val().time;
	var tFrequency= snapshot.val().frequency;
	// turn frequency into a number 
	tFrequency = parseInt(tFrequency);
	// convert string of military time to a moment item.  
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	// use moment to calculate current time 
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
	//Caculate difference between times in minutes 
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	//Time apart (remainder)
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);
	//Minute Until next sTrain
	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
	
	// add all train information to an array for easy use
	// Use the moment caculated items and add them to the array 
	// May need a new function to hodl thsi information.  
	var trainInfo = [snapshot.val().name, snapshot.val().destination, snapshot.val().time, snapshot.val().frequency,tMinutesTillTrain];
	console.log(trainInfo);
	//create a for loop to easily create a new table data with  the HTMl from the inputed value 
	for(var i = 0; i < trainInfo.length;i++){
		// create a new td
		var tableData = $('<td>');
		// add the information from the array to the HTMl of this td
		tableData.html(trainInfo[i]);
		console.log(tableData);
		// give it an attribute for save measure 
		tableData.attr('id',i);
		// append current td to table row 
		tableRow.append(tableData)
	}
	// append the new row to the last child of the table body
	$('#trainInfo > tBody:last-child').append(tableRow);
	// return false to prevent constant returning
	return false;
// Handle the errors
}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
})


