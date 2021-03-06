import Ember from 'ember';

const {
  inject: {
    service
  },
  get
} = Ember;

export default Ember.Route.extend({
  store: service(),
  model() {
    return get(this, 'store').findAll('questionnaire');
  }
});