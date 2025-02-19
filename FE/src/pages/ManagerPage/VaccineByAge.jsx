import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Select, notification } from "antd";
import { useVaccineSchedule } from "../../hooks/useVaccineSchedule";
import { useVaccine } from "../../hooks/useVaccine";

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

  // Show the main modal for adding or editing a vaccine schedule
  const showModal = (record = null) => {
    form.setFieldsValue(record || { ageRangeStart: "", ageRangeEnd: "", notes: "", selectedVaccines: [] });
    setSelectedVaccines(record?.selectedVaccines || []);
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
        return {
          vaccineId,
          injectionSchedules: schedules.map((schedule, index) => ({
            doseNumber: index + 1,
            injectionMonth: schedule.injectionMonth,
            notes: schedule.notes,
          })),
        };
      });
      console.log(vaccineScheduleDetails);
      
      const data = {
        ageRangeStart,
        ageRangeEnd,
        notes,
        vaccineSchedules: vaccineScheduleDetails,
      };

      if (selectedVaccines.length > 0) {
        addVaccine.mutate(data);
        notification.success({ message: "Vaccine schedule has been successfully added!" });
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
        newSchedules.push({
          doseNumber: i + 1,
          injectionMonth: values[`dose${i + 1}Month`],
          notes: values[`dose${i + 1}Notes`],
        });
      }

      setInjectionSchedules((prevState) => ({
        ...prevState,
        [vaccineId]: newSchedules,
      }));

      // Mark as injection added
      setIsInjectionAdded(true);

      // Log the data
      console.log("Injection Data:", newSchedules);

      setIsInjectionModalOpen(false);
      injectionForm.resetFields();
      notification.success({ message: "Injection schedule has been successfully added!" });
    });
  };

  const columns = [
    { title: "Tuổi Bắt Đầu", dataIndex: "ageRangeStart", key: "ageRangeStart" },
    { title: "Tuổi Kết Thúc", dataIndex: "ageRangeEnd", key: "ageRangeEnd" },
    { title: "Ghi Chú", dataIndex: "notes", key: "notes" },
    {
      title: "Vắc-xin",
      key: "vaccines",
      render: (_, record) => (
        <div>
          {record.vaccineScheduleDetails?.map((vaccine) => (
            <div key={`vaccine-${vaccine.vaccineId}`}>
              <strong>{vaccine.vaccineName}</strong> - {vaccine.injectionSchedules.length} Mũi
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>Sửa</Button>
          <Button type="link" danger onClick={() => handleDelete(record.scheduleId)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Button type="primary" onClick={() => showModal()} className="mb-3">Thêm Vaccine</Button>
      <Table columns={columns} dataSource={scheduleVaccines} loading={isLoadingSchedules} rowKey="scheduleId" />

      {/* Main Modal */}
      <Modal
        title="Thêm vaccine"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="ageRangeStart" label="Tuổi Bắt Đầu" rules={[{ required: true, message: "Vui lòng nhập tuổi bắt đầu!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="ageRangeEnd" label="Tuổi Kết Thúc" rules={[{ required: true, message: "Vui lòng nhập tuổi kết thúc!" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="notes" label="Ghi Chú">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="selectedVaccines" label="Chọn Vắc-xin" rules={[{ required: true, message: "Vui lòng chọn vắc-xin!" }]}>
            <Select
              mode="multiple"
              placeholder="Chọn vắc-xin"
              allowClear
              loading={isLoadingVaccines}
              onChange={handleVaccineSelect}
            >
              {availableVaccines?.map((vaccine) => (
                <Select.Option key={`vaccine-${vaccine.vaccineId}`} value={vaccine.vaccineId}>
                  {vaccine.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* List of selected vaccines with "Add Injection" button */}
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
                    disabled={isInjectionAdded}  // Disable if injection has been added
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

          {/* Dynamically create the number of injection fields based on `injectionsCount` */}
          {currentVaccine?.injectionsCount && [...Array(currentVaccine.injectionsCount)].map((_, index) => (
            <div key={index}>
              <Form.Item
                name={`dose${index + 1}Month`}
                label={`Mũi ${index + 1} - Tháng Tiêm`}
                initialValue={injectionSchedules[currentVaccineId]?.[index]?.injectionMonth || ''}
                rules={[{ required: true, message: `Vui lòng nhập tháng tiêm cho mũi ${index + 1}` }]}
              >
                <Input type="number" placeholder="Nhập tháng tiêm" />
              </Form.Item>

              <Form.Item
                name={`dose${index + 1}Notes`}
                label={`Mũi ${index + 1} - Ghi Chú`}
                initialValue={injectionSchedules[currentVaccineId]?.[index]?.notes || ''}
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
