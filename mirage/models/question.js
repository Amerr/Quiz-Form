import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  questionnaire: belongsTo(),
  choices: hasMany(),
  jump: hasMany()
});
