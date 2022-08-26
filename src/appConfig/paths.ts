export const PATHS = {
  root: '/',
  dev: '/dev',
  welcome: '/welcome',
  signIn: '/sign-in',
  signUp: '/sign-up',
  event: '/event',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  myAccount: '/my-accounts',

  // ======== Profile ========
  myProfile: '/me',
  changePassword: '/me/change-password',
  editMyProfile: '/me/edit',
  configureNotification: '/me/notification',

  // ======== Home ========
  home: '/',
  dashboard: '/dashboard',
  configurationManagement: '/configuration-management',
  userManagement: '/user-management',
  propertyManagement: '/property-management',
  workflowConfiguration: '/workflow-configuration',
  workQueueManagement: '/work-queue-management',
  formManagement: '/form-management',
};

export const PATH_HEADERS = {
  [PATHS.myProfile]: 'My Profile',
  [PATHS.editMyProfile]: 'My Profile',
  [PATHS.changePassword]: 'Change Password', // pragma: allowlist secret
  [PATHS.configureNotification]: 'My Profile',
};

export const HIDE_NAV_PATHS = [];
