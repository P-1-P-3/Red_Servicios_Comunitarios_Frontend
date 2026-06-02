import { useState, type SubmitEvent } from "react";
import { useCreatedService, useDeletedService, useUpdatedService } from "../../hooks/useFetchService";

const CreateService = () => {
    const [formData, setFormData] = useState({
        service_id: '',
        name: '',
        description: '',
        type: '',
        price: 0,
        currency: '',
        location: '',
        average_rating: 0,
        user_id: 'fa796b66-49ef-4300-84b5-cf0fde44ab2f'
    });

    const { create } = useCreatedService();
    const { update } = useUpdatedService();
    const { delete_ } = useDeletedService();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.type === 'number'
            ? setFormData({
                ...formData,
                [e.target.name]: parseFloat(e.target.value)
            })
            : setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
    };

    const onDelete = async () => {
        try {
            await delete_(formData);
            setFormData({
                service_id: '',
                name: '',
                description: '',
                type: '',
                price: 0,
                currency: '',
                location: '',
                average_rating: 0,
                user_id: 'fa796b66-49ef-4300-84b5-cf0fde44ab2f'
            });
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.price <= 0) {
            alert('El precio debe ser un valor positivo');
            return;
        }
        
        try {
            if (formData.service_id) {
                await update({...formData, serviceId: formData.service_id});
                return;
            }

            const newService = await create(formData);
            setFormData({ ...newService as any });
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card shadow-lg p-4 rounded">
                <h2 className="text-center mb-4">Crear Servicio</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre Servicio</label>
                        <input 
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control"
                            name="name"
                            required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <input 
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="description"
                            className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input 
                            onChange={(e) => handleChange(e)}
                            type="number" 
                            name="price"
                            className="form-control"
                            required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Moneda</label>
                        <input 
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="currency"
                            className="form-control" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ubicación</label>
                        <input 
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="location"
                            className="form-control"
                            required />
                    </div>

                    {
                        formData.service_id ? (
                            <>
                                <button type="submit" className="btn btn-primary w-100">Guardar Cambios</button>
                                <button className="btn btn-danger w-100" onClick={onDelete}>Eliminar Servicio</button>
                            </>
                        ) : (
                            <button type="submit" className="btn btn-primary w-100">Crear Servicio</button>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default CreateService;