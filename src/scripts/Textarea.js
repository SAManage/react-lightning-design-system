import React, { Component } from 'react';
import classnames from 'classnames';
import uuid from 'uuid';
import FormElement from './FormElement';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { isIE, isEdge } from './util';

export default class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = { id: `form-element-${uuid()}` };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }

  render() {
    const id = this.props.id || this.state.id;
    const { label, required, error, tooltip, ...props } = this.props;
    if (label || required || error) {
      const formElemProps = { id, label, required, error, tooltip };
      return (
        <FormElement { ...formElemProps }>
          <Textarea { ...{ ...props, id } } />
        </FormElement>
      );
    }
    const { className, ...pprops } = props;
    delete pprops.initialValue;
    delete pprops.onUpdate;
    delete pprops.valid;
    delete pprops.invalid;
    delete pprops.dirty;
    delete pprops.pristine;
    delete pprops.active;
    delete pprops.touched;
    delete pprops.visited;
    delete pprops.defaultValue;
    delete pprops.autosize;
    const taClassNames = classnames(className, 'slds-input');
    const ieDraggbleFix = (isIE || isEdge) ? { onMouseDown: e => e.target.focus() } : {};
    return props.autosize ?
      (<TextareaAutosize
        id={ id }
        className={ taClassNames }
        onChange={ this.onChange }
        { ...pprops }
        { ...ieDraggbleFix }
      />) :
      (<textarea
        id={ id }
        className={ taClassNames }
        onChange={ this.onChange }
        { ...pprops }
        { ...ieDraggbleFix }
      />);
  }
}

Textarea.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  autosize: PropTypes.bool,
  tooltip: PropTypes.element,
};
