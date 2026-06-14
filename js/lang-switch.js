const translations = {
    en: {
        nav_home: 'Home',
        nav_about: 'About Steven',
        nav_issues: 'Issues',
        nav_getinvolved: 'Get Involved',
        nav_electioninfo: 'Election Info',
        nav_donate: 'Donate',
        hero_donate_now: 'Donate Now!',
        hero_join: 'Join the Team',
        hero_register: 'Register to Vote',
        about_header_title: 'Meet Steven Rogers',
        about_header_sub: 'Dad • Public Servant • Your Neighbor',
        issues_header_title: 'The Issues',
        issues_header_sub: 'Solutions-focused leadership for the challenges District 4 faces today.',
        involved_header_title: 'Get Involved',
        involved_header_sub: 'This campaign runs on people power, here\'s how you can help.',
        election_header_title: 'Election Information',
        election_header_sub: 'Everything you need to make your voice heard on Election Day.',
        index_why: 'Why Steven?',
        index_sub1: 'Real experience. Real solutions.',
        index_sub2: 'Real commitment to Cherokee County.',
        index_community: 'Our Community',
        index_community_sub: 'Woodstock, Towne Lake, Woodwind Station, Kellog Creek, and Oak Grove',
        index_issues: 'Key Issues',
        index_issues_sub: 'Solutions, not slogans—here\'s what Steven is fighting for.',
        index_see_all: 'See All Issues',
        index_cta_title: 'Ready to Make a Difference?',
        index_cta_text: 'Every donation, every volunteer hour, and every conversation moves us closer to the community we deserve.',
        index_cta_donate: 'Donate',
        index_cta_volunteer: 'Volunteer',
        index_cta_register: 'Register to Vote',
        nav_events: 'Events',
        events_header: 'Events',
        events_sub: "See upcoming events and request Steven's attendance.",
        events_upcoming: 'Upcoming Events',
        events_request_title: "Request Steven's Attendance",
        event_name_label: 'Event Name',
        event_date_label: 'Date',
        event_time_label: 'Time',
        event_location_label: 'Location',
        event_contact_label: 'Organizer Contact Info',
        submit_request: 'Submit Request'
    },
    es: {
        nav_home: 'Inicio',
        nav_about: 'Acerca de Steven',
        nav_issues: 'Temas',
        nav_getinvolved: 'Involúcrate',
        nav_electioninfo: 'Información Electoral',
        nav_donate: 'Donar',
        hero_donate_now: '¡Dona ahora!',
        hero_join: 'Únete al equipo',
        hero_register: 'Regístrate para votar',
        about_header_title: 'Conoce a Steven Rogers',
        about_header_sub: 'Papá • Servidor público • Tu vecino',
        issues_header_title: 'Los temas',
        issues_header_sub: 'Liderazgo enfocado en soluciones para los desafíos del Distrito 4.',
        involved_header_title: 'Involúcrate',
        involved_header_sub: 'Esta campaña funciona con el poder de la gente, así es como puedes ayudar.',
        election_header_title: 'Información Electoral',
        election_header_sub: 'Todo lo que necesitas para hacer oír tu voz el día de las elecciones.',
        index_why: '¿Por qué Steven?',
        index_sub1: 'Experiencia real. Soluciones reales.',
        index_sub2: 'Compromiso real con el condado de Cherokee.',
        index_community: 'Nuestra Comunidad',
        index_community_sub: 'Woodstock, Towne Lake, Woodwind Station, Kellog Creek y Oak Grove',
        index_issues: 'Temas clave',
        index_issues_sub: 'Soluciones, no lemas — esto es por lo que Steven está luchando.',
        index_see_all: 'Ver todos los temas',
        index_cta_title: '¿Listo para marcar la diferencia?',
        index_cta_text: 'Cada donación, cada hora de voluntariado y cada conversación nos acerca más a la comunidad que merecemos.',
        index_cta_donate: 'Donar',
        index_cta_volunteer: 'Voluntario',
        index_cta_register: 'Regístrate para votar',
        nav_events: 'Eventos',
        events_header: 'Eventos',
        events_sub: 'Ver eventos próximos y solicitar la asistencia de Steven.',
        events_upcoming: 'Próximos eventos',
        events_request_title: 'Solicitar la asistencia de Steven',
        event_name_label: 'Nombre del evento',
        event_date_label: 'Fecha',
        event_time_label: 'Hora',
        event_location_label: 'Ubicación',
        event_contact_label: 'Cómo contactar al organizador',
        submit_request: 'Enviar solicitud'
    }
};

const supportedLangs = ['en', 'es'];
const defaultLang = 'en';

function getPreferredLanguage() {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get('lang');
    if (queryLang && supportedLangs.includes(queryLang)) {
        return queryLang;
    }
    const storedLang = window.localStorage.getItem('siteLang');
    if (storedLang && supportedLangs.includes(storedLang)) {
        return storedLang;
    }
    return defaultLang;
}

function updateUrlLang(lang) {
    try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        history.replaceState({}, '', url.toString());
    } catch (error) {
        // ignore URL update failures on older browsers
    }
}

function translatePage(lang) {
    const map = translations[lang] || translations[defaultLang];
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.dataset.translateKey;
        if (!key) return;
        const translation = map[key];
        if (translation !== undefined) {
            el.textContent = translation;
        }
    });
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(button => {
        const isActive = button.dataset.lang === lang;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    updateUrlLang(lang);
    window.localStorage.setItem('siteLang', lang);
}

function initLanguageSwitcher() {
    const lang = getPreferredLanguage();
    translatePage(lang);
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            translatePage(button.dataset.lang);
        });
    });
}

document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
