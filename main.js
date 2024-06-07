var $modal = document.querySelector('dialog');
var $addNewBtn = document.querySelector('#add-new');
if (!$modal)
    throw new Error('no dialog found');
if (!$addNewBtn)
    throw new Error('no add new button');
$addNewBtn.addEventListener('click', function () {
    $modal.showModal();
});
