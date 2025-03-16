tabButtons_crearmaquina.forEach((button) => {
  button.addEventListener('click', () => {
    let tabId = button.getAttribute('data-tab');
    setActiveTab_crearmaquina(tabId);
  });
});

function setActiveTab_crearmaquina(tabId) {
  tabButtons_crearmaquina.forEach((button) => {
    button.classList.remove('active');
  });

  tabContents_crearmaquina.forEach((content) => {
    content.classList.remove('active');
  });

  let selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
  let selectedContent = document.getElementById(tabId);

  selectedButton.classList.add('active');
  selectedContent.classList.add('active');
}