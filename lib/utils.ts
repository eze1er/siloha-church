// Fonction pour décoder les entités HTML
export function decodeHtmlEntities(text: string): string {
  if (typeof text !== 'string') return text;
  
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

// Version pour le serveur (SSR)
export function decodeHtmlEntitiesServer(text: string): string {
  if (typeof text !== 'string') return text;
  
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}