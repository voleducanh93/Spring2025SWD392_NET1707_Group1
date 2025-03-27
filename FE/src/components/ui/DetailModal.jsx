import { Modal, Descriptions } from "antd";
import PropTypes from "prop-types";

const DetailModal = ({ visible, onClose, data = {}, fields = [] }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Modal
        title="Chi Tiết"
        open={visible}
        onCancel={onClose}
        footer={null}
        width={700}
      >
        <p>Không có dữ liệu</p>
      </Modal>
    );
  }
console.log(data);

  return (
    <Modal
      title="Chi Tiết"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Descriptions bordered column={1}>
        {fields.map((field, index) => (
          <Descriptions.Item key={index} label={field.label}>
            {field.render
              ? field.render(data[field.name], data) // ✅ truyền cả data làm record
              : data[field.name] || "Không có dữ liệu"}
          </Descriptions.Item>
        ))}
      </Descriptions>
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
