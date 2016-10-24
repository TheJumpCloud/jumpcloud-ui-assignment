import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('todo-item', 'Integration | Component | todo item', {
  integration: true
});

test('clicking done checkbox triggers a save', function(assert) {
  const FakeTodo = Ember.Object.extend({
    init() {
      this.set('isSaving', false);
      this.set('done', false);
    },
    save() {
      this.toggleProperty('isSaving');
    }
  });

  let todo = FakeTodo.create({
    description: 'My todo'
  });

  this.set('todo', todo);
  this.render(hbs`{{todo-item todo=todo}}`);

  assert.equal(this.$('label').text().trim(), 'My todo', 'description renders as a label');
  assert.notOk(todo.get('isSaving'), 'todo is not saving before click');

  Ember.run(() => {
    this.$('input[type=checkbox]').click();
  });

  assert.ok(todo.get('done'), 'todo is done after click');
  assert.ok(todo.get('isSaving'), 'todo is saving after click');
});
