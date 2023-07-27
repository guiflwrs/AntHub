import { ArticleList } from "@/src/components/ArticleList";

const Relevantes = ({ params }) => {
    const { page } = params;
    
    return (
        <ArticleList
            page={page}
        />
    )
}

export default Relevantes;