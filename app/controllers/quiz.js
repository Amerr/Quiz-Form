import Ember from 'ember';

const {
  computed,
  inject: { service },
  get
} = Ember;

export default Ember.Controller.extend({
  store: service(),
  answerSheet: computed('model', {
    get() {
      let store = get(this, 'store');
      let model = get(this, 'model');
      return store.createRecord('answer-sheet', {
        questionnaire: model
      });
    }
  }),
  actions: {
    onSubmit() {
      this.transitionToRoute('dashboard');
    }
  }
});