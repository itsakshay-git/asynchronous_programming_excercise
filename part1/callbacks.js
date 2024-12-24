const button = document.getElementById("click_btn");
button.addEventListener("click", function () {
  const container = document.getElementById("container");
  container.style.display = "block";
  container.innerHTML = `
<p class="delay_message">Callback executed after 5 seconds..</p>
`;


/**
 * This function fetches data from a URL and updates the container with post titles.
 * It uses `callback function` (postContainer) to handle the fetch and JSON parsing in a simple, step-by-step way.
 * A timeout is set to cancel the fetch if it takes too long, showing an error message if that happens.
 * If the fetch succeeds, it clears any old messages and displays the new data.
 * error handling is done by .catch() chain.
 */

  function postContainer() {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const removeExitingElement =
          document.querySelector(".delay_message");
        if (removeExitingElement) {
          removeExitingElement.remove();
        }

        const postsTittles = data.posts.map((post) => post.title);

        console.log(container);
        container.innerHTML = postsTittles
          .map((title) => `<p class="post_title">${title}</p>`)
          .join("");
      })
      .catch((error) => {
        container.innerHTML(`Error Fetching Data: ${error.message}`);
      });
  }

  delaySimulate(postContainer);
});

function delaySimulate(Callback) {
  setTimeout(() => {
    Callback();
  }, 5000);
}