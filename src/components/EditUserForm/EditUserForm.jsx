import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import editUserSchema from "./editUserValidation";
import userService from "../../services/userService";
import Button from "../Buttons/Button";
import "./EditUserForm.css";


const EditUserForm = ({ user, onClose }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      rol: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        rol: user.rol || "usuario",
      });
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: ({ id, userData }) => userService.updateUser(id, userData),
    onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Usuario actualizado correctamente");
        onClose();
      },
      onError: (err) => {
        console.error('Error al actualizar el usuario', err)
        toast.error("Error al actualizar");
      },
    }
  );

  const onSubmit = (data) => {
    updateMutation.mutate({ id: user._id, userData: data });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Editar Usuario</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" {...register("name")} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" {...register("username")} />
        {errors.username && (<span className="error">{errors.username.message}</span>)}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" {...register("email")}/>
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="edit-buttons">
        <Button type="submit" text={updateMutation.isLoading ? "Guardando..." : "Guardar"} disabled={updateMutation.isLoading} />
      </div>
    </form>
  );
};

export default EditUserForm;