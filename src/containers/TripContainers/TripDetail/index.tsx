import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadingCommon, Text, View } from 'src/components/common';
import { useTripDetail } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';

const ProfileContainer: React.FC<Props> = ({ location }) => {
  const { id } = useParams<{ id: string }>();
  const { trip, loading } = useTripDetail({ id });
  if (loading) return <LoadingCommon className="ml-32" />;
  return (
    <View className="c-container pb-32">
      <View isRow align="center">
        <Text>Trip Detail</Text>
      </View>
      <Text>ID: {id}</Text>
      <Text>
        Trip Destination: {trip.tripDestination?.address}, {trip.tripDestination?.locationName}
      </Text>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
