import { Children } from "@/types"

const Layout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default Layout
