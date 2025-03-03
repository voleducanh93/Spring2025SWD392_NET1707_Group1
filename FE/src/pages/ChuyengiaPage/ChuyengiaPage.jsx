import React from 'react';

export default function ChuyengiaPage() {
  return (
    <div>
      {/* <div className="w-full overflow-hidden">
        <div className="w-full bg-yellow-300 !py-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full">
                <nav aria-label="breadcrumbs" className="rank-math-breadcrumb">
                  <p>
                    <a href="https://vnvc.vn/" className="text-blue-600">Trang chủ</a>
                    <span className="separator"> » </span>
                    <span className="last">Chuyên gia</span>
                  </p>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container !mt-15">
        <div className="flex flex-wrap justify-center">
          <h1 className="content-title !pt-5 !mt-0 text-center">
            <span className="text-blue-600 text-3xl">Chuyên gia</span>
          </h1>
        </div>
      </div>

      <div className="container !mt-25">
        <div className="flex flex-wrap justify-center space-x-4">
          {/* Expert 1 */}
          <div className="w-full sm:w-1/3 lg:w-1/4 !p-4">
            <a href="https://vnvc.vn/chuyen-gia/bs-bach-thi-chinh/">
              <div className="rounded-lg bg-white shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://vnvc.vn/wp-content/uploads/2017/12/bac-si-bach-thi-chinh.png"
                  alt="BS.CKI Bạch Thị Chính"
                />
                <div className="!px-6 !py-4">
                  <h2 className="text-lg font-semibold text-center text-blue-600">BS.CKI Bạch Thị Chính</h2>
                  <p className="text-center text-gray-600">Giám đốc Y khoa - Hệ thống tiêm chủng VNVC</p>
                </div>
                <div className="!px-6 !py-4 text-center">
                  <a
                    href="https://vnvc.vn/chuyen-gia/bs-bach-thi-chinh/"
                    className="text-blue-600 font-bold text-sm"
                  >
                    TÌM HIỂU THÊM <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </a>
          </div>

          {/* Expert 2 */}
          <div className="w-full sm:w-1/3 lg:w-1/4 !p-4">
            <a href="https://vnvc.vn/chuyen-gia/bs-tong-thi-ngoc-cam/">
              <div className="rounded-lg bg-white shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://vnvc.vn/wp-content/uploads/2022/04/bac-si-cki-tong-thi-ngoc-cam.png"
                  alt="BS.CKI Tống Thị Ngọc Cầm"
                />
                <div className="!px-6 !py-4">
                  <h2 className="text-lg font-semibold text-center text-blue-600">BS.CKI Tống Thị Ngọc Cầm</h2>
                  <p className="text-center text-gray-600">Phó Giám đốc Y khoa miền Bắc - Hệ thống tiêm chủng VNVC</p>
                </div>
                <div className="!px-6 !py-4 text-center">
                  <a
                    href="https://vnvc.vn/chuyen-gia/bs-tong-thi-ngoc-cam/"
                    className="text-blue-600 font-bold text-sm"
                  >
                    TÌM HIỂU THÊM <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </a>
          </div>

          {/* Expert 3 */}
          <div className="w-full sm:w-1/3 lg:w-1/4 !p-4">
            <a href="https://vnvc.vn/chuyen-gia/ths-nguyen-dieu-thuy/">
              <div className="rounded-lg bg-white shadow-lg overflow-hidden">
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://vnvc.vn/wp-content/uploads/2021/10/nguyen-dieu-thuy.png"
                  alt="ThS. Nguyễn Diệu Thúy"
                />
                <div className="!px-6 !py-4">
                  <h2 className="text-lg font-semibold text-center text-blue-600">ThS. Nguyễn Diệu Thúy</h2>
                  <p className="text-center text-gray-600">Chuyên viên Y khoa - Hệ thống tiêm chủng VNVC</p>
                </div>
                <div className="!px-6 !py-4 text-center">
                  <a
                    href="https://vnvc.vn/chuyen-gia/ths-nguyen-dieu-thuy/"
                    className="text-blue-600 font-bold text-sm"
                  >
                    TÌM HIỂU THÊM <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="home_link hidden-xs text-center" style={{ bottom: '2%' }}>
        <div className="!mb-10 font-bold">
          <a className="click-to-chat--btn message-1" href="https://www.messenger.com/t/trungtamtiemchungvnvc" target="_blank" rel="noopener noreferrer">
            <img src="https://vnvc.vn/wp-content/uploads/2025/02/nhan-tin-ngay.png" alt="nhắn tin ngay" width="100" />
            <div className="click-text">
              <div className="message-1-text">Tư vấn nhanh</div>
            </div>
          </a>
        </div>
        <div className="!mb-10 font-bold">
          <a className="click-to-chat--btn message-2" href="tel:+842871026595">
            <img src="https://vnvc.vn/wp-content/uploads/2025/02/goi-ngay.png" alt="gọi ngay" width="100" />
            <div className="click-text">
              <div className="message-2-text">Gọi ngay</div>
            </div>
          </a>
        </div>
        <div className="!mb-10 font-bold">
          <a className="click-to-chat--btn message-3 open_chat" href="javascript:void(0)">
            <img src="https://vnvc.vn/wp-content/uploads/2025/02/icon-chatsf.png" alt="Call" width="100" />
            <div className="click-text">
              <div className="message-2-text">Chat với<br /> Nhân viên tư vấn</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
