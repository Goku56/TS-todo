import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByTagName("input")[0] as HTMLInputElement;

const todoForm = document.querySelector("#myForm") as HTMLFormElement;

todoForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const newTodo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: Date.now().toString(),
  };
  todos.push(newTodo);
  console.log(newTodo);
  todoInput.value = "";
  renderTodos(todos);
};

const generateTodoItems = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) {
        item.isCompleted = checkBox.checked;
      }
    });
    para.className = checkBox.checked ? "textCut" : "";
  };

  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = title;
  para.className = isCompleted ? "textCut" : "";

  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkBox, para, btn);

  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodos(todos);
};

const renderTodos = (todos: Todo[]) => {
  todosContainer.innerHTML = "";
  todos.forEach((item) => {
    generateTodoItems(item.title, item.isCompleted, item.id);
  });
};
