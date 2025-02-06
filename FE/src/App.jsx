import Cards from "./components/Cards/Cards"
import Header from "./components/Header/Header"
import AdminPage from "./pages/AdminPage/AdminPage"
import ManagerPage from "./pages/ManagerPage/ManagerPage"


function App() {
  

  return (
    <div className="">
    
    <Header/>
    <AdminPage/>
    {/* <ManagerPage/> */}
    {/* Main Content
    <main className="flex-grow flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-center text-xl font-semibold mb-4">Đăng ký</h2>
        <hr className="mb-4" />
        <form className="space-y-4 w-full">
          <div>
            <label className="block font-medium">Tên đăng nhập:</label>
            <input type="text" className="w-full border rounded p-2" placeholder="Username" />
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input type="email" className="w-full border rounded p-2" placeholder="Email" />
          </div>
          <div>
            <label className="block font-medium">Mật khẩu:</label>
            <input type="password" className="w-full border rounded p-2" placeholder="Mật khẩu" />
          </div>
          <div>
            <label className="block font-medium">Xác nhận mật khẩu:</label>
            <input type="password" className="w-full border rounded p-2" placeholder="Xác nhận mật khẩu" />
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded">Đăng ký</button>
        </form>
        <p className="text-center mt-4">
          Bạn đã có tài khoản? <a href="#" className="text-blue-600">Đăng nhập</a>
        </p>
      </div>
    </main> */}
  </div>
  )
}

export default App