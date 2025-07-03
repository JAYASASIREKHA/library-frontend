import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllMembersList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/allmembers')
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>All Registered Members</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Age</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gender</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>DOB</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.userFullName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.age || 'Not specified'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.gender || 'Not specified'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.dob || 'Not specified'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllMembersList; 