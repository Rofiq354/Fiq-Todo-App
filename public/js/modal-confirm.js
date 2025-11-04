function openDeleteModal(id) {
  const modal = document.getElementById("deleteModal");
  const form = document.getElementById("deleteForm");
  form.action = `/delete-todo/${id}`;
  modal.classList.remove("hidden");
}

function closeDeleteModal() {
  document.getElementById("deleteModal").classList.add("hidden");
}
