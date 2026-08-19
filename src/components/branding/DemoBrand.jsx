import styles from './DemoBrand.module.css';

export default function DemoBrand({ markOnly = false, inverse = false, size = 'medium' }) {
    return (
        <span
            className={`${styles.brand} ${styles[size] || styles.medium} ${inverse ? styles.inverse : ''}`}
            aria-label="Demo Food"
        >
            <span className={styles.mark}>D</span>
            {!markOnly && (
                <span className={styles.words}>
                    <strong>DEMO</strong>
                    <small>FOOD</small>
                </span>
            )}
        </span>
    );
}
