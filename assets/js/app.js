//variables
const tweetList = document.getElementById('tweet-list');


//events listeners
    
eventListeners();

function eventListeners() {
    //form submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    //document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//functions

function newTweet(e) {
    e.preventDefault();

    //read textarea value
    const tweet = document.getElementById('tweet').value;

    //create remove btn
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'x';

    //create <li> element
    const li = document.createElement('li');
    li.textContent = tweet;

    //add the remove btn to each tweet;
    li.appendChild(removeBtn);

    //add the li to the tweet-list
    tweetList.appendChild(li);

    //add tweet to the local storage
    addTweetLocalStorage(tweet);

    //print alert
    alert('Event Added');
    this.reset();

}

//remove tweet from the DOM
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    //delete from ls
    removeTweetLocalStorage(e.target.parentElement.textContent);
} 

//adds the tweet to ls
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();

    //add tweets into array
    tweets.push(tweet);
 
    //convert tweet array into string.
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//gets values from local storage
function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    //get values from ls if null create empty array
        if(tweetsLS === null){
            tweets = [];
        } else {
            tweets = JSON.parse(tweetsLS);
        }
        return tweets;
}

//prints local storage tweets on load
function localStorageOnLoad(){
    let tweets = getTweetsFromStorage();

    //loop through the storage & print values 
    tweets.forEach(function(tweet){
        //create remove btn
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'x';

        //create <li> element
        const li = document.createElement('li');
        li.textContent = tweet;

        //add the remove btn to each tweet;
        li.appendChild(removeBtn);

        //add the li to the tweet-list
        tweetList.appendChild(li);

    });

}

//remove a tweet from ls fn
function removeTweetLocalStorage(tweet){
    //get tweets from ls
    let tweets = getTweetsFromStorage();

    //remove x from tweet
    const tweetDelete = tweet.substring(0, tweet.length -1);

    //loop through the tweets in the ls and remove the clicked tweet
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS){
            tweets.splice(index, 1);
        }
    });
    alert('Delete this event?');

    //return the rest to the ls
    localStorage.setItem('tweets', JSON.stringify(tweets));
} 