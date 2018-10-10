
//var table = document.getElementById("myTable");

//var row = table.insertRow(0);
//var cell1 = row.insertCell(0);
//var cell2 = row.insertCell(1);
//var cell3 = row.insertCell(2);
//var cell4 = row.insertCell(3);
//var cell4 = row.insertCell(4);

//cell1.innerHTML = "NEW CELL1";
//cell2.innerHTML = "NEW CELL2";
//cell3.innerHTML = "NEW CELL3";
//cell4.innerHTML = "NEW CELL4";
//cell4.innerHTML = "NEW CELL4";

var config = {
    apiKey: "AIzaSyA3hunwdmLhiYIWOTMwbFQsGLy4MF39AzE",
    authDomain: "trainactivity-d72bf.firebaseapp.com",
    databaseURL: "https://trainactivity-d72bf.firebaseio.com",
    projectId: "trainactivity-d72bf",
    storageBucket: "trainactivity-d72bf.appspot.com",
    messagingSenderId: "93161865539"
};

firebase.initializeApp(config);

var datbase = firebase.database();

$("#submitInput").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train-time").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency").val().trim();
    
    var newInput = {
        newTrainName: trainName,
        newDestination: destination,
        newTrainTime: firstTrainTime,
        newFrequency: frequency
    };

    
    database.ref().push(newInput);

    // Logs everything to console
    console.log(newInput.newTrainName);
    console.log(newInput.newDestination);
    console.log(newInput.newTrainTime);
    console.log(newInput.newFrequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().newTrainName;
    var destination = childSnapshot.val().newDestination;
    var firstTrainTime = childSnapshot.val().newTrainTime;
    var frequency = childSnapshot.val().newFrequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
});