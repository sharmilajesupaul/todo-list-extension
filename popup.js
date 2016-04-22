document.addEventListener('DOMContentLoaded', function() {
  $('#openTab').click(function() {
      chrome.tabs.create({ url: 'page.html' });
  });
});
