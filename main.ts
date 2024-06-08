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

if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');
if (!$form) throw new Error('no form');
if (!$table) throw new Error('no table');
if (!$cancelbtn) throw new Error('no cancel button found');

$addNewBtn.addEventListener('click', () => {
  $modal.showModal();
});

function renderResult(item: Item): void {
  const newRow = $table.insertRow(1);
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

$form.addEventListener('submit', (event: Event): void => {
  event.preventDefault();

  const $formElements = $form.elements as FormElements;

  const item = {
    time: $formElements.timeDropdown.value,
    day: $formElements.daysOfWeek.value,
    notes: $formElements.notesInput.value,
    itemId: eventsObject.nextEntryId,
  };

  if (eventsObject.editing === null) {
    eventsObject.nextEntryId++;
    eventsObject.eventsArr.push(item);
    renderResult(item);
  } else {
    item.itemId = eventsObject.editing.itemId;
    for (let i = 0; eventsObject.eventsArr.length; i++) {
      if (item.itemId === eventsObject.eventsArr[i].itemId) {
        eventsObject.eventsArr[i] = item;
        eventsObject.editing = null;
        $modal.close();
      }
    }
  }
  $modal.close();
  $form.reset();
});

$cancelbtn.addEventListener('click', () => {
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
    renderResult(eventsObject.eventsArr[i]);
  }
});

$table.addEventListener('click', (event: Event): void => {
  const $eventTarget = event.target as HTMLElement;
  const $formElements = $form.elements as FormElements;

  if ($eventTarget.className === 'edit-btn') {
    for (let i = 0; i < eventsObject.eventsArr.length; i++) {
      if (+$eventTarget.dataset.itemId === eventsObject.eventsArr[i].itemId) {
        eventsObject.editing = eventsObject.eventsArr[i];
        $formElements.timeDropdown.value = eventsObject.eventsArr[i].time;
        $formElements.daysOfWeek.value = eventsObject.eventsArr[i].day;
        $formElements.notesInput.value = eventsObject.eventsArr[i].notes;
      }
    }
    $modal.showModal();
  }
});
