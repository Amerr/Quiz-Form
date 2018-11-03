import DS from 'ember-data';

const {
  attr,
  belongsTo,
  Model
} = DS;

export default Model.extend({
  label: attr('string'),
  value: attr('string'),
  selected: attr('boolean'),
  question: belongsTo('question')
});
