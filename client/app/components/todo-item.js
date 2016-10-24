import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'segment'],
  classNameBindings: ['todo.done'],

  init() {
    this._super(...arguments);
    this.set('isEditing', false);
  },

  actions: {
    edit() {
      this.set('isEditing', true);
    },

    save(todo, description) {
      this.set('isEditing', false);
      todo.set('description', description);
      todo.save();
    },

    toggleDone(todo) {
      todo.toggleProperty('done');
      todo.save();
    }
  }
});
