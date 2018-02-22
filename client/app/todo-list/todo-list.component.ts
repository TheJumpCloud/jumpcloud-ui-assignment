import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../models/todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  finishedLoading = false;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getTodos().then((todos) => {
      this.todos = todos;
      this.finishedLoading = true;
    });
  }

  updateTodo = (todo: Todo) => {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[index] = todo;
  }
}
