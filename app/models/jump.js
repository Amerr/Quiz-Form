import DS from 'ember-data';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

const {
  attr,
  belongsTo,
  Model
} = DS;

export default Model.extend({
  conditions: fragmentArray('fragment/condition'),
  destination: attr(),
  question: belongsTo('question')
});
