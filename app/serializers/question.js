import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from './application';

const {
  isPresent
} = Ember;

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'identifier',
  attrs: {
    choices: {
      embedded: 'always'
    },
    jumps: {
      embedded: 'always'
    }
  },
  
  normalize(typeClass, hash, prop) {
    
    if (isPresent(hash.choices)) {
      hash.choices.forEach(function(choice) {
        choice.compositeId = `${Date.now()}-${Math.ceil(Math.random() * 100)}`;
      });
    }
    if (isPresent(hash.jumps)) {
      hash.jumps.forEach(function(jump) {
        jump.compositeId = `${Date.now()}-${Math.ceil(Math.random() * 100)}`;
      });
    }
    return this._super(typeClass, hash, prop);
  }
});