import NextImage, { ImageProps } from "next/image"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function Img({ src, ...props }: ImageProps) {
  const resolvedSrc =
    typeof src === "string" && src.startsWith("/")
      ? `${BASE_PATH}${src}`
      : src

  return <NextImage src={resolvedSrc} {...props} />
}
