import React, { useState } from 'react';
import '../CSS/pages/newticket.css';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ButtonBack from '../components/ButtonBack';

import ButtonSpinner from '../assets/ButtonSpinner';
import { createTicket } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
function NewTicket() {
  const { isLoading } = useSelector((state) => state.ticket);

  const [formData, setFormData] = useState({
    product: '',
    purchase_date: '',
    serial: '',
    problem: '',
    note: '',
  });
  const { product, purchase_date, serial, problem, note } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    dispatch(
      createTicket({
        product,
        problem,
        purchase_date,
        note,
        serial,
      })
    )
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/tickets');
        toast.success('New ticket created!');
      })
      .catch(toast.error);
  };

  return (
    <div className='main-new-Thicket'>
      <div className='new-Ticket'>
        {isLoading && <div className='my-tickets-loading'></div>}

        <div className='new-ticket-back'>
          <ButtonBack url={'/'} />
        </div>
        <h1>create new Ticket</h1>
        <h2>please fill out the form below</h2>

        <form onSubmit={onSubmit} className='ticket-form'>
          {/* client info */}

          {/* client info */}
          <div className='all-boxes  NT-boxes'>
            {/* name */}
            <div className='all-box NT-box'>
              <label htmlFor='' className='all-form-label '>
                product name
              </label>
              <select
                type='text'
                className='all-form-input all-H-35px all-fz-18px all-NT-input'
                onChange={onChange}
                value={product}
                id='product'
              >
                <option value=''>choose</option>
                <option value='iphone'>iphone 13</option>
                <option value='iphone 13 pro max'>iphone 13 pro max</option>
                <option value='iphone 14'>iphone 14</option>
                <option value='iphone 14 pro max'>iphone 14 pro max</option>
                <option value='iphone 14'>iphone 15</option>
                <option value='iphone 15 pro max'>iphone 15 pro max</option>
                <option value='ipad mini 6'>ipad mini 6</option>
                <option value='ipad pro 12 inch'>iphone 15 pro 12"</option>
              </select>
            </div>
            {/*  purchase_date */}
            <div className='all-box NT-box'>
              <label htmlFor='' className='all-form-label '>
                purchase date
              </label>
              <input
                id='dateId'
                type='date'
                placeholder='yyyy-mm-dd'
                pattern='\d{4}-\d{2}-\d{2}'
              />
            </div>
            {/* serial */}
            <div className='all-box NT-box'>
              <label htmlFor='' className='all-form-label'>
                product serial no
              </label>
              <input
                type='text'
                className='all-form-input all-H-25px all-fz-18px all-NT-input'
                onChange={onChange}
                value={serial}
                id='serial'
                required
              />
            </div>
          </div>
          {/* problem info */}
          <div className='all-boxes  NT-boxes-solo'>
            {/* desc */}
            <div className='all-box NT-box-solo'>
              <label htmlFor='' className='all-form-label '>
                problem problem
              </label>
              <textarea
                className='all-form-input  all-fz-18px all-NT-input-solo'
                onChange={onChange}
                value={problem}
                id='problem'
              />
            </div>
          </div>
          {/* note */}
          <div className='all-boxes  NT-boxes-solo'>
            {/* desc */}
            <div className='all-box NT-box-solo'>
              <label htmlFor='' className='all-form-label '>
                add note
              </label>
              <textarea
                className='all-form-input  all-fz-18px all-NT-input-solo'
                onChange={onChange}
                value={note}
                id='note'
              />
            </div>
          </div>
          <div className='new-Ticket-btn-box'>
            <button
              type='submit'
              className='all-btn-submit all-B-navy all-fz-25px all-W-100pc all-H-40px'
            >
              {isLoading ? <ButtonSpinner /> : 'submit ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTicket;
