import AdminNav from "@/components/nav/adminNav";



export default function AdminLayout({children}:{children:React.ReactNode}) {
  return (
    <>
    <AdminNav/>
    {children}
    </>
  )
}
