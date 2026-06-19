'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function MiFormulario() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos enviados:', {
      nombre,
      correo,
      motivo,
      mensaje,
    });
    router.push('/'); 
  };

  return (
    <div className="app-shell simple-center">
      <section className="pokemon-section simple-card">
        <h1 className="section-title">Contacta con nosotros</h1>
        <p className="section-subtitle">Cuéntanos tu duda, sugerencia o idea para mejorar la Pokedex.</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="correo">Correo electronico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="motivo">Motivo del mensaje</label>
            <input
              id="motivo"
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </div>

          <button className="primary-btn" type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default MiFormulario;