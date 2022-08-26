import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Element from '../Element';

const ButtonYesNo: React.FC<Props> = ({
  value = null,
  onChange,
  label,
  errorMessage,
  containerClassName,
  ...props
}) => {
  const [state, setState] = useState<boolean | null>(value);

  const handleClickYes = () => {
    setState(true);
    if (state !== true) onChange(true);
  };

  const handleClickNo = () => {
    setState(false);
    if (state !== false) onChange(false);
  };

  return (
    <Element errorMessage={errorMessage} label={label} className={containerClassName}>
      <div className={cn('cmp-btn-yes-no')}>
        <button
          className={cn('cmp-btn-yes-no__button', { 'is-active': state === true })}
          onClick={handleClickYes}
          type="button"
          {...props}>
          <span className="cmp-btn-yes-no__label">{'YES'}</span>
        </button>
        <button
          className={cn('cmp-btn-yes-no__button', { 'is-active': state === false })}
          onClick={handleClickNo}
          type="button"
          {...props}>
          <span className="cmp-btn-yes-no__label">{'NO'}</span>
        </button>
      </div>
    </Element>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    value: boolean | null;
    onChange: (value: boolean) => void;
    onBlur: (...args: any[]) => void;
    label?: string;
    containerClassName?: string;
    errorMessage?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonYesNo);
