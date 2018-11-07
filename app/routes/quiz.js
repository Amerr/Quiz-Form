import Ember from 'ember';

const {
  inject: {
    service
  },
  get
} = Ember;

export default Ember.Route.extend({
  store: service(),
  model(params) {
    return get(this, 'store').findRecord('questionnaire', params.id);
  }
});