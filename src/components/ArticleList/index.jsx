'use client';

import styles from './ArticleList.module.scss';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading';
import Link from 'next/link';
import { getArticles } from "../../app/api/articles";
import { Article } from '../Article';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { usePathname, redirect } from 'next/navigation';

export const ArticleList = ({
    strategy = "relevant",
    page = 1
}) => {
	const pathname = usePathname();
	const query = pathname.match(/\/(\D*?)\//g)[0].replaceAll('/', '');
	if (isNaN(page) || page < 1 || !(/\d/g.test(page))) redirect(`/${query}/1`);
    const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const offset = 30 * (page - 1);

	const nextPageLink = `/${query}/${+page+1}`;
	const previousPageLink = +page > 1 ? `/${query}/${+page-1}` : `/${query}/1`;

    const getPostsInfo = async () => {
		const articles = await getArticles(strategy, page);
		setPosts([...articles]);
		setIsLoading(false);
	}

    useEffect(() => {
        getPostsInfo();
    }, [strategy, page]);

    return (
        <>
			<Loading loading={isLoading}/>

			{!isLoading && !!posts.length && (
				<div className={styles.posts}>
					{posts.map(((articleInfo, i) => {
						const itemCount = i + 1 + offset;
						
						return (
							<Article
								key={i}
								index={itemCount}
								{...articleInfo}
							/>
						)
					}))}

					<div className={styles.pagination}>
						<Link href={previousPageLink} disabled={+page === 1}>
							<BsArrowLeft/>
						</Link>
						<Link href={nextPageLink}>
							<BsArrowRight/>
						</Link>
					</div>
				</div>
			)}
		</>
    )
}