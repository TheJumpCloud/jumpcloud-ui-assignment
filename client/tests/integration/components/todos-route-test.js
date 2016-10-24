import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('todos-route', 'Integration | Component | todos route', {
  integration: true
});

const todos = Ember.A([
  Ember.Object.create({ id: 1, description: 'Walk dog', done: false }),
  Ember.Object.create({ id: 2, description: 'Buy groceries', done: true })
]);

test('renders todos', function(assert) {
  this.set('todos', todos);
  this.render(hbs`{{todos-route todos=todos}}`);
  assert.equal(this.$('li').length, 2, 'it renders all the todos');
});

test('create todo', function(assert) {
  this.set('todos', todos);
  this.set('createTodo', () => {
    assert.ok("called createTodo");
  })
  this.render(hbs`{{todos-route todos=todos createTodo=createTodo}}`);
});
