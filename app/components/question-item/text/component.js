import Ember from 'ember';
import QuestionItem from '../component';

const {
  computed: { alias }
} = Ember;

export default QuestionItem.extend({
  isMultiline: alias('model.multiline'),
});