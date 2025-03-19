import { Modal, Table } from "antd";
import PropTypes from "prop-types";

const ComboDetailModal = ({ isOpen, handleClose, selectedCombo }) => {
  if (!selectedCombo) return null; // Kiểm tra nếu `selectedCombo` không tồn tại

  return (
    <Modal
      title="Chi tiết Combo Vaccine"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
    >
      <div className="grid grid-cols-1 gap-6">
        {/* Thông tin chính của Combo */}
        <div className="p-4 border rounded-lg bg-gray-100">
          <h2 className="text-lg font-bold text-center text-blue-700 mb-4">
            {selectedCombo.comboName}
          </h2>
          <p>
            <strong>Mô tả:</strong> {selectedCombo.description || "Không có mô tả"}
          </p>
          <p>
            <strong>Tổng giá:</strong>{" "}
            {selectedCombo.totalPrice
              ? `${selectedCombo.totalPrice.toLocaleString()} VND`
              : "Chưa có giá"}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                selectedCombo.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {selectedCombo.isActive ? "Hoạt động" : "Không hoạt động"}
            </span>
          </p>
        </div>

        {/* Danh sách Vaccine trong Combo */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="text-lg font-bold text-center text-blue-700 mb-4">
            Danh sách Vaccine
          </h2>
          <Table
            dataSource={selectedCombo.vaccines?.sort((a, b) => a.order - b.order)}
            pagination={false}
            rowKey={(record) => record.vaccine?.vaccineId || Math.random()} // Đảm bảo key luôn tồn tại
            bordered
            columns={[
              {
                title: "Thứ tự",
                dataIndex: "order",
                key: "order",
                align: "center",
                width: 80,
                render: (text) => <strong>{text}</strong>,
              },
              {
                title: "Hình ảnh",
                dataIndex: "vaccine",
                key: "image",
                align: "center",
                width: 100,
                render: (vaccine) => (
                  <img
                    src={vaccine?.image ? `/path_to_images/${vaccine.image}` : "/default_vaccine.png"}
                    alt="Vaccine"
                    className="w-12 h-12 object-cover rounded-lg mx-auto"
                  />
                ),
              },
              {
                title: "Tên Vaccine",
                dataIndex: "vaccine",
                key: "name",
                render: (vaccine) => (
                  <span className="font-semibold">{vaccine?.name || "Không có tên"}</span>
                ),
              },
              {
                title: "Khoảng cách (ngày)",
                dataIndex: "intervalDays",
                key: "intervalDays",
                align: "center",
                width: 120,
                render: (text) => <span>{text ?? "N/A"} ngày</span>,
              },
              {
                title: "Giá",
                dataIndex: "vaccine",
                key: "price",
                align: "center",
                render: (vaccine) => (
                  <span>{vaccine?.price ? `${vaccine.price.toLocaleString()} VND` : "Chưa có giá"}</span>
                ),
              },
            ]}
          />
        </div>
      </div>
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
        order: PropTypes.number,
        intervalDays: PropTypes.number,
        vaccine: PropTypes.shape({
          vaccineId: PropTypes.number,
          image: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
        }),
      })
    ),
  }),
};

export default ComboDetailModal;
