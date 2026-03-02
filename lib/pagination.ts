export default function getPage(searchParams: URLSearchParams) {
    const page = Number(searchParams.get("page") ?? "1");
    
    return Number.isNaN(page) || page < 1 ? 1 : page;
}