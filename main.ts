interface Item {
  time: string;
  day: string;
  notes: string;
}

interface FormElements extends HTMLFormControlsCollection {
  timeDropdown: HTMLSelectElement;
  weekDropdown: HTMLSelectElement;
  notesInput: HTMLTextAreaElement;
}

const $modal = document.querySelector('dialog') as HTMLDialogElement;
const $addNewBtn = document.querySelector('#add-new') as HTMLAnchorElement;
const $form = document.querySelector('#modal-form') as HTMLFormElement;
const $table = document.querySelector('#events-table') as HTMLTableElement;
if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');
if (!$form) throw new Error('no form');
if (!$table) throw new Error('no table');

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
  const newRow = $table.insertRow(-1);
  const newCell1 = newRow.insertCell(0);
  const newCell2 = newRow.insertCell(1);
  const newCell3 = newRow.insertCell(2);
  newCell1.appendChild(document.createTextNode(item.time));
  newCell2.appendChild(document.createTextNode(item.day));
  newCell3.appendChild(document.createTextNode(item.notes));
}

$form.addEventListener('submit', (): void => {
  // 1. collect the values from the form with the elements property
  // 2. call the render function with the object
  // 3. append the render result to the table row

  const $formElements = $form.elements as FormElements;

  const item = {
    time: $formElements.timeDropdown.value,
    day: $formElements.weekDropdown.value,
    notes: $formElements.notesInput.value,
  };
});
