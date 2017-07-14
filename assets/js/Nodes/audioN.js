function AudioN() {
  this.addOutput("Frecuency values","array");
  this.addOutput("Time dom. values","array");
  this.addProperty("fftSize",256);
  this.addProperty("minDb", -90.0 );
  this.addProperty("maxDb", -10.0 );
  this.addProperty("smoothC",0.85);
  this.analyser = audioCtx.createAnalyser();
  this.id = "AudN";
  
}

//name to show
AudioN.title = "Audio Source";
AudioN.desc = "audioNode + analyzerNode + destinationNode";
                   
//function to call when the node is executed
AudioN.prototype.onExecute = function()
{
    if(this.isOutputConnected(0) || this.isOutputConnected(1) && isPlaying){
         this.analyser.minDecibels = parseFloat(this.properties.minDb);
      this.analyser.maxDecibels =  parseFloat(this.properties.maxDb);
      this.analyser.smoothingTimeConstant =  parseFloat(this.properties.smoothC);
      this.analyser.fftSize =  parseInt(this.properties.fftSize);
    }

    //Freq Domain
	if(this.isOutputConnected(0))
	{
        this.freqs = new Uint8Array(this.analyser.frequencyBinCount); // Freq domain analysis
		this.analyser.getByteFrequencyData( this.freqs);
        if(this.freqs!=null){
            this.setOutputData(0,this.freqs);
        }
	}
	//Time Domain
	if(this.isOutputConnected(1))
    {
        this.times = new Uint8Array(this.analyser.frequencyBinCount); // Time domain anlaysis
		this.analyser.getByteTimeDomainData( this.times );
        if(this.times!=null){
          this.setOutputData(1,this.times);  
        }
    }
    
}

AudioN.prototype.onDeselected = function()
{
    document.getElementById('boxInf').style.display="none";
    document.getElementById('MusicP').style.display="none";  
}

AudioN.prototype.onDblClick = function()
{
    var panel = document.getElementById("objInfo");
    showProperties(this);
    
}


//register in the system
LiteGraph.registerNodeType("Audio/source", AudioN );


document.getElementById("mUrl").addEventListener("click", function(){
      document.getElementById("upload").click();    
},true);

document.getElementById("upload").addEventListener("change", function(){
      var sound = document.getElementById('track');
      sound.src = URL.createObjectURL(document.getElementById("upload").files[0]);
      var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
      getSound.open("GET", sound.src, true); // Path to Audio File
	  getSound.responseType = "arraybuffer"; // Read as Binary Data
      getSound.onload = function() {
		audioCtx.decodeAudioData(getSound.response, function(buffer){
            console.log('File Loaded');
			stream = buffer; // Decode the Audio Data and Store it in a Variable
            document.getElementById('scene').style.width="85%"; // Display song controls on leftSided nav-bar
		    document.getElementById('music_buttons').style.display="block";
        });
	}
	getSound.send(); // Send the Request and Load the File
},true);

function playSong(buffer) {
   var analyser = graph.getNodeById('AudN').analyser;
    if(isPlaying){
        playSound[playSound.stop ? 'stop': 'noteOff'](0); // Stop song
        startOffset += audioCtx.currentTime - startTime; // Update playhead variables
        console.log('pause');
    } else {
      startTime = audioCtx.currentTime;
      playSound= audioCtx.createBufferSource(); // Declare a New Sound
      playSound.connect(analyser);
      playSound.buffer = buffer;   
      playSound.connect(audioCtx.destination);
      playSound[playSound.start ? 'start' : 'noteOn'](0,startOffset);
      console.log('play');
    }
    isPlaying = !isPlaying;
}

function stopSong (){
    audioCtx.currentTime = 0;
    startOffset=0;
    playSound[playSound.stop ? 'stop': 'noteOff'](0);
    console.log('stop');
    if(isPlaying){
        isPlaying = !isPlaying;
    }
}

//Audio Drawing when pressing play button
document.getElementById("play").addEventListener("click", function(){
    document.getElementById('canvasD').style.pointerEvents="none";
    playSong(stream); // Play the Sound
},true);

document.getElementById("pause").addEventListener("click", function(){
    document.getElementById('canvasD').style.pointerEvents="auto";
    playSong(stream); // Play the Sound
},true);

document.getElementById("stop").addEventListener("click", function(){
    document.getElementById('canvasD').style.pointerEvents="auto";
    stopSong(); // Stop the Sound
},true);

