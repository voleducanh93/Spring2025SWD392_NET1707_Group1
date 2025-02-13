import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { Plus, Trash, Edit } from "lucide-react";

import AddIcon from "@mui/icons-material/Add";

const initialVaccines = [
  {
    id: 1,
    name: "Pfizer",
    description: "COVID-19 Vaccine",
    manufacturer: "Pfizer Inc.",
    sideEffect: "Mild fever",
    diseasePrevented: "COVID-19",
    price: 20,
    status: "Available",
    injectionSite: "Arm",
    preserve: "Cold storage",
    notes: "Store at -70C",
  },
  {
    id: 2,
    name: "Moderna",
    description: "COVID-19 Vaccine",
    manufacturer: "Moderna Inc.",
    sideEffect: "Headache",
    diseasePrevented: "COVID-19",
    price: 22,
    status: "Available",
    injectionSite: "Arm",
    preserve: "Cold storage",
    notes: "Store at -20C",
  },
];

const initialVaccineInventory = [
  {
    id: 1,
    vaccineId: 1,
    batchNumber: "B12345",
    manufacturingDate: "2023-01-15",
    initialQuantity: 500,
    quantityInStock: 200,
    supplier: "Pfizer Inc.",
    expiryDate: "2025-01-15",
  },
  {
    id: 2,
    vaccineId: 2,
    batchNumber: "M56789",
    manufacturingDate: "2023-02-10",
    initialQuantity: 400,
    quantityInStock: 150,
    supplier: "Moderna Inc.",
    expiryDate: "2025-02-10",
  },
];

export default function ManagerPage() {
  const [vaccines, setVaccines] = useState(initialVaccines);
  const [vaccineInventory, setVaccineInventory] = useState(
    initialVaccineInventory
  );

  const handleDeleteVaccine = (id) => {
    setVaccines(vaccines.filter((vaccine) => vaccine.id !== id));
  };

  const handleDeleteInventory = (id) => {
    setVaccineInventory(
      vaccineInventory.filter((inventory) => inventory.id !== id)
    );
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Vaccine Management</h1>
      <Button variant="contained" startIcon={<AddIcon />}>
        Add User
      </Button>
      {/* Vaccine List */}

      <Card className="shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Vaccines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Side Effects</TableHead>
                <TableHead>Disease Prevented</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccines.map((vaccine) => (
                <TableRow key={vaccine.id}>
                  <TableCell>{vaccine.id}</TableCell>
                  <TableCell>{vaccine.name}</TableCell>
                  <TableCell>{vaccine.description}</TableCell>
                  <TableCell>{vaccine.manufacturer}</TableCell>
                  <TableCell>{vaccine.sideEffect}</TableCell>
                  <TableCell>{vaccine.diseasePrevented}</TableCell>
                  <TableCell>${vaccine.price}</TableCell>
                  <TableCell>{vaccine.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteVaccine(vaccine.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vaccine Inventory */}
      <Card className="shadow-lg bg-white">
        <CardHeader>
          <CardTitle>Vaccine Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Manufacturing Date</TableHead>
                <TableHead>Initial Quantity</TableHead>
                <TableHead>Quantity in Stock</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vaccineInventory.map((inventory) => (
                <TableRow key={inventory.id}>
                  <TableCell>{inventory.id}</TableCell>
                  <TableCell>{inventory.batchNumber}</TableCell>
                  <TableCell>{inventory.manufacturingDate}</TableCell>
                  <TableCell>{inventory.initialQuantity}</TableCell>
                  <TableCell>{inventory.quantityInStock}</TableCell>
                  <TableCell>{inventory.supplier}</TableCell>
                  <TableCell>{inventory.expiryDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteInventory(inventory.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
