import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { LoadingCommon, Text, View } from 'src/components/common';
import { useTravelers, useTrips } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';

const ProfileContainer: React.FC<Props> = ({ location }) => {
  const { travelers = [] } = useTravelers();
  const { trips = [], loading } = useTrips();
  return (
    <View className="c-container pb-32">
      <View isRow>
        <Text className="mr-32">Trips Page</Text>
        {loading && <LoadingCommon className="ml-32" />}
      </View>
      <Text>Traveler: {travelers.length}</Text>
      {trips.map((trip) => {
        return (
          <View key={trip.id}>
            <NavLink to={`${PATHS.trips}/${trip.id}`}>
              {trip.tripPurpose?.name}--{trip.tripStatus.name}
            </NavLink>
          </View>
        );
      })}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
