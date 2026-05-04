import { useState } from "react";
import { createService, deleteService, updateService } from "../helpers/crudServices";

export const useCreatedService = () => {
    const [newService, setNewService] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createService(data);
            if (response.status === 'error')
                throw new Error(response.message);
            
            alert("Servicio creado exitosamente!");
            setNewService(response.data);
            return response.data;
        } catch (error: any) {
            setError(error.message);
            alert(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { newService, loading, error, create };
}

export const useUpdatedService = () => {
    const [updatedService, setUpdatedService] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateService(data);
            if (response.status === 'error')
                throw new Error(response.message);
            alert("Servicio actualizado exitosamente!");
            setUpdatedService(response.data);
            return response.data;
        } catch (error: any) {
            setError(error.message);
            alert(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { updatedService, loading, error, update };
}

export const useDeletedService = () => {
    const [deletedService, setDeletedService] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const delete_ = async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await deleteService(data);
            if (response.status === 'error')
                throw new Error(response.message);
            alert("Servicio eliminado exitosamente!");
            setDeletedService(response.status);
            return response.status;
        } catch (error: any) {
            setError(error.message);
            alert(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deletedService, loading, error, delete_ };
}
