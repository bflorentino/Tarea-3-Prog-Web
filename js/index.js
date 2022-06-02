import { getContacts, addContact } from "./contactsServices.js";
import { validateForm } from "./validateContactForm.js";

const contactsContainer = document.querySelector('#contacts-list');
const addContactsContainer = document.querySelector('#addContactContainer');

const addNewContact = (e) => { 
    
    e.preventDefault();
    const contactForm = document.querySelector("#newContact");
    const validation = validateForm(contactForm);
    
    if(validation === true){
        
        const newContact = { 
            nombre: contactForm.nombre.value,
            apellido: contactForm.apellido.value,
            telefono: contactForm.telefono.value
        }
        addContact(newContact).then(data => {
            setContact(data)
            closeAddcontact()
            resetForm()
            showResult(true);
        })
        .catch(e => showResult(false, e))

    }else{
        showResult(false, validation);
    }
}

const openAddcontact = (e) => {
    addContactsContainer.classList.add('show');
}

const closeAddcontact = () => {
    addContactsContainer.classList.remove('show');
}

const resetForm = () => {

    const contactForm = document.querySelector("#newContact");
    contactForm.nombre.value = ""
    contactForm.apellido.value = ""
    contactForm.telefono.value = ""
}

const showResult = (success, message) => {
    if(success){
        alert("El contacto ha sido registrado exitosamente");
    }else{
        alert(message)
    }
}
         
const setAllContacts = () => {
    getContacts()
        .then((data) => {
            data.map((contact) => {
                setContact(contact);
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

const setContact = (contact) => {

    const contactAvatar = document.createElement('img');
    const contactGrid = document.createElement('div');
    const contactInfo = document.createElement('div');
    const contactName = document.createElement('p');
    const contactPhone = document.createElement('p');
    const contactPhoneIcon = document.createElement('img');
    
    contactAvatar.src = setAvatarToContact({name: contact.nombre[0], lname: contact.apellido[0]})
    contactPhoneIcon.src = '../img/Phone.png';
    contactPhone.innerHTML = `${contact.telefono}`
    contactGrid.classList.add('contact-grid');
    contactName.classList.add('contact-name');
    contactInfo.classList.add('contact-info');
    contactPhoneIcon.classList.add('icon');
    contactName.innerHTML = `${contact.nombre} ${contact.apellido}`
    
    contactInfo.appendChild(contactName)
    contactInfo.appendChild(contactPhone)
    contactGrid.appendChild(contactAvatar)
    contactGrid.appendChild(contactInfo)
    contactGrid.appendChild(contactPhoneIcon)
    contactsContainer.appendChild(contactGrid)
}

const setAvatarToContact = (initials) => {
    const avatar = `https://avatars.dicebear.com/api/initials/:${initials.name}${initials.lname}.svg`;
    return avatar
}

document.querySelector('#add-contact').addEventListener("click", openAddcontact);
document.querySelector('#newContact').addEventListener("submit", addNewContact);
document.querySelector('#closeAddContact').addEventListener("click", closeAddcontact);
window.addEventListener("load", setAllContacts)