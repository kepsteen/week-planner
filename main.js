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
var $tableBody = document.querySelector('#tbody');
if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');
if (!$form) throw new Error('no form');
if (!$table) throw new Error('no table');
if (!$cancelbtn) throw new Error('no cancel button found');
if (!$tableBody) throw new Error('no table body found');
function renderResult(item, index) {
  var newRow = $table.insertRow(index);
  newRow.setAttribute('data-item-id', item.itemId.toString());
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
$addNewBtn.addEventListener('click', function () {
  $modal.showModal();
});
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var $formElements = $form.elements;
  if (eventsObject.editing === null) {
    var item = {
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
    var item = {
      time: $formElements.timeDropdown.value,
      day: $formElements.daysOfWeek.value,
      notes: $formElements.notesInput.value,
      itemId: eventsObject.editing.itemId,
    };
    for (var i = 0; i < eventsObject.eventsArr.length; i++) {
      if (item.itemId === eventsObject.eventsArr[i].itemId) {
        eventsObject.eventsArr[i] = item;
        break;
      }
    }
    var $tableRows = document.querySelectorAll('tbody > tr');
    if (!$tableRows) throw new Error('no table row node list found');
    var indexToReplace = -1;
    for (var i = 0; i < $tableRows.length; i++) {
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
$cancelbtn.addEventListener('click', function () {
  $form.reset();
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
    renderResult(eventsObject.eventsArr[i], 1);
  }
});
$table.addEventListener('click', function (event) {
  var $eventTarget = event.target;
  var $formElements = $form.elements;
  console.log($eventTarget);
  if ($eventTarget.className === 'edit-btn') {
    for (var i = 0; i < eventsObject.eventsArr.length; i++) {
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
  }
});
