// ----- ## Blog ## ----- //

// ----- Dom Elements ----- //
const blogPostForm = document.getElementById('blog-post-form');
const postTitleInput = document.getElementById('postTitle');
const postArea = document.getElementById('post');
const postsList = document.getElementById('posts-list');
const titleError = document.getElementById('titleError');
const postError = document.getElementById('postError');

// ----- Function to add posts to the ul ----- //
function handleFormSubmit(event) {
    event.preventDefault();

    const titleValue = postTitleInput.value.trim();
    const postValue = postArea.value.trim();

    titleError.textContent = '';
    postError.textContent = '';

    let hasError = false;

    if (!titleValue) {
        titleError.textContent = 'Title is required.';
        hasError = true;
    }

    if (!postValue) {
        postError.textContent = 'Post content is required';
        hasError = true;
    }

    if (hasError) {
        return;
    }
    // --- create new li items --- //
    const listItem = document.createElement('li');
    listItem.classList.add('post-item'); // --- class created for css styling --- //

    // --- create elements for the title and content --- //
    const postTitleElement = document.createElement('h4');
    postTitleElement.textContent = titleValue;
    postTitleElement.classList.add('h4-title');

    const postContentElement = document.createElement('p');
    postContentElement.textContent = postValue;
    postContentElement.classList.add('p-content');

    // --- append title and content to the list --- //
    listItem.appendChild(postTitleElement);
    listItem.appendChild(postContentElement);

    // --- append the li to the ul --- //
    postsList.appendChild(listItem);

    // --- reset the form field after posting --- //
    blogPostForm.reset();
};

// ----- Event listener ----- //
blogPostForm.addEventListener('submit', handleFormSubmit);