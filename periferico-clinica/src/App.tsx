
import { Toaster } from "./components/ui/Toaster"
import { AppRouter } from "./routes/AppRouter"
import { ToastProvider } from "./hooks/use-toast"

function App() {
  return (
    <ToastProvider position="top-right" duration={8000}>
      <AppRouter />
      <Toaster />
    </ToastProvider>
  )
}

export default App
