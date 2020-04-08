const btn = document.querySelector('.btn-get-posts');
const btnSend = document.querySelector('.btn-send-post')
const container = document.querySelector('.container');

const btnUsers = document.querySelector('.btn-users');
const usersContextName = document.querySelector('.users-name');
const infoUserHtml = document.querySelector('.info-User');

const submitBtn = document.querySelector('#submit');
let globalUsers;

function getInfoFromServer(typeRequest, server) {
    const xhr = new XMLHttpRequest();
    xhr.open(typeRequest, server);
    xhr.addEventListener('load', () => {
        const responseArr = JSON.parse(xhr.responseText);
        globalUsers = responseArr;
        server == 'https://jsonplaceholder.typicode.com/users' ? appendLi(responseArr) : appendCard(responseArr);

    });

    xhr.addEventListener('error', () => {
        console.log('error');
    });

    xhr.send();
}

btn.addEventListener('click', e => {
    getInfoFromServer('GET', 'https://jsonplaceholder.typicode.com/posts');
});

getInfoFromServer('GET', 'https://jsonplaceholder.typicode.com/users');


function appendCard(responseArr) {
    const fragment = document.createDocumentFragment();
    responseArr.forEach(post => {
        const card = cardTemplate(post);
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}
function appendLi(responseArr) {
    const fragment = document.createDocumentFragment();

    responseArr.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        li.style.fontSize = '18px';
        li.style.listStyleType = 'none';
        fragment.appendChild(li);
    });

    usersContextName.appendChild(fragment);
    return fragment;
}

usersContextName.addEventListener('click', e => {
    const fragment = document.createDocumentFragment();
    let infoUserUl = document.createElement('ul');

    globalUsers.forEach(user => {
        if (user.name == e.target.textContent) {
            if (user.id > 10) {
                for (let key in user) {
                    let infoUserLi = document.createElement('li');
                    infoUserLi.textContent = `${key}:${user[key]}`;
                    infoUserLi.style.listStyleType = 'none';
                    infoUserUl.appendChild(infoUserLi);
                    infoUserUl.style.border = '1px solid green';
                }
            } else {
                const {
                    address: {
                        street,
                        suite,
                        city
                    },
                    company: {
                        name
                    }
                } = user;
                for (let key in user) {
                    let infoUserLi = document.createElement('li');
                    key == 'address' ? infoUserLi.textContent = `${key}: ${street}, ${suite}, ${city}` : key == 'company' ? infoUserLi.textContent = `${key}: ${name}` : infoUserLi.textContent = `${key} : ${user[key]
                    }`;
                    infoUserUl.appendChild(infoUserLi);
                    infoUserUl.style.border = '1px solid green';
                    infoUserUl.style.listStyleType = 'none';
                }
            }
        }
    });

    infoUserHtml.innerHTML = '';
    fragment.appendChild(infoUserUl);
    infoUserHtml.appendChild(fragment);
});

function postInfoServer(server, body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', server);
    xhr.addEventListener('load', () => {
        const responseObj = JSON.parse(xhr.responseText);
        cb(responseObj);
    });

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

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
    postInfoServer('https://jsonplaceholder.typicode.com/posts', newPost, responseObj => {
        const card = cardTemplate(responseObj);
        container.insertAdjacentElement('afterbegin', card);
    });
});

submitBtn.addEventListener('click', e => {
    const form = document.querySelector('form');
    const name = document.querySelector('#fName').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#uName').value;
    const phone = document.querySelector('#phone').value;
    const website = document.querySelector('#site').value;
    const infoUser = {
        name,
        email,
        username,
        phone,
        website
    };

    postInfoServer('https://jsonplaceholder.typicode.com/users', infoUser, responseObj => {

        let newResponseArr = [];
        for (let i = 0; i < 1; i++) {
            newResponseArr.push(responseObj);
        }
        const user = appendLi(newResponseArr);
        globalUsers.push(responseObj);
        usersContextName.insertAdjacentElement('afterbegin', user);
    });

    form.reset();
});

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

