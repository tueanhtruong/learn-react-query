import { History, LocationState } from 'history';
import appConfig from 'src/appConfig';
import urlJoin from 'url-join';

let _history: History;

const setTopHistory = (history: History) => {
  _history = history;
};

const navigate = (routeName: string, state?: LocationState) => {
  _history.push(routeName, state);
};

const getPath = () => _history.location.pathname;

const replace = (routeName: string, state?: LocationState) => {
  _history.replace(routeName, state);
};

const goBack = () => {
  var isCannotBack = _history.action === 'POP';
  isCannotBack ? _history.push(`/`) : _history.goBack();
};

const getNextPathInBaseUrl = (nextPath?: string) => {
  const baseURL = appConfig.WEB_URL as string;
  const path = nextPath || _history.location.pathname;
  const url = urlJoin(baseURL, path);

  return url;
};

const jumpToCrossDomain = (subDomain: string, nextPath?: string) => {
  const toUrl = getNextPathInBaseUrl(nextPath);
  const toCrossUrl = toUrl.replace('://', `://${subDomain}.`);
  window.location.href = toCrossUrl;
};

// const jumpToWebApp = (nextPath?: string) => {
//   window.open(`${getNavigateUrl(appConfig.WEB_APP_URL)}${nextPath}`, '_self');
// };
// const jumpToWebAdmin = (nextPath?: string) => {
//   window.open(`${getNavigateUrl(appConfig.WEB_ADMIN_URL)}${nextPath}`, '_self');
// };

// const navigateByRole = async (path: string) => {
//   const { isAdmin } = await RoleService.getRole();
//   if (isAdmin) jumpToWebAdmin(path);
//   else jumpToWebApp(path);
// };

export default {
  setTopHistory,
  navigate,
  goBack,
  replace,
  getPath,
  jumpToCrossDomain,
  // jumpToWebApp,
  // jumpToWebAdmin,
  // navigateByRole,
};
