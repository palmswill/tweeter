$(document).ready(function () {
  // --- our code goes here ---
  $(".new-tweet textarea").on("input", function () {
    const wordDiff = 140 - this.value.length;
    if (wordDiff < 0) {
      $(".new-tweet .counter").addClass("warning");
    } else {
      $(".new-tweet .counter").removeClass("warning");
    }
    $(".new-tweet .counter").html(wordDiff);
  });
});
