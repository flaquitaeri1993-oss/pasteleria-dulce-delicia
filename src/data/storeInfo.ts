import { FAQItem } from '../types';

export const STORE_INFO = {
  name: 'Pastelería Dulce Delicia',
  slogan: 'Pastelería Artesanal • Estilo Rústico Moderno',
  address: 'Av. Del Valle 415, Col. Jardines del Dulce (A 2 cuadras del Parque Principal)',
  city: 'Ciudad Dulce, México',
  phone: '+52 (55) 8765-4321',
  whatsappNumber: '525587654321',
  whatsappFormatted: '+52 55 8765 4321',
  email: 'hola@dulcedelicia.com',
  instagram: '@dulcedelicia.pasteleria',
  hours: {
    weekdays: 'Lunes a Sábado: 9:00 AM – 8:00 PM',
    sunday: 'Domingo: 10:00 AM – 6:00 PM',
  },
  ambienceHighlights: [
    {
      title: 'Ambiente Cálido y Acogedor',
      desc: 'Mesas de madera rústica, iluminación cálida y aroma a pan horneado al momento.',
      icon: 'Coffee'
    },
    {
      title: 'Rincón Fotogénico & Instagrammable',
      desc: 'Muro floral, neón dulce y rincones especiales para capturar momentos inolvidables.',
      icon: 'Camera'
    },
    {
      title: 'Espacio Familiar & Pet Friendly',
      desc: 'Terraza techada con tazones de agua y premios caseros para tus mascotas.',
      icon: 'Heart'
    },
    {
      title: 'Café de Especialidad',
      desc: 'Marida tus postres con expresso, capuchino o tés artesanales 100% orgánicos.',
      icon: 'Sparkles'
    }
  ]
};

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Pedidos Personalizados',
    question: '¿Con cuánta anticipación debo solicitar un pastel personalizado?',
    answer: 'Para diseños personalizados de eventos (cumpleaños, bodas, bautizos) recomendamos pedir con 3 a 5 días de anticipación. Si lo necesitas con urgencia, ¡pregunta en nuestro chat o WhatsApp por nuestra lista de pasteles express listos en 24 horas! 🎂'
  },
  {
    id: 'faq-2',
    category: 'Productos en Vitrina',
    question: '¿Puedo pasar a comprar directamente sin pedido previo?',
    answer: '¡Por supuesto! Todos los días tenemos nuestra vitrina surtida con pasteles enteros de 10 personas, rebanadas, cheesecakes, gelatinas 3D, cupcakes, fresas con chocolate y vasitos dulces listos para llevar al momento. 🧁'
  },
  {
    id: 'faq-3',
    category: 'Envíos y Entregas',
    question: '¿Cuentan con servicio a domicilio?',
    answer: 'Sí, entregamos a domicilio dentro de la ciudad con transporte especializado en cadena de frío y cuidado de repostería delicada. El costo de envío se calcula según tu código postal al confirmar por WhatsApp. 🚗📦'
  },
  {
    id: 'faq-4',
    category: 'Opciones Dietéticas',
    question: '¿Tienen opciones sin gluten, sin azúcar o keto?',
    answer: '¡Sí! Contamos con nuestro Cheesecake San Sebastián sin gluten natural, gelatinas bajas en azúcar y opciones keto bajo pedido previo. En la ficha de cada producto indicamos sus etiquetas dietéticas. 🌿'
  },
  {
    id: 'faq-5',
    category: 'Formas de Pago',
    question: '¿Qué formas de pago aceptan?',
    answer: 'En tienda aceptamos efectivo, tarjetas de crédito/débito y transferencia bancaria. Para pedidos en línea aceptamos transferencia, cobro con tarjeta o anticipo del 50% por transferencia y saldo contra entrega. 💳'
  }
];
