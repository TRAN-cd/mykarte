

type Props = {
  children: React.ReactNode
  size?: "default" | "wide"
}

export const Card = ({ children, size = "default" }: Props) => {

  return (
    <div className={`${size === "wide" ? "max-w-250" : "max-w-115.5"} w-full mx-auto bg-white rounded-[10px] p-12 flex flex-col gap-6 border border-(--color-sub) shadow-[0px_10px_50px_0px_rgba(28,43,36,0.1)]`}>
      {children}
    </div>
  )
}