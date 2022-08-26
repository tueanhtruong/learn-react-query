/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Location } from 'history';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import {
  View,
  Button,
  Text,
  Image,
  InputPassword,
  NavLink,
  ValidatePassword,
} from 'src/components/common';
// import PasswordRequirements from 'src/components/PasswordRequirements';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { ErrorService, Navigator, Yup } from 'src/services';
// import { submitForgotPasswordAsync } from 'src/redux/authRedux/actions';
import { getLocationState } from 'src/utils';
import ComfirmationCodeField from 'src/components/ComfirmationCodeField';
import { useComponentWillUnmount } from 'src/hooks';
import { setResetPasswordSuccess } from 'src/redux/auth/authSlice';

type FormValue = {
  email: string;
  password: string;
  code?: string;
};

const INTIAL = { password: '', email: '', code: '' };

const ResetPassword: React.FC<Props> = ({
  error,
  location,
  isResetPasswordSuccess,
  loading,
  onClearResetPasswordSuccess,
  // onResetPassword,
}) => {
  // const query = new URLSearchParams(location.search);
  const formRef = useRef<FormikProps<FormValue>>(null);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  useComponentWillUnmount(() => onClearResetPasswordSuccess(null));

  useEffect(() => {
    const state = getLocationState(location);
    if (!state?.email) {
      Navigator.navigate(PATHS.forgotPassword);
      return;
    }
    formRef.current.setValues({ email: state.email as string, password: '', code: '' });
    // Check for query params "email" and "token". Should be included in link sent to email from forgot password submission.
    // setEmail(state.email as string);
    // if (!query.has('email') || !query.has('token')) {
    //   Navigator.navigate(PATHS.forgotPassword);
    // }

    // return () => onClearResetPasswordSuccess(null);
  }, []);

  useEffect(() => {
    if (error) ErrorService.handler(error);
  }, [error]);

  useEffect(() => {
    if (isResetPasswordSuccess) setIsPasswordUpdated(true);
  }, [isResetPasswordSuccess]);

  // =========================== RESET PASSWORD ===========================
  const handleResetPassword = (values: FormValue, helpers: FormikHelpers<FormValue>) => {
    const { password, code, email } = values;
    const body = { email: email.trim(), password: password.trim(), token: code };
    console.log('onResetPassword body: ', body);
    // onResetPassword(body);
  };

  const handleBackToLogin = () => {
    Navigator.navigate(PATHS.signIn);
  };

  // =========================== SCHEMA ===========================
  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .required()
      .min(8, 'Must have at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message:
          'Must include at least one lowercase character, one uppercase character, one number, and a special character !, @, #, $, %, ^, &, and/or *',
      }),
    code: Yup.string().min(6).required(),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} />
          <h1 className={cn('ctn-uam__title mb-24')}>
            {isPasswordUpdated ? 'Password Updated' : 'Reset Your Password'}
          </h1>

          {isPasswordUpdated ? (
            <>
              <Text className={cn('mb-36')}>{'Your password has been successfully updated.'}</Text>
              <Button
                onClick={handleBackToLogin}
                variant="secondary"
                className="mb-8"
                isLoading={loading}
              >
                Log In
              </Button>
            </>
          ) : (
            <Formik
              initialValues={INTIAL}
              onSubmit={handleResetPassword}
              validationSchema={ResetSchema}
              innerRef={formRef}
            >
              {({ errors, touched, getFieldProps, handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                  <Text className="mb-32">Check your email and enter your verification code.</Text>
                  <ComfirmationCodeField
                    onChange={(value) => setFieldValue('code', value)}
                    errorMessage={touched.code ? errors.code : ''}
                    containerClassName="mb-40"
                  />
                  <InputPassword
                    label="New Password"
                    placeholder="New Password"
                    errorMessage={touched.password ? errors.password : ''}
                    containerClassName="mb-16"
                    {...getFieldProps('password')}
                  />
                  <ValidatePassword className="mb-16" password={values.password} />
                  <Button type="submit" variant="secondary" className="mb-8" isLoading={loading}>
                    Reset
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          {!isPasswordUpdated && (
            <Text className="my-2" size={14}>
              <NavLink to={PATHS.signIn}>Back to Sign In</NavLink>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location<string> };

const mapStateToProps = (state: IRootState) => ({
  error: state.auth.error,
  loading: state.auth.loading,
  isResetPasswordSuccess: state.auth.isResetPasswordSuccess,
});

const mapDispatchToProps = {
  // onResetPassword: submitForgotPasswordAsync.request,
  onClearResetPasswordSuccess: setResetPasswordSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
