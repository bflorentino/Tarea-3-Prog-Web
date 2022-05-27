export const validateForm = (form) => {
   
    const phoneRegEx = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

    if(form.nombre.value === "") return "Se requiere completar el campo de nombre";
    if(form.apellido.value === "") return "Se requiere completar el campo de apellido";
    if(form.telefono.value === "") return "Se requiere completar el campo del número telefónico";
    if(!phoneRegEx.test(form.telefono.value)) return "El número de teléfono es inválido";

    return true;
}