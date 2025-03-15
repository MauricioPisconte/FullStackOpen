import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

function GetAll(){
    const request =  axios.get(baseURL)
    return(
        request.then((response) => response.data)
    )
}

function Create(newObject){
    const request =  axios.post(baseURL, newObject)
    return(
        request.then((response) => response.data)
    )
}

function Update(id, newNumber) {
    const request = axios.patch(`${baseURL}/${id}`, { number: newNumber })
    return(
        request.then(response => response.data)
    )    
}

function DeleteUser(id) {
    return axios.delete(`${baseURL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error('Error al eliminar');
        });
}

export default { GetAll, Create, Update, DeleteUser };