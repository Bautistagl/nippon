import React from 'react';

const Secciones = () => {
  return (
    <div className='contenedor-secciones'>
      <h1> Por qué elegirnos?</h1>

    <div className="secciones">
      <div className="tres-fotos">
        <div> <img alt='' src='/icono1.png' className='icono-iconos'/> </div>
        <div> <img alt='' src='/icono2.png' className='icono-iconos'/> </div>
        <div> <img alt='' src='/icono3.png' className='icono-iconos'/> </div>
      </div>


      <div className="separadores">
          <div className="separador">
            <p>1</p>
          </div>
          <div className="separador">
            <p>DOS</p>
          </div>
          <div className="separador">
            <p>TRES</p>
          </div>
        </div>

      <div className="tres-textos">
        <div className='texto-seccion'>
          <h2> Calidad, diseño e innoviación</h2>
          <p>
            Modernas macetas con amplia variedad de tamaños, para interior y exterior
          </p>
        </div>
        <div className='texto-seccion'>
          <h2> Fabricación, embalado y transporte</h2>
          <p>
           Compromoiso con el trabajo completo, desde la fabricación hasta la entrega del producto
          </p>
        </div>
        <div className='texto-seccion'>
          <h2> Líder en fabricación de macetas</h2>
          <p>
            Referente de macetas de terracota y plástico rotomodelado, con luz y cazuelas esmaltadas.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Secciones;
