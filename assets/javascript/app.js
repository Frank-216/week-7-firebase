var trainData= new Firebase('https://fcrutgers.firebaseio.com/');

var name = '';
var destination ='';
var time = '';
var frequency = '';

	$('#submit').on('click',function(){
		// take the values of the inputed information 
		name = $('#nameInput').val();
		console.log(name);
		destination = $('#destinationInput').val();
		console.log(destination);
		time = $('#firstTrainTimeInput').val();
		console.log(time);
		frequency = $('#frequencyInput').val();
		console.log(frequency);
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
		debugger;

		return false;
	});
// use the recent append child to learn append information. 
/*trainData.on("child_added", function(snapshot) {
	// Log everything that's coming out of snapshot
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().time);
	console.log(snapshot.val().frequency);
	console.log(snapshot.val().dateAdded);
	// Change the HTML to reflect
	var tableRow = $('<tr>');
	var tableData1 = $('<td>');
	var tableData2 = $('<td>');
	var tableData3 = $('<td>');
	var tableData4 = $('<td>');
	tableData1.html(snapshot.val().name);
	tableData2.html(snapshot.val().email);
	tableData3.html(snapshot.val().age);
	tableData4.html(snapshot.val().comment);

	tableRow.append(tableData1,tableData2,tableData3,tableData4);
	$('.t1').append(tableRow);
// Handle the errors
}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
})*/


