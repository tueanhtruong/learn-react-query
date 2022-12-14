/* eslint-disable react-hooks/exhaustive-deps */
import { Auth, Hub } from 'aws-amplify';
import { History } from 'history';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useComponentDidMount } from 'src/hooks';
import { useProfile, useTravelers, useTrips } from 'src/queries';
import { setAuthenticated } from 'src/redux/auth/authSlice';
import { IRootState } from 'src/redux/rootReducer';
import { TokenService } from 'src/services';

const AuthContainer: React.FC<Props> = ({ history, onSetAuth }) => {
  // =========================== Didmount ===========================
  const { getMyProfile, handleSetStaleProfile } = useProfile({
    onSuccess(data) {
      if (data) handleSetAuthenticated();
    },
    onError(err) {
      clearAuth();
    },
  });
  const { handleSetStaleData } = useTravelers({
    enabled: false,
  });
  const { handleSetStaleTripData } = useTrips({
    enabled: false,
  });
  useComponentDidMount(() => {
    Hub.listen('auth', authLogin);
    // 1.call this first when mount because history listen fire when route changed
    // authenticate();
    return () => {
      Hub.remove('auth', authLogin);
    };
  });

  useComponentDidMount(async () => {
    try {
      await TokenService.getToken();
      authenticate();
    } catch (error) {
      clearAuth();
    }
  });

  const handleSetAuthenticated = () => {
    onSetAuth(true);
  };

  const authLogin = (res: { payload: { event: string; data?: any } }) => {
    const { payload } = res;
    const { event } = payload;
    switch (event) {
      case 'signIn':
        authenticate();
        break;
      case 'signOut':
        TokenService.clearToken();
        clearAuth();
        break;
      case 'signIn_failure':
        console.log('signin error', payload?.data?.message);
        break;
      default:
        break;
    }
  };

  const clearAuth = () => {
    onSetAuth(false);
    handleSetStaleProfile();
    handleSetStaleData();
    handleSetStaleTripData();
  };

  const authenticate = () => {
    // 2. Get current user
    Auth.currentAuthenticatedUser()
      .then((user) => {
        getMyProfile();
      })
      .catch(() => {
        clearAuth();
      });
  };

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onSetAuth: setAuthenticated,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthContainer));
