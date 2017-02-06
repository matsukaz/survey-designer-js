/* eslint-env jest */
import { List, Map } from 'immutable';
import ChoiceDefinition from '../../../../lib/runtime/models/questions/ChoiceDefinition';
import CheckboxQuestionState from '../../../../lib/runtime/models/state/CheckboxQuestionState';

describe('CheckboxQuestionState', () => {
  describe('setItemState', () => {
    it('排他を選択したときに他の項目が未選択かつdisabledになる', () => {
      const transformedChoices = List([
        new ChoiceDefinition({ index: 1, exclusive: true }),
        new ChoiceDefinition({ index: 0, exclusive: false }),
      ]);
      const itemState = List([
        Map({ checked: true, disabled: false }),
        Map({ checked: false, disabled: false }),
      ]);
      const model = new CheckboxQuestionState({ transformedChoices, itemState });
      expect(model.getIn(['itemState', 0, 'checked'])).toBe(true);
      expect(model.getIn(['itemState', 0, 'disabled'])).toBe(false);
      expect(model.getIn(['itemState', 1, 'checked'])).toBe(false);
      expect(model.getIn(['itemState', 1, 'disabled'])).toBe(false);

      const result = model.setItemState(1, true);
      expect(result.getIn(['itemState', 0, 'checked'])).toBe(false);
      expect(result.getIn(['itemState', 0, 'disabled'])).toBe(true);
      expect(result.getIn(['itemState', 1, 'checked'])).toBe(true);
      expect(result.getIn(['itemState', 1, 'disabled'])).toBe(false);
    });

    it('排他を解除したとき他の項目のdisabledが解除される', () => {
      const transformedChoices = List([
        new ChoiceDefinition({ index: 0, exclusive: true }),
        new ChoiceDefinition({ index: 1, exclusive: false }),
      ]);
      const itemState = List([
        Map({ checked: true, disabled: false }),
        Map({ checked: false, disabled: true }),
      ]);
      const model = new CheckboxQuestionState({ transformedChoices, itemState });
      expect(model.getIn(['itemState', 0, 'checked'])).toBe(true);
      expect(model.getIn(['itemState', 0, 'disabled'])).toBe(false);
      expect(model.getIn(['itemState', 1, 'checked'])).toBe(false);
      expect(model.getIn(['itemState', 1, 'disabled'])).toBe(true);

      const result = model.setItemState(0, false);
      expect(result.getIn(['itemState', 0, 'checked'])).toBe(false);
      expect(result.getIn(['itemState', 0, 'disabled'])).toBe(false);
      expect(result.getIn(['itemState', 1, 'checked'])).toBe(false);
      expect(result.getIn(['itemState', 1, 'disabled'])).toBe(false);
    });
  });
});
