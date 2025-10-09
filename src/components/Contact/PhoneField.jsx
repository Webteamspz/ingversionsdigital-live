import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "./Contact.module.css";

const PhoneField = ({ defaultCountry = "in", onChange, classSelector }) => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.phoneLibWrap}>
      <PhoneInput
        defaultCountry={defaultCountry}
        value={value}
        onChange={(val, meta) => {
          setValue(val);
          onChange?.(val, meta);
        }}
        forceDialCode
        className={classSelector}
        placeholder="Phone Number"
        inputProps={{ name: "phone" }}
      />
    </div>
  );
};

export default PhoneField;
