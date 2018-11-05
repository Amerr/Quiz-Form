import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

const {
  attr
} = DS;

export default MF.Fragment.extend({
  questionId: attr('string'),
  value: attr('string'),
  order: attr('number'),
  nextQuestionId: attr('string')
});
