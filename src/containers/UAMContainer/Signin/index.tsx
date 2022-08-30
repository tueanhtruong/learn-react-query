/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { MODAL_TYPES } from 'src/appConfig/modal';
import { PATHS } from 'src/appConfig/paths';
import {
  Button,
  Form,
  Image,
  Input,
  InputPassword,
  NavLink,
  Text,
  View,
} from 'src/components/common';
import Logo from 'src/components/Logo';
import { SignInPayload, useLogin, useProfile, useResendSignUp } from 'src/queries';
import { hideModal, showModal } from 'src/redux/modal/modalSlice';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Navigator, Yup } from 'src/services';
import EmailConfirmationModal from '../EmailConfirmationModal';
import MFAConfirmationModal from '../MFAConfirmationModal';
import './styles.scss';

type FormValue = {
  email: string;
  password: string;
};

const INTIAL: FormValue = { email: '', password: '' };

const Signin: React.FC<Props> = ({ onShowModal, onHideModal }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const { login, isSigning } = useLogin({
    onSuccess(data, variables, context) {
      if (data.challengeName === 'CUSTOM_CHALLENGE')
        onShowModal({
          type: MODAL_TYPES.contentModal,
          data: {
            content: <MFAConfirmationModal user={data} signInPayload={variables} />,
          },
        });
    },
    onError(error, variables, context) {
      handleError(error, variables);
    },
  });
  const { loading } = useProfile();

  const { resendSignUp } = useResendSignUp();

  const handleLogin = (values: FormValue) => {
    const { email, password } = values;

    login({ username: email.trim(), password: password.trim() });
  };

  const handleConfirmSuccess = (payload: SignInPayload) => {
    onHideModal();
    login(payload);
  };

  const handleError = (error: AuthError, variables: SignInPayload) => {
    switch (error.code) {
      case 'NotAuthorizedException':
        return formRef.current.setErrors({
          email: ' ',
          password: ErrorService.MESSAGES.incorrectAccount,
        });

      case 'UserNotFoundException':
        return formRef.current.setErrors({ email: ErrorService.MESSAGES.accountNotExist });

      case 'UserNotConfirmedException':
        resendSignUp({ username: variables.username });
        return onShowModal({
          type: MODAL_TYPES.contentModal,
          data: {
            content: (
              <EmailConfirmationModal
                username={variables.username}
                onConfirmSuccess={() =>
                  handleConfirmSuccess({
                    username: variables.username,
                    password: variables.password,
                  })
                }
              />
            ),
          },
        });
      case 'UsernameExistsException':
        return;

      default:
        return ErrorService.handler(error);
    }
  };

  // =========================== FORGOT PASSWORD ===========================
  const handleForgotPassword = (data: FormValue) => {
    Navigator.navigate(PATHS.forgotPassword, { email: data.email });
  };

  // =========================== SCHEMA ===========================
  const SigninSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  // const description = Device.isMobile
  //   ? 'Log in to manage your services\n and access your profile.'
  //   : 'Log in to manage your services and access your profile.';

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          {/* <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} />
           */}
          <Logo className="mb-36" />
          <h1 className={cn('ctn-uam__title mb-24')}>{'Log In'}</h1>
          <Formik
            initialValues={INTIAL}
            onSubmit={handleLogin}
            validationSchema={SigninSchema}
            innerRef={formRef}
          >
            {({ values, errors, touched, getFieldProps, handleSubmit }) => (
              <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                <Input
                  label="Email Address *"
                  placeholder="Email Address"
                  errorMessage={touched.email ? errors.email : ''}
                  containerClassName="mb-16"
                  {...getFieldProps('email')}
                />
                <InputPassword
                  label="Password *"
                  placeholder="Password"
                  errorMessage={touched.password ? errors.password : ''}
                  containerClassName="mb-16"
                  {...getFieldProps('password')}
                />

                <Button
                  type="button"
                  variant="link"
                  className="ctn-uam__link mb-24 fw-medium"
                  onClick={() => handleForgotPassword(values)}
                >
                  Forgot Password?
                </Button>

                <Button
                  type="submit"
                  variant="secondary"
                  className="mb-8"
                  isLoading={isSigning || loading}
                >
                  Log In
                </Button>

                <Text className="text-center my-2" size={14}>
                  Don’t have account?{' '}
                  <NavLink className={'fw-medium'} to={PATHS.signUp}>
                    Create
                  </NavLink>
                </Text>
              </Form>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  // isSigningIn: state.auth.is,
  // error: state.auth.error,
});

const mapDispatchToProps = {
  // onSignIn: signInAsync.request,
  onShowModal: showModal,
  onHideModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
