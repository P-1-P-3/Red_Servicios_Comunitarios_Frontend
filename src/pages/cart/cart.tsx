import React, { useState, useEffect } from 'react';
const API_URL_BK = import.meta.env.VITE_API_URL_BK || 'http://localhost:8080';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`${API_URL_BK}/cart`); 
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error conectando con el backend:", error);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Función para simular el cálculo del total (puedes adaptarla según los datos de tu API)
  const calcularTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  };

  return (
    <div style={{ 
      padding: '30px', 
      maxWidth: '650px', 
      margin: '40px auto', 
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
      borderRadius: '12px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      
      {/* Encabezado con Icono Estilizado */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#333', fontSize: '24px', margin: '0 0 8px 0' }}>🛒 Mi Carrito de Servicios</h2>
        <p style={{ color: '#777', margin: 0, fontSize: '14px' }}>Gestiona los servicios comunitarios que deseas contratar</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#555' }}>
          <p>Cargando tus servicios seleccionados...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
          <p style={{ fontSize: '16px' }}>Tu carrito está vacío actualmente.</p>
        </div>
      ) : (
        <div>
          {/* Tabla de Productos/Servicios */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #edf2f7', color: '#4a5568', fontSize: '14px' }}>
                <th style={{ padding: '12px 8px' }}>Servicio</th>
                <th style={{ padding: '12px 8px', textAlign: 'center' }}>Cantidad</th>
                <th style={{ padding: '12px 8px', textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #edf2f7', color: '#2d3748', fontSize: '15px' }}>
                  <td style={{ padding: '16px 8px' }}>
                    <span style={{ fontWeight: '600', color: '#1a202c' }}>
                      {item.serviceName || `Servicio #${item.serviceId || item.id}`}
                    </span>
                  </td>
                  <td style={{ padding: '16px 8px', textAlign: 'center', color: '#718096' }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: '16px 8px', textAlign: 'right', fontWeight: '500' }}>
                    ${((item.price || 25000) * item.quantity).toLocaleString('es-CO')} COP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Sección del Total Resaltada */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '20px 10px',
            borderTop: '2px solid #edf2f7',
            marginBottom: '25px'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: '#4a5568' }}>Total Estimado:</span>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#1a202c' }}>
              ${calcularTotal() > 0 ? calcularTotal().toLocaleString('es-CO') : (25000 * cartItems.length).toLocaleString('es-CO')} COP
            </span>
          </div>

          {/* Botón de Acción Principal Azul */}
          <button style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#007bff',
            color: '#white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 123, 255, 0.15)',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          onClick={() => alert('¡Procesando solicitud de servicios comunitarios!')}
          >
            Confirmar y Solicitar Servicios
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;