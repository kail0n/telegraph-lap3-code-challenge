// ********************************************
// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-dog-form');
const postsList = document.querySelector('section');

// Bind event listeners
form.addEventListener('submit', submitPost);

// Fetch all cats as soon as app is loaded
getAllPosts();

// ********************************************

// DOGS FLOW
// index
function getAllPosts(){
    fetch('http://localhost:3000/posts')
        .then(r => r.json())
        .then(appendPosts)
        .catch(console.warn)
};

// create
function submitPost(e){
    e.preventDefault();

    const postData = {
        title: e.target.title.value,
        name: e.target.name.value,
        story: e.target.story.value
        
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .then(appendPost)
        .then(() => e.target.reset())
        .catch(console.warn)
};

// function updatePost(id, tr){
//     const options = { 
//         method: 'PATCH',
//     };
//     fetch(`http://localhost:3000/posts/${id}`, options)
//         .then(r => r.json())
//         .then(data => {
//             const { post } = data
//             div.querySelectorAll('td')[1].textContent = post.age
//         })
//         .catch(console.warn)
// }

// function deletePost(id, li){
//     console.log('deleting', id)
//     const options = { 
//         method: 'DELETE',
//     };
//     fetch(`http://localhost:3000/posts/${id}`, options)
//         .then(li.remove())
//         .catch(console.warn)
// }

// helpers
function appendPosts(data){
    data.posts.forEach(appendPost);
};

function appendPost(postData){
    const newRow = document.createElement('div');
    const postContent = formatPostDiv(postData, newRow)
    postsList.append(newRow);
};


function formatPostDiv(post, div){
    const titlePar = document.createElement('p');
    const namePar = document.createElement('p');
    const storyPar = document.createElement('p');


    titlePar.textContent = post.title;
    namePar.textContent = post.name;
    storyPar.textContent = post.story;

    div.append(titlePar)
    div.append(namePar)
    div.append(storyPar)

    return div
}

