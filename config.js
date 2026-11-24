/**
 * ====================================================================
 * CONFIGURACIÓN DE NUESTRA HISTORIA
 * ====================================================================
 * Puedes modificar los datos a continuación con tus fechas, nombres,
 * fotos y mensajes personales. ¡Todo se actualizará automáticamente en la página!
 */

const CONFIG = {
  // Nombres
  partnerName: "Yami", // Nombre de ella
  yourName: "Daniel",  // Tu nombre (cámbialo si prefieres un apodo)

  // Fechas clave (Formato: AAAA-MM-DDTHH:MM:SS)
  dates: {
    // Fecha en que comenzó su relación
    startDate: "2025-12-07T00:00:00",
    
    // Fecha en que se tomó la pausa / se separaron
    pauseDate: "2026-10-01T00:00:00",
    
    // Si decides preactivar el reinicio (false = comienza pausado, true = reanudado)
    isReopened: false
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

  // Galería de momentos especiales
  // Puedes reemplazar los links con fotos tuyas (poniéndolas en la misma carpeta o con URLs de internet)
  memories: [
    {
      title: "El día en que todo comenzó",
      date: "07 de Diciembre, 2025",
      description: "Esa mirada y esa conversación que me hicieron darme cuenta de que contigo todo era diferente.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Nuestras risas interminables",
      date: "Una tarde inolvidable",
      description: "Cuando el tiempo volaba y cualquier lugar se convertía en el mejor del mundo solo porque estabas a mi lado.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Los pequeños detalles",
      date: "Momentos cotidianos",
      description: "Caminar tomados de la mano, compartir una comida, esos instantes sencillos que hoy valen un universo.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Lugares que guardan tu sonrisa",
      date: "Nuestro rincón favorito",
      description: "Cada sitio al que fuimos quedó marcado con tu recuerdo y con las promesas que guardo en el alma.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
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
