import React, { useState, useEffect } from 'react';
import { getMedicines, createMedicine, updateMedicine, deleteMedicine, reduceDosage } from '../api';

function Medicine() {
    const [medicines, setMedicines] = useState([]);
    const [form, setForm] = useState({ name: '', dosage: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const meds = await getMedicines();
            setMedicines(meds);
            setShowError(false);
        } catch (error) {
            setError('Error occurred while fetching medicines: ' + error.message);
            setShowError(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateMedicine(editingId, form);
            } else {
                await createMedicine(form);
            }
            setForm({ name: '', dosage: '', description: '' });
            setEditingId(null);
            fetchMedicines();
            setShowError(false);
        } catch (error) {
            setError('Error occurred: ' + error.message);
            setShowError(true);
        }
    };

    const handleEdit = (medicine) => {
        setForm(medicine);
        setEditingId(medicine._id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteMedicine(id);
            fetchMedicines();
        } catch (error) {
            setError('Error occurred while deleting medicine: ' + error.message);
            setShowError(true);
        }
    };

    const handleReduceDosage = async (id) => {
        try {
            await reduceDosage(id);
            fetchMedicines();
        } catch (error) {
            setError('Error occurred while reducing dosage: ' + error.message);
            setShowError(true);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <div className="container mt-5">
    {error && showError && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" className="close" aria-label="Close" onClick={handleCloseError}>
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    )}

    <div className="card border-0 shadow-sm mb-5">
        <div className="card-header bg-primary text-white">Medicine Form</div>
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="number"
                        name="dosage"
                        placeholder="Dosage"
                        value={form.dosage}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                    />
                </div>
                <div className="form-group mb-4">
                    <textarea
                        name="description"
                        placeholder="Description(optional)"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        rows="3"
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-sm mr-2">
                    {editingId ? 'Update' : 'Add'} Medicine
                </button>
                {editingId && (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    </div>

    <h3 className="mb-3">Medicines</h3>
    <ul className="list-group">
        {medicines.map((medicine) => (
            <li key={medicine._id} className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm">
                <span className="text-muted">
                    <b>Name:</b> {medicine.name} ,<b> Dosage:</b> {medicine.dosage} dosage left
                    {medicine.description ? <> ,<strong> Description:</strong> {medicine.description}</> : ''}
                </span>
                <div>
                    <button onClick={() => handleEdit(medicine)} className="btn btn-info btn-sm mr-2">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(medicine._id)} className="btn btn-danger btn-sm mr-2">
                        Delete
                    </button>
                    <button onClick={() => handleReduceDosage(medicine._id)} className="btn btn-warning btn-sm">
                        Take medicine
                    </button>
                </div>
            </li>
        ))}
    </ul>
</div>

    );
}

export default Medicine;









