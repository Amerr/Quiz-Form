import DS from 'ember-data';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

const {
  belongsTo
} = DS;

export default DS.Model.extend({
  questionnaire: belongsTo('questionnaire'),
  answers: fragmentArray('fragment/answer', { defaultValue: () => [] })
});
