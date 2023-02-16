import React from 'react'

const Teachers = () => {
  return (
    <section id="teachers">
      <table>
        <tbody>
          <tr>
            <th>NAME</th>
            <th>SURNAME</th>
            <th>EMAIL</th>
            <th>DATE</th>
          </tr>
          <tr className="row">
            <td className="name">EMRE</td>
            <td className="surname">KUNDURACI</td>
            <td className="email">admin@ga.pl</td>
            <td className="date">01.01.2023</td>
            <td className='delete'>&#x2716;</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Teachers;