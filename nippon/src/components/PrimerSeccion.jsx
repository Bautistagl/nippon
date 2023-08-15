import Image from 'next/image';
import React from 'react';

const PrimerSeccion = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1> • Fábrica de Terracota y Plástico Rotomoldeado •</h1>
        <div className="contenedor-primer">
            <div className="textos-primer">
                <h1 style={{ fontSize: '3.5rem' }}> NIPPON </h1>
                <div className="parrafo-primer">
                    Somos una empresa especializada en la fabricación de macetas de
                    terracota, plástico rotomoldeado, macetas con luz y cazuelas
                    esmaltadas.
                </div>
                 <div className="parrafo-primer">
                    Suministramos nuestros productos a distribuidores y mayoristas.
                </div>
                <div className="parrafo-primer">
                    Innovación, calidad y compromiso son los valores principales en
                    donde yacen los cimientos de nuestra marca.
                </div>
            </div>
            <img src='/fotoEjemplo.jpg'
                    className='imagen-primer'
                    alt="Descripción de la imagen"
                    />
      </div>
    </div>
  );
};

export default PrimerSeccion;
