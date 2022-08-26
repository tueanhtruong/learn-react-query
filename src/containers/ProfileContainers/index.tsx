import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Button, View } from 'src/components/common';
import { useLogout } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';

const ProfileContainer: React.FC<Props> = ({ location }) => {
  const { logout, isLoggingOut } = useLogout();
  return (
    <View className="c-container pb-32">
      <Button label="Log out" onClick={() => logout()} isLoading={isLoggingOut} />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
