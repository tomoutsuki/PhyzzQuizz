const backend_url = 'http://localhost:3333'

const form_remove_question = document.getElementById('form_remove_question');
form_remove_question.addEventListener('submit', (event) => {
  event.preventDefault();
});

const form_add_question = document.getElementById('form_add_question');
form_add_question.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const form_data = new FormData(form_add_question);

  const body_data = {
    content: form_data.get('content'),
    preview: form_data.get('preview'),
    difficulty: form_data.get('difficulty'),
    choices: form_data.get('difficulty'),
    answer: form_data.get('answer'),
  }

  const request_info = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body_data)
  }

  fetch(`${backend_url}/questions/add`, request_info)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

});
