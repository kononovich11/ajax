const btn = document.querySelector('button');


function getPosts(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load',() => {
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });
    
    xhr.addEventListener('error', () => {
        console.log('error');
    });
    
    xhr.send();
} 

btn.addEventListener('click', e => {
    getPosts(response => console.log(response));
});

