import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import {
  ContentModal,
  EmailConfirmationModal,
  Modal,
  OkModal,
  SuccessModal,
  YesNoModal,
} from 'src/components/Modal';
import { MODAL_TYPES } from 'src/appConfig/modal';
// import { hideModal } from 'src/redux/modalRedux/actions';
import MFAConfirmationModal from 'src/components/Modal/MFAConfirmationModal';
import { hideModal } from 'src/redux/modal/modalSlice';

const ModalContainer: React.FC<Props> = ({
  startClosing,
  data,
  isVisible,
  modalType,
  hideModal,
}) => {
  if (!isVisible) return null;
  const { hideCloseButton } = data;

  const notAllowClose =
    hideCloseButton ||
    [(MODAL_TYPES.successModal, MODAL_TYPES.okModal, MODAL_TYPES.yesNoModal)].includes(modalType);

  const hasConfirmationCode = [
    MODAL_TYPES.emailConfirmationModal,
    MODAL_TYPES.mfaConfirmationModal,
  ].includes(modalType);

  return (
    <Modal
      hasConfirmationCode={hasConfirmationCode}
      hideCloseButton={notAllowClose}
      onModalClosed={hideModal}
      triggerCloseModal={startClosing}
    >
      <ModalBody modalType={modalType} />
    </Modal>
  );
};

const ModalBody = ({ modalType }: { modalType: string }) => {
  switch (modalType) {
    case MODAL_TYPES.okModal:
      return <OkModal />;
    case MODAL_TYPES.yesNoModal:
      return <YesNoModal />;
    case MODAL_TYPES.emailConfirmationModal:
      return <EmailConfirmationModal />;
    case MODAL_TYPES.contentModal:
      return <ContentModal />;
    case MODAL_TYPES.successModal:
      return <SuccessModal />;
    case MODAL_TYPES.mfaConfirmationModal:
      return <MFAConfirmationModal />;
    default:
      return <OkModal />;
  }
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({
  isVisible: state.modal.isVisible,
  modalType: state.modal.type,
  startClosing: state.modal.startClosing,
  data: state.modal.data,
});

const mapDispatchToProps = {
  hideModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
