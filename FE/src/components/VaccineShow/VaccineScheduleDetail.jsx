import  { useState, useEffect } from "react";
import { Table, Typography, Card, Spin, Alert } from "antd";
import PropTypes from 'prop-types';
import { useVaccineSchedule } from "../../hooks/useVaccineSchedule";

const { Title, Text } = Typography;

const VaccineSchedule = ({ vaccineId }) => {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {vaccines: scheduleVaccines}= useVaccineSchedule();
 
  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);

        

        // Tìm nhóm tuổi chứa vaccineId
        const matchingSchedules = scheduleVaccines.filter((schedule) =>
          schedule.vaccineScheduleDetails.some((detail) => detail.vaccineId === vaccineId)
        );

        setScheduleData(matchingSchedules);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [vaccineId]);

  if (loading) return <Spin tip="Đang tải dữ liệu..." />;
  if (error) return <Alert message="Lỗi" description={error} type="error" showIcon />;
  if (!scheduleData || scheduleData.length === 0)
    return <Text className="text-gray-500">Không tìm thấy lịch tiêm cho vaccine này.</Text>;

  return (
    <div className="space-y-4">
      <Title level={4} className="text-lg font-bold text-blue-600">
        Lịch Tiêm Chủng cho Vaccine ID: {vaccineId}
      </Title>

      {scheduleData.map((schedule) => (
        <Card key={schedule.scheduleId} title={`Nhóm tuổi: ${schedule.ageRangeStart} - ${schedule.ageRangeEnd} tuổi`} className="shadow-md border border-gray-200">
          <Text className="text-gray-700">
            <strong>Ghi chú chung:</strong> {schedule.notes}
          </Text>

          {schedule.vaccineScheduleDetails
            .filter((detail) => detail.vaccineId === vaccineId)
            .map((detail) => (
              <Table
                key={detail.vaccineId}
                columns={[
                  { title: "Mũi tiêm", dataIndex: "injectionNumber", key: "injectionNumber", width: 100 },
                  { title: "Tháng tuổi", dataIndex: "injectionMonth", key: "injectionMonth", width: 150 },
                  {
                    title: "Bắt buộc",
                    dataIndex: "isRequired",
                    key: "isRequired",
                    width: 120,
                    render: (isRequired) => <Text className={isRequired ? "text-red-600 font-semibold" : "text-gray-500"}>{isRequired ? "Có" : "Không"}</Text>,
                  },
                  { title: "Ghi chú", dataIndex: "notes", key: "notes", width: 300 },
                ]}
                dataSource={detail.injectionSchedules}
                rowKey="injectionNumber"
                pagination={false}
                size="small"
              />
            ))}
        </Card>
      ))}
    </div>
  );
};
VaccineSchedule.propTypes = {
  vaccineId: PropTypes.number.isRequired,
};


export default VaccineSchedule;
