const btn = document.querySelector('button');
const container = document.querySelector('.container');

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
    getPosts(response => {
        const fragment = document.createDocumentFragment();
        response.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardBody = document.createElement('div');
            cardBody.classList.add('cardBody');

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = post.title;

            const article = document.createElement('p');
            article.classList.add('card-article');
            article.textContent = post.body;

            cardBody.appendChild(title);
            cardBody.appendChild(article);
            
            card.appendChild(cardBody);
            fragment.appendChild(card);
        });
        container.appendChild(fragment);
    });
});

const btnUsers = document.querySelector('.btn-users');
const usersContextName = document.querySelector('.users-name');

function getUsers(callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.addEventListener('load', () => {
        const responseArr = JSON.parse(xhr.responseText);
        callBack(responseArr);
    });
    xhr.send();
}

btnUsers.addEventListener('click', e => {
    const fragment = document.createDocumentFragment();
    const ol = document.createElement('ol');
    getUsers(responseArr => {
        responseArr.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            ol.appendChild(li);
        });
    });
    fragment.appendChild(ol);
    usersContextName.appendChild(fragment);
});





