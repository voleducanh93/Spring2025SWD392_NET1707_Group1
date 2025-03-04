import  { useEffect } from "react";
import { useConfirmEmail } from "../../hooks/useAuth";


const ConfirmEmailPage = () => {
  const { mutate, isLoading } = useConfirmEmail();

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold">Xác nhận Email</h2>
      {isLoading ? <p>Đang xử lý...</p> : <p>Vui lòng chờ...</p>}
    </div>
  );
};

export default ConfirmEmailPage;
