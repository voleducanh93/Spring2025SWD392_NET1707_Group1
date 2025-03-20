import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Select, Button, Checkbox, Card, Row, Col } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";



const VaccineScheduleForm = ({ availableVaccines, initialData, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [injections, setInjections] = useState({});

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ageRangeStart: initialData.ageRangeStart,
        ageRangeEnd: initialData.ageRangeEnd,
        notes: initialData.notes,
        selectedVaccines: initialData.vaccineScheduleDetails.map((detail) => detail.vaccineId),
      });

      setSelectedVaccines(initialData.vaccineScheduleDetails.map((detail) => detail.vaccineId));

      const schedules = initialData.vaccineScheduleDetails.reduce((acc, detail) => {
        acc[detail.vaccineId] = detail.injectionSchedules;
        return acc;
      }, {});

      setInjections(schedules);
    }
  }, [initialData]);

  const handleVaccineSelect = (value) => {
    setSelectedVaccines(value);
    const newInjections = { ...injections };

    value.forEach((vaccineId) => {
      if (!newInjections[vaccineId]) {
        newInjections[vaccineId] = [];
      }
    });

    setInjections(newInjections);
  };

  const handleAddInjection = (vaccineId) => {
    setInjections((prev) => ({
      ...prev,
      [vaccineId]: [
        ...prev[vaccineId],
        {
          injectionNumber: prev[vaccineId].length + 1,
          injectionMonth: "",
          isRequired: false,
          notes: "",
        },
      ],
    }));
  };

  const handleRemoveInjection = (vaccineId, index) => {
    setInjections((prev) => ({
      ...prev,
      [vaccineId]: prev[vaccineId].filter((_, i) => i !== index),
    }));
  };

  const handleInjectionChange = (vaccineId, index, field, value) => {
    const newInjections = { ...injections };
    newInjections[vaccineId][index][field] = value;
    setInjections(newInjections);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
  
      if (selectedVaccines.length === 0) {
        alert("Vui lòng chọn ít nhất một vaccine!");
        return;
      }
  
      // ✅ Chuyển đổi dữ liệu về đúng format API yêu cầu
      const vaccineData = selectedVaccines.map((vaccineId) => ({
        vaccineId: Number(vaccineId), // ✅ Chuyển về số
        injectionSchedules: injections[vaccineId]?.map((injection) => ({
          injectionNumber: Number(injection.injectionNumber), // ✅ Chuyển về số
          injectionMonth: Number(injection.injectionMonth), // ✅ Chuyển về số
          isRequired: Boolean(injection.isRequired), // ✅ Chuyển về boolean
          notes: injection.notes || "string",
        })) || [],
      }));
  
      const formattedData = {
        ageRangeStart: Number(values.ageRangeStart), // ✅ Chuyển về số
        ageRangeEnd: Number(values.ageRangeEnd), // ✅ Chuyển về số
        notes: values.notes || "string",
        vaccineScheduleDetails: vaccineData,
      };
  
      onSubmit(formattedData); // ✅ Gửi dữ liệu đã chuẩn hóa
    } catch {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };
  
  

  return (
    <Form form={form} layout="vertical" style={{ width: "100%" }}>
    {/* ✅ Tuổi Bắt Đầu & Tuổi Kết Thúc cùng hàng */}
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          name="ageRangeStart"
          label="Tuổi Bắt Đầu"
          rules={[{ required: true, message: "Vui lòng nhập tuổi bắt đầu!" }]}
        >
          <Input type="number" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="ageRangeEnd"
          label="Tuổi Kết Thúc"
          dependencies={["ageRangeStart"]}
          rules={[
            { required: true, message: "Vui lòng nhập tuổi kết thúc!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value <= getFieldValue("ageRangeStart")) {
                  return Promise.reject("Tuổi kết thúc phải lớn hơn tuổi bắt đầu!");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input type="number" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item name="notes" label="Ghi Chú">
      <Input.TextArea style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item name="selectedVaccines" label="Chọn Vắc-xin" rules={[{ required: true, message: "Vui lòng chọn ít nhất một vắc-xin!" }]}>
      <Select mode="multiple" placeholder="Chọn vắc-xin" allowClear onChange={handleVaccineSelect} style={{ width: "100%" }}>
        {availableVaccines.map((vaccine) => (
          <Select.Option key={vaccine.vaccineId} value={vaccine.vaccineId}>
            {vaccine.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {selectedVaccines.map((vaccineId) => {
      const vaccine = availableVaccines.find((v) => v.vaccineId === vaccineId);

      return (
        <Card key={vaccineId} style={{ marginBottom: 15, border: "1px solid #ccc" }}>
          <h4>Vaccine: {vaccine.name}</h4>

          {injections[vaccineId].map((injection, index) => (
            <Row key={injection.id} gutter={16} style={{ marginBottom: "10px" }}>
              <Col span={6}>
                <Input type="number" placeholder="Số lần tiêm" value={injection.doseNumber} onChange={(e) => handleInjectionChange(vaccineId, index, "doseNumber", e.target.value)} />
              </Col>
              <Col span={6}>
                <Input type="number" placeholder="Tháng tiêm" value={injection.injectionMonth} onChange={(e) => handleInjectionChange(vaccineId, index, "injectionMonth", e.target.value)} />
              </Col>
              <Col span={6}>
                <Checkbox checked={injection.isRequired} onChange={(e) => handleInjectionChange(vaccineId, index, "isRequired", e.target.checked)}>Bắt buộc</Checkbox>
              </Col>
              <Col span={6}>
                <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleRemoveInjection(vaccineId, index)}>Xóa</Button>
              </Col>
            </Row>
          ))}

          <Button type="dashed" block icon={<PlusOutlined />} onClick={() => handleAddInjection(vaccineId)}>Thêm Mũi Tiêm</Button>
        </Card>
      );
    })}

    <Button type="primary" onClick={handleFormSubmit}>Lưu</Button>
    <Button type="default" onClick={onCancel} style={{ marginLeft: 10 }}>Hủy</Button>
  </Form>
  );
};
VaccineScheduleForm.propTypes = {
  availableVaccines: PropTypes.arrayOf(
    PropTypes.shape({
      vaccineId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialData: PropTypes.shape({
    ageRangeStart: PropTypes.number,
    ageRangeEnd: PropTypes.number,
    notes: PropTypes.string,
    vaccineScheduleDetails: PropTypes.arrayOf(
      PropTypes.shape({
        vaccineId: PropTypes.string.isRequired,
        injectionSchedules: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            doseNumber: PropTypes.number.isRequired,
            injectionMonth: PropTypes.string,
            isRequired: PropTypes.bool,
            notes: PropTypes.string,
          })
        ),
      })
    ),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};


export default VaccineScheduleForm;
