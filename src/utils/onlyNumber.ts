import { ChangeEvent } from "react";

export const onlyNumberChange = (e: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
  const { value } = e.target;
  const reg = /^[0-9]+$/;

  if (reg.test(value) || value === "" || value === "-") {
    onChange(value);
  }
  return;
};
