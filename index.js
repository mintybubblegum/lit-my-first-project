import { html, LitElement } from 'lit';
import './todo.js'

const author = 'Noa Trujillo';
const homepage = 'https://open-wc.org/';
const footerTemplate = html`
  <footer>Made with love by <a href="${homepage}">${author}</a></footer>
`;

class TodoApp extends LitElement {
    static properties = {
        todos: { type: Array },
      };

    constructor() {
        super();
        this.todos = [
            { text: 'Do A', finished: true },
            { text: 'Do B', finished: false },
            { text: 'Do C', finished: false },
          ];
      }

    render() {
        const finishedCount = this.todos.filter(e => e.finished).length;
        const unfinishedCount = this.todos.length - finishedCount;

        return html`
            <h1>Todo app</h1>

            <input id="addTodoInput" placeholder="Name" />
            <button @click="${this._addTodo}">Add</button>

            <todo-list 
                .todos="${this.todos}"
                @change-todo-finished="${this._changeTodoFinished}"
                @remove-todo="${this._removeTodo}"
            ></todo-list>


            <div>Total finished: ${finishedCount}</div>
            <div>Total unfinished: ${unfinishedCount}</div>
            <br>
            <br>
            ${footerTemplate}
        `;
    }

    _addTodo() {
        const input = this.shadowRoot.getElementById('addTodoInput');
        const text = input.value;
        input.value = '';
      
        this.todos = [
            ...this.todos,
            { text, finished: false },
        ];
      }

      _removeTodo(e) {
        this.todos = this.todos.filter(todo => todo !== e.detail);
      }
      
      _changeTodoFinished(e) {
        const { changedTodo, finished } = e.detail;
      
        this.todos = this.todos.map(todo => {
          if (todo !== changedTodo) {
            return todo;
          }
          return { ...changedTodo, finished };
        });
      }
}

customElements.define('todo-app', TodoApp);