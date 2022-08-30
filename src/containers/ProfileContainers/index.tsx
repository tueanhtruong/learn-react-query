import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'src/components/common';
import { useContents, useLogout, useProfile } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';

const ProfileContainer: React.FC<Props> = ({ location }) => {
  const { logout, isLoggingOut } = useLogout();
  const { profile } = useProfile();
  const { contents = {} } = useContents();
  return (
    <View className="c-container pb-32">
      {profile.primaryTravelerId}
      {/* {profile.userRoles.map((role) => (
        <Text key={role.roleId}>
          {role.role.name}
          <br />
          {role.role.description}
        </Text>
      ))} */}
      <Text>Contents: {Object.keys(contents).length}</Text>

      <View className="mt-32">
        <Button
          className="fit-width"
          label="Log out"
          onClick={() => logout()}
          isLoading={isLoggingOut}
        />
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
