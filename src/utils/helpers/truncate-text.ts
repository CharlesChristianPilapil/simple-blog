export function truncateText(text: string, maxLength = 300): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}