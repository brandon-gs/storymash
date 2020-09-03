import React from "react"
import NextHead from "next/head"

type Props = {
  title: string
  children?: JSX.Element
}

export default function Head({ title = "Default title", children }: Props): JSX.Element {
  return (
    <>
      <NextHead>
        <title>{title}</title>
        {children}
      </NextHead>
    </>
  )
}
