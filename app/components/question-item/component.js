import Ember from 'ember';

const {
  computed: { alias },
  computed,
  get
} = Ember;

export default Ember.Component.extend({
  isRequired: alias('model.required'),
  choices: alias('model.choices'),
  questionId: alias('model.id'),
 
  componentType: computed('model', {
    get() {
      return `question-item/${get(this, 'model.componentToRender')}`;
    }
  })
});
