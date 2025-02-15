import { useState, useEffect } from "react";

const baseURL = "https://vn-public-apis.fpo.vn";

export const useLocationData = () => {
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");

  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${baseURL}/provinces/getAll?limit=-1`);
      const data = await response.json();
      setProvinceList(data.data.data || []);
    } catch (error) {
     // console.error("Lỗi khi lấy danh sách tỉnh:", error);
    }
  };

  // Fetch districts based on selected province
  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await fetch(
        `${baseURL}/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`
      );
      const data = await response.json();
      setDistrictList(data.data.data || []);
    } catch (error) {
      //console.error("Lỗi khi lấy danh sách quận:", error);
      setDistrictList([]);
    }
  };

  // Fetch wards based on selected district
  const fetchWards = async (districtCode) => {
    try {
      const response = await fetch(
        `${baseURL}/wards/getByDistrict?districtCode=${districtCode}&limit=-1`
      );
      const data = await response.json();
      setWardList(data.data.data || []);
    } catch (error) {
      //console.error("Lỗi khi lấy danh sách phường:", error);
      setWardList([]);
    }
  };

  // Build full address
  const buildFullAddress = () => {
    const province =
      provinceList.find((p) => p.code === selectedProvince)?.name_with_type ||
      "";
    const district =
      districtList.find((d) => d.code === selectedDistrict)?.name_with_type ||
      "";
    const ward =
      wardList.find((w) => w.code === selectedWard)?.name_with_type || "";

    return [specificAddress, ward, district, province].filter(Boolean).join(", ");
  };

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
      setSelectedDistrict(""); // Reset district when province changes
      setSelectedWard(""); // Reset ward when province changes
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
      setSelectedWard(""); // Reset ward when district changes
    }
  }, [selectedDistrict]);

  return {
    provinceList,
    districtList,
    wardList,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    specificAddress,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
    setSpecificAddress,
    buildFullAddress,
  };
};
