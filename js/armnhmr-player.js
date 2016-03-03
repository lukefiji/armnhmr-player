// Initialize variables - look up "resolve" in SoundCloud API docs to get an account's user id.
var clientID = '6d7dc081d8a26bde4651bd77f698ea7c';
var userID = '86612597';
var playlist = [];
var currentTrack = 0;

// Tie jQuery selectors to specific elements
// var $itemButton = $('');
var $nowPlaying = $('.player__now-playing');
var $trackID = $('.player__track-id');
var $playButton = $('.player__button--play');
var $pauseButton = $('.player__button--pause');
var $previousButton = $('.player__button--previous');
var $nextButton = $('.player__button--next');


// Initialize widget
SC.initialize({
  client_id: clientID
});

// Collect tracks from user ID and create a playlist
SC.get('/users/' + userID + '/tracks').then(function(track){
  for (var i=0; i<track.length; i++) {
    playlist.push({
      title: track[i].title,
      id: track[i].id,
      duration: track[i].duration
    });
  }
  console.log(playlist); //REMOVE
  playTrack();
});

// Display who is playing
function playTrack() {
  $nowPlaying.text(playlist[currentTrack].title);
  $trackID.text(playlist[currentTrack].id);
  SC.stream('/tracks/' + playlist[currentTrack].id).then(playSong);
}

// Play a song and update player buttons
var playSong = function(player){
  player.play();
  $playButton.on('click', function(){
    player.play();
  });
  $pauseButton.on('click', function(){
    player.pause();
  });
};

// When 'previous' button is clicked
$previousButton.on('click', function(){
  if (currentTrack === 0) {
    currentTrack = playlist.length-1;
  } else {
    currentTrack--;
  }
  playTrack();
});

// When 'next' button is clicked
$nextButton.on('click', function(){
  if (currentTrack < (playlist.length - 1)) {
    currentTrack++;
  } else {
    currentTrack = 0;
  }
  playTrack();
});
