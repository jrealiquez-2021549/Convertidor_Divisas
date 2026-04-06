import { useState } from 'react'
import axios from 'axios'
import './Convertidor.css'

export const Convertidor = () => {
    
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        amount: ''
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const currencyCode = ['GTQ', 'EUR', 'USD', 'MXN', 'CAD', 'HNL'];
    
    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/convert', 
                formData
            );
            setResult(response.data);
            setError('');
        } catch (error) {
            setError(
                'Error',
                error?.response ? error?.response.data : error?.message
            )
        }
    }

    return (
        <div>
            <section className='converter'>
                <form onSubmit={handleSubmit}>
                    <select 
                        name='from' 
                        value={formData.from}
                        onChange={handleChange}
                        className='input'
                    >
                        <option value="">Moneda de origen</option>
                        {currencyCode.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>

                    <select 
                        name='to' 
                        value={formData.to}
                        onChange={handleChange}
                        className='input'
                    >
                        <option value="">Moneda de destino</option>
                        {currencyCode.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                    <input  
                        name='amount'
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder='Escribe el monto a convertir'
                        type='number'
                        className='input'
                    />
                    <button type='submit' className='submit-btn'>
                        Convertir
                    </button>
                </form>
                {result && (
                    <div className='result'>
                        <p>
                            Total de la conversión: {result.conversionAmount} {result.target}
                        </p>
                        <p>
                            Tipo de cambio: { result.conversionRate }
                        </p>
                    </div>
                )}
                {error && <p className='error'> Error: {error}</p>}
            </section>
        </div>
    )
}
