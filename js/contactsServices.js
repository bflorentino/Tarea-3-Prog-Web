const URL = 'http://www.raydelto.org/agenda.php'

export const getContacts = async () => {

    const req = {
        method: 'GET',
    }

    const res = await fetch(URL, req);
    const data = await res.json();
    
    return data 
}

export const addContact =  async (contact) => {
    
    const req = {
        method: 'POST',
        body : JSON.stringify(contact)
    }
    const res = await fetch(URL, req);
    const data = await res.json();
    
    return data;
}