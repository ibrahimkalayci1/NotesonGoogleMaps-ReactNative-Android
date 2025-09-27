import * as yup from "yup";


const NoteSchema = yup.object().shape({
    title: yup.string()
      .min(2, 'Çok Kısa!')
      .max(100, 'Çok Uzun!')
      .required('Zorunlu'),
    description: yup.string()
      .min(2, 'Çok Kısa!')
      .max(200, 'Çok Uzun!')
      .required('Zorunlu'),
  });

  export {NoteSchema}