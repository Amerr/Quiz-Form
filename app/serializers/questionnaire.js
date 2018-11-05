import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    questions: {
      embedded: 'always'
    },
    category: 'category_name_hyphenated'
  }
});