"use client";

import styles from "./selectForm.module.css";

export default function SelectForm({
    label,
    name,
    options = [],
    error,
    isLoading = false,
    loadingText = "Carregando...",
    placeholder = "Selecione...",
    value,
    disabled,
    ...props
}) {
    const normalizedValue = value ?? "";

    return (
        <div className={styles.inputGroup}>
            {label && (
                <label htmlFor={name} className={styles.label}>
                    {label}
                </label>
            )}

            <select
                id={name}
                name={name}
                className={`${styles.select} ${error ? styles.inputError : ""}`}
                disabled={isLoading || disabled}
                value={normalizedValue}
                {...props}
            >
                {isLoading ? (
                    <option value="">{loadingText}</option>
                ) : (
                    <>
                        {!normalizedValue && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}

                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled === true}
                            >
                                {option.label}
                            </option>
                        ))}
                    </>
                )}
            </select>

            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
}
