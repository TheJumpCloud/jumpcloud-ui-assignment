import { Component } from '@angular/core'; 
import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'todo-item-form',
    templateUrl: 'todo-item-form.component.html'
})
export class TodoItemFormComponent {
    form;

    todoFormPromoTitle = "Adding more todos is good for you!";
    todoFormPromo = `Lorem ipsum dolor amet adaptogen iPhone truffaut freegan. Vaporware heirloom chillwave ethical knausgaard. Kickstarter chicharrones affogato, locavore thundercats austin waistcoat. 
    Master cleanse direct trade hexagon, tattooed tote bag narwhal tumeric butcher vegan cloud bread austin shaman actually pinterest intelligentsia. Whatever snackwave edison bulb glossier chartreuse 
    hashtag mlkshk poke williamsburg DIY yuccie meditation four loko man braid. Occupy godard distillery lomo disrupt try-hard leggings whatever irony.`;

    errorMessage = "Name has invalid characters";
    todoCompleted = "Completed?";

    // FormBuilder and TodoService dependency injections
    constructor(
        private formBuilder: FormBuilder, 
        private todoItemService: TodoService,
        // private router: Router,
        private location: Location) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            description: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')
            ])),
            done: this.formBuilder.control(false),
        });
    }

    onSubmit(todo) {
        this.todoItemService.addTodo(todo)
        .subscribe(() => this.goBack());
    }

    goBack() {
      this.location.back();
    }
}