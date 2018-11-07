import Ember from 'ember';

const {
  computed: { alias }
} = Ember;

export default Ember.Controller.extend({
  questionnaires: alias('model'),
  actions: {
    navigateToQuiz(model) {
      this.transitionToRoute('quiz', model);
    }
  }
});