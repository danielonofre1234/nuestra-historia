/**
 * ====================================================================
 * CONFIGURACIÓN DE NUESTRA HISTORIA
 * ====================================================================
 * Puedes modificar los datos a continuación con tus fechas, nombres,
 * fotos y mensajes personales. ¡Todo se actualizará automáticamente en la página!
 */

window.CONFIG = {
  // Nombres
  partnerName: "Yami", // Nombre de ella
  yourName: "Daniel",  // Tu nombre (cámbialo si prefieres un apodo)

  // Fechas clave (Formato: AAAA-MM-DDTHH:MM:SS)
  dates: {
    // Fecha en que comenzó su relación (5:00 PM)
    startDate: "2025-12-07T17:00:00",
    
    // Fecha en que se tomó la pausa / se separaron (2:00 PM)
    pauseDate: "2026-10-01T14:00:00",
    
    // Si decides preactivar el reinicio (false = comienza pausado, true = reanudado)
    isReopened: false,

    // Frase exclusiva para la vela
    candleQuote: "Una vela no pierde su luz solo porque se apague un momento; basta un pequeño destello para volver a iluminar todo.",

    // Frase exclusiva para el reloj de tiempo
    clockQuote: "El reloj se detuvo en una fecha, pero cada instante vivido a tu lado sigue latiendo en mi corazón."
  },

  // Número de WhatsApp para recibir su respuesta (opcional, en formato internacional sin espacios ni '+', ej: "5215512345678")
  whatsappNumber: "", 

  // Música de fondo romántica (puedes usar un enlace a un archivo MP3 en la web o colocar un archivo local como 'cancion.mp3')
  // Usamos una suave melodía instrumental de piano romántico de alta calidad por defecto:
  music: {
    url: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c8907849e7.mp3?filename=romantic-piano-112199.mp3",
    title: "Nuestra Melodía",
    artist: "Piano Romántico"
  },

  // Carta sincera y profunda
  letter: {
    title: "Una carta desde el fondo de mi corazón",
    previewText: "Hay cosas que las palabras normales no alcanzan a decir, pero el silencio tampoco puede guardar más...",
    paragraphs: [
      "Quise crear este rincón porque hay memorias que son demasiado valiosas para dejarlas en el olvido. Sé que nuestra historia tuvo momentos difíciles y que en algún punto el camino se volvió confuso, pero el cariño y el respeto que siento por ti nunca han cambiado.",
      "Mirando hacia atrás, no solo recuerdo los errores; recuerdo cada sonrisa cómplice, las pláticas interminables de madrugada, las risas que solo tú y yo entendíamos, y esa sensación única de sentirme en casa cuando estaba contigo.",
      "Este reloj que ves arriba se detuvo en una fecha que dolió, pero también me enseñó a valorar lo que verdaderamente importa. No pretendo borrar el pasado ni fingir que nada pasó, sino invitarte a mirarnos con ojos nuevos, con más madurez, con más paciencia y con el corazón abierto.",
      "Si sientes en tu corazón que aún queda algo por lo que valga la pena luchar, me encantaría volver a empezar, pasito a pasito, sin prisas, pero con la certeza de que aprendí a quererte mejor. Y si no es así, quiero que sepas que siempre desearé lo más hermoso para tu vida.",
      "Gracias por cada segundo vivido. El reloj espera por ti..."
    ],
    closing: "Con todo mi cariño siempre,"
  },

  // Galería de momentos especiales con fotografías reales
  memories: [
    {
      id: 1,
      title: "Pedaleando en el Bosque de Aragón",
      date: "19 de Diciembre, 2025 • 3:06 PM",
      badge: "Bosque de Aragón",
      description: "Nuestra primera vez en el Bosque de Aragón. Pedaleando sin prisa entre los árboles, disfrutando de cada risa y dándome cuenta de que cualquier camino es el más bonito si tú vas a mi lado.",
      image: "assets/images/foto1.jpeg"
    },
    {
      id: 2,
      title: "Mi lugar seguro en tus brazos",
      date: "27 de Diciembre, 2025 • 7:00 PM",
      badge: "PowerCenter Coacalco • Mi paz",
      description: "Esa tarde en Coacalco donde el mundo se detuvo. Terminar el día cerquita de ti, con ese abrazo tuyo que me da toda la calma del universo.",
      image: "assets/images/foto2.jpeg"
    },
    {
      id: 3,
      title: "Nuestra tarde de plastilina y risas",
      date: "27 de Diciembre, 2025 • 7:00 PM",
      badge: "PowerCenter Coacalco • Creatividad",
      description: "Esa misma tarde creando a la ranita y al pollito entre risas y ocurrencias. Son esos detalles sencillos y espontáneos contigo los que guardo como los tesoros más grandes.",
      image: "assets/images/foto3.jpeg"
    },
    {
      id: 4,
      title: "Bajo la sombra de Chapultepec",
      date: "14 de Febrero, 2026 • 1:30 PM",
      badge: "San Valentín en Chapultepec",
      description: "Nuestro 14 de febrero recostados bajo los árboles de Chapultepec. Mirar el cielo a tu lado y sentir que no necesitaba nada más en el mundo, porque el mejor regalo eras tú.",
      image: "assets/images/foto4.jpeg"
    },
    {
      id: 5,
      title: "Cómplices en el Museo Bimbo",
      date: "20 de Abril, 2026 • 6:50 PM",
      badge: "Museo Bimbo",
      description: "Una visita diferente, dulce y llena de sonrisas. Pararnos frente al espejo a tomarnos esta foto y ver en tu mirada a mi compañera favorita de aventuras.",
      image: "assets/images/foto5.jpeg"
    },
    {
      id: 6,
      title: "La magia de Tepoztlán contigo",
      date: "16 de Agosto, 2026 • 2:00 PM",
      badge: "Tepoztlán, Pueblo Mágico",
      description: "Frente al quiosco y las letras de Tepoztlán. Caminar por sus calles empedradas de tu mano me enseñó que la verdadera magia de ese viaje no era el pueblo, eras tú.",
      image: "assets/images/foto6.jpeg"
    }
  ],

  // Razones por las que te quiero de vuelta / Razones por las que vales la pena
  reasons: [
    "Porque tu sonrisa tiene la capacidad de iluminar hasta mis días más oscuros.",
    "Porque contigo aprendí lo que significa conectar de verdad con otra alma.",
    "Porque las mejores cosas de la vida requieren valentía, y tú siempre has valido cada esfuerzo.",
    "Porque aún me quedan mil abrazos pendientes que solo te pertenecen a ti."
  ]
};
