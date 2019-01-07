import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';


export default class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.controlsRef = this.controlsRef.bind(this);
  }

  onChange(e) {
    if (this.props.onChange) {
      const values = [];
      React.Children.forEach(this.props.children, (check, i) => {
        const ref = check.props.ref || `check${(i + 1)}`;
        const el = ReactDOM.findDOMNode(this.refs[ref]);
        const checkEl = el.querySelector('input[type=checkbox]');
        if (checkEl && checkEl.checked) {
          values.push(check.props.value);
        }
      });
      this.props.onChange(e, values);
    }
  }

  controlsRef(ref) {
    this.controls = ref;
  }

  renderControl(checkbox, i) {
    const props = { grouped: true, ref: checkbox.props.ref || `check${(i + 1)}` };
    if (this.props.name) {
      props.name = this.props.name;
    }
    return React.cloneElement(checkbox, props);
  }

  render() {
    const {
      className, label, totalCols, cols, style, required, error, children, tooltip, ...props,
    } = this.props;
    const grpClassNames = classnames(
      className,
      'slds-form-element',
      {
        'slds-has-error': error,
        'slds-is-required': required,
      },
      typeof totalCols === 'number' ? `slds-size--${cols || 1}-of-${totalCols}` : null
    );
    const grpStyles = typeof totalCols === 'number' ? { display: 'inline-block', ...style } : style;
    const errorMessage =
      error ?
      (typeof error === 'string' ? error :
       typeof error === 'object' ? error.message :
       undefined) :
      undefined;
    return (
      <fieldset
        className={ grpClassNames }
        style={ grpStyles }
        onChange={ this.onChange.bind(this) }
        { ...props }
      >
        <legend className='slds-form-element__label slds-form-element__label--top'>
          { label }
          {
            required ?
              <abbr className='slds-required'>*</abbr> :
              undefined
          }
          { tooltip }
        </legend>
        <div className='slds-form-element__control' ref={this.controlsRef}>
          { React.Children.map(children, this.renderControl.bind(this)) }
          {
            errorMessage ?
              <div className='slds-form-element__help'>{ errorMessage }</div> :
              undefined
          }
        </div>
      </fieldset>
    );
  }

}

CheckboxGroup.propTypes = {
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
  name: PropTypes.string,
  totalCols: PropTypes.number,
  style: PropTypes.object,
  cols: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
  tooltip: PropTypes.element,
};

CheckboxGroup.isFormElement = true;
