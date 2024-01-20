interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({ label, onClick, loading, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="button"
    >
      {loading && (
        <div className="spinner" />
      )}
      <p className="button__label">{label}</p>
    </button>
  )
}

export default Button;
