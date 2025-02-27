import { Button, CardContent, Container, Typography } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import imgTam from "../../assets/vac-xin-pentaxim-1.jpg";

const VaccineDetail = () => {
  return (
    <Container>
      <div className="flex gap-8">
        <div className="w-1/3 ">
          <CardContent className="text-white bg-[#055AB9] rounded-3xl !p-10">
            <Typography
              variant="h5"
              component="div"
              className="font-semibold text-xl"
            >
              Vắc xin Shingrix phòng bệnh Zona thần kinh
            </Typography>
            <Typography sx={{ mb: 1.5 }}>Nguồn gốc: GSK (Bỉ)</Typography>
            <Typography sx={{ mb: 1.5 }}>Phòng bệnh</Typography>
            <Typography sx={{ mb: 1.5 }}>Zona thần kinh</Typography>
            <Typography
              variant="body2"
              className="flex items-center gap-2 !my-10"
            >
              <SellIcon className="text-white" />{" "}
              <span className="text-2xl font-semibold">3,890,000 VNĐ</span>
            </Typography>
            <Button
              size="small"
              className="!bg-[#1F2B75] !text-white !rounded-xl hover:!bg-[#2A388F] transition-all mt-4 w-full !p-3"
            >
              Chọn
            </Button>
          </CardContent>
        </div>
        <div className="w-2/3 ">
          <h2>Mô tả thông tin vắc xin: Vắc xin</h2>
          <div className="!p-10">
            <img src={imgTam} alt="" />
          </div>
          <div className="border-[#2A388F] border-2 rounded-xl">
            <div className="bg-gradient-to-r from-[#052065] via-[#052065] to-[#0780CB] text-[#FBA307] p-4 rounded-tl-xl rounded-tr-xl overflow-hidden">
              <h2>Thông tin vắc xin</h2>
            </div>{" "}
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab nemo
              et asperiores, quisquam veniam maiores rerum necessitatibus, quae
              ipsa velit quis sunt, quaerat autem libero molestias optio
              perferendis beatae distinctio? Atque magni id repellat
              consequuntur blanditiis cupiditate voluptas ratione accusantium
              fuga delectus a voluptates dolorem, dolor at maiores et sit error
              ab tempora distinctio. Porro deleniti fugiat cupiditate laboriosam
              cumque! Architecto excepturi sint harum necessitatibus minima
              cumque dolor voluptate? Molestias, rem similique! Quibusdam vel
              atque nisi repellendus totam dolorem maxime quam animi molestiae,
              mollitia enim tempora illum. Hic, accusantium neque. Quibusdam
              odit quo velit ut temporibus beatae dolorem deserunt, quae placeat
              sit in labore sed facilis molestias adipisci, sapiente illum ipsa
              ab, laborum id magni perspiciatis impedit. Odit, officia iure.
              Quidem, dolores consequuntur exercitationem distinctio nulla
              molestias iure quas voluptatibus saepe fuga eum cupiditate
              perferendis, esse dolore. Similique, optio placeat exercitationem
              saepe esse voluptas aperiam architecto ratione doloremque, enim ab
              tempora distinctio. Porro deleniti fugiat cupiditate laboriosam
              cumque! Architecto excepturi sint harum necessitatibus minima
              cumque dolor voluptate? Molestias, rem similique! Quibusdam vel
              atque nisi repellendus totam dolorem maxime quam animi molestiae,
              mollitia enim tempora illum. Hic, accusantium neque. Quibusdam
              odit quo velit ut temporibus beatae dolorem deserunt, quae placeat
              sit in labore sed facilis molestias adipisci, sapiente illum ipsa
              ab, laborum id magni perspiciatis impedit. Odit, officia iure.
              Quidem, dolores consequuntur exercitationem distinctio nulla
              molestias iure quas voluptatibus saepe fuga eum cupiditate
              perferendis, esse dolore. Similique, optio placeat exercitationem
              saepe esse voluptas aperiam architecto ratione doloremque, enim
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VaccineDetail;
