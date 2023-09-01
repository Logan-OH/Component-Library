import Link from "next/link";
import { arrayOf, shape, string } from "prop-types";
import React from "react";
import styles from "./filteredresource.module.scss";

function FilteredResource({ title, subTitle, resources }) {
  return (
    <div className={styles.filtered__resource}>
      <h3 className={styles.title} key={title}>
        {title}
        <span>{subTitle}</span>
      </h3>
      <ul>
        {resources.map((res) => (
          <li className={styles.resource} key={res.text}>
            <Link href={res.link}>
              {res.text}
              <span>({res.resourceTypeText})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

FilteredResource.propTypes = {
  title: string,
  subTitle: string,
  resources: arrayOf(
    shape({
      text: string.isRequired,
      link: string.isRequired,
      resourceTypeText: string.isRequired,
    })
  ),
};

export default FilteredResource;
