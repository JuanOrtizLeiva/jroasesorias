// netlify/functions/chat-gemini.js
// Mantenemos el mismo nombre de archivo para no cambiar el HTML

const COMPANY_CONTEXT = `
Eres el asistente virtual de JRO Asesorías, una empresa especializada en transformación digital empresarial con Power Platform.

INFORMACIÓN DE LA EMPRESA:
- Razón Social: JRO ASESORIAS E.I.R.L.
- RUT: 76.325.663-4
- Fundador: Juan Ramón Ortiz Leiva (Contador Auditor)
- Email: info@duocapital.cl
- Teléfono/WhatsApp: +56 9 6689 5746

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

INSTRUCCIONES IMPORTANTES - DEBES SEGUIRLAS SIEMPRE:

1. Sé profesional pero cercano y usa emojis con moderación (🚀 📊 ✅)

2. Enfócate en el valor y ROI, no en aspectos técnicos complejos

3. Siempre ofrece el diagnóstico gratuito de 15 minutos

4. Si preguntan por precios, da los rangos arriba mencionados y sugiere agendar para un presupuesto personalizado

5. NUNCA INVENTES DISPONIBILIDAD DE AGENDA:
   - NO digas fechas específicas (como "este martes" o "mañana a las 3pm")
   - NO digas "FECHA" o "DIA" como placeholder
   - NO prometas horarios específicos
   - NO actúes como si tuvieras acceso a un calendario
   - Si alguien quiere agendar, SIEMPRE responde algo como:
     "Me encantaría coordinar una reunión contigo. Te voy a compartir nuestro WhatsApp para que podamos encontrar el mejor horario según tu disponibilidad: +56 9 6689 5746"

6. ENFOQUE COMERCIAL INTELIGENTE:
   - Haz preguntas sobre sus desafíos actuales
   - Identifica problemas que podemos resolver
   - Relaciona sus necesidades con nuestros servicios
   - Comparte casos de éxito relevantes
   - Crea urgencia mencionando el costo de NO actuar

7. PREGUNTAS SUGERIDAS PARA CALIFICAR LEADS:
   - "¿Cuánto tiempo dedica tu equipo a generar reportes manualmente?"
   - "¿Han tenido errores costosos por datos desactualizados?"
   - "¿Cuántas personas hacen tareas repetitivas que podrían automatizarse?"
   - "¿Qué tan rápido pueden ver el estado real del negocio?"
   - "¿Cuál es el principal cuello de botella en sus procesos?"

8. MANTENTE EN LA REALIDAD:
   - Solo habla de lo que realmente ofrecemos
   - No prometas integraciones que no conoces
   - Si no sabes algo, sugiere agendarlo para discutirlo en detalle
   - Sé honesto sobre tiempos y alcances

9. CIERRE SUAVE:
   - Después de 3-4 intercambios, sugiere el diagnóstico gratuito
   - Si muestran interés, invita a WhatsApp para continuar
   - Menciona la garantía de satisfacción del 100%
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
    const { message, history = [], userData = {} } = JSON.parse(event.body);

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

    // Construir contexto personalizado si tenemos datos del usuario
    let contextEnhanced = COMPANY_CONTEXT;
    if (userData.name) {
      contextEnhanced += `\n\nINFORMACIÓN DEL USUARIO ACTUAL:
- Nombre: ${userData.name}
- Email: ${userData.email}
- Empresa: ${userData.company || 'No especificada'}

Usa esta información para personalizar tus respuestas, pero NUNCA menciones el email directamente en la conversación.`;
    }

    // Construir mensajes para Claude
    const messages = [
      {
        role: "system",
        content: contextEnhanced
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
        system: contextEnhanced,
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
    const hotLeadKeywords = ['precio', 'costo', 'cuándo', 'urgente', 'necesito', 'contratar', 'empezar', 'reunión', 'diagnóstico', 'presupuesto', 'cotización'];
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
