import React from 'react';
import QRCode from 'qrcode.react';

type ImageSetting = {
  src: string;
  x: number;
  y: number;
  height: number;
  width: number;
  excavate: boolean;
};

const QRTestingCode: React.FC<Props> = ({
  code,
  size = 238,
  imageSrc = null,
  errorCorrectionLevel = 'M',
}) => {
  const imageSetting: ImageSetting = imageSrc
    ? {
        src: imageSrc,
        x: null,
        y: null,
        height: 36,
        width: 36,
        excavate: true,
      }
    : null;
  return (
    <QRCode
      value={code}
      size={size}
      renderAs="svg"
      imageSettings={imageSetting}
      level={errorCorrectionLevel}
    />
  );
};

type Props = {
  code: string;
  size?: number;
  isBoardingPass?: boolean;
  imageSrc?: string;
  errorCorrectionLevel?: string;
};

export default QRTestingCode;
