mas_info_span.onclick = function() {
  mas_info_modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == mas_info_modal) {
    mas_info_modal.style.display = "none";
  }
}

