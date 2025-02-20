import React from "react";

import { Container, Grid, Typography, IconButton, Link } from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";

import PublicIcon from "@mui/icons-material/Public";

import { motion } from "framer-motion";

import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-[#2a388f] text-[#FFD700] py-8 !mt-10">
      {" "}
      {/* Set background color to blue and text to yellow */}
      <Container>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Thông tin vaccine */}
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                VNVC - Chăm sóc sức khỏe cộng đồng
              </Typography>
              <Typography variant="body2" color="white">
                {" "}
                {/* Set text to white */}
                Cung cấp các dịch vụ tiêm phòng an toàn, hiệu quả cho mọi lứa
                tuổi. Với đội ngũ chuyên gia y tế giàu kinh nghiệm, chúng tôi
                cam kết bảo vệ sức khỏe của bạn và gia đình.
              </Typography>
            </motion.div>
          </Grid>

          {/* Liên hệ */}
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Liên Hệ
              </Typography>
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <Typography variant="body1" color="white">
                  {" "}
                  {/* Set text to white */}
                  Hotline: 028 7102 6595
                </Typography>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <PublicIcon />
                <Link
                  href="https://vnvc.vn"
                  target="_blank"
                  rel="noopener"
                  color="inherit"
                >
                  website: vnvc.vn
                </Link>
              </div>
            </motion.div>
          </Grid>

          {/* Mạng xã hội */}
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Kết Nối Với Chúng Tôi
              </Typography>
              <div className="flex gap-6 justify-center">
                <IconButton
                  color="inherit"
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                >
                  <Facebook fontSize="large" />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Twitter"
                >
                  <Twitter fontSize="large" />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                >
                  <Instagram fontSize="large" />
                </IconButton>
              </div>
            </motion.div>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm text-white">
          {" "}
          {/* Set copyright text to white */}
          <Typography variant="body2" color="inherit">
            © 2025 VNVC. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
