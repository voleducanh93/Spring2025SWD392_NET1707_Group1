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

  return (
    <Modal
      title="Chi Tiết"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
     <Descriptions bordered column={1}>
  {fields.map((field, index) => {
    const value = data[field.name];
    const renderedValue = field.render
      ? field.render(value, data)
      : value || "Không có dữ liệu";

    // ⚠️ Nếu là null hoặc undefined thì KHÔNG render dòng đó
    if (renderedValue === null || renderedValue === undefined) return null;

    return (
      <Descriptions.Item key={index} label={field.label}>
        {renderedValue}
      </Descriptions.Item>
    );
  })}
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
      render: PropTypes.func,
    })
  ),
};

export default DetailModal;
