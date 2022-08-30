/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { BsExclamationCircleFill as ExclamationIcon } from 'react-icons/bs';
import appConfig from 'src/appConfig';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { Text, View, Button, Link, LoadingCommon } from 'src/components/common';

import { IRootState } from 'src/redux/rootReducer';
import { hideModal } from 'src/redux/modal/modalSlice';
import { SignInPayload, useConfirmSignIn, useLogin } from 'src/queries';
import { Toastify } from 'src/services';

export type MFAConfirmationModalData = {
  user?: any;
};

const MFAConfirmationModal: React.FC<Props> = ({ onCloseModal, user, signInPayload }) => {
  const [code, setCode] = useState('');
  const { confirmSignIn, isConfirmSigningIn } = useConfirmSignIn({
    onSuccess(data, variables, context) {
      onCloseModal();
    },
  });

  const { login, isSigning } = useLogin({
    onSuccess(data, variables, context) {
      Toastify.success('A new code has been sent to your email.');
    },
  });

  const handleValueChange = (value: string) => {
    setCode(value);
  };

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  const handleConfirmSignIn = () => {
    confirmSignIn({ code, user });
  };

  return (
    <View className={cn('ctn-modal__content')}>
      <ExclamationIcon
        style={{ position: 'absolute', top: 3, left: -30, fontSize: 24, color: '#F4762F' }}
      />
      <h4 className="ctn-modal__content__title mb-4">{'Multi-Factor Authentication'}</h4>
      <Text>{'Please enter the code that was sent to your email'}</Text>

      <View className={cn('my-32')}>
        <ComfirmationCodeField onChange={handleValueChange} errorMessage={''} />
      </View>

      <View className="mb-24" isRow align="center">
        <Text size={14} className="mr-8">
          Did not receive email?
        </Text>
        {isSigning ? (
          <LoadingCommon />
        ) : (
          <Link onClick={() => login(signInPayload)} className="text-is-14 fw-medium">
            Resend
          </Link>
        )}
      </View>

      <View isRow justify="flex-end" className="ctn-modal__content__footer">
        <Button onClick={onCloseModal} variant="secondary-outline" className="mr-3">
          {'Cancel'}
        </Button>
        <Button
          onClick={handleConfirmSignIn}
          className="mr-4"
          disabled={isDisabled}
          isLoading={isConfirmSigningIn}
        >
          {'Verify'}
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { user: any; signInPayload: SignInPayload };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onCloseModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(MFAConfirmationModal);
