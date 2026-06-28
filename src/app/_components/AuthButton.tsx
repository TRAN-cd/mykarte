type Props = {
  text: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const AuthButton = ({
  text,
  ...rest
}: Props) => {
  return (
    <div className="max-w-45 w-full mx-auto pt-3">
      <button 
        className="text-center bg-(--color-primary) text-white text-xs font-medium w-full px-9 py-2 rounded-[5px] link-hover disabled:opacity-50"
        type="submit"
        {...rest}
      >
        {text}
      </button>
    </div>
  )
}