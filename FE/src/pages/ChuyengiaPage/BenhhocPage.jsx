import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const categories = [
  { name: 'Tổng quát', icon: '🩺', path: '/tong-quat' },
  { name: 'Vắc xin', icon: '💉', path: '/vaccinene' },
  { name: 'Bệnh truyền nhiễm', icon: '🤒', path: '/truyen-nhiem' },
  { name: 'Hô hấp', icon: '🌬️', path: '/ho-hap' },
  { name: 'Cơ thể trẻ', icon: '🧒', path: '/co-the-tre' },
  { name: 'COVID-19', icon: '🦠', path: '/covid19' },
  { name: 'Nhi khoa', icon: '👶', path: '/nhi' },
  { name: 'Tiêu hóa', icon: '🍽️', path: '/tieu-hoa' },
  { name: 'Dị ứng', icon: '🤧', path: '/di-ung' },
];

export default function BenhHocPage() {
  const navigate = useNavigate();

  return (
    <div className="!min-h-screen !bg-gray-100 !flex !items-center !justify-center !p-6">
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 160,
          left: 120,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#f5f5f5",
          p: 1,
          borderRadius: 2,
          "&:hover": { backgroundColor: "#e0e0e0" },
        }}
      >
        <ArrowBackIcon />
        <Typography variant="body1">Back</Typography>
      </IconButton>
      <div className="!max-w-4xl !bg-white !p-8 !rounded-2xl !shadow-xl !border !border-gray-200">
        
        <h1 className="!text-4xl !font-bold !text-blue-700 !mb-6 !text-center">
          
          Thông tin bệnh học nhi khoa
        </h1>
        <div className="!grid !grid-cols-3 !gap-6 !text-center">
          {categories.map((category) => (
            <div
              key={category.name}
              className="!flex !flex-col !items-center !cursor-pointer !transition-transform !hover:scale-105"
              onClick={() => navigate(category.path)}
            >
              <div className="!w-24 !h-24 !flex !items-center !justify-center !bg-blue-600 !text-white !text-3xl !rounded-full">
                {category.icon}
              </div>
              <p className="!mt-2 !text-gray-700 !font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}