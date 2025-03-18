import { Modal } from "antd";
import PropTypes from 'prop-types';

const ComboDetailModal = ({ isOpen, handleClose, selectedCombo }) => {
  return (
    <Modal
      title="Chi tiết Combo Vaccine"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      {selectedCombo && (
        <div className="grid grid-cols-2 gap-10">
          {/* Thông tin chính của Combo */}
          <div className="gap-10">
            <h2 className="text-lg text-center font-bold my-10">{selectedCombo.comboName}</h2>
            <p><strong>Mô tả:</strong> {selectedCombo.description}</p>
            <p><strong>Tổng giá:</strong> {selectedCombo.totalPrice.toLocaleString()} VND</p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span className={`px-2 py-1 rounded text-white ${selectedCombo.isActive ? "bg-green-500" : "bg-red-500"}`}>
                {selectedCombo.isActive ? "Hoạt động" : "Không hoạt động"}
              </span>
            </p>
          </div>

          {/* Danh sách Vaccine trong Combo */}
          <div>
            <h2 className="text-lg text-center font-bold">Danh sách Vaccine</h2>
            <div className="grid grid-cols-2 gap-4">
              {selectedCombo.vaccines?.map((vaccine, index) => (
                <div key={index} className="flex flex-col items-center p-2  rounded-md shadow-sm">
                  <img
                    src={`/path_to_images/${vaccine.image}`} // Lấy đường dẫn ảnh từ API
                    alt={vaccine.name}
                    className="w-16 h-16 object-cover rounded-lg "
                  />
                  <div className="text-center">
                    <p className="font-semibold">{vaccine.name}</p>
                    <p className="text-gray-500 text-sm">Giá: {vaccine.price.toLocaleString()} VND</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
ComboDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedCombo: PropTypes.shape({
    comboName: PropTypes.string,
    description: PropTypes.string,
    totalPrice: PropTypes.number,
    isActive: PropTypes.bool,
    vaccines: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
      })
    ),
  }),
};
export default ComboDetailModal;
