import React, { useState, useEffect } from "react";
import "./Styles/Perfil.css";

// Import de fotos
import BancoAlimentos from "../Categorias/SeccionesCategorias/VerTodo/Imagenes/BancoAlimentosLogo.png";

// Importar íconos
import dineroEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/card-outline.svg';
import comidaEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/fast-food-outline.svg';
import asistenciaEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/alarm-outline.svg';
import hogarEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/home-outline.svg';
import escolarEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/school-outline.svg';
import ropaEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/shirt-outline.svg';
import medicamentosEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/medkit-outline.svg';
import juguetesEtiqueta from '../Categorias/SeccionesCategorias/VerTodo/Imagenes/extension-puzzle-outline.svg';

const categorias = [
    { name: "dinero", label: "Dinero", icon: dineroEtiqueta },
    { name: "comida", label: "Comida", icon: comidaEtiqueta },
    { name: "asistencia", label: "Asistencia", icon: asistenciaEtiqueta },
    { name: "hogar", label: "Hogar", icon: hogarEtiqueta },
    { name: "escolar", label: "Escolar", icon: escolarEtiqueta },
    { name: "ropa", label: "Ropa", icon: ropaEtiqueta },
    { name: "medicamentos", label: "Salud", icon: medicamentosEtiqueta },
    { name: "juguetes", label: "Juguetes", icon: juguetesEtiqueta }
];

const Perfil = () => {
    const [editMode, setEditMode] = useState(false);
    const [showAccountManagement, setShowAccountManagement] = useState(false);
    const [profile, setProfile] = useState({
        logo: BancoAlimentos,
        name: "Nombre de la organización",
        hours: "Horarios de atención",
        email: "correo@example.com",
        phone: "123456789",
        address: "Dirección de la organización",
        descripcion: "Cambiar descripción",
        donaciones: []
    });
    const [initialProfile, setInitialProfile] = useState({});
    const [accountInfo, setAccountInfo] = useState({
        username: "nombreUsuario",
        email: "correo@example.com",
        password: ""
    });
    const [newAccountInfo, setNewAccountInfo] = useState(accountInfo);
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setInitialProfile({ ...profile });
    }, []);

    const validateProfileForm = () => {
        let errors = {};
        let isValid = true;

        if (!profile.name.trim()) {
            errors.name = "Por favor ingresa el nombre de la organización.";
            isValid = false;
        }

        if (!profile.hours.trim()) {
            errors.hours = "Por favor ingresa los horarios de atención.";
            isValid = false;
        }

        if (!profile.address.trim()) {
            errors.address = "Por favor ingresa la dirección.";
            isValid = false;
        }

        if (!profile.phone.trim()) {
            errors.phone = "Por favor ingresa el número de teléfono.";
            isValid = false;
        } else if (!/^\d+$/.test(profile.phone)) {
            errors.phone = "El número de teléfono debe contener solo números.";
            isValid = false;
        }

        if (!profile.email.trim()) {
            errors.email = "Por favor ingresa el correo electrónico.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
            errors.email = "Ingresa un correo electrónico válido.";
            isValid = false;
        }

        if (!profile.descripcion.trim()) {
            errors.descripcion = "Por favor ingresa una descripción.";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const validateAccountForm = () => {
        let errors = {};
        let isValid = true;

        if (!newAccountInfo.email.trim()) {
            errors.email = "Por favor ingresa el correo electrónico.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(newAccountInfo.email)) {
            errors.email = "Ingresa un correo electrónico válido.";
            isValid = false;
        }

        if (!currentPassword) {
            errors.currentPassword = "Por favor ingresa la contraseña actual.";
            isValid = false;
        }

        if (newAccountInfo.password !== confirmPassword) {
            errors.confirmPassword = "Las nuevas contraseñas no coinciden.";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleProfileUpdate = (formData) => {
        if (validateProfileForm()) {
            setProfile(formData);
            setEditMode(false);
            setMessage("Perfil actualizado exitosamente.");
            setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        } else {
            setMessage("Por favor completa correctamente todos los campos.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile({
                ...profile,
                logo: reader.result
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        setProfile((prevProfile) => {
            const updatedDonaciones = checked
                ? [...prevProfile.donaciones, name]
                : prevProfile.donaciones.filter((donacion) => donacion !== name);
            return { ...prevProfile, donaciones: updatedDonaciones };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProfileUpdate(profile);
    };

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setNewAccountInfo({
            ...newAccountInfo,
            [name]: value
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        if (!validateAccountForm()) {
            return;
        }
        if (currentPassword !== accountInfo.password) {
            setMessage('La contraseña actual no es correcta.');
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        setAccountInfo(newAccountInfo);
        setShowAccountManagement(false);
        setMessage('Se ha realizado un cambio en la cuenta.');
        setTimeout(() => setMessage(""), 3000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro que deseas eliminar tu cuenta?')) {
            // Lógica para eliminar la cuenta
            setMessage('Tu cuenta ha sido eliminada exitosamente.');
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleEditProfile = () => {
        setInitialProfile({ ...profile }); // Guarda una copia del perfil actual
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setProfile({ ...initialProfile }); // Restaura el perfil inicial
        setEditMode(false);
    };

    return (
        <div className="PerfilContainer">
            <h2 className="TituloPerfil">Configuración de tu Perfil</h2>
            <div className="ProfileInformation">
                <div className="InfoGridContainer">
                    <div className="containerFoto">
                        <img src={profile.logo} alt="Foto de perfil" className="ImagePerfil" />
                    </div>
                    <div className="containerTextoPerfil">
                        {editMode ? (
                            <form onSubmit={handleSubmit} className="FormPerfil">
                                <div className="mb-3">
                                    <label className="form-label">Nombre de la Organización</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Horarios de atención</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.hours ? 'is-invalid' : ''}`}
                                        name="hours"
                                        value={profile.hours}
                                        onChange={handleChange}
                                    />
                                    {errors.hours && <div className="invalid-feedback">{errors.hours}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Dirección</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        name="address"
                                        value={profile.address}
                                        onChange={handleChange}
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                                        name="descripcion"
                                        value={profile.descripcion}
                                        onChange={handleChange}
                                    />
                                    {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cambiar Imagen de Perfil</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <h3 className="TituloDropdown">Seleccione qué donaciones recibe</h3>
                                    {categorias.map((categoria) => (
                                        <div className="form-check" key={categoria.name}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={categoria.name}
                                                checked={profile.donaciones.includes(categoria.name)}
                                                onChange={handleCheckChange}
                                            />
                                            <label className="form-check-label" htmlFor={categoria.name}>
                                                {categoria.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" className="btn btn-primary" id="BotonGuardarPerfil">Guardar</button>
                                <button type="button" onClick={handleCancelEdit} className="btn btn-secondary" id="btnCancelarEdicion">Cancelar</button>

                                {message && <div className="alert alert-success mt-3">{message}</div>}
                            </form>
                        ) : showAccountManagement ? (
                            <div className="AccountManagement">
                                <h3 className="ManejoDeCuentaTitulo">Gestión de cuenta</h3>
                                <form onSubmit={handleAccountSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={newAccountInfo.email}
                                            onChange={handleAccountChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña Actual</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                                            name="currentPassword"
                                            value={currentPassword}
                                            onChange={handleCurrentPasswordChange}
                                        />
                                        {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={newAccountInfo.password}
                                            onChange={handleAccountChange}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Repetir Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                        />
                                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                    </div>
                                    <div className="BotonesCambiarDatos">
                                        <button type="submit" className="btn btn-primary" id="BotonGuardarCambioCuenta">Guardar Cambios</button>
                                        <button type="button" onClick={handleDeleteAccount} className="btn btn-danger" id="BotonEliminarCambioCuenta">Eliminar Cuenta</button>
                                    </div>
                                    <button onClick={() => setShowAccountManagement(!showAccountManagement)} className="btn btn-secondary" id="btnCancelarEdicion">Cancelar</button>

                                    {message && <div className="alert alert-success mt-3">{message}</div>}
                                </form>
                            </div>
                        ) : (
                            <div className="ContainerDataSave">
                                <h2>{profile.name}</h2>
                                <div id="etiquetasContainer">
                                    {profile.donaciones.map((donacion, index) => {
                                        const categoria = categorias.find(cat => cat.name === donacion);
                                        return (
                                            <div className="EtiquetaContainer" key={index}>
                                                <img src={categoria.icon} id="EtiquetaCard" alt={categoria.label} />
                                                <p className="TituloEtiqueta">{categoria.label}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="DataPefil"><span className="DatoSave">Horarios: </span>{profile.hours}</p>
                                <p className="DataPefil"><span className="DatoSave">Email: </span> {profile.email}</p>
                                <p className="DataPefil"><span className="DatoSave">Teléfono: </span> {profile.phone}</p>
                                <p className="DataPefil"><span className="DatoSave">Dirección: </span> {profile.address}</p>
                                <p className="DataPefil descripcion"><span className="DatoSave">Descripción: </span> {profile.descripcion}</p>
                                <button onClick={handleEditProfile} className="btn btn-primary" id="btnEditarPerfil">Editar Perfil</button>
                                <button onClick={() => setShowAccountManagement(!showAccountManagement)} className="btn btn-secondary" id="btnGestionCuenta">Gestión de cuenta</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;

