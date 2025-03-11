import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Select, notification } from "antd";
import { useVaccineSchedule } from "../../hooks/useVaccineSchedule";
import { useVaccine } from "../../hooks/useVaccine";
import { toast } from "react-toastify";
import VaccinationScheduleTable from "../../components/VaccineShow/VaccinationScheduleTable";

const VaccineByAge = () => {
  const {
    vaccines: scheduleVaccines,
    isLoading: isLoadingSchedules,
    addVaccine,
    editVaccine,
    removeVaccine,
  } = useVaccineSchedule();

  const { vaccines: availableVaccines, isLoading: isLoadingVaccines } = useVaccine();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInjectionModalOpen, setIsInjectionModalOpen] = useState(false);
  const [injectionForm] = Form.useForm();
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [injectionSchedules, setInjectionSchedules] = useState({});
  const [currentVaccineId, setCurrentVaccineId] = useState(null);
  const [currentVaccine, setCurrentVaccine] = useState(null);
  const [isInjectionAdded, setIsInjectionAdded] = useState(false);  // Track if injection has been added
  const [editingVaccine, setEditingVaccine] = useState(null); // Track for editing mode
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    if (selectedVaccines.length > 0) {
      const schedules = selectedVaccines.reduce((acc, vaccineId) => {
        const vaccine = availableVaccines.find((v) => v.vaccineId === vaccineId);
        if (vaccine) {
          acc[vaccineId] = vaccine.injectionSchedules || [];
        }
        return acc;
      }, {});
      setInjectionSchedules(schedules);
    } else {
      setInjectionSchedules({});
    }
  }, [selectedVaccines, availableVaccines]);

  const showModal = (record = null) => {
    if (record) {
      // Editing an existing record
      form.setFieldsValue({
        ageRangeStart: record.ageRangeStart,
        ageRangeEnd: record.ageRangeEnd,
        notes: record.notes,
        selectedVaccines: record.vaccineScheduleDetails.map((detail) => detail.vaccineId),
      });
  
      // Set selected vaccines and injection schedules when editing
      setSelectedVaccines(record.vaccineScheduleDetails.map((detail) => detail.vaccineId));
      setEditingVaccine(record); // Set editing vaccine record
  
      // Populate injection schedules to ensure correct number of injections
      const schedules = record.vaccineScheduleDetails.reduce((acc, detail) => {
        acc[detail.vaccineId] = detail.injectionSchedules;
        return acc;
      }, {});
      setInjectionSchedules(schedules);
    } else {
      // For adding new vaccine schedule
      form.resetFields();
      setEditingVaccine(null);
      setSelectedVaccines([]);
      setInjectionSchedules({});
    }
  
    setIsModalOpen(true);
  };
  

  const handleVaccineSelect = (value) => {
    setSelectedVaccines(value);
  };

  const handleDelete = (id) => {
    removeVaccine.mutate(id);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const { ageRangeStart, ageRangeEnd, notes, selectedVaccines } = values;
  
      const vaccineScheduleDetails = selectedVaccines.map((vaccineId) => {
        const schedules = injectionSchedules[vaccineId] || [];
  
        
        const requiredInjections = availableVaccines.find((v) => v.vaccineId === vaccineId)?.injectionsCount || 0;
  
        
        while (schedules.length < requiredInjections) {
          schedules.push({
            doseNumber: schedules.length + 1,
            injectionMonth: 0,  // Default value, could be updated
            isRequired: true,  // Mark as required by default
            notes: `Mũi ${schedules.length + 1} tiêm`,  // Default notes
          });
        }
  
        const formattedSchedules = schedules.map((schedule, index) => ({
          doseNumber: index + 1,
          injectionMonth: schedule.injectionMonth,
          isRequired: true,
          notes: schedule.notes || `Mũi ${index + 1} tiêm`,
        }));
  
        return {
          vaccineId,
          injectionSchedules: formattedSchedules,
        };
      });
  
      const data = {
        ageRangeStart,
        ageRangeEnd,
        notes,
        vaccineScheduleDetails,
      };
  
      if (selectedVaccines.length > 0) {
        if (editingVaccine) {
          // If editing, update vaccine schedule
          editVaccine.mutate(
            { id: editingVaccine.scheduleId, data },
            {
              onSuccess: () => {
                notification.success({ message: "Vaccine schedule has been successfully updated!" });
                setInjectionSchedules({});
                setSelectedVaccines([]);
                setEditingVaccine(null);
              },
              onError: (error) => {
                console.error("❌ Error updating vaccine schedule:", error);
                notification.error({ message: `Failed to update vaccine schedule: ${error.message}` });
              },
            }
          );
        } else {
          // If adding new vaccine schedule
          addVaccine.mutate(data);
          notification.success({ message: "Vaccine schedule has been successfully added!" });
          setInjectionSchedules({});
          setSelectedVaccines([]);
        }
      } else {
        notification.error({ message: "No vaccine selected!" });
      }
  
      setIsModalOpen(false);
      form.resetFields();
    });
  };
  
  
  
  
  

  const handleInjectionOk = () => {
    injectionForm.validateFields().then((values) => {
      const { vaccineId } = values;
  
      const vaccine = availableVaccines.find((v) => v.vaccineId === vaccineId);
      const injectionsCount = vaccine?.injectionsCount || 0;
  
      const newSchedules = [];
  
      for (let i = 0; i < injectionsCount; i++) {
        let injectionMonth = values[`dose${i + 1}Month`];
  
        // Kiểm tra xem tháng tiêm có hợp lệ hay không cho vaccine BCG
        if (vaccine.name === 'BCG' && (injectionMonth < 1 || injectionMonth > 6)) {
          // Sử dụng toast để thông báo lỗi
          toast.error("Tháng tiêm cho vaccine BCG phải nằm trong khoảng 1 đến 6 tháng!");
          return; // Dừng lại nếu tháng tiêm không hợp lệ
        }
  
        newSchedules.push({
          doseNumber: i + 1,
          injectionMonth: injectionMonth,
          notes: values[`dose${i + 1}Notes`],
          isRequired: true,
        });
      }
  
      // Cập nhật lại dữ liệu injection schedules
      setInjectionSchedules((prevState) => ({
        ...prevState,
        [vaccineId]: newSchedules,
      }));
  
      setIsInjectionAdded(true);
      setIsInjectionModalOpen(false);
      injectionForm.resetFields();
  
      // Thông báo thành công
      toast.success("Injection schedule has been successfully added!");
    });
  };
  
  const showModalDetail = (record) => {
    setSelectedSchedule(record); 
    setIsDetailModalOpen(true); 
  };
  

  const columns = [
    { title: "Tuổi Bắt Đầu", dataIndex: "ageRangeStart", key: "ageRangeStart" },
    { title: "Tuổi Kết Thúc", dataIndex: "ageRangeEnd", key: "ageRangeEnd" },
    { title: "Ghi Chú", dataIndex: "notes", key: "notes" },
    
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
           <Button type="link" onClick={() => showModalDetail(record)}>Chi tiết</Button>
          <Button type="link" onClick={() => showModal(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.scheduleId)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">

<Button type="primary" onClick={() => showModal()} className="mb-3">
        Thêm Vaccine
      </Button>

      
      <Table columns={columns} pagination={{ pageSize: 8, showSizeChanger: false }} dataSource={scheduleVaccines} loading={isLoadingSchedules} rowKey="scheduleId" />
      <Modal
  title="Chi tiết Lịch Tiêm Chủng"
  open={isDetailModalOpen}
  onCancel={() => setIsDetailModalOpen(false)}
  footer={null} // Không có nút footer
>
  {selectedSchedule ? (
    <VaccinationScheduleTable vaccinationSchedule={selectedSchedule} />
  ) : (
    <p>Không có dữ liệu.</p>
  )}
</Modal>
      {/* Main Modal */}
      <Modal
  title={editingVaccine ? "Cập nhật vaccine" : "Thêm vaccine"}
  open={isModalOpen}
  onOk={handleOk}
  onCancel={() => setIsModalOpen(false)}
>
  <Form form={form} layout="vertical">
    {/* ✅ Bổ sung validation cho tuổi bắt đầu */}
    <Form.Item
      name="ageRangeStart"
      label="Tuổi Bắt Đầu"
      rules={[
        { required: true, message: "Vui lòng nhập tuổi bắt đầu!" },
       
      ]}
    >
      <Input type="number" />
    </Form.Item>

    {/* ✅ Bổ sung validation cho tuổi kết thúc */}
    <Form.Item
      name="ageRangeEnd"
      label="Tuổi Kết Thúc"
      dependencies={["ageRangeStart"]}
      rules={[
        { required: true, message: "Vui lòng nhập tuổi kết thúc!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (value <= getFieldValue("ageRangeStart")) {
              return Promise.reject(new Error("Tuổi kết thúc phải lớn hơn tuổi bắt đầu!"));
            }
            return Promise.resolve();
          },
        }),
      ]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item name="notes" label="Ghi Chú">
      <Input.TextArea />
    </Form.Item>

    {/* ✅ Validation bắt buộc chọn ít nhất một vaccine */}
    <Form.Item
      name="selectedVaccines"
      label="Chọn Vắc-xin"
      rules={[{ required: true, message: "Vui lòng chọn ít nhất một vắc-xin!" }]}
    >
      <Select mode="multiple" placeholder="Chọn vắc-xin" allowClear loading={isLoadingVaccines} onChange={handleVaccineSelect}>
        {availableVaccines?.map((vaccine) => (
          <Select.Option key={`vaccine-${vaccine.vaccineId}`} value={vaccine.vaccineId}>
            {vaccine.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {/* ✅ Giữ nguyên nút "Thêm Mũi Tiêm" */}
    <div>
      {selectedVaccines.map((vaccineId) => {
        const vaccine = availableVaccines.find((v) => v.vaccineId === vaccineId);
        return (
          <div key={vaccineId} style={{ marginBottom: "10px" }}>
            <strong>{vaccine.name}</strong>
            <Button
              type="link"
              onClick={() => {
                setCurrentVaccineId(vaccineId);
                setCurrentVaccine(vaccine);
                setIsInjectionModalOpen(true);
              }}
              disabled={isInjectionAdded} // Giữ nguyên logic của bạn
            >
              Thêm Mũi Tiêm
            </Button>
          </div>
        );
      })}
    </div>
  </Form>
</Modal>


      {/* Injection Schedule Modal */}
      <Modal
  title="Thêm Mũi Tiêm"
  open={isInjectionModalOpen}
  onOk={handleInjectionOk}
  onCancel={() => setIsInjectionModalOpen(false)}
>
  <Form form={injectionForm} layout="vertical">
    <Form.Item name="vaccineId" label="Vắc-xin" initialValue={currentVaccineId} hidden>
      <Input />
    </Form.Item>

    {currentVaccine?.injectionsCount &&
      [...Array(currentVaccine.injectionsCount)].map((_, index) => (
        <div key={index}>
          <Form.Item
            name={`dose${index + 1}Month`}
            label={`Mũi ${index + 1} - Tháng Tiêm`}
            rules={[
              { required: true, message: `Vui lòng nhập tháng tiêm cho mũi ${index + 1}` },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const monthValue = Number(value); // ✅ Chuyển thành số
                  const ageRangeStart = getFieldValue("ageRangeStart"); // 1 tuổi
                  const ageRangeEnd = getFieldValue("ageRangeEnd"); // 4 tuổi

                  if (!Number.isInteger(monthValue) || monthValue <= 0) {
                    return Promise.reject(new Error("Tháng tiêm phải là số nguyên dương!"));
                  }
                  if (monthValue < ageRangeStart || monthValue > ageRangeEnd) {
                    return Promise.reject(
                      new Error(`Tháng tiêm phải từ ${ageRangeStart} đến ${ageRangeEnd} tháng!`)
                    );
                  }
                  if (index > 0) {
                    const prevDoseValue = Number(getFieldValue(`dose${index}Month`));
                    if (monthValue <= prevDoseValue) {
                      return Promise.reject(new Error(`Mũi ${index + 1} phải lớn hơn mũi ${index}`));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập tháng tiêm"
              onChange={(e) => {
                let value = Number(e.target.value.replace(/\D/g, "")); // ✅ Chỉ cho nhập số
                const ageRangeStart = form.getFieldValue("ageRangeStart");
                const ageRangeEnd = form.getFieldValue("ageRangeEnd");

                if (value > ageRangeEnd) {
                  value = ageRangeEnd; // ✅ Nếu lớn hơn max, tự động về max
                } else if (value < ageRangeStart) {
                  value = ageRangeStart; // ✅ Nếu nhỏ hơn min, tự động về min
                }

                form.setFieldsValue({ [`dose${index + 1}Month`]: value });
              }}
            />
          </Form.Item>

          <Form.Item
            name={`dose${index + 1}Notes`}
            label={`Mũi ${index + 1} - Ghi Chú`}
            initialValue={injectionSchedules[currentVaccineId]?.[index]?.notes || ""}
          >
            <Input.TextArea placeholder="Nhập ghi chú" />
          </Form.Item>
        </div>
      ))}
  </Form>
</Modal>







    </div>
  );
};

export default VaccineByAge;
