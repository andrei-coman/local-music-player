const STATEARTISTS = 0;
const STATEALBUMS = 1;
const STATEPLAYLIST = 2;
const STATESETTINGS = 3;

/**
 * Class that characterizes a certain state of the player
 */
class stateClass{
	constructor(_auxClass){
		if(_auxClass){
			this.state = _auxClass.state; //the type of page
			this.artist = _auxClass.artist; //the respective artist (may not be relevant depending on state)
			this.album = _auxClass.album; //the respective album (may not be relevant depending on state)
		}
	}
	equals(_auxClass){
		return (this.state == _auxClass.state &&
		        this.artist == _auxClass.artist &&
				this.album == _auxClass.album);
	}
}
var stk = []; //stack of states (for page navigation)
var stkLast = -1; //last page in stack
var stkCurr = -1; //current index in stack

var currentState = new stateClass(); //the state of the playing audio
var viewState = new stateClass(); //the state of the visible page

/**
 * Handles the Back button for browser page navigation
 * Obsolete for electron version of the player
 */
window.addEventListener('popstate', function(event){
	if(stkCurr > 0){
		stkCurr--;
		console.log(stkCurr);
		SlideState();
	}
	else
		window.location = document.referrer;
}, false);

/**
 * Change the visible page to a specific state
 * @param {stateClass} _state The state to be displayed
 */
function ToState(_state){
	history.pushState({}, null, window.location.pathname);
	DeletePage();
	switch(viewState.state){
		case STATEARTISTS:  CreatePageArtists();  break;
		case STATEALBUMS:   CreatePageAlbums();   break;
		case STATEPLAYLIST: CreatePagePlaylist(); break;
		case STATESETTINGS: CreatePageSettings(); break;
	}
	resize();
}
/**
 * Add a new state in the stack
 * Clears the stack top above stkCurr and appends the new state
 * @param {stateClass} _state The new state
 */
function ChangeState(_state){
	viewState.state = _state;
	if(stkCurr < 0 || !stk[stkCurr].equals(viewState)) 
		stk[++stkCurr] = new stateClass(viewState);
	stkLast = stkCurr;
	ToState(_state);
}
/**
 * "Slide" in the stack to stkCurr
 * Keeps the stack intact
 */
function SlideState(){
	viewState = new stateClass(stk[stkCurr]);
	ToState(stk[stkCurr].state);
}

/**
 * Page navigation functionality
 */
$("#NavBackward").hover(function(){if(stkCurr > 0) ElemId("NavBackward").style.opacity = "0.7";}, 
					    function(){ElemId("NavBackward").style.opacity = "1.0";});
$("#NavForward").hover(function(){if(stkCurr < stkLast) ElemId("NavForward").style.opacity = "0.7";}, 
					   function(){ ElemId("NavForward").style.opacity = "1.0";});
$("#NavBackward").click(function(){
	if(stkCurr > 0){
		stkCurr--;
		SlideState();
	}
});
$("#NavForward").click(function(){
	if(stkCurr < stkLast){
		stkCurr++;
		SlideState();
	}
});