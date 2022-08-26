import { ReactNode } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import { View } from 'src/components/common';

export type ContentModalData = {
  content?: ReactNode;
  hideCloseButton?: boolean;
};
const ContentModal: React.FC<Props> = ({ modalData }) => {
  const { content } = modalData;

  return <View className={`ctn-modal__content ctn-modal-content__body`}>{content}</View>;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  modalData: state.modal.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentModal);
