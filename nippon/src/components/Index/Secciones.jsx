import React from 'react';

const Secciones = () => {
  return (
    <div className='contenedor-secciones'>
      <h1> Por qué elegirnos?</h1>

    <div className="secciones">
      <div className="tres-fotos">
        <div> <img alt='' src='/1.svg' className='icono-iconos'/> </div>
        <div> <img alt='' src='/2.svg' className='icono-iconos'/> </div>
        <div> <img alt='' src='/3.svg' className='icono-iconos'/> </div>
      </div>


      {/* <div className="separadores">
          <div className="separador">
            <p>1</p>
          </div>
          <div className="separador">
            <p>2</p>
          </div>
          <div className="separador">
            <p>3</p>
          </div>
          <img alt='' src='/lineasBien2.png'/>
        </div> */}

      <div className="tres-textos">
        <div className='texto-seccion'>
          <h2>Simplicidad, belleza e innovacion.</h2>
          <p>
            Modernas macetas con amplia variedad de tamaños, para interior y exterior
          </p>
        </div>
        <div className='texto-seccion'>
          <h2> De la fábrica a tu espacio, sin problemas.</h2>
          <p>
           Compromoiso con el trabajo completo, desde la fabricación hasta la entrega del producto
          </p>
        </div>
        <div className='texto-seccion'>
          <h2>Soluciones versátiles para todo tipo de ambientes.</h2>
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
