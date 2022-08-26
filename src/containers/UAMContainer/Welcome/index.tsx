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
  Input,
  InputPassword,
  NavLink,
  ValidatePassword,
} from 'src/components/common';
import Form from 'src/components/common/Form';

import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import { ErrorService, Navigator, Yup } from 'src/services';
// import { completeNewPasswordAsync, signInAsync } from 'src/redux/authRedux/actions';
import { setCompleteNewPassword } from 'src/redux/auth/authSlice';

type FormValue = {
  email: string;
  password: string;
};

const INITIAL = { email: '', password: '' };

const Welcome: React.FC<Props> = ({
  cognitoUser,
  error,
  location,
  isCompleteNewPasswordSuccess,
  loading,
  // onSignIn,
  onCompleteNewPassword,
}) => {
  const query = new URLSearchParams(location.search);
  const formRef = useRef<FormikProps<FormValue>>(null);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  useEffect(() => {
    // Check for query params "username" and "token". Should be included in link sent to email from forgot password submission.
    if (!query.has('username') || !query.has('token')) {
      Navigator.navigate(PATHS.signIn);
    } else {
      const username = query.get('username').replace(/ /g, '+');
      const password = query.get('token');
      formRef.current.setFieldValue('email', username);
      // onSignIn({ username, password, isFirstTimeLogin: true });
      console.log('sign in payload', { username, password, isFirstTimeLogin: true });
    }
  }, []);

  useEffect(() => {
    if (cognitoUser) console.log('cognitoUser', cognitoUser);
  }, [cognitoUser]);

  useEffect(() => {
    if (error) ErrorService.handler(error);
  }, [error]);

  useEffect(() => {
    if (isCompleteNewPasswordSuccess) setIsPasswordUpdated(true);
  }, [isCompleteNewPasswordSuccess]);

  // =========================== COMPLETE NEW PASSWORD ===========================
  const handleCompleteNewPassword = (values: FormValue, helpers: FormikHelpers<FormValue>) => {
    const { password } = values;
    const body = {
      user: cognitoUser,
      password,
    };
    console.log('onCompleteNewPassword body: ', body);
    // onCompleteNewPassword(body);
  };

  const handleBackToLogin = () => {
    Navigator.navigate(PATHS.signIn);
  };

  // =========================== SCHEMA ===========================
  const ResetSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .min(8, 'Must have at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message:
          'Must include at least one lowercase character, one uppercase character, one number, and a special character !, @, #, $, %, ^, &, and/or *',
      }),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} />
          <h1 className={cn('ctn-uam__title mb-24')}>Welcome!</h1>
          {isPasswordUpdated ? (
            <>
              <Text className={cn('mb-36')}>
                Your password was created successfully. You can now log in to your account.'
              </Text>
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
              initialValues={INITIAL}
              onSubmit={handleCompleteNewPassword}
              validationSchema={ResetSchema}
              innerRef={formRef}
            >
              {({ errors, touched, getFieldProps, handleSubmit, values, setValues }) => (
                <>
                  <Text className={cn('mb-36')}>Please set your password to proceed further.</Text>
                  <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                    <Input
                      label="Email Address"
                      placeholder="Email Address"
                      errorMessage={touched.email ? errors.email : ''}
                      containerClassName="mb-16"
                      disabled
                      {...getFieldProps('email')}
                    />
                    <InputPassword
                      label="Password *"
                      placeholder="Password"
                      errorMessage={touched.password ? errors.password : ''}
                      containerClassName="mb-16"
                      {...getFieldProps('password')}
                    />

                    <ValidatePassword className="mb-16" password={values.password} />

                    <Button type="submit" variant="secondary" className="mb-8" isLoading={loading}>
                      Confirm
                    </Button>
                  </Form>
                </>
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
  cognitoUser: state.auth.cognitoUser,
  error: state.auth.error,
  loading: state.auth.loading,
  isCompleteNewPasswordSuccess: state.auth.isCompleteNewPasswordSuccess,
});

const mapDispatchToProps = {
  // onSignIn: signInAsync.request,
  onCompleteNewPassword: setCompleteNewPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
