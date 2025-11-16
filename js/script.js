// ----- ## Blog ## ----- //

// ----- Dom Elements ----- //
const blogPostForm = document.getElementById('blog-post-form');
const postTitleInput = document.getElementById('postTitle');
const postArea = document.getElementById('post');
const postsList = document.getElementById('posts-list');
const titleError = document.getElementById('titleError');
const postError = document.getElementById('postError');

// ----- localstorage helpers ----- //
function savePostsToLocalStorage() {
    const posts = [];

    document.querySelectorAll('#posts-list .post-item'). forEach(li => {
        const titleEl = li.querySelector('.h4-title');
        const contentEl = li.querySelector('.p-content');

        posts.push({
            title: titleEl ? titleEl.textContent : '',
            content: contentEl ? contentEl.textContent : ''
        });
    });

    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// ----- Load posts from localstorage ----- //
function loadPostFromLocalStorage() {
    const stored = localStorage.getItem('blogPosts');
    if (!stored) return;

    try {
        const posts = JSON.parse(stored);
        posts.forEach(post => {
            postTitleInput.value = post.title;
            postArea.value = post.content;
            handleFormSubmit({ preventDefault() {} });
        });
    } catch (e) {
        console.error('Error loading posts from localstorage', e);
    }
};

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

    // --- edit button --- //
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('edit-btn');
    // --- adding edit/save toggle to button (function)--- //
    editBtn.addEventListener('click', function() {
        //- change from edit to save - //
        if (editBtn.innerText === 'Edit') {
            // - create the title input - //
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = postTitleElement.textContent;
            titleInput.classList.add('edit-title-input');

            // - textarea input - //
            const contentTextarea = document.createElement('textarea');
            contentTextarea.value = postContentElement.textContent;
            contentTextarea.classList.add('edit-content-textarea');

            // - hide original text elements - /
            postTitleElement.style.display = 'none';
            postContentElement.style.display = 'none';

            // - insert editable fields into the same item - //
            listItem.insertBefore(titleInput, postTitleElement);
            listItem.insertBefore(contentTextarea, postContentElement);

            // - change the button to save after editing - //
            editBtn.innerText = 'Save';
        } else {
            // - creating the save mode - //
            const titleInput = listItem.querySelector('.edit-title-input');
            const contentTextarea = listItem.querySelector('.edit-content-textarea');

            // - copying values from original fields - //
            postTitleElement.textContent = titleInput.value;
            postContentElement.textContent = contentTextarea.value;

            // - show original text elements when editing - //
            postTitleElement.style.display = 'block';
            postContentElement.style.display = 'block';

            // - remove temp input and textarea - //
            listItem.removeChild(titleInput);
            listItem.removeChild(contentTextarea);

            // - change the button back to edit - //
            editBtn.innerText = 'Edit';

            // -- save updated posts from localstorage -- //
            savePostsToLocalStorage();
        }

    });

    // - creating a delete button - //
    const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');

        // -- delete button event and function - //
        deleteBtn.addEventListener('click', function() {
            // - remove post from the list - //
            listItem.remove();
        // -- sav updated posts to localstorage -- //
        savePostsToLocalStorage();
    });

    // --- append title and content to the list --- //
    listItem.appendChild(postTitleElement);
    listItem.appendChild(postContentElement);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    // --- append the li to the ul --- //
    postsList.appendChild(listItem);

    // --- save posts after adding a new one --- //
    savePostsToLocalStorage();

    // --- reset the form field after posting --- //
    blogPostForm.reset();
};

// ----- Event listener ----- //
blogPostForm.addEventListener('submit', handleFormSubmit);

// ----- Rebuold post from local storage on page load ----- //
loadPostFromLocalStorage();