import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps, Switch, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { PATHS } from 'src/appConfig/paths';
import { Screen } from 'src/components/common';
import Navbar from 'src/components/Navbar';
import { Navigator } from 'src/services';
import { IRootState } from 'src/redux/rootReducer';
import Dev from './Dev';

import Signin from './UAMContainer/Signin';
import ModalContainer from './StartupContainers/ModalContainer';
import NotFound from './StartupContainers/NotFound';
import SplashScreen from './StartupContainers/SplashScreen';
import LoadingContainer from './StartupContainers/LoadingContainer';
import ToastContainer from './StartupContainers/ToastContainer';
import AuthContainer from './StartupContainers/AuthContainer';
import ResponsiveContainer from './StartupContainers/ResponsiveContainer';
import Signup from './UAMContainer/Signup';
import ForgotPassword from './UAMContainer/ForgotPassword';
import ResetPassword from './UAMContainer/ResetPassword';
import Welcome from './UAMContainer/Welcome';
import ProfileContainers from './ProfileContainers';
import ContentContainer from './StartupContainers/ContentContainer';
import Sidebar from 'src/components/Sidebar';
import UploadProgressContainer from './StartupContainers/UploadProgressContainer';
import TravelerContainers from './TravelerContainers';
import TravelerDetail from './TravelerContainers/TravelerDetail';
import TripDetail from './TripContainers/TripDetail';
import TripContainers from './TripContainers';
// import Dialog from 'src/components/Dialog';

const Routing: React.FC<{ location: Location }> = (props) => {
  Navigator.setTopHistory(useHistory());

  return (
    <Screen>
      <Navbar />
      <Switch location={props.location}>
        <Route path={PATHS.root} render={() => <Redirect to={PATHS.signIn} />} exact />
        <CustomRoute path={PATHS.welcome} component={Welcome} />
        <CustomRoute path={PATHS.signIn} component={Signin} />
        {/* <CustomRoute path={PATHS.signIn} component={TestSignIn} /> */}
        <CustomRoute path={PATHS.signUp} component={Signup} />
        <CustomRoute path={PATHS.forgotPassword} component={ForgotPassword} />
        <CustomRoute path={PATHS.resetPassword} component={ResetPassword} />
        <CustomRoute pageRequiredAuth path={PATHS.myProfile} component={ProfileContainers} />
        <CustomRoute
          pageRequiredAuth
          path={PATHS.travelerDetail}
          component={TravelerDetail}
          exact
        />
        <CustomRoute pageRequiredAuth path={PATHS.travelers} component={TravelerContainers} />
        <CustomRoute pageRequiredAuth path={PATHS.tripDetail} component={TripDetail} exact />
        <CustomRoute pageRequiredAuth path={PATHS.trips} component={TripContainers} />
        <Route path={PATHS.dev} component={Dev} />
        <CustomRoute path={PATHS.dev} component={Dev} />
        <Route component={NotFound} />
      </Switch>
      <Sidebar />
      <AuthContainer />
      <ContentContainer />
      <LoadingContainer />
      <ModalContainer />
      <ToastContainer />
      <ResponsiveContainer />
      <UploadProgressContainer />
      {/* <Dialog /> */}
    </Screen>
  );
};

export default Routing;

const CRouting: React.FC<Props> = ({ isAuthenticated, pageRequiredAuth, component, ...rest }) => {
  const renderRoute = (Component: any) => (props: RouteProps) => {
    if (isAuthenticated === null) return <SplashScreen />;

    if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
      // Before render component, check permission first
      return <Component {...props} />;
    }

    const redirectPath = isAuthenticated ? PATHS.myProfile : PATHS.signIn;
    const redirectProps = {
      to: {
        pathname: redirectPath,
        state: { from: props.location },
      },
    };
    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderRoute(component)} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteProps & { pageRequiredAuth?: boolean };

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

const CustomRoute = connect(mapStateToProps, mapDispatchToProps)(CRouting);
