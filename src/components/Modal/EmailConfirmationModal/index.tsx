/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import appConfig from 'src/appConfig';
import { Button, Link, Text, View } from 'src/components/common';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { IRootState } from 'src/redux/rootReducer';
// import { confirmSignUpAsync, resendSignUpAsync } from 'src/redux/authRedux/actions';
// import { closeModal } from 'src/redux/modalRedux/actions';
import { RiErrorWarningFill } from 'react-icons/ri';
import { hideModal } from 'src/redux/modal/modalSlice';

export type EmailConfirmationModalData = {
  value?: string;
  onResend?: (...args: any) => void;
  onSubmit?: (...args: any) => void;
  onSuccess?: (...args: any) => void;
};

const EmailConfirmationModal: React.FC<Props> = ({
  // error,
  // isSubmittingCode,
  // isResendingCode,
  onCloseModal,
  // modalData,
  // onResend,
  // onSubmit,
}) => {
  // const { value: username } = modalData;

  const [code, setCode] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

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
    console.log('handleSubmitCode: ');
    // onSubmit({
    //   username,
    //   code,
    // });
  };

  const handleSendAgain = () => {
    console.log('handleSendAgain: ');
    // onResend({ username });
  };

  // const handleError = (error: AuthError) => {
  //   setErrorMessage(error.message);
  // };

  // const buttonLabel = isSubmittingCode ? 'Verifying' : 'Send Again';

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  return (
    <View className={cn('ctn-modal__content custom-padding-mobile')}>
      <RiErrorWarningFill
        style={{ position: 'absolute', top: 3, left: -30, fontSize: 24, color: '#F4762F' }}
      />
      <View>
        <h4 className="ctn-modal__content__title mb-4">{'Email Verification Code'}</h4>
        <Text>Please enter the verification code sent to username</Text>

        <View className={cn('my-24')}>
          <ComfirmationCodeField onChange={handleValueChange} errorMessage={''} />
        </View>

        <Text size={14} className={cn('mb-16')}>
          {"Didn't receive the code?"}{' '}
          <span>
            <Link onClick={handleSendAgain} className="text-is-14">
              Resend
            </Link>
          </span>
        </Text>
      </View>

      <View isRow justify="flex-end" className="ctn-modal__content__footer">
        <Button onClick={onCloseModal} variant="secondary-outline" className="mr-3">
          {'Cancel'}
        </Button>
        <Button
          onClick={handleSubmitCode}
          className="mr-4"
          // isLoading={isSubmittingCode}
          disabled={isDisabled}
        >
          {'Verify'}
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({
  modalData: state.modal.data,
  // error: state.auth.verifyError,
  // isSubmittingCode: state.auth.isSubmittingCode,
  // isResendingCode: state.auth.isResendingCode,
});

const mapDispatchToProps = {
  onCloseModal: hideModal,
  // onResend: resendSignUpAsync.request,
  // onSubmit: confirmSignUpAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationModal);
