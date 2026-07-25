import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instructions for Pastelería Dulce Delicia Virtual Assistant
const SYSTEM_INSTRUCTION = `
Eres el asistente virtual interactivo de "Pastelería Dulce Delicia", una afamada pastelería artesanal de estilo rústico moderno.
Tu propósito es transmitir creatividad, calidad, calidez y mucha confianza a los clientes.

Tus funciones principales:
1. Dar la bienvenida con un tono cercano, cálido, alegre y familiar.
2. Presentar y explicar nuestro catálogo de postres artesanales:
   - Pasteles artesanales (Zanahoria Rústico, Red Velvet, Tres Leches Ferrero, Frutos del Bosque).
   - Cheesecakes horneados (Maracuyá, Lotus Biscoff, San Sebastián Vasco).
   - Gelatinas Creativas y Artísticas (Mosaico Floral 3D inyectada a mano, Queso con Zarzamora).
   - Cupcakes Gourmet (Cajas regalo de 6 o 4 piezas de Ferrero/Nutella).
   - Fresas con Chocolate (Caja Luxury con polvo de oro de 12 piezas, Ramo floral comestible).
   - Vasitos Dulces / Verrines (Tiramisú al espresso, Carlota de Limón, Banoffee).
3. Explicar las 2 modalidades de pedido:
   - "En Vitrina (Para Hoy)": Productos recién horneados y listos para llevar al momento o envío express.
   - "Personalizado (Con Anticipación)": Pasteles a la medida para eventos/celebraciones (cumpleaños, bodas, aniversarios) pidiéndolos con 3 a 5 días de anticipación.
4. Responder dudas sobre horarios (Lunes-Sábado 9am-8pm, Domingo 10am-6pm), ubicación (Av. Del Valle 415), precios, envíos a domicilio y formas de pago.
5. Promocionar el ambiente acogedor y fotogénico de la tienda: mesas de madera rústica, rincón floral con neón ideal para fotos de Instagram, café de especialidad y espacio pet-friendly.
6. Facilitar pedidos directos recomendando armar el carrito en la web o enviar mensaje directo por WhatsApp.

Estilo de comunicación:
- Cercano, alegre, entusiasta y profesional.
- Breve, claro y estructurado con viñetas cuando aplique.
- Utiliza siempre emojis relacionados con dulzura y repostería (🎂, 🧁, 🍓, 🍮, ✨, 🍰, ☕, 📸, 💝).
- Si el usuario quiere cotizar o comprar, anímalo amablemente a presionar el botón de "Pedido Personalizado" o "Agregar al Carrito".
`;

// API endpoint for Chat assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Mensaje requerido.' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback smart rule-based assistant response when GEMINI_API_KEY is missing
      const lower = message.toLowerCase();
      let reply = '¡Hola! 💖 Bienvenido a **Pastelería Dulce Delicia** 🍰✨ Soy tu asistente dulcero. ';

      if (lower.includes('horario') || lower.includes('hora') || lower.includes('abierto')) {
        reply += 'Nuestros horarios son:\n• **Lunes a Sábado:** 9:00 AM – 8:00 PM\n• **Domingo:** 10:00 AM – 6:00 PM ⏰\n¡Te esperamos con el café calientito y la vitrina llena de postres frescos! ☕🧁';
      } else if (lower.includes('ubicacion') || lower.includes('donde') || lower.includes('direccion') || lower.includes('llegar')) {
        reply += 'Nos ubicamos en **Av. Del Valle 415, Col. Jardines del Dulce** (a 2 cuadras del Parque Principal) 📍. ¡Nuestro local de estilo rústico moderno es super acogedor y fotogénico para tus fotos! 📸✨';
      } else if (lower.includes('personalizado') || lower.includes('evento') || lower.includes('cumple') || lower.includes('boda') || lower.includes('cotiz')) {
        reply += '¡Nos encanta crear pasteles personalizados para tus momentos especiales! 🎂🎨\n\nTe sugerimos solicitarlo con **3 a 5 días de anticipación**. Puedes seleccionar tus sabores, rellenos y decoraciones rústicas en nuestra sección de **"Pedido Personalizado"** aquí en la página o enviarnos tu idea por WhatsApp. 📲💝';
      } else if (lower.includes('fresa') || lower.includes('chocolate') || lower.includes('ramo')) {
        reply += '¡Nuestras **Fresas con Chocolate** son el regalo estrella! 🍓🍫\nTenemos la *Caja Luxury* con 12 piezas decoradas con polvo de oro comestible ($340) y el *Ramo Floral de Fresas* ($480). ¡Son deliciosas y súper románticas! 🎁✨';
      } else if (lower.includes('vitrina') || lower.includes('hoy') || lower.includes('listo')) {
        reply += '¡Hoy en nuestra vitrina tenemos deliciosos Cheesecakes de Maracuyá, Pastel Rústico de Zanahoria, Gelatinas 3D Florales, Cupcakes y Vasitos Dulces listos para llevar! 🧁🍰\n\nPuedes agregarlos a tu carrito y pedirlos para entrega inmediata o recolección. 🛒';
      } else {
        reply += 'Te platico un poco de lo que tenemos hoy para ti: 🍰\n\n• **Pasteles Artesanales & Cheesecakes** 🎂\n• **Gelatinas Creativas 3D** 🍮\n• **Fresas con Chocolate & Cupcakes** 🍓🧁\n• **Vasitos Dulces Individuales** 🍨\n\n¿Buscas algo listo para hoy en vitrina o deseas cotizar un pastel personalizado para un festejo? 😊✨';
      }

      res.json({ reply });
      return;
    }

    // Convert past messages if provided
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(chatHistory)) {
      chatHistory.slice(-6).forEach((item: any) => {
        if (item.sender && item.text) {
          contents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || '¡Uy, se me cruzaron las espátulas un segundito! 🎂 Por favor vuelve a preguntarme y te responderé con mucho gusto. ✨';

    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.json({
      reply: '¡Hola dulce cliente! 💖 Tuvimos una pequeña pausa técnica, pero con gusto te ayudo: Puedes revisar nuestro catálogo en la página o contactarnos directamente por WhatsApp para tomar tu pedido con atención personalizada. 📲🎂',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🍓 Pastelería Dulce Delicia Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
