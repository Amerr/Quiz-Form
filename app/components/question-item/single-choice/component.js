import Ember from 'ember';
import QuestionItem from '../component';

const {
  get
} = Ember;

export default QuestionItem.extend({
  attributeBindings: ['model.id:data-test-single-choice'],
  actions: {
    onSelect(item) {
      this.set('value', get(item, 'value'));
    }
  }
});