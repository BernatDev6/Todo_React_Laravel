import React from "react";
import './ProtectedData.css'

export const PrivacyPolicy: React.FC = () => {
  return (
      <div className="protected-data-container">
          <h1 className="title">Política de Privacidad</h1>
          <p className="text">
              En <strong>Mis Notas</strong>, la privacidad de nuestros usuarios es una prioridad.
          </p>
          <h2 className="subtitle">1. Datos Recopilados</h2>
          <p className="text">Recopilamos los siguientes datos personales:</p>
          <ul className="list">
              <li className="list-item">Email</li>
              <li className="list-item">Nombre de usuario</li>
              <li className="list-item">Notas almacenadas</li>
              <li className="list-item">Contraseña (almacenada de forma segura y cifrada)</li>
          </ul>
          <h2 className="subtitle">2. Uso de la Información</h2>
          <p className="text">Los datos se utilizan para:</p>
          <ul className="list">
              <li className="list-item">Iniciar sesión y autenticar usuarios</li>
              <li className="list-item">Almacenar y gestionar las notas del usuario</li>
          </ul>
          <h2 className="subtitle">3. Compartición de Datos</h2>
          <p className="text">No compartimos los datos con terceros.</p>
          <h2 className="subtitle">4. Contacto</h2>
          <p className="text">
              Para cualquier duda sobre esta política, contacta a&nbsp;
              <a href="mailto:faenabernat@gmail.com" className="link">
                  faenabernat@gmail.com
              </a>.
          </p>
      </div>
  );
};

export const LegalNotice: React.FC = () => {
  return (
      <div className="protected-data-container">
          <h1 className="title">Aviso Legal</h1>
          <p className="text">
              Este sitio web, <strong>Mis Notas</strong>, es un proyecto personal de Bernat Font.
          </p>
          <h2 className="subtitle">1. Datos del Responsable</h2>
          <p className="text">
              <strong>Nombre:</strong> Bernat Font <br />
              <strong>Correo de contacto:</strong> faenabernat@gmail.com
          </p>
          <h2 className="subtitle">2. Propiedad Intelectual</h2>
          <p className="text">
              Todo el contenido y código fuente de este sitio es propiedad de Bernat Font, salvo
              indicación contraria.
          </p>
          <h2 className="subtitle">3. Responsabilidad</h2>
          <p className="text">
              No nos hacemos responsables por pérdidas de datos o fallos en el servicio. El
              uso de este sitio es bajo la responsabilidad del usuario.
          </p>
          <h2 className="subtitle">4. Contacto</h2>
          <p className="text">
              Para cualquier consulta, puedes escribir a&nbsp;
              <a href="mailto:faenabernat@gmail.com" className="link">
                  faenabernat@gmail.com
              </a>.
          </p>
      </div>
  );
};
