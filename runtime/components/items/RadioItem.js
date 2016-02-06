import React, { Component, PropTypes } from 'react'
import { findChoices } from '../../../utils'

export default class RadioItem extends Component {
  handleChange(e) {
    this.props.valueChange(this.props.item.itemName, e.target.value);
  }
  makeRadio() {
    const { state, item } = this.props;
    const value = this.props.state.values.inputValues[item.itemName];
    return findChoices(state, item.id).map((choice) => {
      return (
        <label key={choice.id}>
          <input type="radio" name={item.itemName} value={choice.value} onChange={this.handleChange.bind(this)} checked={value === choice.value}/>
          {choice.label}
        </label>
      );
    });
  }
  render() {
    const { state, item } = this.props;
    return (
      <div>
        <h3>{item.itemTitle}</h3>
        {this.makeRadio()}
      </div>
    );
  }
}

RadioItem.propTypes = {
  itemTitle: PropTypes.string,
  itemName: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired).isRequired
};
