/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
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
import { useLogin, useProfile } from 'src/queries';
// import Footer from 'src/components/Footer';
// import { signInAsync } from 'src/redux/authRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Navigator, Yup } from 'src/services';
import './styles.scss';

type FormValue = {
  email: string;
  password: string;
};

const INTIAL: FormValue = { email: '', password: '' };

const Signin: React.FC<Props> = ({ error }) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const { login, isSigning } = useLogin();
  const { loading } = useProfile();

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const handleLogin = (values: FormValue) => {
    const { email, password } = values;
    // console.log('email, password: ', email, password);
    // onSignIn({ username: email.trim(), password: password.trim() });
    login({ username: email.trim(), password: password.trim() });
  };

  const handleError = (error: AuthError) => {
    switch (error.code) {
      case 'NotAuthorizedException':
        return formRef.current.setErrors({
          email: ' ',
          password: ErrorService.MESSAGES.incorrectAccount,
        });

      case 'UserNotFoundException':
        return formRef.current.setErrors({ email: ErrorService.MESSAGES.accountNotExist });

      // this case is handled in auth saga, skip here to not show toast message
      case 'UserNotConfirmedException':
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
          <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} />
          <h1 className={cn('ctn-uam__title mb-24')}>{'Sign In'}</h1>
          <Formik
            initialValues={INTIAL}
            onSubmit={handleLogin}
            validationSchema={SigninSchema}
            innerRef={formRef}
          >
            {({ values, errors, touched, getFieldProps, handleSubmit }) => (
              <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                  errorMessage={touched.email ? errors.email : ''}
                  containerClassName="mb-16"
                  {...getFieldProps('email')}
                />
                <InputPassword
                  label="Password"
                  placeholder="Password"
                  errorMessage={touched.password ? errors.password : ''}
                  containerClassName="mb-16"
                  {...getFieldProps('password')}
                />

                <Button
                  type="button"
                  variant="link"
                  className="ctn-uam__link mb-24"
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
                  No account yet? <NavLink to={PATHS.signUp}>Create an Account</NavLink>
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
  error: state.auth.error,
});

const mapDispatchToProps = {
  // onSignIn: signInAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
