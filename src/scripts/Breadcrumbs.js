import React from 'react';
import PropTypes from './propTypesImport';

const Breadcrumbs = ({ items }) => (
  <nav role='navigation'>
    <ol
      className='slds-breadcrumb slds-list--horizontal'
      aria-labelledby='bread-crumb-label'
    >
      {items.map((item, index) => (
        <li
          key={ index }
          className='slds-list__item slds-text-heading--label'
        >
          <a href={ item.href }>{ item.label }</a>
        </li>
      ))}
    </ol>
  </nav>
);

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  })).isRequired,
};

export default Breadcrumbs;
