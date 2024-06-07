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
if (!$modal)
    throw new Error('no dialog found');
if (!$addNewBtn)
    throw new Error('no add new button');
if (!$form)
    throw new Error('no form');
if (!$table)
    throw new Error('no table');
if (!$cancelbtn)
    throw new Error('no cancel button found');
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
    $editBtn.setAttribute('href', '#');
    $editBtn.textContent = 'Edit';
    $deleteBtn.setAttribute('class', 'delete-btn');
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
    // 1. collect the values from the form with the elements property
    // 2. call the render function with the object
    // 3. append the render result to the table row
    event.preventDefault();
    var $formElements = $form.elements;
    var item = {
        time: $formElements.timeDropdown.value,
        day: $formElements.daysOfWeek.value,
        notes: $formElements.notesInput.value,
    };
    eventsObject.eventsArr.push(item);
    renderResult(item);
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
