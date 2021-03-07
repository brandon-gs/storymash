import clsx from "clsx"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const pages = ["/", "/dashboard", "/favorites"]

export default function useTabs() {
  const router = useRouter()
  const [currentIndexTab, setCurrentIndexTab] = useState(pages.indexOf(router.pathname))
  const handleChangeTab = (page: string) => async () => {
    await router.push(page)
  }
  const isActiveTab = (index: number): boolean => {
    return index === currentIndexTab
  }
  const getClassTab = (index: number, normalClass: string, activeClass: string) => {
    return isActiveTab(index) ? clsx(normalClass, activeClass) : normalClass
  }
  useEffect(() => {
    setCurrentIndexTab(pages.indexOf(router.pathname))
  }, [router.pathname])
  return { currentIndexTab, handleChangeTab, isActiveTab, getClassTab, pages }
}
