import React, { Component } from 'react';
import './App.css';
import logo from './react.png';

class App extends Component {
  constructor() {
    super();

    this.state = {
      title: 'My Todos',
      todos: [],
      id: 0,
      todoInput: '',
      isUpdating: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let todos = JSON.parse(sessionStorage.getItem('todos'));
    this.setState({ todos: todos || [] });
  }

  updateTodos() {
    sessionStorage.setItem('todos', JSON.stringify(this.state.todos));
    this.setState({ todoInput: '' });
    this.textInput.focus();
  }

  editTodoName(id, name) {
    this.textInput.focus();
    this.setState({ id, todoInput: name, isUpdating: true });
  }

  updateTodoName() {
    const index = this.state.todos.findIndex(item => item.id === this.state.id);

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.todos[index].name = this.state.todoInput;
    this.updateTodos();
    this.setState({ isUpdating: false })
  }

  addNewTodo() {
    if (this.state.isUpdating) this.updateTodoName();
    else this.state.todos.push({ id: this.state.todos.length, name: this.state.todoInput, completed: false });
    this.updateTodos();
  }

  handleChange(event) {
    this.setState({ todoInput: event.target.value })
  }

  handleSubmit(event) {
    this.addNewTodo();
    event.preventDefault();
  }

  updateTodoCompletion(id) {
    const index = this.state.todos.findIndex((item) => item.id === id);

    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.todos[index].completed = !this.state.todos[index].completed;
    this.updateTodos();
  }

  deleteTodo(id) {
    const index = this.state.todos.findIndex(item => item.id === id);
    this.state.todos.splice(index, 1);
    this.updateTodos();
  }

  render() {
    return (
      <div id="todo-list" className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1 className="text-center display-4">{this.state.title}</h1>
            <div className="text-center sub-header">
              Built with <a href="https://reactjs.org/"><img src={logo} alt="" height="25" /></a>
            </div>
            <form className="input-group" onSubmit={this.handleSubmit}>
              <input
                value={this.state.todoInput}
                onChange={this.handleChange}
                required 
                type="text"
                maxLength="50"
                className="col-md-10 form-control"
                placeholder="New Todo"
                autoFocus
                ref={input => this.textInput = input}
              />

              <button
                type="button"
                className={`input-group-append btn ${ !this.state.isUpdating ? 'btn-success' : 'btn-primary' } col-md-2 font-weight-bold`}
                onClick={this.handleSubmit}
              >
                {!this.state.isUpdating ? 'Submit' : 'Update'}
              </button>

            </form>

            <table className="table table-sm table-dark">
              {this.state.todos.map(todo =>
                <tbody key={todo.id}>
                  <tr>
                    <td className="form-control-lg">
                      <button
                        className={`btn ${todo.completed ? 'btn-success' : 'btn-secondary'}`}
                        title="Click to mark as complete"
                        onClick={() => this.updateTodoCompletion(todo.id)}
                      >
                        <span className="fa fa-check"></span>
                      </button>
                      <span className="todo-name">{todo.name}</span>
                    </td>

                    <td className="text-right">

                      <button
                        className="btn btn-primary update-todo-btn"
                        title="Update Todo"
                        onClick={() => this.editTodoName(todo.id, todo.name)}
                      >
                        <span className="fa fa-edit"></span>
                      </button>

                      <button
                        className="btn btn-danger"
                        title="Delete Todo"
                        onClick={() => this.deleteTodo(todo.id)}
                      >
                        <span className="fa fa-trash"></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
