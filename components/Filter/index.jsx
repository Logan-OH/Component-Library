/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { arrayOf, func, shape, string } from "prop-types";
import styles from "./filter.module.scss";
import CustomCheckbox, { Heading } from "../UILib";
import FilterData from "../../data/filterdata";
import FilterSchema from "../../schemas/filterSchema";
import ResourceData, { FIELD_TYPE } from "../../data/resourcedata";

function Filter({ onClose, onFilterApply, appliedFilters }) {
  const [visibleState, setVisibleState] = useState({
    resourceType: true,
    topic: false,
    symptom: false,
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FilterSchema),
    mode: "onBlur",
  });
  // @ts-ignore
  const [errorMsg, setErrorMsg] = useState("");

  const isDataAvailable = (currentFilter) => {
    const topicData = ResourceData.filter(
      (res) => res.filedType === FIELD_TYPE.TOPIC
    )
      .filter((data) => currentFilter.topic[data.name])
      .filter(
        (data) =>
          data.resources.filter(
            (res) =>
              currentFilter.allResource ||
              currentFilter.resources[res.resourceType]
          ).length
      );
    const symptomData = ResourceData.filter(
      (res) => res.filedType === FIELD_TYPE.SYMPTOM
    )
      .filter((data) => currentFilter.symptom[data.name])
      .filter(
        (data) =>
          data.resources.filter(
            (res) =>
              currentFilter.allResource ||
              currentFilter.resources[res.resourceType]
          ).length
      );

    if (topicData.length || symptomData.length) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (errors[""] && errors.resources) {
      setErrorMsg("Please make a selection.");
    } else if (errors[""]) {
      setErrorMsg(errors[""].message);
    } else if (errors.resources) {
      // @ts-ignore
      setErrorMsg(errors.resources.root?.message);
    }
  }, [errors]);

  const enableAllCheckBox = useCallback(() => {
    const resources = resourceTypeSubFields?.map((subFields) => ({
      name: subFields.name,
      enabled: true,
    }));
    const topics = topicSubFields?.map((subFields) => ({
      name: subFields.name,
      enabled: true,
    }));
    const symptoms = symptomSubFields?.map((subFields) => ({
      name: subFields.name,
      enabled: true,
    }));
    resources?.map((resource) => {
      setValue(
        // @ts-ignore
        `resources.${resource.name.replace(/,/g, "")}`,
        resource.enabled
      );
    });
    topics?.map((topic) => {
      // @ts-ignore
      setValue(`topic.${topic.name.replace(/,/g, "")}`, topic.enabled);
    });
    symptoms?.map((symptom) => {
      // @ts-ignore
      setValue(`symptom.${symptom.name.replace(/,/g, "")}`, symptom.enabled);
    });
    // @ts-ignore
    setValue(`allResource`, true);
  }, [resourceTypeSubFields, setValue, symptomSubFields, topicSubFields]);

  const disableAllCheckBox = useCallback(() => {
    const resources = resourceTypeSubFields?.map((subFields) => ({
      name: subFields.name,
      enabled: false,
    }));
    const topics = topicSubFields?.map((subFields) => ({
      name: subFields.name,
      enabled: false,
    }));
    const symptoms = symptomSubFields?.map((subFields) => ({
      name: subFields.name,
      enabled: false,
    }));
    resources?.map((resource) => {
      // @ts-ignore
      setValue(`resources.${resource.name.replace(/,/g, "")}`, false);
    });
    topics?.map((topic) => {
      // @ts-ignore
      setValue(`topic.${topic.name.replace(/,/g, "")}`, false);
    });
    symptoms?.map((symptom) => {
      // @ts-ignore
      setValue(`symptom.${symptom.name.replace(/,/g, "")}`, false);
    });
    // @ts-ignore
    setValue(`allResource`, false);
  }, [resourceTypeSubFields, setValue, symptomSubFields, topicSubFields]);

  const allCheckBoxEnabled = useCallback((rootObject) => {
    const propertyNames = ["topic", "symptom", "resources"];
    let checkBoxEnabledStatus = true;
    propertyNames.map((propertyName) => {
      Object.entries(rootObject[propertyName]).forEach(([, value]) => {
        if (!value) {
          checkBoxEnabledStatus = false;
        }
      });
    });
    return checkBoxEnabledStatus;
  }, []);

  const handleFormSubmmit = (data) => {
    const dataAvalibale = isDataAvailable(data);
    console.log(193, dataAvalibale);
    if (dataAvalibale) {
      onFilterApply(data);
      onClose();
    } else {
      setErrorMsg(
        "We're sorry"
      );
    }
  };

  useEffect(() => {
    const getValueByNestedKey = (obj, key) =>
      key
        .split(".")
        .reduce((nestedObj, nestedKey) => nestedObj[nestedKey], obj);
    const subscription = watch((value, { name }) => {
      setErrorMsg("");
      if (
        (name?.includes("resources.") ||
          name?.includes("topic.") ||
          name?.includes("symptom.")) &&
        !getValueByNestedKey(value, name)
      ) {
        // @ts-ignore
        setValue(`allResource`, false);
      } else if (
        name?.includes("allResource") &&
        !!value[name] &&
        !allCheckBoxEnabled(value)
      ) {
        enableAllCheckBox();
      } else if (
        name?.includes("allResource") &&
        !value[name] &&
        allCheckBoxEnabled(value)
      ) {
        disableAllCheckBox();
      }
    });
    return () => subscription.unsubscribe();
  }, [
    allCheckBoxEnabled,
    disableAllCheckBox,
    enableAllCheckBox,
    resourceTypeSubFields,
    setValue,
    watch,
  ]);

  useEffect(() => {
    if (appliedFilters) {
      if (appliedFilters.allResource) {
        enableAllCheckBox();
      } else {
        const resources = resourceTypeSubFields?.map((subFields) => ({
          name: subFields.name,
          enabled: appliedFilters.resources.includes(subFields.name),
        }));
        const topics = topicSubFields?.map((subFields) => ({
          name: subFields.name,
          enabled: appliedFilters.topic.includes(subFields.name),
        }));
        const symptoms = symptomSubFields?.map((subFields) => ({
          name: subFields.name,
          enabled: appliedFilters.symptom.includes(subFields.name),
        }));
        resources?.map((resource) => {
          setValue(
            // @ts-ignore
            `resources.${resource.name.replace(/,/g, "")}`,
            resource.enabled
          );
        });
        topics?.map((topic) => {
          // @ts-ignore
          setValue(`topic.${topic.name.replace(/,/g, "")}`, topic.enabled);
        });
        symptoms?.map((symptom) => {
          setValue(
            // @ts-ignore
            `symptom.${symptom.name.replace(/,/g, "")}`,
            symptom.enabled
          );
        });
        // @ts-ignore
        setValue(`allResource`, appliedFilters.allResource);
      }
    }
  }, [
    appliedFilters,
    enableAllCheckBox,
    resourceTypeSubFields,
    setValue,
    symptomSubFields,
    topicSubFields,
  ]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmmit)} className={styles.filter}>
      <div className={styles.top__bar}>
        <Heading type="h6" className={styles.title} color="black">
          FILTER
        </Heading>
        <button
          onClick={() => onClose()}
          type="button"
          className={styles.close__btn}
        >
          <img alt="close-icon" src="/images/close-icon.svg" />
        </button>
      </div>
      <div className={styles.filter_control}>
        <div className={styles.left__box}>
          <div className={styles.btn__group}>
            <CustomCheckbox
              register={register}
              name="allResource"
              variant="SMALL"
            >
              All resources
            </CustomCheckbox>

            <button
              onClick={() => {
                enableAllCheckBox();
              }}
              type="button"
              className={styles.clear__btn}
            >
              <img alt="clear" src="/images/clear-filters.svg" />
              <label>Clear Filters</label>
            </button>
          </div>
        </div>
        <div className={styles.right__box}>
          <button type="submit" className={styles.btn__red} color="grey_dark">
            Apply Filter
          </button>
        </div>
      </div>
      <div>
        {!!errorMsg && (
          <Heading className={styles.error} type="h6">
            {errorMsg}
          </Heading>
        )}
      </div>
      <div className={visibleState.resourceType ? styles.active : ""}>
        <div
          role="button"
          onClick={() =>
            setVisibleState({
              resourceType: true,
              topic: false,
              symptom: false,
            })
          }
          className={styles.expandable__area}
        >
          <Heading type="h6" className={styles.field__title} color="black">
            Resource Type
          </Heading>
          <img alt="expandable" src="/images/expandable-arrow.svg" />
        </div>
        <div className={`${styles.full_width__control} ${styles.controls}`}>
          {resourceTypeSubFields?.map((elm) => (
            <CustomCheckbox
              className={styles.checkbox__control}
              variant="SMALL"
              register={register}
              name={`resources.${elm.name}`}
              key={`${elm.name}`}
            >
              {elm.name}
            </CustomCheckbox>
          ))}
        </div>
      </div>
      <div className={styles.view__segment}>
        <div
          className={`${styles.left__box} ${
            visibleState.topic ? styles.active : ""
          }`}
        >
          <div
            role="button"
            onClick={() =>
              setVisibleState({
                resourceType: false,
                topic: true,
                symptom: false,
              })
            }
            className={styles.expandable__area}
          >
            <Heading type="h6" className={styles.field__title} color="black">
              View by TOPIC
            </Heading>
            <img alt="expandable" src="/images/expandable-arrow.svg" />
          </div>
          <div className={`${styles.controls} ${styles.control__col}`}>
            {topicSubFields?.map((elm) => (
              <CustomCheckbox
                className={styles.checkbox__control__no__fixed__width}
                variant="SMALL"
                key={`${elm.name}`}
                register={register}
                name={`topic.${elm.name}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                //   {...register(elm.name)}
              >
                {elm.name}
              </CustomCheckbox>
            ))}
          </div>
        </div>
        <div
          className={`${styles.right__box} ${
            visibleState.symptom ? styles.active : ""
          }`}
        >
          <div
            role="button"
            onClick={() =>
              setVisibleState({
                resourceType: false,
                topic: false,
                symptom: true,
              })
            }
            className={styles.expandable__area}
          >
            <Heading type="h6" className={styles.field__title} color="black">
              View by Symptom
            </Heading>
            <img alt="expandable" src="/images/expandable-arrow.svg" />
          </div>
          <div className={`${styles.controls} ${styles.control__col}`}>
            {symptomSubFields?.map((elm) => (
              <CustomCheckbox
                className={styles.checkbox__control__no__fixed__width}
                variant="SMALL"
                register={register}
                name={`symptom.${elm.name.replace(/,/g, "")}`}
                key={`${elm.name}`}
              >
                {elm.name}
              </CustomCheckbox>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

Filter.propTypes = {
  onClose: func,
  onFilterApply: func,
  appliedFilters: shape({
    resources: arrayOf(string),
    topic: arrayOf(string),
    symptom: arrayOf(string),
  }),
};

export default Filter;
