import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import { Button, Text, View } from 'src/components/common';
import { hideModal } from 'src/redux/modal/modalSlice';
// import { IconVariantType } from '..';
// import { RiErrorWarningFill } from 'react-icons/ri';
// import { FaCheckCircle } from 'react-icons/fa';
// import { hideModal } from 'src/redux/modalRedux/actions';

export type OkModalData = {
  title?: string | React.ReactNode;
  message?: string;
  okText?: string;
  // iconVariant?: IconVariantType;
  onOk?: (...arg: any[]) => void;
};
const OkModal: React.FC<Props> = ({ modalData, onHideModal }) => {
  const { title, message, okText, onOk = () => {} } = modalData;

  const handleOk = () => {
    onOk();
    // iconVariant === 'success' && onHideModal();
  };

  return (
    <View className={`ctn-modal__content`}>
      <View isRowWrap>
        {/* <View renderIf={!!iconVariant} className="mr-8">
          {iconVariant === 'success' ? (
            <FaCheckCircle className={`has-text-${iconVariant}`} size={24} />
          ) : (
            <RiErrorWarningFill className={`has-text-${iconVariant}`} size={24} />
          )}
        </View> */}
        <View flexGrow={1}>
          {title && (
            <Text size={20} className="mb-4 ctn-modal__content__title">
              {title}
            </Text>
          )}
          {message && <Text className="mb-5 ctn-modal__content__message">{message}</Text>}
        </View>
      </View>
      <View isRow justify="center" className="ctn-modal__content__footer">
        <Button onClick={handleOk}>{okText || 'OK'}</Button>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OkModal);
