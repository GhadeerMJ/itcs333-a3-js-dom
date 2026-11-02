// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // Get HTML elements
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    // Update counter
    function updateCounter() {
      const items = list.querySelectorAll('li');
      let count = 0;

      items.forEach(function (item) {
        if (!item.classList.contains('completed')) {
          count++;
        }
      });

      if (count === 1) {
        counter.textContent = count + ' item left';
      } else {
        counter.textContent = count + ' items left';
      }
    }

    // Apply filters
    function applyFilter() {
      const items = list.querySelectorAll('li');

      items.forEach(function (item) {
        const completed = item.classList.contains('completed');

        if (currentFilter === 'all') {
          item.style.display = '';
        }
        else if (currentFilter === 'active') {

          if (completed === true) {
            item.style.display = 'none';
          } else {
            item.style.display = '';
          }

        }
        else if (currentFilter === 'done') {

          if (completed === true) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }

        }
      });
    }

    // Add new task
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const taskText = input.value.trim();

      // Check empty input
      if (taskText === '') {
        errorMsg.classList.remove('hidden');
        return;
      }

      errorMsg.classList.add('hidden');

      // Create list item
      const li = document.createElement('li');

      // Create task text
      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = taskText;

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';

      // Add elements to li
      li.appendChild(span);
      li.appendChild(deleteBtn);

      // Add li to list
      list.appendChild(li);

      // Clear input
      input.value = '';

      applyFilter();
      updateCounter();
    });

    // Event delegation: one listener for the entire list
    list.addEventListener('click', function (event) {

      // Check if delete button was clicked
      if (event.target.classList.contains('delete-btn')) {
        event.target.closest('li').remove();
      }

      // Check if task text was clicked
      else if (event.target.classList.contains('item-text')) {
        const li = event.target.closest('li');
        li.classList.toggle('completed');
      }

      applyFilter();
      updateCounter();
    });

    // Show all tasks
    filterAll.addEventListener('click', function () {
      currentFilter = 'all';
      applyFilter();
    });

    // Show active tasks
    filterActive.addEventListener('click', function () {
      currentFilter = 'active';
      applyFilter();
    });

    // Show completed tasks
    filterDone.addEventListener('click', function () {
      currentFilter = 'done';
      applyFilter();
    });

    // Initial counter
    updateCounter();

  });
})();
