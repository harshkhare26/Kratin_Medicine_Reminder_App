const API_BASE_URL = 'http://localhost:5000/api'; // Adjust this URL to match your server

// Helper function to handle response
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return response.json();
};

// Medicine API Calls
export const getMedicines = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        throw error;
    }
};

export const createMedicine = async (medicine) => {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error adding medicine:', error);
        throw error;
    }
};

export const updateMedicine = async (id, medicine) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error updating medicine:', error);
        throw error;
    }
};

export const deleteMedicine = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error deleting medicine:', error);
        throw error;
    }
};

export const reduceDosage = async (id) => {
   
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/reduce`, {
            method: 'PATCH'
        });
        return await handleResponse(response)
    } catch (error) {
        console.error('Error reducing dosage', error);
        throw error;
    }
};



