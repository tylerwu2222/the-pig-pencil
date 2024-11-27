import { useState } from "react";
import './CheckboxGroup.css';

const CheckboxGroup = ({ labels, checked, updateChecked = () => {}, defaultCheckedValue = true }) => {

    const handleOnChange = i => {
        // swap checked value for provided i
        const updatedCheckedStateArray = checked.map((v, index) =>
            index === i ? !v : v
        );
        // then update checked array
        updateChecked(updatedCheckedStateArray);
    }

    // create checkboxes
    return (
        <div className="checkbox-group-div">
            {labels.map((l, i) => {
                return (
                    <span className="checkbox-span" key={i}>
                        <label htmlFor={`custom-checkbox-${i}`}>
                            {l}
                        </label>
                        <input
                            type="checkbox"
                            id={`custom-checkbox-${i}`}
                            name={l}
                            value={l}
                            checked={checked[i]}
                            onChange={() => handleOnChange(i)}
                        />
                    </span>
                )
            }
            )}
        </div>
    )
};

export default CheckboxGroup; 