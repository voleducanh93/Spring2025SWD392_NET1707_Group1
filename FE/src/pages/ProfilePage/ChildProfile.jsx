import  { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useChildren } from "../../hooks/useChildren";
import {
  Card,
  CardContent,
  Button,
  Avatar,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CakeIcon from "@mui/icons-material/Cake";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddChildModal from "../../components/ChildrenInput/CreateChildren";

const ChildProfile = () => {
  const { vaccines: children,addChildren,  removeChildren } = useChildren();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddChild = (newChild) => {
    addChildren.mutateAsync(newChild);
  };
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="container mx-auto p-6">
  //       <Alert severity="error">
  //         {error.message || "Lỗi khi tải dữ liệu. Vui lòng thử lại."}
  //       </Alert>
  //     </div>
  //   );
  // }

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa hồ sơ này không?")) {
      removeChildren.mutate(id);
    }
  };

  return (
    <div className="!container !mx-auto !p-6">
      {/* Header */}
      <div className="flex !justify-between !items-center !mb-6">
        <Typography variant="h5" className="!font-bold !text-gray-800">
          Trẻ của bạn
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          className="!bg-blue-500 hover:!bg-blue-600 hover:scale-105 transition-all !rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          Đăng ký trẻ
        </Button>
      </div>
      {/* Child List */}
      {children != null && children.length > 0 ? (
          children.map((child) => (
            <Grid item xs={12} sm={6} key={child.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="!w-full"
              >
                <Card className="!shadow-lg hover:!shadow-xl !border-2 !border-blue-300 !rounded-2xl !p-4 bg-gradient-to-r from-blue-100 to-blue-50">
                  <CardContent className="flex !gap-4 !items-center">
                    {/* Avatar */}
                    <Avatar
                      src={child.imageUrl}
                      alt={child.fullName}
                      sx={{
                        width: 90,
                        height: 90,
                        border: "4px solid white",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <div className="!flex-grow">
                      <Typography
                        variant="h6"
                        className="!font-bold !text-gray-900"
                      >
                        {child.fullName}
                      </Typography>
                      <div className="flex !items-center !gap-2 !text-gray-600">
                        <CakeIcon fontSize="small" />{" "}
                        {new Date(child.dateOfBirth).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                      <div className="flex !items-center !gap-6 !mt-2 !text-gray-700">
                        <div className="flex !items-center !gap-1">
                          <HeightIcon fontSize="small" /> {child.height} cm
                        </div>
                        <div className="flex !items-center !gap-1">
                          <FitnessCenterIcon fontSize="small" /> {child.weight}{" "}
                          kg
                        </div>
                      </div>
                    </div>
                    <div className="flex !flex-col !items-center !gap-2">
                      <IconButton
                        color="primary"
                        className="!text-blue-500 hover:!text-blue-700 transition-all"
                        onClick={() => navigate(`/edit-child/${child.childId}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        className="!text-red-500 hover:!text-red-700 transition-all"
                        onClick={() => handleDelete(child.childId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" className="text-center !text-gray-500">
              Chưa có trẻ em nào được tạo.
            </Typography>
          </Grid>
        )}
      <AddChildModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} onAddChild={handleAddChild} />
    </div>
  );
};

export default ChildProfile;
