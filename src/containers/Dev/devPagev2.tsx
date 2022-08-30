import { connect } from 'react-redux';
import { MODAL_TYPES } from 'src/appConfig/modal';
import { Button, View } from 'src/components/common';
import { hideModal, showModal } from 'src/redux/modal/modalSlice';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const LoadingContainer: React.FC<Props> = ({ onShowModal, onHideModal }) => {
  const handleShowYesNoModal = () => {
    onShowModal({
      type: MODAL_TYPES.yesNoModal,
      data: {
        title: 'Test',
        message: 'Calling this redux#ActionCreator with an argument will return a PayloadAction',
        allowCloseByEsc: false,
        onCancel(...arg) {
          onHideModal();
        },
        onOk() {
          onHideModal();
        },
      },
    });
  };
  return (
    <View>
      <h1>Dev Page v2</h1>
      <View isRow>
        <Button onClick={handleShowYesNoModal}>Yes No Modal</Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowModal: showModal,
  onHideModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);
