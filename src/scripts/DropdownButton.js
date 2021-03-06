import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from './Button';
import DropdownMenu from './DropdownMenu';
import { registerStyle } from './util';

export default class DropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
    this.currentWidth = 0;
    registerStyle('no-hover-popup', [
      [
        '.slds-dropdown-trigger:hover .slds-dropdown--menu.react-slds-no-hover-popup',
        '{ visibility: hidden; opacity: 0; }',
      ],
      [
        '.slds-dropdown-trigger.react-slds-dropdown-opened .slds-dropdown--menu',
        '{ visibility: visible !important; opacity: 1 !important; }',
      ],
    ]);

    this.triggerRef = this.triggerRef.bind(this);
    this.dropdownRef = this.dropdownRef.bind(this);
  }

  onBlur() {
    setTimeout(() => {
      if (!this.isFocusedInComponent()) {
        this.setState({ opened: false });
        if (this.props.onBlur) {
          this.props.onBlur();
        }
      }
    }, 10);
  }

  onKeyDown(e) {
    if (e.keyCode === 40) { // down
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.opened) {
        this.setState({ opened: true });
        if (this.props.onClick) {
          this.props.onClick(e);
        }
        setTimeout(() => {
          this.focusToTargetItemEl();
        }, 20);
      } else {
        this.focusToTargetItemEl();
      }
    } else if (e.keyCode === 27) { // ESC
      e.preventDefault();
      e.stopPropagation();
      this.setState({ opened: false });
    }
  }

  onTriggerClick(...args) {
    if (this.props.inheritWidth) {
      this.currentWidth = this.getCurrentWidth();
    }

    const triggerElem = ReactDOM.findDOMNode(this.trigger);
    if (triggerElem !== document.activeElement) triggerElem.focus();

    if (!this.props.hoverPopup) {
      this.setState({ opened: !this.state.opened });
    }
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  onMenuItemClick(...args) {
    if (!this.props.hoverPopup) {
      setTimeout(() => {
        const triggerElem = ReactDOM.findDOMNode(this.trigger);
        if (triggerElem) triggerElem.focus();
        if (triggerElem) this.setState({ opened: false });
        if (this.props.focusOnInput) this.props.focusOnInput();
      }, 10);
    }
    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(...args);
    }
  }

  onMenuClose() {
    const triggerElem = ReactDOM.findDOMNode(this.trigger);
    triggerElem.focus();
    this.setState({ opened: false });
  }

  getCurrentWidth() {
    const htmlElemnt = ReactDOM.findDOMNode(this) || {};
    return htmlElemnt.offsetWidth || 0;
  }

  isFocusedInComponent() {
    const rootEl = ReactDOM.findDOMNode(this);
    let targetEl = document.activeElement;
    while (targetEl && targetEl !== rootEl) {
      targetEl = targetEl.parentNode;
    }
    return !!targetEl;
  }

  focusToTargetItemEl() {
    const dropdownEl = ReactDOM.findDOMNode(this.dropdown);
    const firstItemEl =
      dropdownEl.querySelector('.slds-is-selected > .react-slds-menuitem[tabIndex]') ||
      dropdownEl.querySelector('.react-slds-menuitem[tabIndex]');
    if (firstItemEl) {
      firstItemEl.focus();
    }
  }

  triggerRef(ref) {
    this.trigger = ref;
  }

  dropdownRef(ref) {
    this.dropdown = ref;
  }

  renderButton({ grouped, isFirstInGroup, isLastInGroup, ...props }) {
    const pprops = { ...props };
    delete pprops.onMenuItemClick;
    delete pprops.inheritWidth;
    delete pprops.focusOnInput;
    const button = (
      <Button
        { ...pprops }
        aria-haspopup
        ref={this.triggerRef}
        onClick={ this.onTriggerClick.bind(this) }
        onKeyDown={ this.onKeyDown.bind(this) }
        onBlur={ this.onBlur.bind(this) }
      />
    );

    if (grouped) {
      const noneStyle = { display: 'none' };
      return (
        <div className='slds-button-group'>
          { isFirstInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
          { button }
          { isLastInGroup ? null : <button className='slds-button' style={ noneStyle }></button> }
        </div>
      );
    }

    return button;
  }

  render() {
    const {
      inheritWidth,
      className, listClassName, menuClassName, menuAlign = 'left', menuSize, nubbinTop, hoverPopup,
      menuHeader, type, label, children, backgroundColor, keyCodesToCloseMenu, ...props,
    } = this.props;
    let { icon } = this.props;
    const dropdownClassNames = classnames(
      className,
      'slds-dropdown-trigger',
      {
        'slds-button-space-left': !props.grouped,
        'react-slds-dropdown-opened': this.state.opened,
      }
    );
    let iconMore = null;
    if (!label && !icon) {
      icon = 'down';
    }
    if (label || type === 'icon-more') {
      iconMore = 'down';
    }
    return (
      <div className={ dropdownClassNames } style={{ backgroundColor }}>
        { this.renderButton({ type, label, icon, iconMore, ...props }) }
        <DropdownMenu
          className={menuClassName}
          listClassName={listClassName}
          align={ menuAlign }
          minWidth={inheritWidth ? this.currentWidth : 0}
          header={ menuHeader }
          size={ menuSize }
          nubbinTop={ nubbinTop }
          hoverPopup={ hoverPopup }
          ref={this.dropdownRef}
          onMenuItemClick={ this.onMenuItemClick.bind(this) }
          onMenuClose={ this.onMenuClose.bind(this) }
          onBlur={ this.onBlur.bind(this) }
          keyCodesToCloseMenu={ keyCodesToCloseMenu }
        >
          { children }
        </DropdownMenu>
      </div>
    );
  }

}

DropdownButton.propTypes = {
  className: PropTypes.string,
  listClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.string,
  icon: PropTypes.string,
  menuAlign: PropTypes.oneOf(['left', 'center', 'right']),
  menuSize: PropTypes.oneOf(['small', 'medium', 'large']),
  menuHeader: PropTypes.string,
  nubbinTop: PropTypes.bool,
  hoverPopup: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  grouped: PropTypes.bool,
  isFirstInGroup: PropTypes.bool,
  isLastInGroup: PropTypes.bool,
  children: PropTypes.node,
  inheritWidth: PropTypes.bool,
  backgroundColor: PropTypes.string,
  focusOnInput: PropTypes.func,
  keyCodesToCloseMenu: PropTypes.arrayOf(PropTypes.number),
};
