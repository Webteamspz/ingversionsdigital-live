import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "./Contact.module.css";

const PhoneField = ({
  defaultCountry = "in",
  onChange,
  onFocus,
  invalid = false,
  id = "phone",
  ariaInvalid,
  ariaDescribedby,
}) => {
  const [value, setValue] = useState("");

  return (
    <div className={`${styles.phoneLibWrap} ${invalid ? styles.invalid : ""}`}>
      <PhoneInput
        defaultCountry={defaultCountry}
        value={value}
        onFocus={onFocus}
        onChange={(val, meta) => {
          setValue(val);
          onChange?.(val, meta);
        }}
        forceDialCode
        placeholder="Phone Number"
        inputProps={{
          name: "phone",
          id,
          "aria-invalid": ariaInvalid,
          "aria-describedby": ariaDescribedby,
        }}
      />
    </div>
  );
};

export default PhoneField;
