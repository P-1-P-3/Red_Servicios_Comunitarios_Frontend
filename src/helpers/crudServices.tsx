export const createService = async (data: any) => {
    const urlEpisodes: string = `http://localhost:8080/service/`;
    const response = await fetch(urlEpisodes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'        
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const updateService = async (data: any) => {
    const urlEpisodes: string = `http://localhost:8080/service/`;
    const response = await fetch(urlEpisodes, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'       
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const deleteService = async (data: any) => {
    const urlEpisodes: string = `http://localhost:8080/service/${data.service_id}`;
    const response = await fetch(urlEpisodes, {
        method: 'DELETE'
    });
    return await response.json();
};