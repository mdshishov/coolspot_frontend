type Props = {
  errors?: string[];
};

export function FormFieldError({ errors }: Props) {
  if (!errors || errors.length === 0) return null;

  return (
    <div>
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}
