export function setDocumentTitle(title: string, suffix = 'Periférico') {
    document.title = suffix ? `${title} | ${suffix}` : title
}