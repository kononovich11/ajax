const btn = document.querySelector('.btn-get-posts');
const btnSend = document.querySelector('.btn-send-post')  
const container = document.querySelector('.container');

function getPosts(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send();
}

function cretePost(body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });

    xhr.setRequestHeader( "Content-type", "application/json; charset=UTF-8");

    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send(JSON.stringify(body));
} 

function cardTemplate(post) {
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
    return card
}

btn.addEventListener('click', e => {
    getPosts(response => {
        const fragment = document.createDocumentFragment();
        response.forEach(post => {
            const card = cardTemplate(post);
            fragment.appendChild(card);
        });
        container.appendChild(fragment);
    });
});

btnSend.addEventListener('click', e => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
      };
      cretePost(newPost, response => {
        const card = cardTemplate(response);
        container.insertAdjacentElement('afterbegin', card);
      });
});


const btnUsers = document.querySelector('.btn-users');
const usersContextName = document.querySelector('.users-name');
const infoUserHtml = document.querySelector('.info-User');

function getUsers(callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.addEventListener('load', () => {
        const responseArr = JSON.parse(xhr.responseText);
        callBack(responseArr);

        xhr.addEventListener('error', () => {
            console.log('error');
        });
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

usersContextName.addEventListener('click', e => {
    const fragment = document.createDocumentFragment();
    let infoUserUl = document.createElement('ul');

    getUsers(responseArr => {
        responseArr.forEach(user => {
            const {address: {street, suite, city}, company: {name}} = user; 
            if (user.name == e.target.textContent) { 
                for (let key in user) { 
                    let infoUserLi = document.createElement('li');
                    key == 'address'? infoUserLi.textContent = `${key}: ${street}, ${suite}, ${city}`:  key == 'company'? infoUserLi.textContent = `${key}: ${name}` : infoUserLi.textContent = `${key} : ${user[key]}`;
                    infoUserUl.appendChild(infoUserLi); 
               } 
            }
        });
    });
    infoUserHtml.innerHTML = '';
    fragment.appendChild(infoUserUl);
    infoUserHtml.appendChild(fragment);
    console.log(infoUserHtml);
});
