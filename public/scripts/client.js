/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  let sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at);
  for (const tweet of sortedTweets) {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $(".tweet-container").append(tweetElement);
  }
};

const createTweetElement = function (tweet) {
  const { user, content, created_at } = tweet;
  const { name, avatars, handle } = user;
  let $tweet = `
  <article class="tweet">
          <header>
            <div class="user-profile">
              <img src=${avatars} /><span>${name}</span>
            </div>
            <div class="tweet-id">${handle}</div>
          </header>
          <div class="content">
            ${content.text}
          </div>
          <footer>
            <div class="time">${timeago.format(created_at)}</div>
            <div class="button-list">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
  
  
  `; /* Your code for creating the tweet element */
  // ...
  return $tweet;
};

$(() => {
  // getting initial tweets
  $.get("/tweets").then((result) => {
    renderTweets(result);
  });

  // form posting for new tweet submission
  $(".new-tweet form").submit(function (event) {
    event.preventDefault();
  
    const dataLength = $("#tweet-text").val().length;
    // get serialized data
    const data = $(this).serialize();
    $(".error").empty();
    if (!dataLength) {
      $(".error").text("please enter something to tweet about ...");
    } else if (dataLength > 140) {
      $(".error").text("please shorten your tweet !!");
    } else {
      $.post("/tweets", data)
        .then((res) => {
          $(".tweet-container").empty();
          $("#tweet-text").val('');
          $.get("/tweets").then((result) => {
            renderTweets(result);
          });
        })
        .catch((err) => console.log(err));
    }
  });
});
