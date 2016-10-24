import Ember from 'ember';

export default Ember.Component.extend({
  newTodoDescription: '',

  store: Ember.inject.service(),

  actions: {
    createTodo(description) {
      // Do nothing unless the user has input
      if (description.trim().length === 0) { return; }

      const store = this.get('store');

      let todo = store.createRecord('todo', {
        description: description
      });

      this.set('newTodoDescription', '');
      todo.save();
    }
  }
});
