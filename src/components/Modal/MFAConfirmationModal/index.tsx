/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { BsExclamationCircleFill as ExclamationIcon } from 'react-icons/bs';
import appConfig from 'src/appConfig';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { Text, View, Button, Link } from 'src/components/common';
// import { confirmSignInAsync } from 'src/redux/authRedux/actions';
// import { closeModal } from 'src/redux/modalRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { hideModal } from 'src/redux/modal/modalSlice';

export type MFAConfirmationModalData = {
  user?: any;
};

const MFAConfirmationModal: React.FC<Props> = ({
  // authError,
  // verificationError,
  modalData,
  onCloseModal,
  // onSubmit,
  // isSubmittingCode,
}) => {
  // const { user } = modalData;

  const [code, setCode] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const initialRender = useRef(true);

  const handleValueChange = (value: string) => {
    setCode(value);
  };

  const isDisabled = useMemo(() => code.length !== appConfig.VERIFICATION_CODE_LENGTH, [code]);

  // useEffect(() => {
  //   if (authError) handleError(authError);
  //   if (verificationError) handleError(verificationError);
  // }, [authError, verificationError]);

  // useEffect(() => {
  //   // skip on initial render
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   if (!isSubmittingCode) handleError();
  // }, [isSubmittingCode]);

  // const handleSubmitCode = () => {
  //   onSubmit({ code, user });
  // };

  // const handleError = (error?: AuthError | Error) => {
  //   setErrorMessage(error?.message || 'Code does not match. Please try again');
  // };

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

      <View className="mb-24">
        <Text size={14}>
          Did not receive email?{' '}
          <span>
            <Link className="text-is-14">Resend</Link>
          </span>
        </Text>
      </View>

      <View isRow justify="flex-end" className="ctn-modal__content__footer">
        <Button onClick={onCloseModal} variant="secondary-outline" className="mr-3">
          {'Cancel'}
        </Button>
        <Button
          // onClick={handleSubmitCode}
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
  // verificationError: state.auth.verifyError,
  // authError: state.auth.verifyError,
  // isSubmittingSignUp: state.auth.isSubmittingCode,
  // isResendingSignUp: state.auth.isResendingCode,
  // isSubmittingCode: state.auth.isSubmittingCode,
});

const mapDispatchToProps = {
  onCloseModal: hideModal,
  // onSubmit: confirmSignInAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(MFAConfirmationModal);
