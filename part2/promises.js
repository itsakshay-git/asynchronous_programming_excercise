const url = "https://dummyjson.com/posts"
const button = document.getElementById("click_btn");

button.addEventListener("click", function () {
  const container = document.getElementById("container");
  container.style.display = "block";
  container.innerHTML = `<p class="delay_message">Loading...</p>`;
  const timeout = 5000;

  fetchData(container, timeout)
  .then(result => {
    container.innerHTML = result.map((title) => `<p class="post_title">${title}</p>`).join("");
  }).catch(err => {
    container.innerHTML = `<p class="delay_message">Error Fetching Data: ${err}</p>`;
  });
});


      /**
 * This function fetches data from a URL and updates the container with post titles.
 * It uses `Promise` to handle the fetch and JSON parsing in a simple, step-by-step way.
 * A timeout is set to cancel the fetch if it takes too long, showing an error message if that happens.
 * If the fetch succeeds, it clears any old messages and displays the new data.
 */

function fetchData(container, timeout) {

  return new Promise((resolve, reject) => {

    // Demo timer async webapi for timeout simulation
    const timer = setTimeout(() => {
      reject("Operation timed out.");
    }, timeout);
    
    fetch(url)
    .then(response => {
      clearTimeout(timer);

      if(!response.ok){
          reject(`Received status ${response.status} - ${response.statusText}. Please check the API endpoint or parameters.`);
        }
        return response.json();
  })
    .then(result => {
        const postsTittles = result.posts.map((post) => post.title);
        resolve(postsTittles);
    }).catch(error => {
      clearTimeout(timer)
      reject(error.message)
    })
  })

}