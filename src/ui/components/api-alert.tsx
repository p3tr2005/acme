'use client'
import { Copy, Server } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/ui/components/alert"
import { Badge, type BadgeProps } from "./badge"
import { Button } from "./button"
import { toast } from "sonner"

type ApiAlertProps = {
  title: string
  description: string
  variant: "public" | "admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "default",
  admin: "destructive",
}


const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
}

const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description)

    toast.success("API route copied to the clipboard")
  }
  return (
    <Alert>
      <AlertTitle className="flex items-center space-x-3">
        <Server className="w-4 h-4 mr-3" />
        {title}

        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="rounded-md bg-muted p-3 font-mono font-semibold text-sm">{description}</code>

        <Button onClick={onCopy} variant="outline" size="icon" className="bg-muted">
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert 
