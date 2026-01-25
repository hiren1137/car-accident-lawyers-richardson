export const SITE_URL = 'https://caraccidentlawyerrichardson.com';

export function getCanonicalUrl(pathname: string): string {
    // Ensure pathname starts with /
    let cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

    // Ensure trailing slash
    if (!cleanPath.endsWith('/')) {
        cleanPath = `${cleanPath}/`;
    }

    return `${SITE_URL}${cleanPath}`;
}

export interface Lawyer {
    name: string;
    slug: string;
    phone: string | null;
    website: string | null;
    address: string;
    rating: number | null;
    reviewsCount: number | null;
    hours: Record<string, string[]> | null;
    hoursText: string | null;
    businessStatus: string;
    categories: string;
    mapsUrl: string | null;
    placeId: string;
    lat: number;
    lng: number;
}

export function sortLawyersByPopularity(lawyers: Lawyer[]): Lawyer[] {
    return [...lawyers].sort((a, b) => {
        const aReviews = a.reviewsCount ?? 0;
        const bReviews = b.reviewsCount ?? 0;
        const aRating = a.rating ?? 0;
        const bRating = b.rating ?? 0;
        // First by reviewsCount (descending)
        if (bReviews !== aReviews) {
            return bReviews - aReviews;
        }
        // Then by rating (descending)
        return bRating - aRating;
    });
}

export function getRandomLawyers(lawyers: Lawyer[], excludeSlug: string, count: number): Lawyer[] {
    const filtered = lawyers.filter(l => l.slug !== excludeSlug);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function isOpenNow(hours: Record<string, string[]> | null): boolean {
    if (!hours) return false;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const dayName = days[now.getDay()];
    const todayHours = hours[dayName];

    if (!todayHours || todayHours.length === 0) return false;
    if (todayHours[0] === 'Closed') return false;
    if (todayHours[0] === 'Open 24 hours') return true;

    // Simple check - if has hours listed, assume potentially open
    return true;
}

export function formatPhoneForTel(phone: string | null): string | null {
    if (!phone) return null;
    return phone.replace(/[^+\d]/g, '');
}

export function generateStars(rating: number | null): string {
    if (rating === null || rating === undefined) return '☆☆☆☆☆';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    return '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(emptyStars);
}

export function formatRating(rating: number | null): string {
    if (rating === null || rating === undefined) return 'N/A';
    return rating.toFixed(1);
}

export function formatReviewCount(count: number | null): string {
    if (count === null || count === undefined) return '0';
    return String(count);
}
