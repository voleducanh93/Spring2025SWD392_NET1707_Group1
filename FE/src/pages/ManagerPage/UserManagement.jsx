import UserManage from "../../components/User/UserManage";



const UserPage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Quản Lý Người Dùng</h1>
      <UserManage />
    </div>
  );
};

export default UserPage;
