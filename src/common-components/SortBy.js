import React from 'react';
import uuid from 'react-uuid';
import styles from './SortBy.module.scss';

export default function SortBy({options, onChange, defaultOption}) {
    const id = uuid();

    return (
        <span className={styles.container}>
            <span>Sort by:</span>

            {options.map(item => (
                <label key={id + '_sort-by_' + item} className={styles.label} htmlFor={id + "_sort-by_" + item}>
                    <input
                        id={id + '_sort-by_' + item}
                        className={styles.radio} type="radio" name={id + '_sort-by'}
                        value={item} defaultChecked={item === defaultOption}
                        onChange={event => onChange(item)}
                    />
                    <span className={styles.labelText}>{item}</span>
                </label>
            ))}
        </span>
    )
}