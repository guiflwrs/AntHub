const API_BASE_URL = "https://www.tabnews.com.br/api/v1/contents";

export const getArticles = async (strategy = 'relevant', page = 1) => {
    const fetchURL = `${API_BASE_URL}?strategy=${strategy}&page=${page}`;
    const res = await fetch(fetchURL);
    
    if (!res.ok) {
        const {status, statusText} = res;
        const errorObj = { status, statusText, location: 'API:ARTICLES'};
        console.table(errorObj);
        throw new Error('Erro ao chamar o método getArticles.');
    }

    const result = await res.json();
    return result;
}