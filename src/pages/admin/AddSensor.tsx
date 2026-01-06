// src/pages/admin/AddSensor.tsx
import React, { useState } from "react";
import { createSensor } from "../../services/sensorService";
import styles from "./AddSensor.module.css";
import {CreateSensorPayload} from "../../models/CreateSensorPayload";

const AddSensor: React.FC = () => {
    const [form, setForm] = useState<CreateSensorPayload>({
        name: "",
        location: "",
        is_active: true,
        temp_min: null,
        temp_max: null,
        hum_min: null,
        hum_max: null,
        last_seen_at: null,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]:
                type === "checkbox"
                    ? checked
                    : value === ""
                        ? null
                        : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await createSensor({
                ...form,
                temp_min: form.temp_min ? Number(form.temp_min) : null,
                temp_max: form.temp_max ? Number(form.temp_max) : null,
                hum_min: form.hum_min ? Number(form.hum_min) : null,
                hum_max: form.hum_max ? Number(form.hum_max) : null,
            });

            setSuccess("Capteur créé avec succès ✅");
            setForm({
                name: "",
                location: "",
                is_active: true,
                temp_min: null,
                temp_max: null,
                hum_min: null,
                hum_max: null,
                last_seen_at: null,
            });
        } catch (err) {
            setError("Erreur lors de la création du capteur ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>➕ Ajouter un capteur</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Nom du capteur"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="location"
                    placeholder="Localisation"
                    value={form.location}
                    onChange={handleChange}
                    required
                />

                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={form.is_active}
                        onChange={handleChange}
                    />
                    Actif
                </label>

                <div className={styles.grid}>
                    <input
                        type="number"
                        name="temp_min"
                        placeholder="Température min"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="temp_max"
                        placeholder="Température max"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="hum_min"
                        placeholder="Humidité min"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="hum_max"
                        placeholder="Humidité max"
                        onChange={handleChange}
                    />
                </div>

                <button disabled={loading}>
                    {loading ? "Création..." : "Créer le capteur"}
                </button>

                {success && <p className={styles.success}>{success}</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default AddSensor;
