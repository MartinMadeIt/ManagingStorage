import './App.css';
import Home from './Components/Home/Home';
import Wrapper from './Components/Wrapper/Wrapper';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Manage from './Components/Manage/Manage';
import Invoices from './Components/Invoices/Invoices';
import Sell from './Components/Sell/Sell';
import CreateNewInvoice from './Components/CreateNewInvoice/CreateNewInvoice';
import Orders from './Components/Orders/Orders';
import InvoiceView from './Components/InvoiceView/InvoiceView';
import Settings from './Components/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Home />
      </Wrapper>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/settings' element={<Settings />} />
        <Route path="/manage" element={<Manage />} />
        <Route path='/invoices'>
          <Route index element={<Invoices/>} />
          <Route path=':InvoiceId' element={<InvoiceView/>} />
        </Route>
        <Route path='/placeorder' element={<CreateNewInvoice />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/orders" element={<Orders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
