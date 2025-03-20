import { Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDeposit } from "../../hooks/useWallet";

const DepositModal = ({ isOpen, onClose }) => {
  const [depositAmount, setDepositAmount] = useState(""); // Để trống mặc định
  const { mutate: depositMoney, isLoading: isDepositLoading } = useDeposit();

  // ✅ Xử lý nạp tiền
  const handleDepositSubmit = () => {
    const amount = Number(depositAmount);

    if (!amount || isNaN(amount)) {
      toast.error("❌ Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    console.log(amount);
    
    if (amount < 10000 || amount > 100000000) {
      toast.error("❌ Số tiền phải từ 10,000 đến 100,000,000 VND!");
      return;
    }

    depositMoney(amount);

    setDepositAmount(""); 
    onClose(); 
  };

  
  useEffect(() => {
    if (!isOpen) {
      setDepositAmount(""); 
    }
  }, [isOpen]);

  return (
    <Modal
      title="💰 Nạp tiền vào ví"
      style={{ top: 200 }}
      open={isOpen}
      onOk={handleDepositSubmit}
      onCancel={onClose}
      confirmLoading={isDepositLoading}
      okButtonProps={{ disabled: !depositAmount || isNaN(Number(depositAmount)) || depositAmount < 10000 || depositAmount > 100000000 }}
    >
      <Input
        type="number"
        placeholder="Nhập số tiền cần nạp (10,000 - 100,000,000)"
        value={depositAmount}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "" || /^[0-9]+$/.test(value)) {
            setDepositAmount(value);
          }
        }}
      />
    </Modal>
  );
};

export default DepositModal;
