var eventsObject = {
  eventsArr: [],
  editing: null,
  nextEntryId: 1,
};
var $modal = document.querySelector('dialog');
var $addNewBtn = document.querySelector('#add-new');
var $form = document.querySelector('#modal-form');
var $table = document.querySelector('#events-table');
var $cancelbtn = document.querySelector('#cancel');
if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');
if (!$form) throw new Error('no form');
if (!$table) throw new Error('no table');
if (!$cancelbtn) throw new Error('no cancel button found');
$addNewBtn.addEventListener('click', function () {
  $modal.showModal();
});
function renderResult(item) {
  var newRow = $table.insertRow(1);
  var newCell1 = newRow.insertCell(0);
  var newCell2 = newRow.insertCell(1);
  var newCell3 = newRow.insertCell(2);
  var $editBtn = document.createElement('a');
  var $deleteBtn = document.createElement('a');
  var $plannerActions = document.createElement('div');
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
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var $formElements = $form.elements;
  var item = {
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
    for (var i = 0; eventsObject.eventsArr.length; i++) {
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
$cancelbtn.addEventListener('click', function () {
  $modal.close();
});
window.addEventListener('beforeunload', function () {
  var jsonData = JSON.stringify(eventsObject);
  localStorage.setItem('jsonData-local-storage', jsonData);
});
var previousJsonData = localStorage.getItem('jsonData-local-storage');
if (previousJsonData) {
  var parseJson = JSON.parse(previousJsonData);
  eventsObject = parseJson;
}
document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < eventsObject.eventsArr.length; i++) {
    renderResult(eventsObject.eventsArr[i]);
  }
});
$table.addEventListener('click', function (event) {
  var $eventTarget = event.target;
  var $formElements = $form.elements;
  if ($eventTarget.className === 'edit-btn') {
    for (var i = 0; i < eventsObject.eventsArr.length; i++) {
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
