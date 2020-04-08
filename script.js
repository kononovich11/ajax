const btn = document.querySelector('.btn-get-posts');
const btnSend = document.querySelector('.btn-send-post')  
const container = document.querySelector('.container');

const btnUsers = document.querySelector('.btn-users');
const usersContextName = document.querySelector('.users-name');
const infoUserHtml = document.querySelector('.info-User');
let globalUsers;

function getInfoFromServer(typeRequest, server) {
    const xhr = new XMLHttpRequest();
    xhr.open(typeRequest, server);
    xhr.addEventListener('load', () => {
        const responseArr = JSON.parse(xhr.responseText);
        globalUsers = responseArr;
        server=='https://jsonplaceholder.typicode.com/users'?appendOl(responseArr):appendCard(responseArr);

    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send();
}

btn.addEventListener('click', e => {
    getInfoFromServer('GET', 'https://jsonplaceholder.typicode.com/posts');
});

btnUsers.addEventListener('click', e => {
    getInfoFromServer('GET', 'https://jsonplaceholder.typicode.com/users');
});

function appendCard(responseArr) {
    const fragment = document.createDocumentFragment();
    responseArr.forEach(post => {
        const card = cardTemplate(post);
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}  
function appendOl(responseArr) {
    const fragment = document.createDocumentFragment();
    const ol = document.createElement('ol');
        responseArr.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            ol.appendChild(li);
        });

    fragment.appendChild(ol);
    usersContextName.appendChild(fragment);
} 

function cardTemplate(post) {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');

    title.textContent = post.title;

    const article = document.createElement('p');
    article.textContent = post.body;

    cardBody.appendChild(title);
    cardBody.appendChild(article);
    
    card.appendChild(cardBody);
    return card;
}

usersContextName.addEventListener('click', e => {
    const fragment = document.createDocumentFragment();
    let infoUserUl = document.createElement('ul');

    globalUsers.forEach(user => {
            const {address: {street, suite, city}, company: {name}} = user; 
            if (user.name == e.target.textContent) { 
                for (let key in user) { 
                    let infoUserLi = document.createElement('li');
                    key == 'address'? infoUserLi.textContent = `${key}: ${street}, ${suite}, ${city}`:  key == 'company'? infoUserLi.textContent = `${key}: ${name}` : infoUserLi.textContent = `${key} : ${user[key]}`;
                    infoUserUl.appendChild(infoUserLi); 
               } 
            }
        });
  
    infoUserHtml.innerHTML = '';
    fragment.appendChild(infoUserUl);
    infoUserHtml.appendChild(fragment);
});
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



