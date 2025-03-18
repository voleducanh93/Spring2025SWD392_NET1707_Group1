import { Card, Table, Typography, Badge } from "antd";
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const VaccinationScheduleTable = ({ vaccinationSchedule }) => {
  if (!vaccinationSchedule || !vaccinationSchedule.vaccineScheduleDetails) {
    return <p className="text-gray-500">Chưa có lịch tiêm chủng cho loại vaccine này.</p>;
  }

  return (
    <div className="space-y-4">
      <Title level={4} className="text-lg font-bold text-blue-600">
        Lịch Tiêm Chủng cho {vaccinationSchedule?.result?.vaccineName}
      </Title>

      {Array.isArray(vaccinationSchedule.vaccineScheduleDetails) &&
        vaccinationSchedule.vaccineScheduleDetails.map((schedule) => (
          <Card
            key={schedule.vaccineId}
            title={`Nhóm tuổi: ${vaccinationSchedule.ageRangeStart} - ${vaccinationSchedule.ageRangeEnd} tháng`}
            className="shadow-md border border-gray-200"
          >
            {vaccinationSchedule.notes && (
              <Text className="text-gray-700">
                <strong>Ghi chú chung:</strong> {vaccinationSchedule.notes}
              </Text>
            )}

            {schedule.injectionSchedules && schedule.injectionSchedules.length > 0 && (
              <Table
                columns={[
                  {
                    title: "Mũi tiêm",
                    dataIndex: "injectionNumber",
                    key: "injectionNumber",
                    width: 100,
                    render: (injectionNumber) => (
                      <Badge color="blue" text={`Mũi ${injectionNumber}`} />
                    ),
                  },
                  {
                    title: "Tháng tuổi",
                    dataIndex: "injectionMonth",
                    key: "injectionMonth",
                    width: 150,
                  },
                  {
                    title: "Bắt buộc",
                    dataIndex: "isRequired",
                    key: "isRequired",
                    width: 120,
                    render: (isRequired) => (
                      <Text className={isRequired ? "text-red-600 font-semibold" : "text-gray-500"}>
                        {isRequired ? "Có" : "Không"}
                      </Text>
                    ),
                  },
                  {
                    title: "Ghi chú",
                    dataIndex: "notes",
                    key: "notes",
                    width: 300,
                  },
                ]}
                dataSource={schedule.injectionSchedules}
                rowKey="doseNumber"
                pagination={false}
                size="small"
              />
            )}
          </Card>
        ))}
    </div>
  );
};
VaccinationScheduleTable.propTypes = {
  vaccinationSchedule: PropTypes.shape({
    vaccineScheduleDetails: PropTypes.arrayOf(
      PropTypes.shape({
        vaccineId: PropTypes.string.isRequired,
        injectionSchedules: PropTypes.arrayOf(
          PropTypes.shape({
            injectionNumber: PropTypes.number.isRequired,
            injectionMonth: PropTypes.number.isRequired,
            isRequired: PropTypes.bool.isRequired,
            notes: PropTypes.string,
          })
        ),
      })
    ),
    result: PropTypes.shape({
      vaccineName: PropTypes.string,
    }),
    ageRangeStart: PropTypes.number,
    ageRangeEnd: PropTypes.number,
    notes: PropTypes.string,
  }),
};


export default VaccinationScheduleTable;
