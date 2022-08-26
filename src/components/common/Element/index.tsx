import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import View from '../View';
import './styles.scss';
import { isEmpty } from 'src/validations';
import { ViewProps } from 'src/components/common/View';
import { useTranslation } from 'react-i18next';

const Element: React.FC<Props> = ({
  id,
  children,
  errorMessage,
  label,
  className,
  subLabel,
  ...props
}) => {
  const { i18n } = useTranslation();
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);
  const hasSubLabel = !isEmpty(subLabel);

  return (
    <View className={cn(className, 'form-element')} {...props}>
      {hasLabel && <label htmlFor={id}>{label}</label>}

      {hasSubLabel && subLabel}
      {children}
      {hasError && <p className="form-element__error">{i18n.t<string>(errorMessage)}</p>}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ViewProps & {
    children: React.ReactNode;
    id?: string;
    label?: string | React.ReactNode;
    errorMessage?: string;
    className?: string;
    subLabel?: string | React.ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Element);
