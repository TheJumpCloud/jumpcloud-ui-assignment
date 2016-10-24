import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-todo-item', 'Integration | Component | edit todo item', {
  integration: true
});

test('it focuses on insert', function(assert) {
  this.render(hbs`{{edit-todo-item}}`);
  assert.ok(this.$('input').hasClass('focus'));
});
