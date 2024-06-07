const $modal = document.querySelector('dialog') as HTMLDialogElement;
const $addNewBtn = document.querySelector('#add-new') as HTMLAnchorElement;

if (!$modal) throw new Error('no dialog found');
if (!$addNewBtn) throw new Error('no add new button');

$addNewBtn.addEventListener('click', () => {
  $modal.showModal();
});
