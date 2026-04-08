// === DOM Elements ===
const list = document.getElementById("todoList");
const input = document.getElementById("todoInput");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");

let allTodos = [];
let currentFilter = "all";

// === Initialize ===
function init() {
  loadTodos();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
  });
}

// === API Calls ===
async function loadTodos() {
  try {
    const res = await fetch("/todos");
    allTodos = await res.json();
    renderTodos();
    updateStats();
  } catch (err) {
    console.error("Failed to load todos:", err);
  }
}

async function addTodo() {
  const text = input.value.trim();
  if (!text) {
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 500);
    return;
  }

  try {
    await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    input.value = "";
    loadTodos();
  } catch (err) {
    console.error("Failed to add todo:", err);
  }
}

async function toggleTodo(id) {
  try {
    await fetch(`/todos/${id}/toggle`, { method: "PATCH" });
    loadTodos();
  } catch (err) {
    console.error("Failed to toggle todo:", err);
  }
}

async function deleteTodo(id) {
  try {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.style.transform = "translateX(100px)";
      el.style.opacity = "0";
      await new Promise(r => setTimeout(r, 250));
    }
    await fetch(`/todos/${id}`, { method: "DELETE" });
    loadTodos();
  } catch (err) {
    console.error("Failed to delete todo:", err);
  }
}

// === Filtering ===
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderTodos();
}

// === Rendering ===
function renderTodos() {
  let filtered = [...allTodos];

  if (currentFilter === "active") {
    filtered = filtered.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = filtered.filter(t => t.completed);
  }

  list.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    list.style.display = "none";
  } else {
    emptyState.style.display = "none";
    list.style.display = "flex";

    filtered.forEach(todo => {
      const li = document.createElement("li");
      li.className = `todo-item${todo.completed ? " completed" : ""}`;
      li.setAttribute("data-id", todo.id);

      li.innerHTML = `
        <div class="todo-checkbox" onclick="toggleTodo(${todo.id})">
          <span class="checkmark">✓</span>
        </div>
        <div class="todo-content">
          <div class="todo-text">${escapeHtml(todo.text)}</div>
        </div>
        <button class="action-btn delete" onclick="deleteTodo(${todo.id})" title="Delete">🗑️</button>
      `;

      list.appendChild(li);
    });
  }
}

function updateStats() {
  const total = allTodos.length;
  const completed = allTodos.filter(t => t.completed).length;
  const active = total - completed;

  totalCount.textContent = total;
  activeCount.textContent = active;
  completedCount.textContent = completed;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// === Kick off ===
init();
