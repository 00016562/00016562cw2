document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/api/todos";
  // Read/Get
  fetchAllTodos(apiUrl);
  const todos = JSON.parse(localStorage.getItem("todos"));
  const updateForms = document.querySelectorAll(".update-form");
  const tasks = document.querySelectorAll("#taskName");
  const statuses = document.querySelectorAll("#taskCheck");
  const deadlines = document.querySelectorAll("#taskDeadline");
  const deleteBtns = document.querySelectorAll(".delete-btn");
  const createForm = document.querySelector(".create-form");
  const newTask = document.getElementById("taskInput");
  const newDeadline = document.getElementById("taskDate");
  createForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newTodo = {
      task: newTask.value,
      deadline: newDeadline.value,
    };
    createTodo(apiUrl, newTodo);
  });
  // Update & Delete Logic
  for (let i = 0; i < todos.length; i++) {
    const endpoint = `${apiUrl}/${todos[i].id}`;
    updateForms[i].addEventListener("submit", async (event) => {
      event.preventDefault();
      const changes = {
        task: tasks[i].value,
        done: statuses[i].checked,
        deadline: deadlines[i].value,
      };
      updateTodo(endpoint, changes);
    });

    deleteBtns[i].addEventListener("click", () => {
      if (window.confirm("Are you sure you want to delete this todo?") === true)
        deleteTodo(endpoint);
    });
  }
});
const fetchAllTodos = async (endpoint) => {
  await axios
    .get(endpoint)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("todos", JSON.stringify(res.data));
      return res.data;
    })
    .catch((error) => {
      alert(error);
    });
};

const createTodo = async (endpoint, data) => {
  await axios
    .post(endpoint, data)
    .then((res) => {
      alert(res.data);
      window.location.reload();
      return res.data;
    })
    .catch((error) => {
      alert(error);
    });
};

const updateTodo = async (endpoint, data) => {
  await axios
    .patch(endpoint, data)
    .then((res) => {
      alert(res.data);
      window.location.reload();
      return res.data;
    })
    .catch((error) => {
      alert(error);
    });
};

const deleteTodo = async (endpoint) => {
  await axios
    .delete(endpoint)
    .then((res) => {
      alert(res.data);
      window.location.reload();
      return res.data;
    })
    .catch((error) => {
      alert(error);
    });
};
