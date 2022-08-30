/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import appConfig from 'src/appConfig';
import { Button, Link, LoadingCommon, Text, View } from 'src/components/common';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { IRootState } from 'src/redux/rootReducer';
import { RiErrorWarningFill } from 'react-icons/ri';
import { hideModal } from 'src/redux/modal/modalSlice';
import { useConfirmSignUp, useResendSignUp } from 'src/queries';
import { Callback } from 'src/redux/types';
import { Toastify } from 'src/services';

export type EmailConfirmationModalData = {
  value?: string;
  onResend?: (...args: any) => void;
  onSubmit?: (...args: any) => void;
  onSuccess?: (...args: any) => void;
};

const EmailConfirmationModal: React.FC<Props> = ({ onCloseModal, username, onConfirmSuccess }) => {
  // const { value: username } = modalData;
  const { resendSignUp, isResendSignUp } = useResendSignUp({
    onSuccess(data, variables, context) {
      Toastify.success('A new code has been sent to your email.');
    },
  });
  const { confirmSignUp, isConfirmSigningUp } = useConfirmSignUp({
    onSuccess(data, variables, context) {
      onConfirmSuccess();
    },
    onError(error, variables, context) {
      handleError(error);
    },
  });

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleValueChange = (value: string) => {
    setCode(value);
  };

  // useEffect(() => {
  //   if (error) handleError(error);
  // }, [error]);

  // =============================== Verify code ===============================
  // useEffect(() => {
  //   if (code.length === appConfig.VERIFICATION_CODE_LENGTH) {
  //     handleSubmitCode(code);
  //   }
  // }, [code]);

  const handleSubmitCode = () => {
    confirmSignUp({
      username,
      code,
    });
  };

  const handleSendAgain = () => {
    resendSignUp({ username });
  };

  const handleError = (error: AuthError) => {
    setErrorMessage(error.message);
  };

  // const buttonLabel = isSubmittingCode ? 'Verifying' : 'Send Again';

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  return (
    <View className={cn('ctn-modal__content custom-padding-mobile')} style={{ maxWidth: 464 }}>
      <RiErrorWarningFill
        style={{ position: 'absolute', top: 3, left: -30, fontSize: 24, color: '#F4762F' }}
      />
      <View>
        <h4 className="ctn-modal__content__title mb-4">{'Email Verification Code'}</h4>
        <Text>Please enter the verification code sent to username</Text>

        <View className={cn('my-24')}>
          <ComfirmationCodeField onChange={handleValueChange} errorMessage={errorMessage} />
        </View>

        <View isRow align="center" className="mb-16">
          <Text size={14} className={cn('')}>
            {"Didn't receive the code?"}{' '}
          </Text>
          {isResendSignUp ? (
            <LoadingCommon className="fit-width" />
          ) : (
            <Link onClick={handleSendAgain} className="text-is-14 fw-medium">
              Resend
            </Link>
          )}
        </View>
      </View>

      <View isRow justify="flex-end" className="ctn-modal__content__footer">
        <Button onClick={onCloseModal} variant="secondary-outline" className="mr-3">
          {'Cancel'}
        </Button>
        <Button
          onClick={handleSubmitCode}
          className="mr-4"
          isLoading={isConfirmSigningUp}
          disabled={isDisabled}
        >
          {'Verify'}
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    username: string;
    onConfirmSuccess?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onCloseModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationModal);
