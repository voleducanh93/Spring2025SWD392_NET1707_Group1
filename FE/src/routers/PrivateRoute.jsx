import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🔥 Hàm lấy token và role từ localStorage
const getAuth = () => {
    return {
        token: localStorage.getItem("access_token"), // ✅ Thêm lấy token
        role: localStorage.getItem("role"),
    };
};

// 📌 PublicRoute: Chỉ cho phép truy cập nếu chưa đăng nhập
export const PublicRoute = ({ children }) => {
    const { role } = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (role) {
            const redirectMap = {
                Staff: "/staff",
                Manager: "/manager",
                Doctor: "/doctor",
                Customer: "/",
                Admin: "/admin",
            };

            if (role && redirectMap[role]) {
                console.log(`🔄 Đã đăng nhập, chuyển hướng đến ${redirectMap[role]}`);
                navigate(redirectMap[role], { replace: true });
            }
        }
    }, [token, role, navigate]);

    return <>{children}</>;
};

// 📌 NoAuthRoute: Chặn truy cập nếu đã đăng nhập
export const NoAuthRoute = ({ children }) => {
  const { token, role } = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    

      if (token && role) {  
          const redirectMap = {
              Customer: "/",
              Admin: "/admin",
              Manager: "/manager",
              Staff: "/staff",
              Doctor: "/doctor",
          };

          if (redirectMap[role]) {
              console.log(`✅ Đã đăng nhập, chuyển hướng đến: ${redirectMap[role]}`);
              navigate(redirectMap[role], { replace: true });
          }
      }
  }, [token, role, navigate]);

  return <>{children}</>;
};


export const PrivateRoute = ({ allowedRoles, children }) => {
    const { token, role } = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        

         if (!allowedRoles.includes(role)) {
            console.log(`🚨 Role "${role}" không có quyền vào trang này! Chuyển hướng đến /${role}`);
            navigate(`/${role?.toLowerCase()}`, { replace: true });
        }
    }, [token, role, allowedRoles, navigate]);

    if ( !allowedRoles.includes(role)) {
        return null; // Trả về màn hình trắng nếu không có quyền
    }

    return <>{children}</>;
};
