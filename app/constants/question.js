const QUESTION_TYPES = {
  'multiple-choice': 'multiple-choice',
  'single-choice': 'single-choice',
  'text': 'text'
};

export const componentType = (type, multiple) => {
  switch (type) {
    case 'text':
    return QUESTION_TYPES[type];
    case 'multiple-choice':
    return multiple ? QUESTION_TYPES[type] : QUESTION_TYPES['single-choice'];
  }
}