import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { History, Location } from 'history';
import { Formik, FormikProps } from 'formik';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { Input, View, Button, Text, Image, NavLink, LoadingCommon } from 'src/components/common';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { getLocationState } from 'src/utils';
// import { forgotPasswordAsync } from 'src/redux/authRedux/actions';
import { useComponentDidMount } from 'src/hooks';
import { ErrorService, Navigator, Yup } from 'src/services';
import { ForgotPasswordPayload, useForgotPassword, useResendSignUp } from 'src/queries';
import EmailConfirmationModal from '../EmailConfirmationModal';
import { hideModal, showModal } from 'src/redux/modal/modalSlice';
import { MODAL_TYPES } from 'src/appConfig/modal';
import Logo from 'src/components/Logo';

type FormValue = {
  email: string;
};

const INITIAL = {
  email: '',
};

const ForgotPassword: React.FC<Props> = ({ location, onHideModal, onShowModal }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const [emailSent, setEmailSent] = useState('');
  const { resendSignUp } = useResendSignUp();

  useComponentDidMount(() => {
    const state = getLocationState(location);
    if (state?.email) {
      formRef.current.setValues({ email: state.email as string });
    }
  });

  const handleError = (error: AuthError, variables: ForgotPasswordPayload) => {
    switch (error.code) {
      case 'InvalidParameterException':
        resendSignUp({ username: variables.email });
        return onShowModal({
          type: MODAL_TYPES.contentModal,
          data: {
            content: (
              <EmailConfirmationModal
                username={variables.email}
                onConfirmSuccess={() => {
                  onHideModal();
                  Navigator.navigate(PATHS.signIn, { email: variables.email });
                }}
              />
            ),
          },
        });
      default:
        return ErrorService.handler(error);
    }
  };

  const { forgotPassword, isLoading } = useForgotPassword({
    onSuccess(data, variables, context) {
      setEmailSent(variables.email);
      // Navigator.navigate(PATHS.resetPassword, { email: variables.email });
    },
    onError(error, variables, context) {
      handleError(error, variables);
    },
  });

  // =========================== FORGOT PASSWORD ===========================
  const handleSubmitForgotPassword = (values: FormValue) => {
    const { email } = values;
    forgotPassword({ email });
  };

  // =========================== SCHEMA ===========================
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required().email(),
  });

  const handleResendEmail = () => {
    forgotPassword({ email: emailSent });
  };

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          {/* <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} /> */}
          <Logo className="mb-36" />
          <h1 className={cn('ctn-uam__title mb-24 fw-bold')}>{'Reset Your Password'}</h1>

          {emailSent ? (
            <Text className={cn('mb-24')}>
              {'Check your email for a link to reset your password.'}
            </Text>
          ) : (
            <Text className={cn('mb-24')}>
              {
                'Please enter the email associated with your account and we’ll send you instructions to reset your password.'
              }
            </Text>
          )}

          {!emailSent && (
            <Formik
              initialValues={INITIAL}
              onSubmit={handleSubmitForgotPassword}
              validationSchema={ForgotPasswordSchema}
              innerRef={formRef}
            >
              {({ errors, touched, getFieldProps, handleSubmit }) => (
                <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                  <Input
                    label="Email Address"
                    placeholder="Email Address"
                    errorMessage={touched.email ? errors.email : ''}
                    containerClassName="mb-40"
                    {...getFieldProps('email')}
                  />

                  <Button type="submit" variant="secondary" className="mb-8" isLoading={isLoading}>
                    Continue
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          {emailSent && (
            <View isRow align="center">
              <Text className="mr-8" size={14}>
                Didn't receive an email?
              </Text>
              {isLoading ? (
                <LoadingCommon />
              ) : (
                <Button className="fw-medium" variant="link" onClick={handleResendEmail}>
                  Send again
                </Button>
              )}
            </View>
          )}

          <Text className="my-2 text-center" size={14}>
            <NavLink className={'fw-medium'} to={PATHS.signIn}>
              Back to Sign In
            </NavLink>
          </Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { history: History; location: Location<string> };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowModal: showModal,
  onHideModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
