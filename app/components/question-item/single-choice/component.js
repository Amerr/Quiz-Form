import Ember from 'ember';
import QuestionItem from '../component';

const {
  get
} = Ember;

export default QuestionItem.extend({
  actions: {
    onSelect(item) {
      this.set('value', get(item, 'value'));
    }
  }
});