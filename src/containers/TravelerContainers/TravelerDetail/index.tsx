import { Location } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadingCommon, Text, View } from 'src/components/common';
import { useTravelers } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';

const ProfileContainer: React.FC<Props> = ({ location }) => {
  const { id } = useParams<{ id: string }>();
  const { travelers, loading } = useTravelers();
  if (loading) return <LoadingCommon />;
  const selectedTraveler = travelers.find((traveler) => traveler.id === id);
  return (
    <View className="c-container pb-32">
      <View isRow align="center">
        <Text>Traveler Detail</Text>
      </View>
      <Text>ID: {id}</Text>
      <Text>Name: {selectedTraveler.personalInfo.firstAndLastName}</Text>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { location: Location };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
