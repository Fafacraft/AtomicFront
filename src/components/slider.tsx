import React from "react";

type RangeControlProps = {
  id?: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  showValue?: boolean;
  onChange: (value: number) => void;
  className?: string;
};

const RangeControl: React.FC<RangeControlProps> = ({
  id,
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  showValue = true,
  onChange,
  className = "",
}) => {
  return (
    <div className={`control ${className}`}>
      <label htmlFor={id}>
        {label}
        {showValue && <span className="control-value">: {value}</span>}
      </label>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
};

export default RangeControl;