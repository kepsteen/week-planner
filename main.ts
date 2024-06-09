interface Item {
  time: string;
  day: string;
  notes: string;
  itemId: number;
}

interface FormElements extends HTMLFormControlsCollection {
  timeDropdown: HTMLSelectElement;
  daysOfWeek: HTMLSelectElement;
  notesInput: HTMLTextAreaElement;
}

interface EventsObject {
  eventsArr: Item[];
  editing: null | Item;
  nextEntryId: number;
}

let eventsObject: EventsObject = {
  eventsArr: [],
  editing: null,
  nextEntryId: 1,
};

const $modal = document.querySelector('dialog') as HTMLDialogElement;
const $addNewBtn = document.querySelector('#add-new') as HTMLAnchorElement;
const $form = document.querySelector('#modal-form') as HTMLFormElement;
const $table = document.querySelector('#events-table') as HTMLTableElement;
const $cancelbtn = document.querySelector('#cancel') as HTMLAnchorElement;
const $tableBody = document.querySelector('#tbody') as HTMLTableSectionElement;
const $dayForm = document.querySelector('#day-form') as HTMLFormElement;
const $daySelect = document.querySelector('#days') as HTMLSelectElement;

if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');
if (!$form) throw new Error('no form');
if (!$table) throw new Error('no table');
if (!$cancelbtn) throw new Error('no cancel button found');
if (!$tableBody) throw new Error('no table body found');
if (!$dayForm) throw new Error('no day form found');

function renderResult(item: Item, index: number): void {
  const newRow = $table.insertRow(index);
  newRow.setAttribute('data-item-id', item.itemId.toString());
  const newCell1 = newRow.insertCell(0);
  const newCell2 = newRow.insertCell(1);
  const newCell3 = newRow.insertCell(2);

  const $editBtn = document.createElement('a');
  const $deleteBtn = document.createElement('a');
  const $plannerActions = document.createElement('div');

  $editBtn.setAttribute('class', 'edit-btn');
  $editBtn.setAttribute('data-item-id', item.itemId.toString());
  $editBtn.setAttribute('href', '#');
  $editBtn.textContent = 'Edit';
  $deleteBtn.setAttribute('class', 'delete-btn');
  $deleteBtn.setAttribute('data-item-id', item.itemId.toString());
  $deleteBtn.setAttribute('href', '#');
  $deleteBtn.textContent = 'Delete';
  $plannerActions.setAttribute('class', 'planner-actions row space-evenly');
  $plannerActions.appendChild($editBtn);
  $plannerActions.appendChild($deleteBtn);

  newCell1.appendChild(document.createTextNode(item.time));
  newCell2.appendChild(document.createTextNode(item.notes));
  newCell3.appendChild($plannerActions);
}

$addNewBtn.addEventListener('click', () => {
  $modal.showModal();
});

$form.addEventListener('submit', (event: Event): void => {
  event.preventDefault();

  const $formElements = $form.elements as FormElements;
  if (eventsObject.editing === null) {
    const item = {
      time: $formElements.timeDropdown.value,
      day: $formElements.daysOfWeek.value,
      notes: $formElements.notesInput.value,
      itemId: eventsObject.nextEntryId,
    };

    eventsObject.nextEntryId++;
    eventsObject.eventsArr.push(item);

    renderResult(item, 1);

    $modal.close();
    $form.reset();
  } else {
    const item = {
      time: $formElements.timeDropdown.value,
      day: $formElements.daysOfWeek.value,
      notes: $formElements.notesInput.value,
      itemId: eventsObject.editing.itemId,
    };
    for (let i = 0; i < eventsObject.eventsArr.length; i++) {
      if (item.itemId === eventsObject.eventsArr[i].itemId) {
        eventsObject.eventsArr[i] = item;
        break;
      }
    }
    const $tableRows = document.querySelectorAll(
      'tbody > tr',
    ) as NodeListOf<HTMLTableRowElement>;
    if (!$tableRows) throw new Error('no table row node list found');
    let indexToReplace = -1;
    for (let i = 0; i < $tableRows.length; i++) {
      if (+$tableRows[i].dataset.itemId === item.itemId) {
        indexToReplace = i;
        break;
      }
    }
    $tableBody.removeChild($tableRows[indexToReplace]);
    renderResult(item, indexToReplace + 1);
    eventsObject.editing = null;
    $form.reset();
    $modal.close();
    console.log('eventsObject', eventsObject);
  }
});

$cancelbtn.addEventListener('click', () => {
  $form.reset();
  $modal.close();
});

window.addEventListener('beforeunload', (): void => {
  const jsonData = JSON.stringify(eventsObject);
  localStorage.setItem('jsonData-local-storage', jsonData);
});

const previousJsonData = localStorage.getItem('jsonData-local-storage');

if (previousJsonData) {
  const parseJson = JSON.parse(previousJsonData);
  eventsObject = parseJson;
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < eventsObject.eventsArr.length; i++) {
    renderResult(eventsObject.eventsArr[i], 1);
  }
});

$table.addEventListener('click', (event: Event): void => {
  const $eventTarget = event.target as HTMLElement;
  const $formElements = $form.elements as FormElements;
  console.log($eventTarget.className);

  if ($eventTarget.className === 'edit-btn') {
    for (let i = 0; i < eventsObject.eventsArr.length; i++) {
      if (+$eventTarget.dataset.itemId === eventsObject.eventsArr[i].itemId) {
        $formElements.timeDropdown.value = eventsObject.eventsArr[i].time;
        $formElements.daysOfWeek.value = eventsObject.eventsArr[i].day;
        $formElements.notesInput.value = eventsObject.eventsArr[i].notes;
        eventsObject.editing = eventsObject.eventsArr[i];
        break;
      }
    }
    console.log('eventsObject', eventsObject);
    // 1) Populate form with values from eventsObject.editing
    $modal.showModal();
  } else if ($eventTarget.className === 'delete-btn') {
    const $tableRows = document.querySelectorAll(
      'tbody > tr',
    ) as NodeListOf<HTMLTableRowElement>;
    let indexToRemove = null;
    for (let i = 0; i < $tableRows.length; i++) {
      if (+$tableRows[i].dataset.itemId === +$eventTarget.dataset.itemId) {
        indexToRemove = i;
        break;
      }
    }
    $tableBody.removeChild($tableRows[indexToRemove]);
  }
});

$daySelect.addEventListener('change', (event: Event): void => {
  console.log(eventsObject.eventsArr);
  const dayValue = (event.target as HTMLSelectElement).value;
  console.log('day: ', dayValue);
  const $insertedRows = document.querySelectorAll(
    'tr[data-item-id]',
  ) as NodeListOf<HTMLTableRowElement>;
  if (!$insertedRows) throw new Error(' no inserted rows found');
  console.log('rows', $insertedRows);
  for (let i = 0; i < $insertedRows.length; i++) {
    $tableBody.removeChild($insertedRows[i]);
  }
  for (let i = 0; i < eventsObject.eventsArr.length; i++) {
    if (eventsObject.eventsArr[i].day === dayValue) {
      renderResult(eventsObject.eventsArr[i], 1);
    } else if (dayValue === 'week') {
      renderResult(eventsObject.eventsArr[i], 1);
    }
  }
});
