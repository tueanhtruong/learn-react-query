/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { Formik, FormikProps } from 'formik';
import { History } from 'history';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { MODAL_TYPES } from 'src/appConfig/modal';
import { IMAGES } from 'src/appConfig/images';
import { PATHS } from 'src/appConfig/paths';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Image,
  Input,
  InputPassword,
  NavLink,
  Text,
  View,
  ValidatePassword,
  Link,
} from 'src/components/common';
// import { hideModal, showModal } from 'src/redux/modalRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Yup } from 'src/services';
import { Terms } from './helpers';
import './styles.scss';
import { hideModal, showModal } from 'src/redux/modal/modalSlice';
import { SignUpPayload } from 'src/redux/auth/types';
// import { SignUpPayload } from 'src/redux/authRedux/types';

type FormValue = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAgreedToTermsAndConditions: boolean;
};

const INTIAL = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  isAgreedToTermsAndConditions: false,
};

const SignUp: React.FC<Props> = ({
  error,
  loading,
  // isSigningIn,
  // onSignUp,
  onShowModal,
  onHideModal,
}) => {
  const formRef = useRef<FormikProps<FormValue>>(null);

  // =========================== SIGN UP ===========================

  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  const handleCreateAccount = (values: FormValue) => {
    const payload: SignUpPayload = {
      ...values,
      username: values.email,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
    };
    console.log('payload: ', payload);
    // onSignUp(payload);
  };

  const handleError = (error: AuthError) => {
    switch (error.code) {
      case 'InvalidPasswordException':
        return formRef.current.setErrors({ password: error.message });

      case 'UsernameExistsException':
        return formRef.current.setErrors({ email: error.message });

      case 'NotAuthorizedException':
        return;

      default:
        return ErrorService.handler(error);
    }
  };

  // =========================== SCHEMA ===========================
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().password().required(),
    firstName: Yup.string().letterOnly().required(),
    lastName: Yup.string().letterOnly().required(),
    isAgreedToTermsAndConditions: Yup.boolean().oneOf([true], 'Field must be checked'),
  });

  // =========================== TERMS ===========================
  const handleViewTerms = () => {
    onShowModal({
      type: MODAL_TYPES.contentModal,
      data: {
        content: (
          <View>
            <Text size={28} className="mb-4 ctn-modal__content__title">
              Terms and Conditions
            </Text>
            <Terms />
            <View isRow justify="center">
              <Button onClick={onHideModal}> I understand</Button>
            </View>
          </View>
        ),
      },
    });
  };

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLogin} />
      <View className="container" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Image className="ctn-uam__logo mb-36" src={IMAGES.datahouseLogo} />
          <h1 className={cn('ctn-uam__title mb-24')}>{'Create New Account'}</h1>
          <Formik
            initialValues={INTIAL}
            onSubmit={handleCreateAccount}
            validationSchema={SignupSchema}
            innerRef={formRef}
          >
            {({ values, errors, touched, getFieldProps, handleSubmit, setValues }) => (
              <Form onSubmit={handleSubmit} autoComplete="off" className="ctn-uam__form">
                <Grid.Wrap className="mb-1">
                  <Grid.Item>
                    <Input
                      label="First Name *"
                      placeholder="First Name"
                      errorMessage={touched.firstName ? errors.firstName : ''}
                      {...getFieldProps('firstName')}
                    />
                  </Grid.Item>

                  <Grid.Item>
                    <Input
                      label="Last Name *"
                      placeholder="Last Name"
                      errorMessage={touched.lastName ? errors.lastName : ''}
                      {...getFieldProps('lastName')}
                    />
                  </Grid.Item>

                  <Grid.Item variant="is-full">
                    <Input
                      label="Email Address *"
                      placeholder="Email Address"
                      errorMessage={touched.email ? errors.email : ''}
                      {...getFieldProps('email')}
                    />
                  </Grid.Item>

                  <Grid.Item variant="is-full">
                    <InputPassword
                      label="Password *"
                      placeholder="Password"
                      errorMessage={touched.password ? errors.password : ''}
                      containerClassName="mb-8"
                      {...getFieldProps('password')}
                    />

                    {/* {touched.password && errors.password && (
                      <PasswordRequirements password={values.password} />
                    )} */}
                    <ValidatePassword password={values.password} />
                  </Grid.Item>

                  <Grid.Item variant="is-full">
                    {/* TODO: Replace link when Terms & Conditions page ready */}
                    <Checkbox.Item
                      className="mb-16"
                      label={
                        <Text>
                          {'I agree with the '}
                          {/* <Button
                            className="cmp-button--link p-0 m-0 h-0"
                            onClick={handleViewTerms}
                          >
                            Terms and Conditions
                          </Button> */}
                          <Link onClick={handleViewTerms}>Terms and Conditions</Link>.
                        </Text>
                      }
                      checked={values.isAgreedToTermsAndConditions}
                      errorMessage={errors.isAgreedToTermsAndConditions}
                      {...getFieldProps('isAgreedToTermsAndConditions')}
                    />
                  </Grid.Item>
                </Grid.Wrap>

                <Button type="submit" variant="secondary" className="mb-8" isLoading={loading}>
                  {loading ? 'Signing In' : 'Create Account'}
                </Button>

                <Text className="text-center my-2" size={14}>
                  Already have account? <NavLink to={PATHS.signIn}>Sign In</NavLink>
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
  // isSigningIn: state.auth.isSigningIn,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  // onSignUp: signUpAsync.request,
  onShowModal: showModal,
  onHideModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
