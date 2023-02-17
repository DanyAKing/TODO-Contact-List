const btn = document.querySelector('#submit');
const nameInput = document.querySelector('.name_input');
const numberInput = document.querySelector('.number_input');

const storage = {};

const contactsCreator = async (contacts) => {
  const contactsList = document.querySelector('.contact_list');
  contactsList.innerHTML = '';

  contacts.forEach(element => {
    const newContact = `
        <div class="contact">
          <div class="contact_info">
              <p>${element.name}</p>
              <span>${element.phoneNumber}</span>
          </div>
          <div class="contact_remove">
              <button id="remove" type="button">-</button>
          </div> 
        </div>
    `;
    contactsList.innerHTML += newContact;
  });
};

const createNodes = async () => {
  document.querySelectorAll('#remove').forEach(element => {
    element.addEventListener('click', async () => {
      const removeButton = [...document.querySelectorAll('#remove')];
      const buttonIndex = removeButton.indexOf(element);

      if (element) {
        await fetch('http://127.0.0.1:3000/remove', {
          method: 'POST',
          body: JSON.stringify({ buttonIndex }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            contactsCreator(data);
            createNodes();
          });
      }
    });
  });
};

const getDataFromBackend = async () => {
  await fetch('http://127.0.0.1:3000/send')
    .then(res => res.json())
    .then(data => contactsCreator(data));

  createNodes();
};

getDataFromBackend();

btn.addEventListener('click', async event => {
  event.preventDefault();
  await fetch('http://127.0.0.1:3000/set', {
    method: 'POST',
    body: JSON.stringify({ name: nameInput.value, phoneNumber: numberInput.value }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => contactsCreator(data));

  createNodes();
});
