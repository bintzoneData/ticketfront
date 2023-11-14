import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

import { toast } from 'react-toastify';
import '../CSS/pages/ticket.css';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';
import Kspinner from '../assets/Kspinner';
import BookSpinner from '../assets/BookSpinner';
function Ticket() {
  const { ticket, isSuccess, isLoading, message, isError } = useSelector(
    (state) => state.ticket
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate('/tickets');
    }
    dispatch(getTicket(params.id));
  }, [dispatch, isError, params.id, navigate, isSuccess, message]);
  const onCloseTicket = () => {
    dispatch(closeTicket(params.id));
  };
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (!isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 1300);
    }
  }, [isLoading]);
  return (
    <div className='tickets'>
      <main className='tickets-card'>
        <header className='all-boxes tickets-title '>
          <h1 onClick={() => console.log(ticket)}>ticket view</h1>
          <div className='tickets-back'>
            <ButtonBack url={'/tickets'} />
          </div>
        </header>
        {loading ? (
          <div className='isloading-box'>
            <BookSpinner />
            <h1>please wait</h1>
          </div>
        ) : (
          <>
            <section className='main-ticket'>
              <header className='one-ticket-header'>
                <div className='ticket-id-box'>
                  <p>ticket id:</p>
                  <h2 className='ok-select'>{ticket._id}</h2>
                </div>
                <div className='ticket-id-box'>
                  <p>submitted date:</p>
                  <h2>{new Date(ticket.createdAt).toLocaleString('en-IN')}</h2>
                </div>
              </header>
              <div className='one-ticket-details'>
                <main className='one-ticket-line'>
                  <div className='one-ticket-data'>
                    <label
                      htmlFor='
            '
                      className='all-label'
                    >
                      product name:
                    </label>
                    <p>{ticket.product}</p>
                  </div>
                  <div className='one-ticket-data'>
                    <label
                      htmlFor='
            '
                      className='all-label'
                    >
                      purchase Date:
                    </label>
                    <p>
                      {new Date(ticket.purchase_date).toLocaleDateString([
                        'en-GB',
                      ])}
                    </p>
                  </div>
                </main>
                <main className='one-ticket-line'>
                  <div className='one-ticket-data'>
                    <label
                      htmlFor='
            '
                      className='all-label'
                    >
                      product issue:
                    </label>
                    <p>{ticket.problem}</p>
                  </div>
                </main>
              </div>
              {/* {stage one} */}
              <div className='one-ticket-stages'>
                <main className='one-ticket-line'>
                  <div className='one-ticket-data'>
                    <label className='all-label'>
                      stage type
                      <div className='ticket-stage-icon'>
                        {/* <FaCheckCircle className='c-green' /> */}
                        <FaQuestionCircle className='c-black' />
                      </div>
                    </label>
                    <p>{ticket.stage && ticket.stage.type}</p>
                  </div>
                  <div className='one-ticket-data'>
                    <label className='all-label'>warranty status</label>
                    {ticket.stageType === 'confirme' ? (
                      <p>---</p>
                    ) : (
                      <>
                        {ticket.warranty !== false ? (
                          <h2 className='c-green'>active</h2>
                        ) : (
                          <h2 className='c-red'>Expired</h2>
                        )}
                      </>
                    )}
                  </div>
                </main>
              </div>
              {/* {stage one} */}
              <div className='one-ticket-stages'>
                <main className='one-ticket-line'>
                  <div className='one-ticket-data'>
                    <label className='all-label'>message</label>
                    <h2 className='stage-messsage'>
                      {ticket.stage && ticket.stage.message}
                    </h2>
                  </div>
                </main>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Ticket;
