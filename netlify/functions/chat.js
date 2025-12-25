// ============================================
// NETLIFY FUNCTION - CHAT CON CLAUDE + POWER AUTOMATE
// Archivo: netlify/functions/chat.js
// Para: JRO Asesorías - www.jroasesorias.cl
// ============================================

const SYSTEM_PROMPT = `Eres el Asesor Virtual de JRO Asesorías, experto en servicios de asesoría empresarial en Chile.

IMPORTANTE - MODELO DE NEGOCIO:
JRO Asesorías ofrece servicios EXCLUSIVAMENTE para EMPRESAS. NO atendemos personas naturales ni particulares.

NUESTROS SERVICIOS:
- Asesoría Contable
- Asesoría Tributaria
- Asesoría Financiera
- Asesoría Laboral y Remuneraciones
- Análisis de Datos para toma de decisiones
- Automatización con Power Automate
- Consultoría en gestión empresarial

TU PRIMERA TAREA (antes de todo):
Identificar si el usuario representa a una EMPRESA o es una PERSONA NATURAL.

Preguntas clave para detectar:
- "¿Esta asesoría es para alguna empresa?"
- "¿Qué empresa representa?"
- "¿En qué rubro está su empresa?"

---

FLUJO SEGÚN TIPO DE USUARIO:

A) SI ES PERSONA NATURAL (particular, independiente, busca asesoría personal):
   - Sé amable pero claro
   - Explica: "En JRO Asesorías nos especializamos en servicios para empresas. Para asesoría personal, te recomiendo consultar con un contador o asesor independiente."
   - Despídete cordialmente
   - NO insistas en obtener datos, no es nuestro cliente

B) SI ES EMPRESA (representa a una organización):

---

CONSULTAS SOBRE CAPACITACIÓN:
Si el usuario pregunta por capacitación (cursos, talleres, formación de equipos, etc.) y NO por asesoría:

Responder:
"La capacitación no es nuestra especialidad directa, pero tenemos un aliado estratégico experto en el tema.

Te recomiendo contactar a Tecnipro, especialistas en capacitación empresarial con cobertura SENCE:
Web: https://www.tecnipro.cl

Si en algún momento necesitas asesoría para tu empresa, estaré encantado de ayudarte.

¿Hay algo más en lo que pueda orientarte?"

IMPORTANTE: Si el usuario pregunta por ASESORÍA en temas como análisis de datos, automatización, etc., eso SÍ es nuestro rubro. Solo derivar a Tecnipro cuando sea CAPACITACIÓN, no asesoría.

---

DETECCIÓN DE CLIENTE POTENCIAL GRANDE:
Si el usuario menciona que representa a una empresa de alto valor como:
- Mineras (Codelco, BHP, Antofagasta Minerals, Escondida, Anglo American, etc.)
- Bancos o financieras (Banco de Chile, Santander, BCI, Itaú, etc.)
- Retail grandes (Falabella, Cencosud, Walmart, Ripley, SMU, etc.)
- Constructoras grandes
- Empresas de energía (Enel, AES, Colbún, etc.)
- Isapres o AFP
- Empresas de telecomunicaciones (Entel, Movistar, Claro, WOM)
- Cualquier empresa mediana o grande

ACCIÓN INMEDIATA para cliente grande: Ofrecer contacto directo con la coordinadora:

"¡Excelente! Para una empresa como [nombre empresa], lo mejor es que converse directamente con nuestra coordinadora, quien podrá atenderle de manera personalizada y prioritaria.

Datos de contacto:

Coordinadora: Yessenia González L.
Correo: ygonzalez@duocapital.cl
WhatsApp: https://wa.me/56966895746

¿Prefiere que ella lo contacte a usted? Si es así, déjeme su nombre, teléfono y correo."

IMPORTANTE: No hagas muchas preguntas antes de ofrecer el contacto directo. Si detectas empresa grande, ofrece el canal directo de inmediato.

---

PARA EMPRESAS NORMALES:

TU OBJETIVO PRINCIPAL:
Obtener SIEMPRE los datos de contacto:
- Nombre de contacto
- Nombre de la empresa  
- Teléfono
- Correo electrónico

Si buscan nuestros servicios:
→ Muestra entusiasmo
→ Menciona nuestra experiencia en asesoría empresarial
→ Solicita datos para agendar una reunión de diagnóstico

---

CUANDO OBTENGAS LOS DATOS de un cliente normal:
"¡Excelente [Nombre]! He registrado sus datos. Nuestra coordinadora Yessenia González L. se pondrá en contacto con usted en las próximas 24-48 horas para agendar una reunión de diagnóstico sin costo.

¿Hay algo más en lo que pueda orientarle?"

---

SI EL USUARIO (empresa) NO QUIERE DAR DATOS:
- Primero ofrece una reunión de diagnóstico gratuita como incentivo
- Si insiste en no dar datos, proporciona:

"Entiendo perfectamente. Cuando esté listo, puede contactar directamente a nuestra coordinadora:

Coordinadora: Yessenia González L.
Correo: ygonzalez@duocapital.cl
WhatsApp: https://wa.me/56966895746

¡Que tenga un excelente día!"

---

TONO:
- Conciso (2-4 frases por respuesta)
- Profesional pero cercano
- Nunca invasivo

REGLAS CRÍTICAS DE FORMATO:
- NUNCA uses asteriscos (*) para negritas
- NUNCA uses guiones bajos (_) para cursivas
- NUNCA uses formato Markdown
- Escribe en texto plano natural
- Usa saltos de línea para separar ideas
- NO uses viñetas con guiones, usa frases naturales

REGLAS GENERALES:
- No inventes información sobre servicios o precios
- No agendes reuniones directamente, solo captura datos
- Toda EMPRESA es potencial cliente a largo plazo
- Las personas naturales NO son nuestro mercado`;

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    const { message, conversationId, conversationHistory, endConversation, endReason } = body;

    // Si es fin de conversación, enviar a Power Automate
    if (endConversation && conversationHistory && conversationHistory.length > 0) {
      await sendToPowerAutomate(conversationId, conversationHistory, endReason);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Conversation saved' })
      };
    }

    // Validar mensaje
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message required' })
      };
    }

    // Verificar API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ERROR: ANTHROPIC_API_KEY no está configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'El chat está temporalmente deshabilitado. Por favor contáctanos al +56 9 6689 5746' 
        })
      };
    }

    // Construir mensajes para Claude
    const messages = [];
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      }
    }
    messages.push({ role: 'user', content: message });

    // Llamar a Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Claude API error:', data);
      throw new Error(data.error?.message || 'Claude API error');
    }

    const reply = data.content[0].text;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Lo siento, hubo un problema. Contáctanos al +56 9 6689 5746',
        details: error.message 
      })
    };
  }
};

// Función para enviar a Power Automate
async function sendToPowerAutomate(conversationId, history, endReason) {
  const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK;
  
  if (!webhookUrl) {
    console.error('POWER_AUTOMATE_WEBHOOK not configured');
    return;
  }

  try {
    // Formatear fecha en zona horaria de Chile
    const fecha = new Date().toLocaleString('es-CL', { 
      timeZone: 'America/Santiago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Extraer datos del lead de la conversación
    const leadData = extractLeadData(history);
    
    // Formatear conversación completa en HTML
    const conversacionTexto = history.map(m => {
      const rol = m.role === 'user' ? 'USUARIO' : 'ASISTENTE';
      return `<p><strong>${rol}:</strong><br>${m.content.replace(/\n/g, '<br>')}</p>`;
    }).join('<hr style="border: 1px solid #eee; margin: 15px 0;">');

    // Determinar razón de cierre
    let razonCierre = 'Conversación finalizada';
    if (endReason === 'inactivity') razonCierre = 'Inactividad (5 min)';
    if (endReason === 'chat_closed') razonCierre = 'Usuario cerró el chat';
    if (endReason === 'window_close') razonCierre = 'Usuario cerró ventana';

    // Determinar si es lead (tiene datos de contacto)
    const esLead = !!(leadData.email || leadData.telefono || leadData.empresa);

    // Enviar a Power Automate
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: conversationId,
        fecha: fecha,
        nombre: leadData.nombre,
        empresa: leadData.empresa,
        telefono: leadData.telefono,
        email: leadData.email,
        interes: leadData.interes,
        razonCierre: razonCierre,
        esLead: esLead,
        conversacionCompleta: conversacionTexto,
        totalMensajes: history.length,
        origen: 'JRO Asesorías Web'
      })
    });

    console.log('Conversación enviada a Power Automate:', conversationId);

  } catch (error) {
    console.error('Error sending to Power Automate:', error);
  }
}

// Función para extraer datos del lead de la conversación
function extractLeadData(history) {
  const fullText = history.map(m => m.content).join(' ');
  
  // Patrones para extraer datos
  const emailPattern = /[\w.-]+@[\w.-]+\.\w+/gi;
  const phonePattern = /\+?569?\s?\d{4}\s?\d{4}|\d{9}/g;
  
  const emails = fullText.match(emailPattern);
  const phones = fullText.match(phonePattern);
  
  // Extraer empresa
  let empresa = '';
  const empresaPatterns = [
    /(?:empresa|compañía|trabajo en|represento a|somos de|somos)\s+([^,.\n]+)/i,
    /(?:de la empresa|de la compañía)\s+([^,.\n]+)/i
  ];
  
  for (const pattern of empresaPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      empresa = match[1].trim().substring(0, 100);
      break;
    }
  }
  
  // Extraer nombre
  let nombre = '';
  const nombrePatterns = [
    /(?:mi nombre es|me llamo|soy)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?)/i
  ];
  
  for (const pattern of nombrePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      nombre = match[1].trim();
      break;
    }
  }
  
  // Extraer interés/necesidad
  let interes = '';
  const interesPatterns = [
    /(?:necesito|buscamos|queremos|interesa|necesitamos)\s+(?:asesoría en|asesoría de|ayuda con)?\s*([^,.\n]+)/i
  ];
  
  for (const pattern of interesPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      interes = match[1].trim().substring(0, 200);
      break;
    }
  }
  
  return {
    nombre: nombre,
    empresa: empresa,
    telefono: phones ? phones[0] : '',
    email: emails ? emails[0] : '',
    interes: interes
  };
}
