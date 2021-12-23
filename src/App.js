import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './components/Input';
import Button from './components/Button.js';
import Container from './components/Container.js'
import Section from './components/Section.js'
import Balance from './components/Balance.js';

const compountInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (1 + rate)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  });
function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ( {deposit, contribution, years, rate } ) => {
    const val = compountInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
        initialValues={{
          deposit: '',
          contribution: '',
          years: '',
          rate: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          deposit: Yup.number()
            .required('Requerido')
            .typeError('Debe ser un número')
            .positive('Solo números positivos'),
          contribution: Yup.number()
            .required('Requerido')
            .typeError('Debe ser un número')
            .positive('Solo números positivos'),
          years: Yup.number()
            .required('Requerido')
            .typeError('Debe ser un número')
            .positive('Solo números positivos'),
          rate: Yup.number()
            .required('Requerido')
            .typeError('Debe ser un número')
            .min(0, 'El valor mínimo es 1')
            .max(1, 'El valor máximo es 1')
            .positive('Solo números positivos'),
        })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance ? <Balance>Tu balance es de {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
