import { Modal, Descriptions, Avatar } from "antd";
import dayjs from "dayjs";
import PropTypes from 'prop-types';

const DetailModal = ({ visible, onClose, data = {}, fields = [] }) => {
  console.log("Dữ liệu chi tiết:", data); // Kiểm tra dữ liệu trong console
  if (!data || Object.keys(data).length === 0) {
    return (
      <Modal title="Chi Tiết" open={visible} onCancel={onClose} footer={null} width={700}>
        <p>Không có dữ liệu</p>
      </Modal>
    );
  }
  return (
    <Modal title="Chi Tiết" open={visible} onCancel={onClose} footer={null} width={700}>
      {Object.keys(data).length > 0 ? (
        <Descriptions bordered column={1}>
          {fields.map((field, index) => (
            <Descriptions.Item key={index} label={field.label}>
              {field.name === "dateOfBirth"
                ? data[field.name] && data[field.name] !== "0001-01-01T00:00:00"
                  ? dayjs(data[field.name]).format("DD/MM/YYYY")
                  : "Chưa có ngày sinh"
                : field.name === "isActive"
                ? data[field.name]
                  ? "✅ Hoạt động"
                  : "⛔ Bị khóa"
                : field.name === "emailConfirmed"
                ? data[field.name]
                  ? "✅ Đã xác nhận"
                  : "❌ Chưa xác nhận"
                : field.name === "imageUrl"
                ? data[field.name]
                  ? <Avatar src={data[field.name]} size={64} />
                  : "Không có ảnh"
                : data[field.name] || "Không có dữ liệu"}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Modal>
  );
};
DetailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};


export default DetailModal;