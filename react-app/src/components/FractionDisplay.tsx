
import React from 'react';
import { Fraction } from 'fractional';
import '../styles/FractionDisplay.css';

interface FractionDisplayProps {
  value: Fraction;
  inline?: boolean;
}

const FractionDisplay: React.FC<FractionDisplayProps> = ({ value, inline = false }) => {
  if (value.denominator === 1) {
    return <span>{value.numerator}</span>;
  }

  return (
    <span className={`fraction ${inline ? 'inline' : ''}`}>
      <span className="numerator">{value.numerator}</span>
      <span className="fraction-line" />
      <span className="denominator">{value.denominator}</span>
    </span>
  );
};

export default FractionDisplay;