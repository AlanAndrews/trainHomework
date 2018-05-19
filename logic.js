console.log("hi");


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAMBB5dfCm2M6m6KunlaCx9Jp4bLEwPD-U",
    authDomain: "trainhomework-8ad35.firebaseapp.com",
    databaseURL: "https://trainhomework-8ad35.firebaseio.com",
    projectId: "trainhomework-8ad35",
    storageBucket: "",
    messagingSenderId: "944740256297"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submitTrain").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var freq = $("#frequency").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    
    // console.log(trainName);
    // console.log(destination);
    // console.log(freq);
    // console.log(firstTrain);

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: freq,
        firstTrainTime: firstTrain
      };

    //   console.log(newTrain);

    database.ref().push(newTrain);

    alert("Train successfully added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#firstTrain").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var freq = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrainTime;
  
    
    console.log(trainName);
    console.log(destination);
    console.log(freq);
    console.log(firstTrain);



    var tFrequency = freq;

    
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var nextTrainFormat = moment(nextTrain).format("HH:mm");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     // Calculate next arrival
    var firstTrainFormat = moment.unix(firstTrain).format()
    // console.log(moment(convertedDate).format("X"));
    // console.log(firstTrainFormat);

    // Calculate how many minutes away the train is
    // var minutesAway = empMonths * empRate;
    // console.log(empBilled);


    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    freq + "</td><td>" + nextTrainFormat + "</td><td>" + tMinutesTillTrain + "</td><td>");

});
  
  
    // Prettify the employee start
    // var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Add each train's data into the table
    // $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    // firstTrain + "</td><td>");
//   });
  

