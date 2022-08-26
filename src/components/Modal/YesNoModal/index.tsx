import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import { Button, Text, View } from 'src/components/common';
import { IconVariantType } from '..';
// import { RiErrorWarningFill } from 'react-icons/ri';

export type YesNoModalData = {
  title?: string | React.ReactNode;
  message?: string;
  okText?: string;
  cancelText?: string;
  onCancel?: (...arg: any[]) => void;
  onOk?: (...arg: any[]) => void;
  iconVariant?: IconVariantType;
};

const YesNoModal: React.FC<Props> = ({ modalData }) => {
  const {
    title,
    message,
    okText,
    cancelText,
    onOk = () => {},
    onCancel = () => {},
    // iconVariant,
  } = modalData;

  return (
    <View className={`ctn-modal__content`}>
      <View isRowWrap>
        {/* <View renderIf={!!iconVariant} className="mr-8">
          <RiErrorWarningFill className={`has-text-${iconVariant}`} size={24} />
        </View> */}
        <View>
          {title && (
            <Text size={20} className="mb-4 ctn-modal__content__title">
              {title}
            </Text>
          )}
          {message && <Text className="mb-5 ctn-modal__content__message">{message}</Text>}
        </View>
      </View>
      <View isRow justify="flex-end" className="ctn-modal__content__footer">
        <Button onClick={onCancel} variant="secondary-outline" className="mr-3">
          {cancelText || 'Cancel'}
        </Button>
        <Button onClick={onOk} className="mr-4">
          {okText || 'OK'}
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

const mapStateToProps = (state: IRootState) => ({
  modalData: state.modal.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YesNoModal);
