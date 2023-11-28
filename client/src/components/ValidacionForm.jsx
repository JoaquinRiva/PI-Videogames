function ValidacionForm(formData) {
    let errors = {};
  
    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres";
    }
  
    if (!formData.background_image || !formData.background_image.trim()) {
      errors.background_image = "Debes ingresar la URL de la imagen";
    }
  
    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = "La descripción debe tener al menos 10 caracteres";
    }
  
    if (!formData.platform || !formData.platform.trim()) {
      errors.platform = "Debes ingresar la plataforma";
    }
  
    if (!formData.released) {
      errors.released = "Debes ingresar la fecha de lanzamiento";
    }
  
    if (formData.rating < 0 || formData.rating > 5) {
      errors.rating = "El rating debe estar entre 0.00 y 5.00";
    }
  
    
    return errors;
  }
  
  export default ValidacionForm;
  