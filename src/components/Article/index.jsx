import Link from 'next/link';
import styles from './Article.module.scss';
import moment from 'moment/moment';
import 'moment/locale/pt-br'
moment.locale('pt-br');

export const Article = ({
    index,
    title,
    tabcoins,
    published_at,
    children_deep_count,
    owner_username,
    slug
}) => {
    const articleIndex = String(index).padStart(2, '0');
    const date = moment(published_at).fromNow();

    const urls = {
        article: `https://tabnews.com.br/${owner_username}/${slug}`,
        user_profile: `https://tabnews.com.br/${owner_username}`
    }

    return (
        <article className={styles.article}>
            <span>
                {articleIndex}
            </span>
            
            <div>
                <Link href={urls.article} target="_blank">
                    <h3>{title}</h3>
                </Link>
                <ul>
                    <li>{tabcoins} tabcoin{tabcoins > 1 && 's'}</li>
                    <li>{date}</li>
                    <li>{children_deep_count} comentário{children_deep_count !== 1 && 's'}</li>
                    <li>
                        <Link href={urls.user_profile} target="_blank">
                            {owner_username}
                        </Link>
                    </li>
                </ul>
            </div>
        </article>
    )
}