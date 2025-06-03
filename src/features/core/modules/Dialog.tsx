import Modal from '@/components/Modal';
import Typo from '@/components/Typo';
import React from 'react';
import styled from 'styled-components/native';

export interface DialogConfig {
  title: string;
  desc?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

interface Props extends DialogConfig {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
}

function Dialog({
  isOpen,
  close,
  unmount,
  title,
  desc,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: Props) {
  const handleCancel = () => {
    close();
    onCancel?.();
  };

  const handleConfirm = () => {
    close();
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} close={close} unmount={unmount}>
      <Root>
        <Head>
          <Title>{title}</Title>
          {desc && <Desc>{desc}</Desc>}
        </Head>

        <Body>
          <ConfirmBtn onPress={handleConfirm}>
            <ConfirmLabel>{confirmLabel ?? '확인하기'}</ConfirmLabel>
          </ConfirmBtn>

          <CancelBtn onPress={handleCancel}>
            <CancelLabel>{cancelLabel ?? '취소하기'}</CancelLabel>
          </CancelBtn>
        </Body>
      </Root>
    </Modal>
  );
}

export default Dialog;

const Root = styled.View`
  align-self: center;
  width: 268px;
  padding: 20px 20px 14px;
  gap: 13px;
  border-radius: 8px;
  background-color: ${p => p.theme.system.white};
`;

const Head = styled.View`
  gap: 6px;
`;

const Title = styled(Typo.Subhead03)`
  text-align: center;
`;

const Desc = styled(Typo.Body01)`
  text-align: center;
  color: ${p => p.theme.system.wireframe_900};
`;

const Body = styled.View`
  gap: 8px;
`;

const ConfirmBtn = styled.TouchableOpacity`
  height: 46px;
  align-items: center;
  justify-content: center;
  padding: 7px 46px;
  border-radius: 4px;
  background-color: ${p => p.theme.system.sub_04};
`;

const ConfirmLabel = styled(Typo.Subhead02)`
  color: ${p => p.theme.gray.gray_12};
`;

const CancelBtn = styled(ConfirmBtn)`
  height: 34px;
  background-color: transparent;
`;

const CancelLabel = styled(ConfirmLabel)`
  color: ${p => p.theme.gray.gray_08};
`;
