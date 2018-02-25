import { Component, OnInit } from '@angular/core';

import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  finishedLoading = false;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getTodos().then((todos) => {
      // On first load, flip the order of received items. This
      // ensures that the render in the order originally inserted.
      this.todos = todos.reverse();
      this.finishedLoading = true;
    });
  }

  updateTodo = (todo: Todo) => {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    Object.assign(this.todos[index], todo);
  }

  deleteTodo = (todo: Todo) => {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos.splice(index, 1);
  }

  addTodo = (todo: Todo) => {
    this.todos.unshift(todo);
  }
}
