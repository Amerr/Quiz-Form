import ApplicationSerializer from './application';
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'compositeId',
  attrs: {
   conditions: {
     embedded: 'always'
   }
  }
});