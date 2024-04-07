import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import Summary from './pages/Summary'
import { Total } from './pages/Total'
import NotFound from './pages/NotFound'
import { ProductsProvider } from './context/ProductsContext'

export default function App () {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='summary' element={<Summary />} />
            <Route path='total' element={<Total />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  )
}
