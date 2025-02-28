import { Button, Result } from 'antd'


function ResultPayment() {
  return (
    <Result
    status="success"
    title="Successfully Purchased "
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
       Mua hàng
      </Button>,
      <Button key="buy">quay về trang chủ</Button>,
    ]}
  />
  )
}

export default ResultPayment