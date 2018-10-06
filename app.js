

$(document).ready(function() {


function addTableRow(trainName, destination, frequency, nextArrival, minAway) {
  
          var row = $("<tr>")
              .append($("<td>").text(trainName))

              .append($("<td>").text(destination))
              .append($("<td>").text(frequency))
              .append($("<td>").text(nextArrival))
              .append($("<td>").text(minAway))
          
          $("#trains").append(row);
      }

          // Initialize Firebase
          var config = {
              apiKey: "AIzaSyCdTda8jdyUYfffvFUiusuar9UsTRfSbbc",
              authDomain: "firstdb-c26a5.firebaseapp.com",
              databaseURL: "https://firstdb-c26a5.firebaseio.com",
              projectId: "firstdb-c26a5",
              storageBucket: "firstdb-c26a5.appspot.com",
              messagingSenderId: "489444700779"
          };
          firebase.initializeApp(config);
              var database = firebase.database();
              var frequencyFormat="HH:mm";
              $("#myForm").submit(function(e){
                      e.preventDefault();

                          var trainName = $("#train-name").val().trim();
                          var destination = $("#destination").val().trim();
                          
                          var firstTrain = $("#first-train").val().trim();
                          var frequency = $("#frequency").val().trim();
                        
                          $("#myForm").trigger("reset");



// minutes away = frecuencia - residual 
//residual = (hora actual - first train)% frequency
// next arrival = actual time + minutes away

//Obtener hora actual
//how to parse to numbers


                          database.ref().push({
                                  trainName:trainName,
                                  destination:destination,
                                  frequency:frequency,
                                  firstTrain: firstTrain
                                

                          })                    
              })

              database.ref().on('child_added', function(snapshot){
                  var trainName = snapshot.val().trainName;
                  var destination = snapshot.val().destination;
                  var firstTrain = snapshot.val().firstTrain;
                  var frequency = snapshot.val().frequency;
                  
                  var f1= moment(firstTrain, "hh:mm").subtract(1,"years");
                  var diffTime = moment().diff(moment(f1), "minutes");
                  var tRemainder = diffTime % frequency;
                  var minAway = frequency-tRemainder;
                
                  var nextArr = moment().add(minAway, "minutes");
                  var nextArrival = moment(nextArr).format("hh:mm");
                         


           
                 
                  addTableRow(trainName,destination,frequency,nextArrival,minAway);

                });


    })