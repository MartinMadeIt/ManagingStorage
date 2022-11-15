import './App.css';
import Home from './ReduxExercises/Components/Home/Home';
import Wrapper from './ReduxExercises/Components/Wrapper/Wrapper';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Manage from './ReduxExercises/Components/Manage/Manage';
import Invoices from './ReduxExercises/Components/Invoices/Invoices';
import Sell from './ReduxExercises/Components/Sell/Sell';
import CreateNewInvoice from './ReduxExercises/Components/CreateNewInvoice/CreateNewInvoice';
import Orders from './ReduxExercises/Components/Orders/Orders';
import InvoiceView from './ReduxExercises/Components/InvoiceView/InvoiceView';
import Settings from './ReduxExercises/Components/Settings/Settings';

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
