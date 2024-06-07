interface Item {
  time: string;
  day: string;
  notes: string;
}

interface FormElements extends HTMLFormControlsCollection{
  timeDropdown: HTMLSelectElement;
  weekDropdown: HTMLSelectElement;
  notesInput: HTMLTextAreaElement;
}

const $modal = document.querySelector('dialog') as HTMLDialogElement;
const $addNewBtn = document.querySelector('#add-new') as HTMLAnchorElement;
const $form = document.querySelector('#modal-form') as HTMLFormElement;

if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');
if (!$form) throw new Error('no form');

$addNewBtn.addEventListener('click', () => {
  $modal.showModal();
});

function renderResult(item: Item): void {
  /*
  <tr>
      <td>finalalla</td>
      <td>finalalla</td>
      <td>finalala</td>
  </tr>

  */
  const $outerElement = document.createElement('tr');
  const $tdElement1 = document.createElement('td');
  const $tdElement2 = document.createElement('td');
  const $tdElement3 = document.createElement('td');

  $tdElement1.textContent = item.time;
  $tdElement2.textContent = item.day;
  $tdElement3.textContent = item.notes;

  $outerElement.appendChild($tdElement1);
  $outerElement.appendChild($tdElement2);
  $outerElement.appendChild($tdElement3);
}

$form.addEventListener('submit', (): void => {
  // 1. collect the values from the form with the elements property
  // 2. call the render function with the object
  // 3. append the render result to the table row

  const $formElements = $form.elements as FormElements;

  const item = {
    time: $formElements.timeDropdown.value,
    day: $formElements.weekDropdown.value,
    notes: $formElements.notesInput.value
  }

})
