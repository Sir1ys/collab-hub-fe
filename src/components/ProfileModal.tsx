import Modal from "./Modal";

type Props = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProfileModal({ active, setActive }: Props) {
  return (
    <Modal active={active} setActive={setActive}>
      <span>Hello</span>
    </Modal>
  );
}
