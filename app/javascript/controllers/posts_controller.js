window.onload=function(){
	if ($("#showmyvid").length > 0){
	var media = document.querySelector('video');
var controls = document.querySelector('.controls');

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');
var rwd = document.querySelector('.rwd');
var fwd = document.querySelector('.fwd');

var timerWrapper = document.querySelector('.timer');
var timer = document.querySelector('.timer span');
var timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';
play.addEventListener('click', playPauseMedia);
function playPauseMedia() {
	  if(media.paused) {
		      play.setAttribute('data-icon','u');
		      media.play();
		    } else {
			        play.setAttribute('data-icon','P');
			        media.pause();
			      }
}
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
function stopMedia() {
	  media.pause();
	  media.currentTime = 0;
	  play.setAttribute('data-icon','P');
}
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

var intervalFwd;
var intervalRwd;

function mediaBackward() {
	  clearInterval(intervalFwd);
	  fwd.classList.remove('active');

	  if(rwd.classList.contains('active')) {
		      rwd.classList.remove('active');
		      clearInterval(intervalRwd);
		      media.play();
		    } else {
			        rwd.classList.add('active');
			        media.pause();
			        intervalRwd = setInterval(windBackward, 200);
			      }
}

function mediaForward() {
	  clearInterval(intervalRwd);
	  rwd.classList.remove('active');

	  if(fwd.classList.contains('active')) {
		      fwd.classList.remove('active');
		      clearInterval(intervalFwd);
		      media.play();
		    } else {
			        fwd.classList.add('active');
			        media.pause();
			        intervalFwd = setInterval(windForward, 200);
			      }
}
function windBackward() {
	  if(media.currentTime <= 3) {
		      rwd.classList.remove('active');
		      clearInterval(intervalRwd);
		      stopMedia();
		    } else {
			        media.currentTime -= 3;
			      }
}

function windForward() {
	  if(media.currentTime >= media.duration - 3) {
		      fwd.classList.remove('active');
		      clearInterval(intervalFwd);
		      stopMedia();
		    } else {
			        media.currentTime += 3;
			      }
}
media.addEventListener('timeupdate', setTime);


function setTime() {
	  var minutes = Math.floor(media.currentTime / 60);
	  var seconds = Math.floor(media.currentTime - minutes * 60);
	  var minuteValue;
	  var secondValue;

	  if (minutes < 10) {
		      minuteValue = '0' + minutes;
		    } else {
			        minuteValue = minutes;
			      }

	  if (seconds < 10) {
		      secondValue = '0' + seconds;
		    } else {
			        secondValue = seconds;
			      }

	  var mediaTime = minuteValue + ':' + secondValue;
	  timer.textContent = mediaTime;

	  var barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
	  timerBar.style.width = barLength + 'px';
}

rwd.classList.remove('active');
fwd.classList.remove('active');
clearInterval(intervalRwd);
clearInterval(intervalFwd);

};
if ($("#savemyvid").length > 0){
        $("[name=myComposer]").each(function(){
		var input=$(this)[0];

        $.ajax({url:"/composers.json",success:function(data){
        autocomplete(input, data.map(x=>x.name));
        }
        });
        });
        $("[name=myConcert]").each(function(){
		var input=$(this)[0];
        $.ajax({url:"/concerts.json",success:function(data){
        autocomplete(input, data.map(x=>x.title));
        }
        });
        });
        $("[name=myPiece]").each(function(){
		var input=$(this)[0];
        $.ajax({url:"/pieces.json",success:function(data){
        autocomplete(input, data.map(x=>x.title));
        }
        });
        });
	console.log("myjs");
	function addcomment(){
		$.ajax({url:"/mynew/comment",data:{nb:$("#nbcomments").html()},success:function(data){
			$("#mycomments").append(data);
			$("#nbcomments").html(Number($("#nbcomments")[0].innerHTML) + 1);

		}});
		return false;
	}
	$("#addcomment1").click(addcomment);
}

if ($("#savemyvid").length > 0){
	try{
	let preview = document.getElementById("preview");
	let recording = document.getElementById("recording");
	let startButton = document.getElementById("startButton");
	let stopButton = document.getElementById("stopButton");
	let downloadButton = document.getElementById("downloadButton");
	let logElement = document.getElementById("log");

	let recordingTimeMS = 5000;

	function log(msg) {
		  logElement.innerHTML += `${msg}\n`;
	}

	function wait(delayInMS) {
		  return new Promise((resolve) => setTimeout(resolve, delayInMS));
	}

	function startRecording(stream, lengthInMS) {
		  let recorder = new MediaRecorder(stream);
		  let data = [];

		  recorder.ondataavailable = (event) => data.push(event.data);
		  recorder.start();
		  log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

		  let stopped = new Promise((resolve, reject) => {
			      recorder.onstop = resolve;
			      recorder.onerror = (event) => reject(event.name);
			    });

		  let recorded = wait(lengthInMS).then(() => {
			      if (recorder.state === "recording") {
				            recorder.stop();
				          }
			    });

		  return Promise.all([stopped, recorded]).then(() => data);
	}

	function stop(stream) {
		  stream.getTracks().forEach((track) => track.stop());
	}
	startButton.addEventListener(
		  "click",
		  () => {
			      navigator.mediaDevices
			        .getUserMedia({
					        video: true,
					        audio: true,
					      })
			        .then((stream) => {
					        preview.srcObject = stream;
					        downloadButton.href = stream;
					        preview.captureStream =
						          preview.captureStream || preview.mozCaptureStream;
					        return new Promise((resolve) => (preview.onplaying = resolve));
					      })
			        .then(() => startRecording(preview.captureStream(), recordingTimeMS))
			        .then((recordedChunks) => {
					        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
					 var formData=new FormData($("#my-post-form")[0]);
					    var recording=new Blob([blob]);
					    formData.append("post[vid]",recording);

					    $.ajax({type:"POST",url:"/posts",
						        processData: false,
						        contentType: false,
						           data: formData,success:function(data){
                                                          window.location="/posts/"+String(data.id);
							   }
						         });
					        recording.src = URL.createObjectURL(recordedBlob);
					        downloadButton.href = recording.src;
					        downloadButton.download = "RecordedVideo.webm";

					        log(
							          `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
							        );
					      })
			        .catch((error) => {
					        if (error.name === "NotFoundError") {
							          log("Camera or microphone not found. Can't record.");
							        } else {
									          log(error);
									        }
					      });
			    },
		  false
	);

	stopButton.addEventListener(
		  "click",
		  () => {
			      stop(preview.srcObject);
			    },
		  false
	);
	}catch(e){console.log(e)};
}


}

function autocomplete(inp, arr) {
	  /*the autocomplete function takes two arguments,
	   *   the text field element and an array of possible autocompleted values:*/
		  var currentFocus;
	  /*execute a function when someone writes in the text field:*/
	  inp.addEventListener("input", function(e) {
		        var a, b, i, val = this.value;
		        /*close any already open lists of autocompleted values*/
		        closeAllLists();
		        if (!val) { return false;}
		        currentFocus = -1;
		        /*create a DIV element that will contain the items (values):*/
		        a = document.createElement("DIV");
		        a.setAttribute("id", this.id + "autocomplete-list");
		        a.setAttribute("class", "autocomplete-items");
		        /*append the DIV element as a child of the autocomplete container:*/
		        this.parentNode.appendChild(a);
		        /*for each item in the array...*/
		        for (i = 0; i < arr.length; i++) {
				        /*check if the item starts with the same letters as the text field value:*/
				        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
						          /*create a DIV element for each matching element:*/
						          b = document.createElement("DIV");
						          /*make the matching letters bold:*/
						          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
						          b.innerHTML += arr[i].substr(val.length);
						          /*insert a input field that will hold the current array item's value:*/
						          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
						          /*execute a function when someone clicks on the item value (DIV element):*/
						              b.addEventListener("click", function(e) {
								                    /*insert the value for the autocomplete text field:*/
								                    inp.value = this.getElementsByTagName("input")[0].value;
								                    /*close the list of autocompleted values,
										     *               (or any other open lists of autocompleted values:*/
								                    closeAllLists();
								                });
						          a.appendChild(b);
						        }
				      }
		    });
	  /*execute a function presses a key on the keyboard:*/
	  inp.addEventListener("keydown", function(e) {
		        var x = document.getElementById(this.id + "autocomplete-list");
		        if (x) x = x.getElementsByTagName("div");
		        if (e.keyCode == 40) {
				        /*If the arrow DOWN key is pressed,
					 *         increase the currentFocus variable:*/
				        currentFocus++;
				        /*and and make the current item more visible:*/
				        addActive(x);
				      } else if (e.keyCode == 38) { //up
 /*If the arrow UP key is pressed,
         decrease the currentFocus variable:*/
                 currentFocus--;
                         /*and and make the current item more visible:*/
                                 addActive(x);
                                       } else if (e.keyCode == 13) {
                                               /*If the ENTER key is pressed, prevent the form from being submitted,*/
                                                       e.preventDefault();
                                                               if (currentFocus > -1) {
                                                                         /*and simulate a click on the "active" item:*/
                                                                                   if (x) x[currentFocus].click();
                                                                                           }
                                                                                                 }
                                                                                                   });
                                                                                                     function addActive(x) {
                                                                                                         /*a function to classify an item as "active":*/
                                                                                                             if (!x) return false;
                                                                                                                 /*start by removing the "active" class on all items:*/
                                                                                                                     removeActive(x);
                                                                                                                         if (currentFocus >= x.length) currentFocus = 0;
                                                                                                                             if (currentFocus < 0) currentFocus = (x.length - 1);
                                                                                                                                 /*add class "autocomplete-active":*/
                                                                                                                                     x[currentFocus].classList.add("autocomplete-active");
                                                                                                                                       }
                                                                                                                                         function removeActive(x) {
                                                                                                                                             /*a function to remove the "active" class from all autocomplete items:*/
                                                                                                                                                 for (var i = 0; i < x.length; i++) {
                                                                                                                                                       x[i].classList.remove("autocomplete-active");
                                                                                                                                                           }
                                                                                                                                                             }
                                                                                                                                                               function closeAllLists(elmnt) {
                                                                                                                                                                   /*close all autocomplete lists in the document,
                                                                                                                                                                       except the one passed as an argument:*/
                                                                                                                                                                           var x = document.getElementsByClassName("autocomplete-items");
                                                                                                                                                                               for (var i = 0; i < x.length; i++) {
                                                                                                                                                                                     if (elmnt != x[i] && elmnt != inp) {
                                                                                                                                                                                           x[i].parentNode.removeChild(x[i]);
                                                                                                                                                                                               }
                                                                                                                                                                                                 }
                                                                                                                                                                                                 }
                                                                                                                                                                                                 /*execute a function when someone clicks in the document:*/
                                                                                                                                                                                                 document.addEventListener("click", function (e) {
                                                                                                                                                                                                     closeAllLists(e.target);
                                                                                                                                                                                                     });
                                                                                                                                                                                                      } 




