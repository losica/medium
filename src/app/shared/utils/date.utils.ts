export const formatDate = (
    date: string,
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
): string => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(date));
};