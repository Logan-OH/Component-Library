import React, { useState } from "react";
import FilterBar from "../FilterBar";
import styles from "./filtersection.module.scss";
import FilterData from "../../data/filterdata";
import ResourceData, { FIELD_TYPE } from "../../data/resourcedata";
import FilteredResource from "../FilteredResource";

function FilterSection() {
  const [appliedFilters, SetAppliedFilters] = useState({
    resources: [],
    topic: [],
    symptom: [],
    allResource: true,
  });
  const resourceTypeSubFields = FilterData.find(
    (data) => data.fieldName === "Resource Type"
  )?.subFields;
  const topicSubFields = FilterData.find(
    (data) => data.fieldName === "View by TOPIC"
  )?.subFields;
  const symptomSubFields = FilterData.find(
    (data) => data.fieldName === "View by Symptom"
  )?.subFields;
  const onFilterApply = (data) => {
    const resources =
      resourceTypeSubFields
        ?.filter(
          (subFields) => data.resources[subFields.name.replace(/,/g, "")]
        )
        .map((a) => a.name) ?? [];
    const topic =
      topicSubFields
        ?.filter((subFields) => data.topic[subFields.name.replace(/,/g, "")])
        .map((a) => a.name) ?? [];
    const symptom =
      symptomSubFields
        ?.filter((subFields) => data.symptom[subFields.name.replace(/,/g, "")])
        .map((a) => a.name) ?? [];
    SetAppliedFilters({
      // @ts-ignore
      resources,
      // @ts-ignore
      topic,
      // @ts-ignore
      symptom,
      allResource: data.allResource,
    });
  };
  return (
    <section
      className={`container section-container ${styles.filter__section}`}
    >
      {/* <Filter /> */}
      <FilterBar
        appliedFilters={appliedFilters}
        onFilterApply={onFilterApply}
        onClearFilter={() => {
          SetAppliedFilters({
            resources: [],
            topic: [],
            symptom: [],
            allResource: true,
          });
        }}
      />
      <div className={styles.applied__filters}>
        {appliedFilters.resources.map((data) => (
          <button
            onClick={(e) => {
              // @ts-ignore
              if (e.target.tagName === "IMG") {
                // @ts-ignore
                SetAppliedFilters((prv) => {
                  const resources = prv.resources.filter(
                    (resource) => resource !== data
                  );
                  if (!resources.length) {
                    return { ...prv, resources, allResource: true };
                  }
                  return { ...prv, resources, allResource: false };
                });
              }
            }}
            key={data}
            className={styles.filter_control}
            type="button"
          >
            {data}
            <img data-close alt="close-icon" src="/images/close-icon.svg" />
          </button>
        ))}
        {appliedFilters.topic.map((data) => (
          <button
            onClick={(e) => {
              // @ts-ignore
              if (e.target.tagName === "IMG") {
                // @ts-ignore
                SetAppliedFilters((prv) => {
                  const topic = prv.topic.filter((cTopic) => cTopic !== data);
                  return { ...prv, topic, allResource: false };
                });
              }
            }}
            key={data}
            className={styles.filter_control}
            type="button"
          >
            {data}
            <img alt="close-icon" src="/images/close-icon.svg" />
          </button>
        ))}
        {appliedFilters.symptom.map((data) => (
          <button
            onClick={(e) => {
              // @ts-ignore
              if (e.target.tagName === "IMG") {
                // @ts-ignore
                SetAppliedFilters((prv) => {
                  const symptom = prv.symptom.filter(
                    (cSymptom) => cSymptom !== data
                  );
                  return { ...prv, symptom, allResource: false };
                });
              }
            }}
            key={data}
            className={styles.filter_control}
            type="button"
          >
            {data}
            <img alt="close-icon" src="/images/close-icon.svg" />
          </button>
        ))}
      </div>
      <hr className="separator" />
      <div>
        {ResourceData.filter((res) => res.filedType === FIELD_TYPE.TOPIC)
          .filter((res) =>
            appliedFilters.topic.find(
              (tp) =>
                tp
                  // @ts-ignore
                  .replace(/,/g, "") === res.name
            )
          )
          .map((res) => {
            const filterResource = res.resources.filter(
              (data) =>
                appliedFilters.allResource ||
                appliedFilters.resources.find(
                  (rs) =>
                    rs
                      // @ts-ignore
                      .replace(/,/g, "") === data.resourceType
                )
            );
            return { ...res, resources: filterResource };
          })
          .filter((resourceData) => resourceData.resources.length)
          .map((res) => (
            <FilteredResource
              key={res.name}
              resources={res.resources}
              title={res.title}
              subTitle={res.subTitle}
            />
          ))}
        {ResourceData.filter((res) => res.filedType === FIELD_TYPE.SYMPTOM)
          .filter((res) =>
            appliedFilters.symptom.find(
              (tp) =>
                tp
                  // @ts-ignore
                  .replace(/,/g, "") === res.name
            )
          )
          .map((res) => {
            const filterResource = res.resources.filter(
              (data) =>
                appliedFilters.allResource ||
                appliedFilters.symptom.find(
                  (rs) =>
                    rs
                      // @ts-ignore
                      .replace(/,/g, "") === data.resourceType
                )
            );
            return { ...res, resources: filterResource };
          })
          .filter((resourceData) => resourceData.resources.length)
          .map((res) => (
            <FilteredResource
              key={res.name}
              resources={res.resources}
              title={res.title}
              subTitle={res.subTitle}
            />
          ))}
      </div>
    </section>
  );
}

export default FilterSection;
