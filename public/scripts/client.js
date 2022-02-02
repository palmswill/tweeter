/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
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
    // to get the actual length of the form data of "text";
    const formData = new FormData(event.target);
    const dataLength = formData.get("text").length;
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
          $.get("/tweets").then((result) => {
            renderTweets(result);
          });
        })
        .catch((err) => console.log(err));
    }
  });
});
