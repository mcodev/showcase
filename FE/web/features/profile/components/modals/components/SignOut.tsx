import AlertModalContent from '@/components/CustomModal/templates/AlertModalContent';

type SignOutModalProps = {
  handleCloseModal: () => void;
};

const SignOut = ({ handleCloseModal }: SignOutModalProps) => (
  <AlertModalContent
    descriptionKey="sign_out_confirmation"
    onCloseModal={handleCloseModal}
    onActionClick={handleCloseModal}
    closeButtonKey="cancel"
    actionButtonKey="sign_out"
    alertType="danger"
  />
);

export default SignOut;
