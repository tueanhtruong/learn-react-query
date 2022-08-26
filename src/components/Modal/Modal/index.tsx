/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { View } from 'src/components/common';
import { useComponentDidMount, useComponentWillUnmount } from 'src/hooks';
import './styles.scss';
import { Close } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';

const Modal: React.FC<Props> = ({
  children,
  triggerCloseModal,
  allowCloseByEsc = true,
  modalContainerClassName,
  onModalClosed = () => {},
  hideCloseButton = false,
  hasConfirmationCode = false,
}) => {
  const [close, setClose] = useState<boolean>(false);
  const allowCloseByEscRef = useRef<boolean>(true);

  useComponentDidMount(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    document.documentElement.classList.add('is-clipped');
  });

  useComponentWillUnmount(() => {
    document.removeEventListener('keydown', handleKeyPress, false);
    document.documentElement.classList.remove('is-clipped');
  });

  useEffect(() => {
    allowCloseByEscRef.current = !!allowCloseByEsc;
  }, [allowCloseByEsc]);

  // Trigger close modal from outside
  useEffect(() => {
    if (triggerCloseModal) handleCloseModal();
  }, [triggerCloseModal]);

  const handleCloseModal = () => {
    setClose(true);
    setTimeout(onModalClosed, 50);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && allowCloseByEscRef.current) handleCloseModal();
  };

  return (
    <View
      className={cn('modal is-active cmp-modal', {
        'cmp-modal--close': close,
      })}
    >
      <View className="modal-background" />
      <View className={cn('cmp-modal__container', modalContainerClassName)}>
        <View
          className={cn('modal-content cmp-modal__content', {
            'confirmation-code-modal': hasConfirmationCode,
          })}
        >
          {children}
        </View>

        <View className="cmp-modal__close" renderIf={!hideCloseButton}>
          <Tooltip title={'Close'}>
            <IconButton onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Tooltip>
        </View>
        {/* <button className={cn('modal-close cmp-modal__close')} aria-label="Close" onClick={handleCloseModal} /> */}
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    children: React.ReactNode;
    triggerCloseModal?: boolean;
    allowCloseByEsc?: boolean;
    onModalClosed?: () => void;
    modalContainerClassName?: string;
    hideCloseButton?: boolean;
    hasConfirmationCode?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
