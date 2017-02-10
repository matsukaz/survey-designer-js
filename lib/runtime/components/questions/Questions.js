import CheckboxQuestion from './CheckboxQuestion';
import RadioQuestion from './RadioQuestion';
import MultiNumberQuestion from './MultiNumberQuestion';
import SingleTextQuestion from './SingleTextQuestion';
import TextQuestion from './TextQuestion';

const questions = {
  CheckboxQuestion,
  RadioQuestion,
  MultiNumberQuestion,
  SingleTextQuestion,
  TextQuestion,
};

export function findQuestionClass(className) {
  return questions[className];
}