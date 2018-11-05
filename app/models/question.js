import Ember from 'ember';
import DS from 'ember-data';
import { componentType } from 'quiz-form/constants/question';
const {
  attr,
  belongsTo,
  hasMany,
  Model
} = DS;

const {
  computed,
  computed: { alias },
  get,
  getProperties
} = Ember;

export default Model.extend({
  questionType: attr('string'),
  headline: attr('string'),
  description: attr('string'),
  required: attr('boolean'),
  multiple: attr('boolean'),
  multiline: attr('boolean'),
  questionnaire: belongsTo('questionnaire'),
  choices: hasMany('choice', {
    async: false
  }),
  jumps: hasMany('jump', {
    async: false
  }),
  componentToRender: computed('questionType', 'multiple', {
    get() {
      let { questionType: type, multiple } = getProperties(this, 'questionType', 'multiple');
      return componentType(type, multiple);
    }
  }),
  hasChildQuestion: alias('jumps.length'),
  childQuestionId: computed('hasChildQuestion', 'jumps', {
    get() {
      if (get(this, 'hasChildQuestion')) {
        return get(this, 'jumps').mapBy('destination.id');
      }
    }
  })
});
