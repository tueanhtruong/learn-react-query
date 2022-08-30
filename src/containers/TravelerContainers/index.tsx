import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { LoadingCommon, Text, View } from 'src/components/common';
import { useProfile, useTravelers } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';

const ProfileContainer: React.FC<Props> = ({ location }) => {
  const { profile } = useProfile();
  const { travelers = [], loading } = useTravelers();
  return (
    <View className="c-container pb-32">
      {profile.primaryTravelerId}
      <View isRow>
        <Text>Traveler: {travelers.length}</Text>
        {loading && <LoadingCommon className="ml-16" />}
      </View>
      {travelers.map((traveler) => (
        <NavLink to={`${PATHS.travelers}/${traveler.id}`} key={traveler.id}>
          {traveler.personalInfo.firstAndLastName}
        </NavLink>
      ))}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
