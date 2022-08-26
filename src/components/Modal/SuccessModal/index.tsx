import React from 'react';
import { connect } from 'react-redux';
import { Button, IconSuccess, Text, View } from 'src/components/common';
import { hideModal } from 'src/redux/modal/modalSlice';
// import { hideModal } from 'src/redux/modalRedux/actions';
import { IRootState } from 'src/redux/rootReducer';

export type SuccessModalData = {
  title?: string | React.ReactNode;
  message?: string;
  okText?: string;
  onOk?: (...arg: any[]) => void;
  imageName?: any;
};

const SuccessModal: React.FC<Props> = ({ modalData, onHideModal }) => {
  const { title, message, onOk, okText } = modalData;

  const handleOk = () => {
    onOk && onOk();
    onHideModal();
  };

  return (
    <View className="ctn-modal__content pt-8">
      {/* <Image src={imageName || IMAGES.covidProtection} style={{ width: 100, margin: 'auto' }} /> */}
      <View align="center">
        <IconSuccess />
      </View>
      <h3 className="mt-16 mb-8">{title as string}</h3>
      {message && <Text className="mb-24">{message}</Text>}
      <Button onClick={handleOk}>{okText || 'Go to Homepage'}</Button>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({
  modalData: state.modal.data,
});

const mapDispatchToProps = {
  onHideModal: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessModal);
