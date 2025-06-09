const translations = {
  es: {
    "page_title": "Contacto",
    "form_title": "Formulario de contacto",
    "contact_us": "Contáctanos",
    "name_label": "Su nombre",
    "name_placeholder": "Introduzca su nombre completo",
    "email_label": "Su correo electrónico",
    "email_placeholder": "Introduzca su correo electrónico",
    "address_label": "Especifique su dirección",
    "address_placeholder": "Su dirección",
    "message_label": "Mensaje",
    "message_placeholder": "Escriba su mensaje aquí",
    "submit_button": "Enviar",
    "thanks_title": "¡Gracias!",
    "thanks_message": "Tu mensaje ha sido enviado correctamente.",
    "language_label": "Seleccionar idioma:",
    "lang_es": "Español",
    "lang_en": "English"
  },
  en: {
    "page_title": "Contact",
    "form_title": "Contact Form",
    "contact_us": "Contact Us",
    "name_label": "Your Name",
    "name_placeholder": "Enter your full name",
    "email_label": "Your Email",
    "email_placeholder": "Enter your email address",
    "address_label": "Specify your address",
    "address_placeholder": "Your address",
    "message_label": "Message",
    "message_placeholder": "Write your message here",
    "submit_button": "Submit",
    "thanks_title": "Thank you!",
    "thanks_message": "Your message has been sent successfully.",
    "language_label": "Select language:",
    "lang_es": "Spanish",
    "lang_en": "English"
  }
};

function translatePage(lang) {
  // Translate text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update select element to reflect current language
  const select = document.getElementById('language-select');
  if (select) {
    select.value = lang;
  }
}

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  translatePage(lang);
}

function getLanguage() {
  // Always default to 'es' if no language is set
  const lang = localStorage.getItem('lang') || 'es';
  return lang;
}

window.addEventListener('DOMContentLoaded', () => {
  // Ensure Spanish is the default on first load
  const lang = getLanguage();
  translatePage(lang);
});

window.setLanguage = setLanguage;