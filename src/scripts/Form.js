import React, { Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import PropTypes from 'prop-types';


export default class Form extends Component {
  renderFormElement(element) {
    const klass = element.type;
    if (!klass.isFormElement) {
      const {
        id = `form-element-${uuid()}`, label, required, error, totalCols, cols, tooltip,
      } = element.props;
      const formElemProps = { id, label, required, error, totalCols, cols, tooltip };
      return (
        <FormElement { ...formElemProps }>
          { React.cloneElement(element, {
            id, label: undefined, required: undefined, error: undefined,
          }) }
        </FormElement>
      );
    }
    return element;
  }

  render() {
    const { className, type, children, ...props } = this.props;
    const formClassNames = classnames(className, `slds-form--${type}`);
    return (
      <form className={ formClassNames } { ...props }>
        { React.Children.map(children, this.renderFormElement.bind(this)) }
      </form>
    );
  }
}

const FORM_TYPES = ['stacked', 'horizontal', 'inline', 'compound'];

Form.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(FORM_TYPES),
  children: PropTypes.node,
};

Form.defaultProps = {
  type: 'stacked',
};
