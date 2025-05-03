import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "photohub_preset"); // ✅ your unsigned preset

  const cloudName = "dzkxgilzq"; // ✅ your Cloudinary cloud name

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data // ✅ THIS IS THE FIX!
  );

  return res.data.secure_url;
};
