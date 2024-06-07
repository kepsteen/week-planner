var $modal = document.querySelector('dialog');
var $addNewBtn = document.querySelector('#add-new');
var $form = document.querySelector('#modal-form');
if (!$modal)
    throw new Error('no dialog found');
if (!$addNewBtn)
    throw new Error('no add new button');
if (!$form)
    throw new Error('no form');
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
    var $outerElement = document.createElement('tr');
    var $tdElement1 = document.createElement('td');
    var $tdElement2 = document.createElement('td');
    var $tdElement3 = document.createElement('td');
    $tdElement1.textContent = item.time;
    $tdElement2.textContent = item.day;
    $tdElement3.textContent = item.notes;
    $outerElement.appendChild($tdElement1);
    $outerElement.appendChild($tdElement2);
    $outerElement.appendChild($tdElement3);
}
$form.addEventListener('submit', function () {
    // 1. collect the values from the form with the elements property
    // 2. call the render function with the object
    // 3. append the render result to the table row
    var $formElements = $form.elements;
    var item = {
        time: $formElements.timeDropdown.value,
        day: $formElements.weekDropdown.value,
        notes: $formElements.notesInput.value
    };
});
