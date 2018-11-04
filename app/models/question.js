import DS from 'ember-data';

const {
  attr,
  belongsTo,
  hasMany,
  Model
} = DS;

export default Model.extend({
  questionType: attr('string'),
  headline: attr('string'),
  description: attr('string'),
  required: attr('boolean'),
  multiple: attr('boolean'),
  questionnaire: belongsTo('questionnaire'),
  choices: hasMany('choice', {
    async: false
  }),
  jumps: hasMany('jump', {
    async: false
  })
});
