import Ember from 'ember';

const {
  computed: { alias },
  computed,
  inject: { service },
  isEmpty,
  isPresent,
  get,
  set
} = Ember;

export default Ember.Component.extend({
  store: service(),
  nextQuestion: null,
  
  questions: alias('model.questions'),
  totalAnswers: alias('answerSheet.answers.length'),
  currentIndex: alias('currentAnswer.order'),
  
  questionList: computed('questions', {
    get() {
      return get(this, 'questions').toArray();
    }
  }),

  questionOrder: computed('totalAnswers', {
    get() {
      return get(this, 'totalAnswers') + 1;
    }
  }),

  answeredQuestions: computed('answerSheet.answers.@each.value', {
    get() {
      return get(this, 'answerSheet.answers').filter((answer) => isPresent(get(answer, 'value')));
    }
  }),

  currentQuestion: computed('questions', 'nextQuestion', {
    get() {
      let questions = get(this, 'questions');
      let nextQuestion = get(this, 'nextQuestion');
      if (isPresent(nextQuestion)) {
        return questions.findBy('id', nextQuestion);
      } else {
        return questions.get('firstObject');
      }
    }
  }),

  currentAnswer: computed('currentQuestion', {
    get() {
      let answerList = get(this, 'answerSheet.answers');
      let questionId = get(this, 'currentQuestion.id');
      let answer = answerList.findBy('questionId', questionId);
      if (isEmpty(answer)) {
        answer = get(this, 'store').createFragment('fragment/answer', {
          value: null,
          order: get(answerList, 'length')+1,
          questionId
        });
        Ember.run.next(() => {
          answerList.pushObject(answer);
        });
      }
      return answer;
    }
  }),

  fetchNextQuestion(question, answer) {
    let nextQuestion;
    
    if (get(question, 'hasChildQuestion')) {
      let value = get(answer, 'value');
      get(question, 'jumps').toArray().some((jump) => {
        let conditions = get(jump, 'conditions');
        let isSelectedValue = conditions.toArray().some((condition) => {
          return get(condition, 'value') === value;
        });

        if (isSelectedValue) {
          nextQuestion = get(jump, 'destination.id');
        }
        return isSelectedValue;
      });
    }
    
    return nextQuestion;
  },

  actions: {
    onSubmit(value) {
      let currentQuestion = get(this, 'currentQuestion');
      let questionList = get(this, 'questionList');
      let currentAnswer = get(this, 'currentAnswer');
      if (get(currentAnswer, 'nextQuestion')) {
        set(currentAnswer, 'value', value);
        set(this, 'nextQuestion', get(currentAnswer, 'nextQuestion'));
      } else {
        questionList.removeObject(currentQuestion);
        if (questionList.get('length')) {
          let nextQuestionId = this.fetchNextQuestion(currentQuestion, currentAnswer);
          if (!nextQuestionId) {
            nextQuestionId = questionList.get('firstObject.id');
          }
          set(currentAnswer, 'nextQuestion', nextQuestionId);
          set(this, 'nextQuestion', nextQuestionId);
        } else {
          console.log('Send Result');
        }
      }

    },
    onCancel() {
      let answers = get(this, 'answerSheet.answers');
      let currentQuestionOrder = get(this, 'currentIndex');
      if (get(answers, 'length') && currentQuestionOrder !== 0) {
        let answer = answers.findBy('order', currentQuestionOrder - 1);
        set(this, 'nextQuestion', get(answer, 'questionId'));
      }
    }
  }
});
