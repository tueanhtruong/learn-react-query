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

import { useSubmitForgotPassword } from 'src/queries';
import Logo from 'src/components/Logo';

type FormValue = {
  email: string;
  password: string;
  code?: string;
};

const INTIAL = { password: '', email: '', code: '' };

const ResetPassword: React.FC<Props> = ({ location }) => {
  // const query = new URLSearchParams(location.search);
  const query = new URLSearchParams(location.search);

  const formRef = useRef<FormikProps<FormValue>>(null);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const { submitForgotPassword, isLoading } = useSubmitForgotPassword({
    onSuccess(data, variables, context) {
      setIsPasswordUpdated(true);
    },
    onError(error, variables, context) {
      ErrorService.handler(error);
    },
  });

  useEffect(() => {
    // Check for query params "email" and "token". Should be included in link sent to email from forgot password submission.
    if (!query.has('email') || !query.has('token')) {
      Navigator.navigate(PATHS.forgotPassword);
    }
  }, []);

  // =========================== RESET PASSWORD ===========================
  const handleResetPassword = (values: FormValue, helpers: FormikHelpers<FormValue>) => {
    const { password } = values;
    const body = {
      email: query.get('email'),
      password: password.trim(),
      token: query.get('token'),
    };
    submitForgotPassword(body);
  };

  const handleBackToLogin = () => {
    Navigator.navigate(PATHS.signIn);
  };

  // =========================== SCHEMA ===========================
  const ResetSchema = Yup.object().shape({
    password: Yup.string().required().password(),
    // code: Yup.string().min(6).required(),
  });

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Logo className="mb-36" />
          {/* <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} /> */}
          <h1 className={cn('ctn-uam__title mb-24 fw-bold')}>
            {isPasswordUpdated ? 'Password Updated' : 'Reset Your Password'}
          </h1>

          {isPasswordUpdated ? (
            <>
              <Text className={cn('mb-36')}>{'Your password has been successfully updated.'}</Text>
              <Button onClick={handleBackToLogin} variant="secondary" className="mb-8">
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
                  <InputPassword
                    label="New Password"
                    placeholder="New Password"
                    errorMessage={touched.password ? errors.password : ''}
                    containerClassName="mb-16"
                    {...getFieldProps('password')}
                  />
                  <ValidatePassword className="mb-16" password={values.password} />
                  <Button type="submit" variant="secondary" className="mb-8" isLoading={isLoading}>
                    Reset
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          {!isPasswordUpdated && (
            <Text className="my-2 fw-medium text-center" size={14}>
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

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
