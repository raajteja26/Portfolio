import React from 'react'


function Admin() {
  
  return (
    <div>
    <iframe
        src="http://127.0.0.1:8000/admin"
        title="django admin"
        width="100%"
        height="550px"
      ></iframe>
    </div>
  )
}

export default Admin;