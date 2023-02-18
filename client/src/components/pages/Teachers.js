import React, {useEffect} from 'react'



const Teachers = () => {



  return (
    <section id="table">
      <div id='searchDiv'>
        <div id="searchOptions"></div>
        <div id="search">
          <input type="text" id='searchInput' />
          <div id='searchType'>NAME</div>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>NAME</th>
            <th>SURNAME</th>
            <th>EMAIL</th>
            <th>DATE</th>
            <th></th>
          </tr>
          <tr className="row">
            <td className="new">&#x2716;</td>
            <td className="name">
              <input className="tdInput" type="text" value="EMRE" />
            </td>
            <td className="surname">
              <input className="tdInput" type="text" value="KUNDURACI" />
            </td>
            <td className="email">
              <input className="tdInput" type="text" value="admin@ga.pl" />
            </td>
            <td className="date">
              <input className="tdInput" type="text" value="01.01.2023" />
            </td>
            <td className="delete">&#x2716;</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Teachers;