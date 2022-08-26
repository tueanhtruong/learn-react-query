import React, { useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';

const DateSelector: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  placeholder = 'MM/DD/YYYY',
  dateFormat = 'MM/dd/yyyy',
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);

  // For more information:
  // https://reactdatepicker.com/

  const hasError = !isEmpty(errorMessage);
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-datepicker', containerClassName)}>
      <DatePicker
        id={id.current}
        onChange={onChange}
        placeholderText={placeholder}
        className={cn('cmp-datepicker__input', { 'cmp-datepicker__input--error': hasError }, classNames)}
        showPopperArrow={false}
        dateFormat={dateFormat}
        {...props}
      />
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ReactDatePickerProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    placeholder?: string;
    label?: string | React.ReactNode;
    onChange: (...args: any) => void;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
