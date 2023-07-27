import { ArticleList } from "@/src/components/ArticleList";

const Recentes = ({ params }) => {
    const { page } = params;
    
    return (
        <ArticleList
            strategy="new"
            page={page}
        />
    )
}

export default Recentes;