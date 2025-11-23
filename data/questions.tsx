import React from 'react';
import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué haces cuando te duele la cabeza por estudiar tanto (o por salir de fiesta)?",
    unit: "8",
    hintTitle: "Dolor y Remedios",
    hintContent: <ul className="list-disc pl-5"><li><strong>Me duele</strong> la cabeza.</li><li>Imperativo: <em>Tómate algo y cállate un rato.</em></li></ul>
  },
  {
    id: 2,
    text: "Describe al chico/a que te gustaba en el colegio. ¿Era guapo/a? ¿Tonto/a?",
    unit: "9",
    hintTitle: "Imperfecto (Descripción)",
    hintContent: <ul className="list-disc pl-5"><li>Ser: <strong>era...</strong></li><li>Tener: <strong>tenía...</strong></li><li><em>Era un poco feo pero simpático.</em></li></ul>
  },
  {
    id: 3,
    text: "Cuéntame la peor cita (date) que tuviste el año pasado/O la peor tarde que tuviste.",
    unit: "10",
    hintTitle: "Pretérito Indefinido",
    hintContent: <p>Usa verbos de acción: <em>Llegó tarde, olió mal, no pagó, me fui corriendo...</em></p>
  },
  {
    id: 4,
    text: "Tu amigo huele mal. Dale tres consejos sin ser demasiado cruel (o sí).",
    unit: "8",
    hintTitle: "Dar Consejos (Imperativo)",
    hintContent: <ul className="list-disc pl-5"><li><strong>Dúchate</strong> más.</li><li><strong>Usa</strong> desodorante.</li><li><strong>Lava</strong> tu ropa, por favor.</li></ul>
  },
  {
    id: 5,
    text: "¿Qué solías hacer los veranos para no morir de aburrimiento de niñ@?",
    unit: "9",
    hintTitle: "Hábitos en el pasado (Imperfecto)",
    hintContent: <p><em>Molestaba a mi hermana, veía la tele todo el día, comía arena...</em></p>
  },
  {
    id: 6,
    text: "Estás en el baño público y no hay papel. Grita una historia de ayuda a tu amigo.",
    unit: "10",
    hintTitle: "Narración dramática",
    hintContent: <ul className="list-disc pl-5"><li><strong>De repente</strong> me di cuenta...</li><li><strong>Entonces</strong> grité...</li><li><strong>Resulta que</strong> nadie me oyó.</li></ul>
  },
  {
    id: 7,
    text: "¿Alguna vez has vomitado en público? ¿Cómo pasó? Y si no, ¿alguna vez has llegado muy tarde a algo? ",
    unit: "8 + 10",
    hintTitle: "Salud + Narración",
    hintContent: <p>Combina vocabulario del cuerpo con el pretérito: <em>Comí algo malo y vomité en el zapato de mi profesora.</em></p>
  },
  {
    id: 8,
    text: "Compara la música de hoy (que es horrible) con la de antes.",
    unit: "9",
    hintTitle: "Antes vs. Ahora",
    hintContent: <ul className="list-disc pl-5"><li><strong>Antes</strong> la música tenía letra.</li><li><strong>Hoy en día</strong> es solo ruido.</li></ul>
  },
  {
    id: 9,
    text: "Te quedaste dormido en clase. Explica qué estaba pasando cuando te despertaste.",
    unit: "10",
    hintTitle: "Estaba + Gerundio (Interrupción)",
    hintContent: <p><em>El profesor estaba gritando mi nombre cuando abrí los ojos.</em></p>
  },
  // BONUS SQUARE 1
  {
    id: 10,
    text: "¡El profe te dice: 'Marca la asistencia y tira los dados de nuevo'!",
    unit: "EXTRA",
    hintTitle: "¡BONUS!",
    hintContent: <p>Has tenido suerte. ¡Tira otra vez!</p>,
    specialType: 'BONUS'
  },
  {
    id: 11,
    text: "Menciona tres partes del cuerpo que te duelen después de una noche de fiesta loca... O de un mes loco de exámenes.",
    unit: "8",
    hintTitle: "El Cuerpo Humano",
    hintContent: <p>La cabeza (resaca), los pies (de bailar), el estómago (de beber).</p>
  },
  {
    id: 12,
    text: "¿Cuál es el invento más estúpido del siglo XX? ¿Por qué?",
    unit: "9",
    hintTitle: "Historia y Opinión",
    hintContent: <ul className="list-disc pl-5"><li><em>Creo que el palo-selfie es ridículo.</em></li><li><em>Me parece que...</em></li></ul>
  },
  {
    id: 13,
    text: "Tu compañero está histérico por el examen PP2. Dile que se calme.",
    unit: "8",
    hintTitle: "Estados de ánimo + Consejos",
    hintContent: <p><em>¡Cállate un poco! ¡Relájate! ¡No seas pesado!</em></p>
  },
  {
    id: 14,
    text: "Estabas besando a tu novio/a y de repente... (completa la frase).",
    unit: "10",
    hintTitle: "Imperfecto vs Pretérito",
    hintContent: <p><em>...entró mi madre / su perro me mordió / se le cayeron los dientes.</em></p>
  },
  {
    id: 15,
    text: "¿Qué te da asco? ¿Qué te da miedo?",
    unit: "10",
    hintTitle: "Expresar emociones",
    hintContent: <ul className="list-disc pl-5"><li><strong>Me da asco</strong> la gente que escupe.</li><li><strong>Me dan miedo</strong> las cucarachas voladoras.</li></ul>
  },
  {
    id: 16,
    text: "¿Qué estabas haciendo ayer a las 3 de la mañana? (Di la verdad).",
    unit: "10",
    hintTitle: "Estar + Gerundio (Pasado)",
    hintContent: <p><em>Estaba durmiendo (mentira), estaba viendo TikToks, estaba comiendo pizza fría.</em></p>
  },
  {
    id: 17,
    text: "Tienes gripe y mocos. Describe tus síntomas de forma muy dramática.",
    unit: "8",
    hintTitle: "Enfermedades y Síntomas",
    hintContent: <p><em>Me estoy muriendo, no puedo respirar, me duele hasta el pelo.</em></p>
  },
  {
    id: 18,
    text: "Debate: ¿Es mejor vivir con tus padres hasta los 40 años?",
    unit: "9",
    hintTitle: "Argumentar y Debatir",
    hintContent: <ul className="list-disc pl-5"><li><em>¡Ni hablar! Es horrible.</em></li><li><em>Depende, si cocinan bien...</em></li></ul>
  },
  {
    id: 19,
    text: "Cuenta una travesura (mischief) que hiciste de pequeño.",
    unit: "9 + 10",
    hintTitle: "Recuerdos",
    hintContent: <p><em>Rompí la ventana del vecino, pinté al gato de azul...</em></p>
  },
  {
    id: 20,
    text: "Tu amigo ha suspendido el examen con un 0. Reacciona.",
    unit: "10",
    hintTitle: "Reaccionar",
    hintContent: <ul className="list-disc pl-5"><li>¡Qué pena!</li><li>¡Qué desastre!</li><li>¡Qué vergüenza! (bromeando)</li></ul>
  },
  {
    id: 21,
    text: "Dale órdenes a tu compañero es tu esclavo por un minuto.",
    unit: "8",
    hintTitle: "Imperativo (Tú)",
    hintContent: <p><em>Trae agua, hazme un masaje, no me mires a los ojos.</em></p>
  },
  {
    id: 22,
    text: "Critica la moda de los años 80. ¿Cómo vestían?",
    unit: "9",
    hintTitle: "Imperfecto (Descripción)",
    hintContent: <p><em>Vestían fatal, llevaban peinados horribles, parecían payasos.</em></p>
  },
  {
    id: 23,
    text: "Cuenta un chisme (gossip) sobre alguien de la clase (inventado).",
    unit: "10",
    hintTitle: "Marcadores Temporales",
    hintContent: <p><em>El otro día vi a Juan comiendo comida de gato. Al final resultó que era verdad.</em></p>
  },
  // BONUS SQUARE 2
  {
    id: 24,
    text: "El profe dice: 'Este audio no es difícil, tira el dado de nuevo'.",
    unit: "EXTRA",
    hintTitle: "¡BONUS!",
    hintContent: <p>¡Menos mal! Tienes otra oportunidad.</p>,
    specialType: 'BONUS'
  },
  {
    id: 25,
    text: "Tienes una resaca (hangover) horrible de tequila barato. ¿Qué te duele?",
    unit: "8",
    hintTitle: "Verbo Doler + Resaca",
    hintContent: <p><strong>Me duele</strong> la cabeza, me quiero morir, <strong>tengo ganas de</strong> vomitar.</p>
  },
  {
    id: 26,
    text: "Dime algo que 'ya no' haces porque eres viejo y aburrido.",
    unit: "9",
    hintTitle: "Continuidad y Cambio",
    hintContent: <ul className="list-disc pl-5"><li><strong>Ya no</strong> salgo hasta las 6 am.</li><li><strong>Todavía</strong> juego a videojuegos.</li></ul>
  },
  // PRISON SQUARE
  {
    id: 27,
    text: "¿No has hecho los deberes? A la cárcel, por perezoso.",
    unit: "CASTIGO",
    hintTitle: "¡A LA CÁRCEL!",
    hintContent: <p>Pierdes 2 turnos. Aprovecha para estudiar.</p>,
    specialType: 'PRISON'
  },
  {
    id: 28,
    text: "Tuviste un accidente por mirar el móvil andando. Cuéntalo.",
    unit: "10",
    hintTitle: "Sucesos y Narración",
    hintContent: <p><em>Me choqué con una farola (lamp post), todo el mundo se rio de mí.</em></p>
  },
  {
    id: 29,
    text: "¿Qué hacías mientras el Pablo explicaba la historia superaburrida de la Transición española?",
    unit: "10",
    hintTitle: "Acciones simultáneas (Imperfecto)",
    hintContent: <p><em>Mientras él hablaba, yo estaba comprando ropa online.</em></p>
  },
  {
    id: 30,
    text: "Tu ex te escribe borracho/a. Dale un consejo negativo.",
    unit: "8",
    hintTitle: "Imperativo Negativo",
    hintContent: <p><em>No me llames. No seas patético/a. No vengas a mi casa.</em></p>
  },
  {
    id: 31,
    text: "Inventa un aparato para copiar en el examen PP2 sin que el profe te vea.",
    unit: "9",
    hintTitle: "Inventos Futuros",
    hintContent: <p><em>Unas gafas con las respuestas, un boli que habla bajito...</em></p>
  },
  {
    id: 32,
    text: "Resume tu película favorita pero haz que suene aburrida.",
    unit: "10",
    hintTitle: "Narrar una historia",
    hintContent: <p><em>Unos tipos anduvieron mucho tiempo para tirar un anillo a un volcán. Fin.</em></p>
  },
  // NEW SQUARE 33
  {
    id: 33,
    text: "Estás muy nervioso antes del examen. Describe qué sientes.",
    unit: "8",
    hintTitle: "Emociones y Nervios",
    hintContent: <ul className="list-disc pl-5"><li><strong>Estoy</strong> nervioso/a.</li><li><strong>Tengo</strong> miedo.</li><li><strong>Me pongo</strong> rojo/a.</li></ul>
  },
  // FINAL SQUARE (TEACHER)
  {
    id: 34,
    text: "¡PREGUNTA FINAL! Convence al profesor dormido para que te ponga un A+.",
    unit: "8 + 9 + 10",
    hintTitle: "Persuasión Final",
    hintContent: <p><em>Profe, despierta... He estudiado mucho, soy buena persona, te invito a un café...</em></p>
  }
];

// SPARE QUESTIONS (To prevent repetition)
// IDs don't matter much here as we assign them dynamically, but we give them high numbers to avoid conflict in keys if needed
export const spareQuestions: Question[] = [
    {
        id: 100,
        text: "¡A bailar! Baila 'La Macarena' o algo ridículo durante 10 segundos.",
        unit: "EXTRA",
        hintTitle: "Imperativo + Vergüenza",
        hintContent: <p>¡Baila, salta, muévete!</p>
    },
    {
        id: 101,
        text: "Canta el 'Cumpleaños Feliz' en español como un cantante de ópera.",
        unit: "EXTRA",
        hintTitle: "Imperativo + Voz",
        hintContent: <p>¡Canta fuerte!</p>
    },
    {
        id: 102,
        text: "Imita al profesor de español cuando se enfada. ¿Qué dice?",
        unit: "EXTRA",
        hintTitle: "Imitación",
        hintContent: <p>Usa frases típicas: <em>¡Silencio! ¡Abrid el libro!</em></p>
    },
    {
        id: 103,
        text: "Dile un piropo (compliment) romántico a la silla donde estás sentado.",
        unit: "EXTRA",
        hintTitle: "Creatividad",
        hintContent: <p><em>Eres la silla más elegante que he visto...</em></p>
    },
    {
        id: 104,
        text: "Haz 5 sentadillas (squats) mientras conjugas el verbo 'Ir' en Indefinido (sentado en tu silla).",
        unit: "EXTRA",
        hintTitle: "Ejercicio + Gramática",
        hintContent: <p>Fui, fuiste, fue, fuimos, fuisteis, fueron.</p>
    },
    {
        id: 105,
        text: "Confiesa un secreto vergonzoso de tu infancia (inventado o real).",
        unit: "EXTRA",
        hintTitle: "Contar anécdotas",
        hintContent: <p><em>Me comía los mocos hasta los 12 años...</em></p>
    },
    {
        id: 106,
        text: "Vende tu bolígrafo a tu compañero como si fuera un objeto mágico.",
        unit: "EXTRA",
        hintTitle: "Persuasión",
        hintContent: <p><em>Este boli escribe solo los exámenes... ¡Cómpralo!</em></p>
    },
    {
        id: 107,
        text: "Pon cara de que has comido un limón y mantenla 10 segundos.",
        unit: "EXTRA",
        hintTitle: "Gestos",
        hintContent: <p>¡No te rías!</p>
    },
    {
        id: 108,
        text: "Di el abecedario al revés (desde la Z a la A)... o inténtalo.",
        unit: "EXTRA",
        hintTitle: "Reto imposible",
        hintContent: <p>Z, Y, X...</p>
    },
    {
        id: 109,
        text: "Haz como un gato y pide comida en español.",
        unit: "EXTRA",
        hintTitle: "Roleplay Animal",
        hintContent: <p><em>Miau, tengo hambre, dame pescado.</em></p>
    },
    {
        id: 110,
        text: "Insulta 'amistosamente' a un compañero de clase.",
        unit: "EXTRA",
        hintTitle: "Vocabulario 'malo'",
        hintContent: <p><em>Eres un melón, eres un cabeza de chorlito.</em></p>
    },
    {
        id: 111,
        text: "Describe tu ropa ideal para ir a una boda zombie.",
        unit: "EXTRA",
        hintTitle: "Ropa + Descripción",
        hintContent: <p><em>Llevaría un vestido roto y manchado de sangre falsa...</em></p>
    },
    {
        id: 112,
        text: "Habla durante 30 segundos sin usar la letra 'E'.",
        unit: "EXTRA",
        hintTitle: "Reto Lingüístico",
        hintContent: <p>Difícil, ¿verdad?</p>
    },
    {
        id: 113,
        text: "Pide perdón a tu pie por pisarlo todo el día.",
        unit: "EXTRA",
        hintTitle: "Disculpas",
        hintContent: <p><em>Lo siento mucho, pie querido...</em></p>
    },
    {
        id: 114,
        text: "Manda callar a la clase como una abuela enfadada.",
        unit: "EXTRA",
        hintTitle: "Imperativo",
        hintContent: <p><em>¡Niños, callaos ya! ¡Qué dolor de cabeza!</em></p>
    }
];
