import { showSuccessMessage, showErrorMessage } from "./messages";

const refs = {
  form: document.querySelector('.form'),
};

const handleSubmit = event => {
  event.preventDefault();

  const formData = {
    delay: refs.form.elements['delay'].value,
    state: refs.form.elements['state'].value,
  };

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.state === 'fulfilled') {
        resolve(formData.delay);
      } else {
        reject(formData.delay);
      }
    }, formData.delay);
  });

  promise
    .then( delay => {
		  showSuccessMessage(`Fulfilled promise in ${delay}ms`);
    } )
    .catch( delay => {
      showErrorMessage(`Rejected promise in ${delay}ms`);
    } );
};

refs.form.addEventListener('submit', handleSubmit);