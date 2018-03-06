import { Component, OnInit } from '@angular/core';

import { Todo } from '../../services/todo';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'todo-item-list',
    templateUrl: 'todo-item-list.component.html'
})
export class TodoItemListComponent implements OnInit {
    todos: Todo[] =[];

    constructor(private todoService: TodoService) {}

    ngOnInit() {
        this.getTodos();
    }

    getTodos() {
        this.todoService.getTodos()
            .subscribe(todos => {
                this.todos = todos;
            });        
    }

}