import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './styles.scss';
import shortid from 'shortid';
import { View } from '..';
import Element from '../Element';

const RadioButton: React.FC<RadioProps> = ({ label, labelClassName, containerClassName, style, ...props }) => {
  const id = useRef(shortid.generate());
  return (
    <View isRow className={cn('cmp-radio', containerClassName)} style={style}>
      <input id={id.current} className={cn('cmp-radio__input')} type="radio" {...props} />
      <label htmlFor={id.current} className={cn('cmp-radio__label', labelClassName)}>
        {label}
      </label>
    </View>
  );
};

type RadioProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
};

const Group: React.FC<RadioGroupProps> = ({
  options,
  value,
  containerClassName,
  onChange = () => {},
  label,
  errorMessage,
  name,
  onBlur,
  columns = 3,
}) => {
  const [data, setData] = useState<any>(value);

  useEffect(() => {
    onChange(name, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    setData(value);
  };

  const handleRadioBlur = () => {
    onBlur && onBlur(name, true);
  };

  return (
    <Element errorMessage={errorMessage} label={label} className={containerClassName}>
      <View isRow>
        {options?.map((option, index) => (
          <RadioButton
            key={`radio-${name}-${index}`}
            name={name}
            value={option.value}
            checked={data === option.value}
            label={option.label}
            onChange={handleValueChange}
            containerClassName={cn(columns && 'cmp-radio-groups__column')}
            style={{ width: `${100 / columns}%` }}
            onBlur={handleRadioBlur}
          />
        ))}
      </View>
    </Element>
  );
};

type RadioGroupProps = {
  label?: string;
  options?: { value: any; label: string }[];
  value?: any;
  name?: string;
  onChange?: (name: string, value: any) => void;
  errorMessage?: string;
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  columns?: number;
  disabled?: boolean;
  onBlur?: (name: string, touched: boolean) => void;
};

export default Group;
