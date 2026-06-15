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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required
        />
      </label>
      <label>
        Correo electronico:
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </label>
      <label>
        Motivo del mensaje:
        <input
          type="text"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
        />
      </label>
      <label>
        Mensaje:
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default MiFormulario;