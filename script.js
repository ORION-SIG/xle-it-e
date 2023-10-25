// Code for talking to the Open Library API
document.querySelector("form").addEventListener("submit", function (event) {
  // The user has clicked the submit button on the form. Now we need to process the form data.
  event.preventDefault(); // Stop the form from submitting

  const bookTitle = document.querySelector("#book-title").value; // Get the value of the book title field
  const bookAuthor = document.querySelector("#book-author").value; // Get the value of the book author field
  console.log(bookTitle, bookAuthor); // Equivalent to print in Python

  // Try not to waste API calls by checking if the user has entered a book title
  if (bookTitle === "") {
    alert("Please enter a book title");
    return;
  }

  // Construct the URL for the Open Library API
  const url = "https://openlibrary.org/search.json?q=" + bookTitle;
  // If the user has entered an author, add it to the URL
  if (bookAuthor !== "") {
    url += "+author:" + bookAuthor;
  }

  // Fetch the data from the API
  fetch(url).then(function (response) {
    // response is the data we get back from the API, but it's not just the data we want. It's a whole bunch of other stuff too.
    console.log(response);

    // To get the data we want, we need to convert the response to JSON
    response.json().then(function (data) {
      // Now we have the data we want. Let's see what it looks like.
      console.log(data);

      // Let's get the first book from the results
      const book = data.docs[0];
      console.log(book);

      // Now let's display the book title and author on the page
      const responseHtmlString = `
        <hr />
        <div class="my-2 d-flex">
            <div class="d-flex flex-column ms-4">
            <span class="h4 mb-0">${book.title}</span>
            <span>${book.author_name[0]}</span>
            </div>
        </div>`;
      document
        .querySelector("#books-container")
        .insertAdjacentHTML("beforeend", responseHtmlString);
    });
  });
});
