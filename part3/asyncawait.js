const url = "https://dummyjson.com/posts";
const button = document.getElementById("click_btn");

button.addEventListener("click", function () {
  const container = document.getElementById("container");
  container.style.display = "block";
  container.innerHTML = `<p class="delay_message">Loading...</p>`;
  const timeout = 5000;

  fetchData(container, timeout);
});

/**
 * This function fetches data from a URL and updates the container with post titles.
 * It uses `async/await` to handle the fetch and JSON parsing in a simple, step-by-step way.
 * A timeout is set to cancel the fetch if it takes too long, showing an error message if that happens.
 * If the fetch succeeds, it clears any old messages and displays the new data.
 */

async function fetchData(container, timeout) {
  const abortController = new AbortController();
  const { signal } = abortController;

  const timer = setTimeout(() => {
    abortController.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    const result = await response.json();
    clearTimeout(timer);
    const removeExitingElement = document.querySelector(".delay_message");

    if (removeExitingElement) {
      removeExitingElement.remove();
    }

    const postsTittles = result.posts.map((post) => post.title);

    container.innerHTML = postsTittles
      .map((title) => `<p class="post_title">${title}</p>`)
      .join("");
  } catch (error) {
    clearTimeout(timer);
    if (error.name === "AbortError") {
      container.style.display = "block";
      container.innerHTML = `<p class="delay_message">Error Fetching Data: Request was aborted due to timeout</p>`;
    } else {
      const container = document.getElementById("container");
      container.style.display = "block";
      container.innerHTML = `<p class="delay_message">Error Fetching Data: ${error.message}</p>`;
    }
  }
}