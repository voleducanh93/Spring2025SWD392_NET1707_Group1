import { Modal, Button, Tabs } from "antd";
import { useVaccineScheduleById } from "../../hooks/useVaccineSchedule"; // Import hook để gọi API
import VaccinationScheduleTable from "./VaccinationScheduleTable";
import VaccineInventoryTable from "./VaccineInventoryTable";

const { TabPane } = Tabs;

import PropTypes from 'prop-types';

const VaccineDetailModal = ({ isOpen, handleClose, selectedVaccine }) => {

  const { data: vaccinationSchedule} = useVaccineScheduleById(selectedVaccine?.vaccineId);
    console.log(vaccinationSchedule);
    
  return (
    <Modal
      title="Chi Tiết Vaccine"
      open={isOpen}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Đóng
        </Button>,
      ]}
      width={900} // Tăng chiều rộng modal để thông tin hiển thị ngang
    >
      {selectedVaccine && (
        <Tabs defaultActiveKey="1">
          {/* Tab: Thông tin Vaccine */}
          <TabPane tab={<span className="text-blue-600 font-semibold">Thông tin Vaccine</span>} key="1">
            <div className="flex flex-row gap-6 p-4">
              <div className="w-1/3 flex flex-col items-center">
                <img src={selectedVaccine.image} alt="Vaccine" className="w-40 h-40 object-cover rounded-lg border shadow-md" />
              </div>
              <div className="w-2/3 space-y-2">
                <h2 className="text-3xl font-bold">{selectedVaccine.name}</h2>
                <p><strong>Nhà sản xuất:</strong> {selectedVaccine.manufacturer}</p>
                <p><strong>Giá:</strong> <span className="text-green-600 font-semibold">{selectedVaccine.price.toLocaleString()} VND</span></p>
                <p>
                  <strong>Trạng thái:</strong>
                  <span className={`ml-2 px-3 py-1 rounded-md text-white ${selectedVaccine.status ? "bg-green-500" : "bg-red-500"}`}>
                    {selectedVaccine.status ? "Có sẵn" : "Hết hàng"}
                  </span>
                </p>
                <p><strong>Cần thiết:</strong> {selectedVaccine.isNecessary ? "Có" : "Không"}</p>
                <p><strong>Số mũi tiêm:</strong> {selectedVaccine.injectionsCount}</p>
              </div>
            </div>

            <div className="mt-10 pt-4 grid grid-cols-2 gap-4">
              <p><strong>1. Mô tả:</strong> {selectedVaccine.description}</p>
              <p><strong>2. Tác dụng phụ:</strong> {selectedVaccine.sideEffect}</p>
              <p><strong>3. Bệnh phòng ngừa:</strong> {selectedVaccine.diseasePrevented}</p>
              <p><strong>4. Vị trí tiêm:</strong> {selectedVaccine.injectionSite}</p>
              <p><strong>5. Ghi chú:</strong> {selectedVaccine.notes}</p>
              <p><strong>6. Tương tác Vaccine:</strong> {selectedVaccine.vaccineInteractions}</p>
              <p><strong>7. Tác dụng không mong muốn:</strong> {selectedVaccine.undesirableEffects}</p>
              <p><strong>8. Cách bảo quản:</strong> {selectedVaccine.preserve}</p>
            </div>
          </TabPane>

          {/* Tab: Lịch Tiêm Chủng */}
          <TabPane tab={<span className="text-blue-600 font-semibold">Lịch Tiêm Chủng</span>} key="2">
  <VaccinationScheduleTable vaccinationSchedule={vaccinationSchedule} />
</TabPane>


          {/* Tab: Kho Vaccine */}
          <TabPane tab="Kho Vaccine" key="3">
            <VaccineInventoryTable vaccineId={selectedVaccine.vaccineId} />
          </TabPane>
        </Tabs>
      )}
    </Modal>
  );
};
VaccineDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedVaccine: PropTypes.object
};




export default VaccineDetailModal;
