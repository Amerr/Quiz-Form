import DS from 'ember-data';
import { fragmentArray, fragment } from 'ember-data-model-fragments/attributes';

const {
  belongsTo,
  Model
} = DS;

export default Model.extend({
  conditons: fragmentArray('fragment/condition'),
  destination: fragment('fragment/destination'),
  question: belongsTo('question')
});
