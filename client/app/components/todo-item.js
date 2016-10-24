import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleDone(todo) {
      todo.toggleProperty('done');
      todo.save();
    }
  }
});
