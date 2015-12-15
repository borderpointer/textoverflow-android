/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        console.log("initialized");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var $submitRequest = $('#submit-request');

$submitRequest.click(function() {

    console.log("clicked");

    var $phoneNumberInput = $('#digits').val();
    var $imageInput = $('#image-search-terms').val();

    $.ajax({

        url: '/pixabay/' + $imageInput,
        method: 'GET',
    }).done(function(data){

        // this returns on object of which "hits" gives an array of image objects.
        var parsedData = JSON.parse(data);

        console.log(parsedData["hits"].length);

        for (var i = 0; i < parsedData["hits"].length; i++) {

        // sendText(parsedData["hits"], $phoneNumberInput, i);
        console.log(i);

        }

    });

    alertSuccess();

});

// function sendText(imageDataArray, num, count) {

//     $.ajax({

//         url:'/twilio',
//         data: {
//             num : num,
//             image_url : imageDataArray[count]['webformatURL']
//         },
//         method: 'POST'
//         }).done(function(data) {

//             console.log(data);

//         });

// }

function alertSuccess () {

    swal({
        title: "Messages sent!",
        text: "Now watch your fwends get confused.",
        type: "success",
        allowOutsideClick: true,
        timer: 3000,
        confirmButtonColor: "#FF842D"
    });

    $('#digits').val("");
    $('#image-search-terms').val("");

}

app.initialize();
