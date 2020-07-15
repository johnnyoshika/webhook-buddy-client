import React from 'react';
import { FilterEnum } from '../';

import './style.css';

const Filter = ({
  filter,
  setFilter,
}: {
  filter: FilterEnum;
  setFilter: React.Dispatch<React.SetStateAction<FilterEnum>>;
}) => {
  return (
    <div className="sidebar__filter">
      <select
        className="custom-select custom-select-sm"
        onChange={e => setFilter(e.target.value as FilterEnum)}
        value={filter}
      >
        {Object.keys(FilterEnum).map(key => (
          <option key={key} value={key}>
            {FilterEnum[key as keyof typeof FilterEnum]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
