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
  next: '[data-test-answer-next]',
  prev: '[data-test-answer-prev]',
  questionTitle: '[data-test-question-title]',
  questionnaireTitle: '[data-test-questionnaire-title]',
  questionnaireStats: '[data-test-questionnaire-stats]',
  currentIndex: '[data-test-current-index]',
  singleChoice: '[data-test-single-choice]',
  singleChoiceItem: (i) => `[data-test-single-choice-item='${i}']`,
  multipleChoice: '[data-test-multiple-choice]',
};

const content = (selector, context) => context.$(selector).text().trim();

moduleForComponent('answer-form', 'Integration | Component | answer form', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
    let questionnaire = this.server.db.questionnaires.findBy({id: '40'});
    let store = getOwner(this).lookup('service:store');
    questionnaire = store.push(store.normalize('questionnaire', questionnaire));
    let answerSheet = store.createRecord('answer-sheet', {
      questionnaire
    });
    this.setProperties({
      answerSheet,
      model: questionnaire
    });
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders answer form inital state', function(assert) {
  let model = get(this, 'model');
  
  this.render(hbs`{{answer-form model=model answerSheet=answerSheet}}`);
  assert.equal(content(page.questionnaireTitle, this), get(model, 'name'), 'It has rendered the questionnair name');
  let stats = content(`${page.questionnaireStats} span`, this);
  assert.equal(stats.split('/')[0], 0, 'It has rendered total answered question in inital state');
  assert.equal(stats.split('/')[1], get(model, 'questions.length'), 'It has rendered total question needs to be answered');
  assert.equal(content(page.currentIndex, this), 1, 'it has rendered the current question index 1');
});


test('it navigates between multiple questions', async function (assert) {
  await this.render(hbs`{{answer-form model=model answerSheet=answerSheet}}`);
  assert.equal(document.querySelector(page.prev).disabled , true, 'it has has disabled the prev button');
  await click(page.next);
  assert.equal(content(page.currentIndex, this), 2, 'it has has rendered the next question');
  assert.equal(document.querySelector(page.prev).disabled , false, 'it has has enabled the prev button');
  await click(page.next);
  assert.equal(content(page.currentIndex, this), 3, 'it has has rendered the next question');
  await click(page.prev);
  assert.equal(content(page.currentIndex, this), 2, 'it has has rendered the prev question');
});

test('it has updated the number of question answered', async function(assert) {
  await this.render(hbs`{{answer-form model=model answerSheet=answerSheet}}`);
  let questionBox = document.querySelector(`${page.questionTitle} + div`);
  if (questionBox.attributes[page.singleChoice.replace(/[\[\]]+/g,'')]) {
    await click(`${page.singleChoiceItem(1)} input`);
    await click(page.next);
    let stats = content(`${page.questionnaireStats} span`, this);
    assert.equal(stats.split('/')[0], 1, 'It has updated total answered question');
  }
});