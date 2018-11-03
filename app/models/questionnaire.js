import DS from 'ember-data';

const {
  attr,
  hasMany,
  Model
} = DS;

export default Model.extend({
  identifier: attr('string'),
  name: attr('string'),
  questions: hasMany('question', {
    async: false
  }),
  description: attr('string'),
  categoryNameHyphenated: attr('string')
});
