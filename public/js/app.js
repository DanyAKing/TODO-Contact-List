const btn = document.querySelector('#submit');
const nameInput = document.querySelector('.name_input');
const numberInput = document.querySelector('.number_input');

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
              <button class="remove" type="button">-</button>
          </div> 
        </div>
    `;
    contactsList.innerHTML += newContact;
  });
};

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
});
