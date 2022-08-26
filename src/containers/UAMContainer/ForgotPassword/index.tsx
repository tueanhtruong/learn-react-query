import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { History, Location } from 'history';
import { Formik, FormikProps } from 'formik';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { Input, View, Button, Text, Image, NavLink } from 'src/components/common';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { getLocationState } from 'src/utils';
// import { forgotPasswordAsync } from 'src/redux/authRedux/actions';
import { useComponentDidMount } from 'src/hooks';
import { Yup } from 'src/services';

type FormValue = {
  email: string;
};

const INITIAL = {
  email: '',
};

const ForgotPassword: React.FC<Props> = ({
  error,
  loading,
  isResetPasswordSuccess,
  resetPasswordEmail,
  location,
  // onForgotPassword,
}) => {
  const formRef = useRef<FormikProps<FormValue>>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  useComponentDidMount(() => {
    const state = getLocationState(location);
    if (state?.email) {
      formRef.current.setValues({ email: state.email as string });
    }
  });

  useEffect(() => {
    if (isResetPasswordSuccess) setIsEmailSent(true);
  }, [isResetPasswordSuccess]);

  // =========================== FORGOT PASSWORD ===========================
  const handleSubmitForgotPassword = (values: FormValue) => {
    const { email } = values;
    console.log('email: ', email);
    // onForgotPassword({ email });
  };

  const handleResendEmail = () => {
    // onForgotPassword({ email: resetPasswordEmail });
    console.log('resetPasswordEmail: ', resetPasswordEmail);
  };

  // =========================== SCHEMA ===========================
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required().email(),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} />
          <h1 className={cn('ctn-uam__title mb-24')}>{'Reset Your Password'}</h1>

          {isEmailSent ? (
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

          {!isEmailSent && (
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

                  <Button type="submit" variant="secondary" className="mb-8" isLoading={loading}>
                    Continue
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          {isEmailSent && resetPasswordEmail && (
            <View isRow align="center">
              <Text className="mr-8" size={14}>
                Didn't receive an email?
              </Text>
              <Button variant="link" onClick={handleResendEmail} isLoading={loading}>
                Send again
              </Button>
            </View>
          )}

          <Text className="my-2" size={14}>
            <NavLink to={PATHS.signIn}>Back to Sign In</NavLink>
          </Text>
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { history: History; location: Location<string> };

const mapStateToProps = (state: IRootState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isResetPasswordSuccess: state.auth.isResetPasswordSuccess,
  resetPasswordEmail: state.auth.resetPasswordEmail,
});

const mapDispatchToProps = {
  // onForgotPassword: forgotPasswordAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
