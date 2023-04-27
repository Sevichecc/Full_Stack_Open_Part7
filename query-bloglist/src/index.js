import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
import { NotificationProvider } from './context/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationProvider>
)
