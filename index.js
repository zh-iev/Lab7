const HOST = 'http://localhost:8080';

let spisok = [];

const getspisok = () => {
    return fetch(`${HOST}/guide`)
        .then((response) => response.json())
        .catch(() => []);
}

const deleteId = (id) => {
    return fetch(`${HOST}/guide/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .catch(() => []);
}

const createobj = (name, age, phone, mail) => {
    return fetch(`${HOST}/guide`, {
        method: 'POST',
        body: new URLSearchParams({
            name: name,
            age: age,
            phone: phone,
            mail: mail,
        }),
    })
        .then((response) => response.json())
        .catch(() => []);
}

const addElement = (object) => {
    const str = document.createElement('tr');

    const name_td = document.createElement('td');
    name_td.innerText = object.name;

    const age_td = document.createElement('td');
    age_td.innerText = object.age;

    const phone_td = document.createElement('td');
    phone_td.innerText = object.phone;

    const mail_td = document.createElement('td');
    mail_td.innerText = object.mail;

    const actions_td = document.createElement('td');

    const butdelete = document.createElement('button');
    butdelete.innerText = 'Delete';
    butdelete.className = 'btn-outline-danger';
    butdelete.onclick = async () => {
        await deleteId(object.id);
        spisok = spisok.filter((x) => x.id !== object.id);
        add();
    };

    actions_td.append(butdelete);

    str.append(name_td);
    str.append(age_td);
    str.append(phone_td);
    str.append(mail_td);
    str.append(actions_td);

    return str;
};

const add = () => {
    const list = document.getElementById('list');
    list.innerHTML = '';

    spisok.forEach((guide) => {
        const elem = addElement(guide);
        list.append(elem);
    })
}

const formElement = document.getElementById('form');
formElement.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const mail = document.getElementById('mail').value;

    const id = createobj(name, age, phone, mail);
    spisok.push({
        id:id,
        name: name,
        age: age,
        phone: phone,
        mail: mail,
    });
    add();
};

getspisok()
    .then((response) => {
        spisok = response;
        add();
    })
    .catch(() => {
        console.log('Error!');
    })