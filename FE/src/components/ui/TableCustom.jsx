import { Table } from "antd";
import PropTypes from 'prop-types';
const customHeaderStyle = {
    background: "#1D2D70",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  };
  
  // Tạo custom header row
  export const components = {
    header: {
      cell: (props) => (
        <th {...props} style={{ ...props.style, ...customHeaderStyle }} />
      ),
    },
  };
const CustomTable = ({ columns, dataSource, loading, rowKey = "id", pagination = { pageSize: 5, showSizeChanger: false } }) => {
    
  return (
    <Table
    components={components}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      scroll={{ x: "max-content" }} 
    />
  );
};
CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  rowKey: PropTypes.string,
  pagination: PropTypes.object
};


export default CustomTable;