import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Todo } from '../../services/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-item',
  templateUrl: 'todo-item.component.html'
})
export class TodoItemComponent implements OnInit { 
    @Input() todo: Todo;
    @Output() delete = new EventEmitter();
  showDialog = false;


    constructor(
      private route: ActivatedRoute,
      private todoService: TodoService,
      private location: Location
    ){}

    ngOnInit() {
      this.getTodoItem();
    }

    getTodoItem() {
      const id = +this.route.snapshot.paramMap.get('id');
      this.todoService.getTodo(id)
        .subscribe(todo => this.todo = todo);
    }

     save() {
      this.todoService.updateTodo(this.todo)
      .subscribe(() => this.goBack());
    }

    toggleDoneValue() {
        this.todo.done = !this.todo.done;
    }

    deleteTodo(todo: Todo) {
        this.todoService.deleteTodo(todo).subscribe(() => this.goBack());
    }

    goBack(){
      this.location.back();
    }

 }