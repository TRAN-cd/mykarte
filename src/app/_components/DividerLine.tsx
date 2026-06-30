type Props = {
  text: string
}

export const DividerLine = ({text}: Props) => {

  return (
    <p className="relative text-center text-xs py-4">
      <span className="bg-white px-3.75 relative z-1">{text}</span>
      <span className="absolute w-full h-px left-0 top-1/2 -translate-y-1/2 bg-(--color-text)/50"></span>
    </p> 
  )
}