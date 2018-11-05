import Ember from 'ember';
import QuestionItem from '../component';

const {
  computed,
  isEmpty,
  get,
  set
} = Ember;

export default QuestionItem.extend({
  checkBoxchoices: computed('choices', 'value', {
    get() {
      let value = get(this, 'value');
      return get(this, 'choices').map(choice => {
        set(choice, 'isChecked', value.includes(get(choice, 'value')));
        return choice;
      });
    }
  }),
  init() {
    this._super(...arguments);
    if (isEmpty(get(this, 'value'))) {
      set(this, 'value', []);
    }
  },
  
  setValue() {
    set(this, 'value', get(this, 'checkBoxchoices').filterBy('isChecked', true).mapBy('value'));
  },
  actions: {
    onSelect(item) {
      set(item, 'isChecked', !get(item, 'isChecked'));
      this.setValue();
    }
  }
});