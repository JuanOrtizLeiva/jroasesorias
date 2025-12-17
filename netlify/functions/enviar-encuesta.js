// netlify/functions/enviar-encuesta.js
// Esta función actúa como puente seguro entre el HTML y Power Automate

export const handler = async (event) => {
  // Configurar headers CORS para permitir solicitudes
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Manejar preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Solo permitir método POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  try {
    const datos = JSON.parse(event.body);

    // Tu URL de Power Automate
    const PA_URL = "https://default52e9ead995344c3e8a0061f968b975.0b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/c32d62bfe2af4f67921c991b36acead5/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QxnqLlqpo9zKoU7FIb7ASMhltYtfUiN_I8F9jML9RKU";

    // Enviamos los datos a Power Automate desde el servidor
    const response = await fetch(PA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      throw new Error(`Error en Power Automate: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Datos enviados con éxito" }),
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
