import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'quiz-form/initializers/ember-cli-mirage';
import { click } from 'ember-native-dom-helpers';

const {
  getOwner,
  get
} = Ember;

const page = {
  questionName: '[data-test-question-name]',
  questionDescription: '[data-test-question-description]',
  questionCategory: '[data-test-question-category]',
  questionTriggerAction: '[data-test-question-trigger-action]'
};

moduleForComponent('questionnaire-set', 'Integration | Component | questionnaire set', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
    let questionnaire = this.server.db.questionnaires.findBy({id: '40'});
    let store = getOwner(this).lookup('service:store');
    questionnaire = store.push(store.normalize('questionnaire', questionnaire));
    this.set('model', questionnaire);
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders question item', async function(assert) {
  const content = (selector) => this.$(selector).text().trim();
  let model =  get(this, 'model');
  this.on('navigateToQuiz', (model) => {
    assert.ok(model, 'It has triggered the action to take the question');
  });

  await this.render(hbs`{{questionnaire-set model=model navigateToQuiz=(action 'navigateToQuiz' model)}}`);
  assert.equal(content(page.questionName), get(model, 'name'), 'it has rendered the question name');
  assert.equal(content(page.questionDescription), get(model, 'description'), 'it has rendered the question description');
  await click(page.questionTriggerAction);
});
