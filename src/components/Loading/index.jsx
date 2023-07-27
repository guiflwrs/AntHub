import styles from './loading.module.scss';

export const Loading = ({
    loading
}) => {
    return (
        loading && (
            <span className={styles.loader}>
                <span></span>
            </span>
        )
    )
}