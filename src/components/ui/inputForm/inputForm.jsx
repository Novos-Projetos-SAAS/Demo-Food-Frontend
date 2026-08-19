"use client";

import styles from "./inputForm.module.css";

export default function InputForm({
    label,
    name,
    type = "text",
    error,
    value,
    ...props
}) {
    const valueProps = value === undefined
        ? {}
        : { value: value ?? "" };

    return (
        <div className={styles.inputGroup}>
            {label && (
                <label htmlFor={name} className={styles.label}>
                    {label}
                </label>
            )}

            <input
                id={name}
                name={name}
                type={type}
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                {...valueProps}
                {...props}
            />

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
}
