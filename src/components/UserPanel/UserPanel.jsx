import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../../services/userService";
import Modal from "../Modal/Modal"; 
import EditUserForm from "../EditUserForm/EditUserForm";
import Button from "../Buttons/Button"
import "./UserPanel.css";

const UsersPanel = () => {
  const queryClient = useQueryClient();
  const [formFilters, setFormFilters] = useState({ name: "", username: "", email: "", rol: "" });
  const [filters, setFilters] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", filters],
    queryFn: async () => {
    try {
      const params = {};
      if (filters.name) params.name = filters.name;
      if (filters.username) params.username = filters.username;
      if (filters.email) params.email = filters.email;
      if (filters.rol) params.rol = filters.rol;
      const response = await userService.search(params);
      return response.data;
    } catch {
      return [];
    }
    },
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="users-panel">
      <h2 className="users-panel-title">📔Gestión de Usuarios</h2>

      <div className="users-filters">
        <input
        type="text"
        placeholder="Buscar por nombre"
        value={formFilters.name}
        onChange={(e) => setFormFilters({ ...formFilters, name: e.target.value })}
        />
        <input
        type="text"
        placeholder="Buscar por username"
        value={formFilters.username}
        onChange={(e) => setFormFilters({ ...formFilters, username: e.target.value })}
        />
        <input
        type="text"
        placeholder="Buscar por email"
        value={formFilters.email}
        onChange={(e) => setFormFilters({ ...formFilters, email: e.target.value })}
        />
        <select
          value={formFilters.rol}
          onChange={(e) => setFormFilters({ ...formFilters, rol: e.target.value })}
        >
          <option value="">Todos los roles</option>
          <option value="usuario">Usuario</option>
          <option value="administrador">Administrador</option>
        </select>
        <Button onClick={() =>{ setFilters({ ...formFilters }); setFormFilters({ name: "", username: "", email: "", rol: "" })}} text='Buscar' />
      </div>

      {isLoading && <div className="users-panel-msg">Cargando...</div>}
      {isError && (
        <div className="users-panel-msg error">
          Error: "No se pudieron cargar los usuarios"
        </div>
      )}
      {!isLoading && !isError && users.length === 0 && (
        <div className="users-panel-msg">No hay usuarios registrados.</div>
      )}
      {!isLoading && !isError && users.length > 0 && (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>USUARIO</th>
                <th>EMAIL</th>
                <th>ROL</th>
                <th>FECHA REGISTRO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>
                    {u.registrationDate ? new Date(u.registrationDate).toLocaleDateString(): "-"}
                  </td>
                  <td className="td-buttons">
                    <Button className="edit-btn" onClick={() => openModal(u)} text = 'Editar' />
                    <Button className="delete-btn" onClick={() => {deleteMutation.mutate(u._id)}} text ='Eliminar' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedUser && (
          <EditUserForm user={selectedUser} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default UsersPanel;