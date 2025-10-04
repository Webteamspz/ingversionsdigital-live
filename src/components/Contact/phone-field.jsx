import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import styles from "./contact.module.css";

export default function PhoneField({ defaultCountry = "in", onChange }) {
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
        className={styles.phoneLib}
        placeholder="Phone Number"
        inputProps={{ name: "phone" }}
      />
    </div>
  );
}