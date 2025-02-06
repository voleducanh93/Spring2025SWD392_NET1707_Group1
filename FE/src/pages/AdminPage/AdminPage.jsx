import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";
import { User, Settings, Plus, Trash, Edit } from "lucide-react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Mark Lee", email: "mark@example.com", role: "User" },
];

export default function AdminPage() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [newUserData, setNewUserData] = useState({ name: "", email: "", role: "User" });

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: "User",
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = () => {
    setUsers(users.map(user => (user.id === editingUser.id ? { ...editingUser, ...newUserData } : user)));
    setEditingUser(null);
    setNewUserData({ name: "", email: "", role: "User" });
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-gray-700">
            <User className="w-10 h-10 text-blue-500" />
            <span className="text-2xl font-bold">{users.length}</span>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between text-gray-700">
            <Settings className="w-10 h-10 text-gray-500" />
            <Button variant="outline">Manage</Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
          <Button onClick={addUser} variant="primary" className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add User
          </Button>
        </div>
        {editingUser && (
          <div className="mb-4 p-4 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold">Edit User</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              className="p-2 border rounded w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              className="p-2 border rounded w-full mb-2"
            />
            <button onClick={updateUser} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
          </div>
        )}
        <Table className="mt-4 w-full border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="p-3 text-gray-700">ID</TableHead>
              <TableHead className="p-3 text-gray-700">Name</TableHead>
              <TableHead className="p-3 text-gray-700">Email</TableHead>
              <TableHead className="p-3 text-gray-700">Role</TableHead>
              <TableHead className="p-3 text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-100">
                <TableCell className="p-3">{user.id}</TableCell>
                <TableCell className="p-3">{user.name}</TableCell>
                <TableCell className="p-3">{user.email}</TableCell>
                <TableCell className="p-3">{user.role}</TableCell>
                <TableCell className="p-3 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingUser(user)}>
                    <Edit className="w-4 h-4" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                    <Trash className="w-4 h-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}