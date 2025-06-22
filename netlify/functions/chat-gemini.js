// netlify/functions/chat-gemini.js
// Mantenemos el mismo nombre de archivo para no cambiar el HTML

const COMPANY_CONTEXT = `
Eres el asistente virtual de JRO Asesorías, una empresa especializada en transformación digital empresarial con Power Platform.

INFORMACIÓN DE LA EMPRESA:
- Razón Social: JRO ASESORIAS E.I.R.L.
- RUT: 76.325.663-4
- Fundador: Juan Ramón Ortiz Leiva (Contador Auditor)
- Dirección: Padre Mariano 10, Of. 1303, Providencia, Santiago
- Email: info@duocapital.cl
- Teléfono: +56 9 6689 5746

SERVICIOS PRINCIPALES:
1. Power BI (Tableros Inteligentes)
   - Dashboards en tiempo real
   - KPIs automatizados
   - Reducción del 60% en tiempo de análisis
   - Precio estimado: Desde $1.500.000 CLP

2. Power Apps (Apps Empresariales)
   - Digitalización de procesos
   - Formularios inteligentes
   - Reducción del 85% en errores manuales
   - Precio estimado: Desde $2.000.000 CLP

3. Power Automate (Automatización)
   - Workflows automáticos
   - Procesamiento 24/7
   - Ahorro de 40 horas semanales
   - Precio estimado: Desde $1.200.000 CLP

PROCESO DE TRABAJO:
- Semana 1: Diagnóstico gratuito
- Semana 2: Diseño de solución
- Semana 3-4: Implementación
- Continuo: Optimización y soporte

PROPUESTA DE VALOR:
"Aplicamos el rigor de un auditor a tus datos empresariales"

CASOS DE ÉXITO:
- Manufactura: 16 horas de reportes reducidas a 0
- Retail: 73% más rápido en decisiones
- Logística: 40 horas liberadas por semana

INSTRUCCIONES PARA RESPONDER:
1. Sé profesional pero cercano
2. Enfócate en el valor y ROI, no en aspectos técnicos
3. Siempre ofrece el diagnóstico gratuito
4. Detecta intenciones de compra y urgencia
5. Si preguntan por precios, da rangos y sugiere una llamada
6. Usa emojis con moderación (🚀 📊 ✅)
`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    const { message, history = [] } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'El mensaje es requerido.' })
      };
    }

    // Verificar API key
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      console.error('ERROR: CLAUDE_API_KEY no está configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'El chat está temporalmente deshabilitado. Por favor contáctanos al +56 9 6689 5746' 
        })
      };
    }

    // Construir mensajes para Claude
    const messages = [
      {
        role: "system",
        content: COMPANY_CONTEXT
      }
    ];

    // Agregar historial de conversación
    history.slice(-10).forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    });

    // Agregar mensaje actual
    messages.push({
      role: "user",
      content: message
    });

    // Llamar a Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Modelo más económico y rápido
        messages: messages.slice(1), // Claude no usa system en messages
        system: COMPANY_CONTEXT,
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de Claude API:', errorData);
      throw new Error(errorData.error?.message || 'Error al comunicarse con Claude');
    }

    const data = await response.json();
    const responseText = data.content[0].text;

    // Detectar si es un lead caliente
    const hotLeadKeywords = ['precio', 'costo', 'cuándo', 'urgente', 'necesito', 'contratar', 'empezar', 'reunión', 'diagnóstico'];
    const isHotLead = hotLeadKeywords.some(keyword => 
      message.toLowerCase().includes(keyword) || responseText.toLowerCase().includes(keyword)
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: responseText,
        isHotLead: isHotLead
      })
    };

  } catch (error) {
    console.error('Error en chat-gemini:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Lo siento, hubo un problema al procesar tu solicitud. Por favor contáctanos al +56 9 6689 5746 o envía un email a info@duocapital.cl'
      })
    };
  }
};
