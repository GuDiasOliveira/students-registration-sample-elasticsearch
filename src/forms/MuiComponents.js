import React from 'react'
import TextField from 'material-ui/TextField'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import NumberField from 'material-ui-number-input'


let MuiTextField = ({
  input,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />
);
export { MuiTextField as TextField };


let MuiCheckbox = ({ input, ...rest }) => (
  <Checkbox
    {...input}
    {...rest}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);
export { MuiCheckbox as Checkbox };


let MuiRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);
export { MuiRadioGroup as RadioGroup };


let MuiSelectField = ({
  input,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)
export { MuiSelectField as SelectField };


let MuiNumberField = ({
  input,
  meta: { touched, error },
  ...custom
}) => (
  <NumberField
    errorText={touched && error}
    {...input}
    {...custom}
  />
);
export { MuiNumberField as NumberField };