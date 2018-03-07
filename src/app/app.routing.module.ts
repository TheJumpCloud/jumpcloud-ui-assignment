import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemFormComponent } from './components/todo-item-form/todo-item-form.component';
import { TodoItemListComponent } from './components/todo-item-list/todo-item-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

const todoRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: TodoItemListComponent },
  { path: 'todo-item/:id', component: TodoItemComponent },
  { path: 'add', component: TodoItemFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(todoRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}