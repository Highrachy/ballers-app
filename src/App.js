import React from 'react';
// import axios from 'axios';
import 'assets/sass/App.scss';
import Home from 'components/page/Home';

function App() {
  // const [message, setMessage] = React.useState(null);
  // React.useEffect(() => {
  //   axios
  //     .get('https://staging-ballers-api.herokuapp.com/api/v1/')
  //     .then(function (response) {
  //       const { status, data } = response;
  //       console.log('status,data', status, data);
  //       // handle success
  //       if (status === 200) {
  //         setMessage(data.message);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error.response.data.message);
  //       setMessage([]);
  //     });
  // }, []);

  return (
    <>
      <Home />
      {/* <h1>{message === null ? 'Loading...' : message}</h1> */}
    </>
  );
}

export default App;
