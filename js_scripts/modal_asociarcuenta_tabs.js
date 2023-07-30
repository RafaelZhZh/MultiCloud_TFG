tabButtons_asociarcuenta.forEach((button) => {
  button.addEventListener('click', () => {
    let tabId = button.getAttribute('data-tab');
    setActiveTab_asociarcuenta(tabId);
  });
});

function setActiveTab_asociarcuenta(tabId) {
  tabButtons_asociarcuenta.forEach((button) => {
    button.classList.remove('active');
  });

  tabContents_asociarcuenta.forEach((content) => {
    content.classList.remove('active');
  });

  let selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
  let selectedContent = document.getElementById(tabId);

  selectedButton.classList.add('active');
  selectedContent.classList.add('active');
}