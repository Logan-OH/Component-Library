import React, { useState } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import styles from "./filterbar.module.scss";
import Filter from "../Filter";

function FilterBar({ onFilterApply, appliedFilters, onClearFilter }) {
  const [showFIlter, setShowFilter] = useState(false);
  return (
    <div className={styles.filter__bar}>
      <hr />
      {!!showFIlter && (
        <div className={styles.filter__holder}>
          <Filter
            onClose={() => {
              setShowFilter(false);
            }}
            onFilterApply={(data) => onFilterApply(data)}
            appliedFilters={appliedFilters}
          />
        </div>
      )}
      <div className={styles.controls}>
        <button
          onClick={() => setShowFilter((prv) => !prv)}
          className={styles.filter__btn}
          type="button"
        >
          <img alt="filter-icon" src="/images/filter-icon.svg" /> FILTER
        </button>
        <button
          onClick={() => !showFIlter && onClearFilter()}
          className={styles.clear__btn}
          type="button"
        >
          <img alt="filter-icon" src="/images/close.svg" /> Clear Filters
        </button>
      </div>
      <hr />
    </div>
  );
}
FilterBar.propTypes = {
  onFilterApply: func,
  appliedFilters: shape({
    resources: arrayOf(string),
    topic: arrayOf(string),
    symptom: arrayOf(string),
  }),
  onClearFilter: func,
};

export default FilterBar;
