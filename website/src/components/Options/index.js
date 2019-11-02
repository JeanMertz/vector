import React, {useState} from 'react';

import './styles.css';

function Options({children, filters}) {
  const [onlyCommon, setOnlyCommon] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  let filteredChildren = children;

  if (onlyCommon) {
    filteredChildren = filteredChildren.filter(child => child.props.common);
  }

  if (searchTerm) {
    filteredChildren = filteredChildren.filter(child =>
      child.props.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="options">
      {filters ?
        (<div className="filters ">
          <div className="search">
            <i className="feather icon-search"></i>
            <input
              type="search"
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              placeholder="Search options..." />
          </div>
          <div className="text--right checkboxes">
            <label title="Common options are popular options that we recommend for getting started">
              common options only
              <input
                type="checkbox"
                onChange={(event) => setOnlyCommon(event.currentTarget.checked)}
                checked={onlyCommon} />
            </label>
          </div>
        </div>) :
        null}
      <div className="options-list">
        {!Array.isArray(filteredChildren) || filteredChildren.length > 0 ?
          filteredChildren :
          <div className="empty">
            <div className="icon">☹</div>
            <div>No options found</div>
          </div>}
      </div>
    </div>
  );
}

export default Options;