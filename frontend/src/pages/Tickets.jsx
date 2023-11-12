import React, { useEffect } from 'react';
import '../CSS/pages/tickets.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ButtonBack from '../components/ButtonBack';
import { FaFrown } from 'react-icons/fa';
import BookSpinner from '../assets/BookSpinner';
import Kspinner from '../assets/Kspinner';
import { getTickets } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
function Tickets() {
  const { tickets, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTickets());
  }, [dispatch, isError, isSuccess, message]);
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);
  return (
    <div className='tickets'>
      <main className='tickets-card'>
        {isLoading && (
          <div className='isloading-box'>
            <BookSpinner />
            <h1>please wait</h1>
          </div>
        )}
        <header className='all-boxes tickets-title '>
          <h1>my tickets</h1>
          <div className='tickets-back'>
            <ButtonBack url={'/'} />
          </div>
        </header>
        {!isLoading && (
          <>
            <section className='tickets-section'>
              <table className='tickets-table'>
                <thead className='tickets-Thead'>
                  <tr>
                    <th>date</th>
                    <th>product</th>
                    <th>status </th>
                    <th>view</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='tickets-hide'>
                    <th>m</th>
                  </tr>

                  {tickets &&
                    tickets.map((ticket) => (
                      <tr key={ticket._id} className='tickets-Tdata'>
                        <td>
                          {new Date(ticket.createdAt).toLocaleString('en-US')}
                        </td>
                        <td>{ticket.product}</td>
                        <td>
                          <div className='all-f-center'>{ticket.status}</div>
                        </td>
                        <td>
                          <Link
                            to={`/ticket/${ticket._id}`}
                            className='all-f-center'
                          >
                            <button className='all-btn-submit all-B-main'>
                              view
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Tickets;
