var $modal = document.querySelector('dialog');
var $addNewBtn = document.querySelector('#add-new');
var $form = document.querySelector('#modal-form');
var $table = document.querySelector('#events-table');
if (!$modal)
    throw new Error('no dialog found');
if (!$addNewBtn)
    throw new Error('no add new button');
if (!$form)
    throw new Error('no form');
if (!$table)
    throw new Error('no table');
$addNewBtn.addEventListener('click', function () {
    $modal.showModal();
});
function renderResult(item) {
    /*
    <tr>
        <td>finalalla</td>
        <td>finalalla</td>
        <td>finalala</td>
    </tr>
  
    */
    var newRow = $table.insertRow(-1);
    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);
    newCell1.appendChild(document.createTextNode(item.time));
    newCell2.appendChild(document.createTextNode(item.day));
    newCell3.appendChild(document.createTextNode(item.notes));
}
$form.addEventListener('submit', function () {
    // 1. collect the values from the form with the elements property
    // 2. call the render function with the object
    // 3. append the render result to the table row
    var $formElements = $form.elements;
    var item = {
        time: $formElements.timeDropdown.value,
        day: $formElements.weekDropdown.value,
        notes: $formElements.notesInput.value,
    };
    renderResult(item);
});
