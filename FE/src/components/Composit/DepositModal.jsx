import { Modal, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeposit } from "../../hooks/useWallet";


const DepositModal = ({ isOpen, onClose }) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const { mutate: depositMoney, isLoading: isDepositLoading } = useDeposit();

  // Xử lý nạp tiền
  const handleDepositSubmit = () => {
    if (depositAmount <= 0) {
      toast.error("❌ Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    depositMoney(depositAmount);
    onClose(); // Đóng modal sau khi gửi request
  };

  return (
    <Modal
      title="💰 Nạp tiền vào ví"
      open={isOpen}
      onOk={handleDepositSubmit}
      onCancel={onClose}
      confirmLoading={isDepositLoading}
    >
      <Input
        type="number"
        placeholder="Nhập số tiền cần nạp"
        onChange={(e) => setDepositAmount(Number(e.target.value))}
      />
    </Modal>
  );
};

export default DepositModal;
